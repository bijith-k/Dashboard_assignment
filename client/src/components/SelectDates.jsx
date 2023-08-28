import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const SelectDates = ({ onClick,setDayRange }) => {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null,
  });

  // setDayRange(selectedDayRange)

const [showCalendar, setShowCalendar] = useState(false);
const handleSelectClick = () => {
  setShowCalendar(true);
};
   

 

  return (
    <>
      <p
        className="text-center font-bold text-lg cursor-pointer"
        onClick={handleSelectClick}
      >
        Select a date range
      </p>
      <div className="relative">
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
        >
          <Calendar
            value={selectedDayRange}
            onChange={setSelectedDayRange}
            shouldHighlightWeekends
          />
          <Button
            onClick={() => {
              setShowCalendar(false);
              onClick(Date.now());
              setDayRange(selectedDayRange);
            }}
          >
            Select
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectDates;
