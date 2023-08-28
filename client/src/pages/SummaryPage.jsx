import React from 'react'
import Header from '../components/Header'
import Filter from '../components/Filter'
import SummaryData from '../components/SummaryData'
import WeatherFilter from '../components/WeatherFilter'

const SummaryPage = () => {
  return (
    <div className='max-w-screen overflow-x-hidden'>
      <Header />
      <Filter />
    </div>
  )
}

export default SummaryPage