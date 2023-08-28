import React from 'react'
import Header from '../components/Header'
import FilterWeather from '../components/FilterWeather';
import WeatherGraph from '../components/WeatherGraph';

const WeatherPage = () => {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <Header />
      <FilterWeather />
      <WeatherGraph />
    </div>
  );
}

export default WeatherPage