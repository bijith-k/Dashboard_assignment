import React from 'react'
import Header from '../components/Header'
import Filter from '../components/Filter'
import FilterWeather from '../components/FilterWeather';

const WeatherPage = () => {
  return (
    <div className="w-screen">
      <Header />
      <FilterWeather />
    </div>
  );
}

export default WeatherPage