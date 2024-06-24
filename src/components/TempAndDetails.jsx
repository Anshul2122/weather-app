import React from 'react'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { FaThermometerEmpty, FaWind } from 'react-icons/fa'
import { GiSunrise,GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp,  MdKeyboardArrowDown } from "react-icons/md";


const TempAndDetails = ({
    weather: {
        details,
        icon,
        temp,
        temp_min,
        temp_max,
        sunrise,
        sunset,
        speed,
        humidity,
        feels_like,
    },
    units,

    }) => {
    const verticalDetails = [
        {
            id: 1,
            icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${feels_like.toFixed()} ${units === "metric"? "°C" : "°F"}`,
        },
        {
            id: 2,
            icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity} %`,
        },
        {
            id: 3,
            icon: FaWind,
            title: "Wind Speed",
            value: `${speed} ${units === "metric"? "km/h" : "mph"}`,
        },
    ]
    const degree = units === "metric"? "°C" : "°F";
    const horizontalDetails = [
        {
            id: 1,
            icon: GiSunrise,
            title: "Sunrise",
            value: `${sunrise}`,
        },
        {
            id: 2,
            icon: GiSunset,
            title: "Sunset",
            value: `${sunset} `,
        },
        {
            id: 3,
            icon: MdKeyboardArrowUp,
            title: "High",
            value: `${temp_max.toFixed()} ${units === "metric"? "°C" : "°F"}`,
        },
        {
            id: 4,
            icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${temp_min.toFixed()} ${units === "metric"? "°C" : "°F"}`,
        },
    ]
    return (
        
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
                <p>{details}</p>
            </div>
            <div className='flex flex-row items-center justify-between py-3'>
                <img className="w-20" src={icon} alt="" />
                <p className='text-5xl' >{temp.toFixed()}{degree }</p>
                <div className='flex flex-col space-y-3 items-start'>
                    {verticalDetails.map(details => (
                        <div key={details.id} className='flex font-light text-sm items-center justify-center'>
                            <details.icon size={18} className='mr-1' />
                            {details.title}<span className='font-medium ml-1'>: {details.value}</span>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className='flex flex-row justify-between space-x-10 text-sm py-3'>
                {horizontalDetails.map(details => (
                    <div key={details.id} className='flex flex-row items-center'>
                        <details.icon size={30} className='mr-1' />
                        <p className='font-light ml'>
                            {details.title}<span className='font-medium ml-1'>: {details.value}</span>
                            </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TempAndDetails;