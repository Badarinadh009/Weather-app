"use client"
import React, { useState } from 'react'
import axios from 'axios'

function Main() {
    const [city, setCity]=useState('')
    const [weather, setWeather]= useState(null)
    const [err, setError]= useState('')
    const getWeather= async ()=>{
        if (!city) return;
        try{
             const API='e5bfcd99f6662300bf7dc29954ed5ecb'
        const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`)
        setWeather(response.data)
        setError('')
        console.log(response)
        }
        catch(err){
            setWeather(null)
            setError('City not found')
            console.log(err.response)
        }
       
    }

  return (
    <div className='flex justify-center items-center bg-cover h-[100vh] w-[full]' style={{backgroundImage:"url('/Weather-Back.avif')"}}>
        <div className=' flex flex-col items-center bg-white/30 w-[400px] h-[400px] p-4'>
            <h1 className='font-bold text-2xl'>Weather App</h1>
            <div className='p-4'>
                <input className='border-black border-2' type='text' onChange={(e)=>{setCity(e.target.value)}} placeholder='Enter the city' onKeyDown={(e)=>{e.key==='Enter' && getWeather()}} />
                
                    
               
                {err && <h1 className='text-red-500'>{err}</h1>}
                {weather && (
                    <div className=''>
                        <div className='pt-2'>
                        {weather.main.temp > 30 && <div className='h-[200px] w-[200px]'><img src='/Heat.jpg'/></div>}
                        {weather.main.temp <= 30 && <div className=' object-cover h-[200px] w-[200px]'><img src='/cool.jpg'/></div>}
                        </div>
                        <div>
                            <h1 className='font-bold text-center'>{weather.name}</h1>
                            <h1 className='font-bold text-center'>{weather.main.temp}C</h1>
                        </div>
                    </div>
                )}
            </div>
      </div>
    </div>
  )
}

export default Main
