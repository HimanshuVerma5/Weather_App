import React, { useEffect, useRef, useState } from 'react';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = (city) => {
  const inputRef=useRef()
  const[weatherData,setWeatherData]=useState('false');
  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    '02d':cloud_icon,
    '03d':cloud_icon,
    '03n':cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,

  }
  const search=async(city)=>{
    if(city===""){
      alert("Enter City Name")
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}& units=metric&appid=${import.meta.env.VITE_APP_ID}`;
  const response=await fetch(url);
  const data=await response.json();
  const icon=allIcons[data.weather[0].icon]||clear_icon;
  console.log(data);
  setWeatherData({
    humidity:data.main.humidity,
    windSpeed:data.wind.speed,
    temperature:Math.floor(data.main.temp),
    location:data.name,
    icon:icon

  })

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  }
  useEffect(()=>{
    search("New Delhi");
  },[])
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10 rounded-[34px] bg-gradient-to-tr from-[#2f4680] to-[#500ae4] flex flex-col items-center">
        <div className="flex items-center gap-3">
          <input
           ref={inputRef}  className="h-12 border-none outline-none rounded-full pl-6 text-[#626262] bg-[#ebfffc] text-lg"
            type="search"
            placeholder="Search"
          />
          <img className="w-12 p-3 bg-white rounded-full cursor-pointer" src={search_icon}onClick={()=>search(inputRef.current.value)}  alt="" />
        </div>
        {weatherData?<>
          <div className=''>
        <img className='w-[150px] my-8 leading-none' src={weatherData.icon} alt="" />
           <p className='text-slate-200 font-semibold text-7xl' >{weatherData.temperature/10}</p>
           <p className='text-sky-200 text-3xl '>{weatherData.location}</p>
        </div>
        <div className=' weather-data flex mt-10  w-[100%] justify-between text-slate-200 '>
          <div className='col flex items-start gap-3 text-sm'>
          <img className='w-7 mt-2' src={humidity_icon} alt="" />
          <div>
            <p className="font-semibold">{weatherData.humidity}%</p>
            <span className='block font-semibold'>Humidity</span>
          </div>
          </div>
          <div className='flex items-start gap-3 text-sm '>
          <img className='w-7 mt-2' src={wind_icon} alt="" />
          <div>
            <p className="font-semibold">{weatherData.windSpeed} km/h</p>
            <span className='block font-semibold'>Wind Speed</span>
          </div>
          </div>
        </div>
      </>:<></>}
    </div>
    </div>
  );
};

export default Weather;
