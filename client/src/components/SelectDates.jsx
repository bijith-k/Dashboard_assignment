import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectDates = ({ onClick,setDayRange }) => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });
const [dateRange, setDateRange] = useState([null, null]);
const [startDate, endDate] = dateRange;
  // setDayRange(selectedDayRange)

  console.log(dateRange)

const [showCalendar, setShowCalendar] = useState(false);
const handleSelectClick = () => {
  setShowCalendar(true);
};
   

const handleSubmit=(e)=>{
  e.preventDefault()
setShowCalendar(false);
onClick(Date.now());
setDayRange(dateRange);
}
 

  return (
    <>
      <p
        className="text-center font-bold text-lg cursor-pointer"
        onClick={handleSelectClick}
      >
        Select a date range
      </p>
      <div className="w-full  bg-amber-300 flex flex-row gap-3 justify-center">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          placeholderText="Click"
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}
          form="external-form"
          className="w-60 font-semibold p-2 placeholder:text-center  outline-none focus:ring-0 rounded-lg border border-gray-300 focus:border-blue-500"
        />
        <form id="external-form" onSubmit={handleSubmit}>
          <input
            type="submit"
            className="font-bold bg-amber-700 h-full rounded-lg px-2 text-white"
          />
        </form>
      </div>

      {/* <div className="relative">
        <p
          className={`text-center font-semibold w-5/6 mx-auto border border-black py-2 rounded-lg ${
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
          className={`absolute top-0 md:-left-5 -left-2 bg-amber-300 z-50 mt-16 md:px-14 py-2 px-1  rounded-lg flex flex-col items-center gap-1 ${
            showCalendar ? "block" : "hidden"
          }`}
        > */}
      {/* <Calendar
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            shouldHighlightWeekends
          /> */}

      {/* <Button
            onClick={() => {
              setShowCalendar(false);
              onClick(Date.now());
              setDayRange(selectedDayRange);
            }}
          >
            Select
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default SelectDates;
