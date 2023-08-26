import React from 'react'
import Header from '../components/Header'
import Filter from '../components/Filter'
import SummaryData from '../components/SummaryData'

const SummaryPage = () => {
  return (
    <div className='max-w-screen overflow-x-hidden'>
      <Header />
      <Filter />
      {/* <SummaryData /> */}
    </div>
  )
}

export default SummaryPage