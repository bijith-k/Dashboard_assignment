import React from 'react'
import Header from '../components/Header'
import FilterWeather from '../components/FilterWeather';


const WeatherPage = () => {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <Header />
      <FilterWeather />
    </div>
  );
}

export default WeatherPage