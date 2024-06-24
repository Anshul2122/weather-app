const API_KEY = '5242541780d9f15289635665ebb166a5';
const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
import axios from 'axios';
import { DateTime } from 'luxon';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return axios.get(url.toString())//here we can also use axios.get(ur, { params})
        .then((response) => response.data);// if fetch keyword is used instead of axioxs.get, then use response.json() instead of response.data
       
};
const iconUrl = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy ' | Local time : 'hh:mm:ss a") => {
    return DateTime.fromSeconds(secs + offset, {zone: 'utc' }).toFormat(format);
}


const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, humidity, feels_like, temp_min, temp_max },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        feels_like,
        humidity,
        temp_min,
        temp_max,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrl(icon),
        formatToLocalTime: formattedLocalTime,
        dt,
        timezone,
        lat,
        lon,
    };
};

const formatForecastWeather = (secs, offset, data) => {
    //hourly forecast
    const hourly = data
        .filter(f => f.dt > secs)
        .map(f => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, 'hh:mm:ss a'),
            icon: iconUrl(f.weather[0].icon),
            date: f.dt_txt,
        }))
        .slice(0, 5);
    //daily forecast
    const daily = data
        .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
        .map(f => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "ccc"),
            icon: iconUrl(f.weather[0].icon),
            date: f.dt_txt,
        }));
    return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => { 
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent);

    const { dt, lat, lon, timezone } = formattedCurrentWeather;
    const formattedforecastWeather = await getWeatherData('forecast', { lat, lon, units: searchParams.units, })
    .then((d)=> formatForecastWeather(dt, timezone, d.list));
    
    return { ...formattedCurrentWeather, ...formattedforecastWeather };
}

export default getFormattedWeatherData;