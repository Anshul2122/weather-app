import React from 'react'

const TopButton = () => {
    const cities = [
        {
            id: 1,
            name: 'London'
        },
        {
            id: 2,
            name: 'Sydney'
        },
        {
            id: 3,
            name: 'New York City'
        },
        {
            id: 4,
            name: 'Paris'
        },
        {
            id: 5,
            name: 'New Delhi'
        }
    ]
  return (
      <div className='flex items-center justify-around my-6'>
          {
              cities.map(city => (
                  <button key={city.id} className='text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'>{city.name}</button>
              ))
          }
          
    </div>
  )
}

export default TopButton