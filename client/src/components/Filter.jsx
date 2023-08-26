import { Button, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import SummaryData from './SummaryData';
import SelectCities from './SelectCities';
import axios from 'axios';



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
 
  const [clicked, setClicked] = useState(0)
  const [cities, setCities] = useState([]);
useEffect(() => {
  axios
    .post("https://countriesnow.space/api/v0.1/countries/cities", {
      country: "india",
    })
    .then((response) => {
      const citiesData = response.data.data;
      setCities(citiesData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);

const [selectedCity, setSelectedCity] = useState("");

const handleCitySelect = (city) => {
  setSelectedCity(city);
};
  
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-16 mt-10 relative z-30">
        <div className="w-full md:w-1/3 bg-amber-300 min-h-1/3  rounded-lg ">
          <p
            className="text-center font-bold my-1 text-lg w-full py-3 cursor-pointer"
            onClick={handleSelectClick}
          >
            Select a date range
          </p>
          <div className="relative">
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

            <div
              className={`absolute top-0 left-0 bg-amber-300 px-16 py-4 z-50 mt-16 rounded-lg flex flex-col items-center gap-1 ${
                showCalendar ? "block" : "hidden"
              }`}
            >
              <Calendar
                value={selectedDayRange}
                onChange={setSelectedDayRange}
                shouldHighlightWeekends
              />
              <Button
                onClick={() => {
                  setShowCalendar(false);
                  setClicked(Date.now());
                }}
              >
                Select
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-amber-700 h-1/3 p-5 rounded-lg">
          <h1 className="text-center font-bold text-lg text-white">Select a city</h1>
          <SelectCities cities={cities} onCitySelect={handleCitySelect} />
        </div>
      </div>
      <SummaryData
        dayRange={selectedDayRange}
        clicked={clicked}
        selectedCity={selectedCity}
      />
    </>
  );
}

export default Filter