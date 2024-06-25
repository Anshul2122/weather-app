import React,{useState, useEffect} from 'react'
import TopButton from './components/TopButton';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const App = () => {

  const [query, setQuery] = useState({ q: 'Sagar' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);


  const getWeather = async () => {

    const cityName = query.q ? query.q : 'current location';
    toast.info(`fetching weather data for ${cityName}`);
    const data = await getFormattedWeatherData({ ...query, units }).then(data => {
      toast.success(`weather data fetched for ${data.name}, ${data.country}`);
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);
  
  const formatBackground = () => {
    if (!weather) return 'from-cyan-600 to-blue-700';
    const threshold = units === 'metric' ? 20 : 60;
    
    if (weather.temp <= threshold) return 'from-cyan-600 to-blue-700' 
    return 'from-yellow-600 to-orange-700'
  }
  


  return (
    <div
      
  className = {`
      main-container
      mx-auto
      max-w-screen-lg
      mt-4 py-5 px-32
      bg-gradient-to-br
      shadow-xl shadow-gray-400 ${formatBackground()}`}
      >
      <TopButton setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits } />  
      {weather && (
        <>
          <TimeAndLocation weather={ weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast title='3 hour step forecase' data={weather.hourly} units={units}  />
          <Forecast title='daily forecase' data={weather.daily} units={units}/>
        </>
      )}
      
      <ToastContainer autoClose={2500} hideProgressBar={true}  theme='colored'/>
      
      
    </div>
  )
}

export default App;

// {weather &&  <></>   ,, weather={weather} 
        