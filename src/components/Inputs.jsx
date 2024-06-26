import React,{useState} from 'react'
import { BiSearch, BiCurrentLocation } from 'react-icons/bi';
const Inputs = ({ setQuery, setUnits }) => {
  
  const [city, setCity] = useState('');
  const handleSubmit = (e) => {
    if (city !== "")
      e.preventDefault();
    setQuery({ q: city });
    setCity('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
      handleSubmit(e);
    }
  }

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat:latitude, lon:longitude});
      });
    };
  };
  return (
      <div className='
        flex
        flex-row
        justify-center
        my-6'>
        <div id='input-container'
           className='
            flex 
            flex-row
            w-3/4
            items-center
            justify-center
            space-x-4'>
            <input
              value={city}
              onChange={(e)=> setCity(e.currentTarget.value) }
              type='text'
              placeholder='Search by city...'
              onKeyDown={handleKeyDown}
              className='
              inputField
             text-gray-500
              text-xl
              font-light
              p-2
              w-full
              shadow-xl
              capitalize
              focus:outline-none
              placeholder:lowercase
              rounded-2xl
              ' />
                <BiSearch
              onClick={handleSubmit}
              size={30} className='
              icon
              search-icon
              cursor-pointer
              transition ease-out
              hover:scale-125
              '      
            />
            <BiCurrentLocation
              size={30}
              onClick={handleLocation}
              className='
              icon location-icon
              cursor-pointer 
              transition ease-out
              hover:scale-125
              ' />

          </div>

          <div className='
            flex
            flex-row
            w-1/4
            items-center
            justify-center
          '>
              <button className='text-2xl font-medium transition ease-out hover:scale-125' onClick={()=>setUnits("metric")}> °C</button>
              <p className='text-2xl font-medium mx-1'>|</p>
              <button className='text-2xl font-medium transition ease-out hover:scale-125 '  onClick={()=>setUnits("imperial")}> °F</button>
          </div>
    </div>
  )
}

export default Inputs;