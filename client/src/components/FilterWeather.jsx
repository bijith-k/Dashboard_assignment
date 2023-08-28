import React, { useEffect, useState } from "react";
import SelectDates from "./SelectDates";
import axios from "axios";
import SelectValue from "./SelectValue";

const FilterWeather = () => {
  const [dayRange, setdayRange] = useState({
    from: null,
    to: null,
  });

  const [clicked, setClicked] = useState(0);

  const handleClick = (date) => {
    setClicked(date);
  };

  const handleDayRange = (...dates) => {
    console.log(dates);
    setdayRange(dates[0]);
  };

  const [serialNumbers, setSerialNumbers] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}getSerialNumbers`)
      .then((response) => {
        const serialnums = response.data.serialNumbers.map(
          (item) => item.SerialNo
        );
        setSerialNumbers(serialnums);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [serialNumber, setSerialNumber] = useState(0);
  const handleNumSelect = (num) => {
    setSerialNumber(num);
  };

  console.log(serialNumber);

  return (
    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-16 mt-10 mx-2 relative z-30">
      <div className="w-full md:w-1/3 bg-amber-300 min-h-1/3 p-5  rounded-lg ">
        <SelectDates
          onClick={handleClick}
          //  showCalendar={showCalendar}
          setDayRange={handleDayRange}
        />
      </div>
      <div className="w-full md:w-1/3 bg-amber-700 h-1/3 p-5 rounded-lg">
        <h1 className="text-center font-bold text-lg text-white">
          Select serial number
        </h1>
        <SelectValue items={serialNumbers} onSelect={handleNumSelect} />
      </div>
    </div>
  );
};

export default FilterWeather;
