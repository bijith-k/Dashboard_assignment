import { useEffect, useState } from "react";
import SummaryData from "./SummaryData";
import axios from "axios";
import SelectDates from "./SelectDates";
import SelectValue from "./SelectValue";

const Filter = () => {
  const [dayRange, setdayRange] = useState([null, null]);

  const [clicked, setClicked] = useState(0);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}getCities`)
      .then((response) => {
        const citiesData = response.data.cities;
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

  const handleClick = (date) => {
    setClicked(date);
  };

  const handleDayRange = (...dates) => {
    setdayRange(dates[0]);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-16 mt-10 mx-2 relative z-30">
        <div className="w-full md:w-1/3 bg-amber-300 h-1/3 p-5  rounded-lg ">
          <SelectDates onClick={handleClick} setDayRange={handleDayRange} />
        </div>
        <div className="w-full md:w-1/3 bg-amber-700 h-1/3 p-5 rounded-lg">
          <h1 className="text-center font-bold text-lg text-white">
            Select a city
          </h1>
          <SelectValue items={cities} onSelect={handleCitySelect} />
        </div>
      </div>
      <SummaryData
        dayRange={dayRange}
        clicked={clicked}
        selectedCity={selectedCity}
      />
    </>
  );
};

export default Filter;
