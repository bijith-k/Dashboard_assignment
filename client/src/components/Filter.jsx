import { Button, Select } from '@chakra-ui/react';
import React, { useState } from 'react'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import SummaryData from './SummaryData';



const Filter = () => {

 const [selectedDayRange, setSelectedDayRange] = useState({
   from: null,
   to: null,
 });

 const [showDate, setShowDate] = useState(false)
 const [showCalendar, setShowCalendar] = useState(false);
   const handleSelectClick = () => {
     setShowCalendar(true);
   };
 
  console.log(showCalendar)

  
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-16 mt-10 relative z-30">
        <div className="w-full md:w-1/3 bg-amber-300 h-fit  rounded-lg ">
          <p
            className="text-center font-bold my-1 text-lg w-full py-3"
            onClick={handleSelectClick}
          >
            Select a date range
          </p>
          <p
            className={`text-center font-semibold w-5/6 mx-auto border border-black py-2 mb-2 rounded-lg ${
              selectedDayRange.from ? "block" : "hidden"
            }`}
          >
            {selectedDayRange.from
              ? `${selectedDayRange.from?.day}/${selectedDayRange.from?.month}/${selectedDayRange.from?.year} `
              : null}
            {selectedDayRange.to
              ? `- ${selectedDayRange.to?.day}/${selectedDayRange.to?.month}/${selectedDayRange.to?.year}`
              : null}
          </p>
          {/* {showCalendar && ( */}
          <div
            className={`flex flex-col items-center gap-1 ${
              showCalendar ? "block" : "hidden"
            }`}
          >
            <Calendar
              value={selectedDayRange}
              onChange={setSelectedDayRange}
              shouldHighlightWeekends
            />
            <Button onClick={() => setShowCalendar(false)}>Select</Button>
          </div>
          {/* )} */}
        </div>
        <div className="w-full md:w-1/3 bg-amber-700 h-1/3 p-5 rounded-lg">
          <p className="h-14">Select city</p>
          <Select variant="filled" placeholder="Filled" />
        </div>
      </div>
      {/* <SummaryData /> */}
    </>
  );
}

export default Filter