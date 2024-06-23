import React from 'react'
import { BiSolidDropletHalf } from 'react-icons/bi'
import { FaThermometerEmpty, FaWind } from 'react-icons/fa'


const TempAndDetails = () => {
    const verticalDetails = [
        {
            id: 1,
            icon: FaThermometerEmpty,
            title: "Real Feel",
            value: "14°C",
        },
        {
            id: 2,
            icon: BiSolidDropletHalf,
            title: "Humidity",
            value: "233%",
        },
        {
            id: 3,
            icon: FaWind,
            title: "Wind Speed",
            value: "15 km/h",
        },
    ]
    return (
        // <div>
        //     <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
        //         <p>Rain</p>
        //     </div>
        //     <div className='flex flex-row items-center justify-between py-3'>
        //         <img className='w-20' src="http://openweathermap.org/img/wn/01d@2x.png" alt="weather-icon" />
        //         <p className='text-5xl'> 14°C </p>
        //         <div className='flex flex-col space-y-3 items-start'>
        //             { 
        //                 verticalDetails.map(({ id, Icon, title, value }) => (
        //                     <div key={id} className='flex font-light text-sm items-center justify-center'>
        //                         <Icon size={18} className='mr-1' />{`${title}: `}<span className='font-medium ml-1'>{value}</span>
        //                     </div>
        //                 ))
        //             }
        //         </div>
        //     </div>
        //     <div className='flex flex-row items-center justify-between py-3'>
        //         <p>Rise: 05:09 Am</p>
        //         <p>Set: 08:44 PM</p>
        //         <p>High 15°C</p>
        //         <p>Low: 13°C</p>
        //     </div>
            
        // </div>
        <div>
            <div className='flex items-center justify-center py-6 text-xl text-cyan-300'>
                <p>Rain</p>
            </div>
            <div className='flex flex-row items-center justify-between py-3'>
                <img className="w-20" src="http://openweathermap.org/img/wn/01d@2x.png" alt="" />
                <p className='text-5xl' >14°C </p>
                <div className='flex flex-col space-y-3 items-start'>
                    {verticalDetails.map(details => (
                        <div key={details.id} className='flex font-light text-sm items-center justify-center'>
                            <details.icon size={18} className='mr-1' />
                            {details.title}<span className='font-medium ml-1'>: {details.value}</span>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default TempAndDetails;