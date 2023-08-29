import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectDates = ({ onClick, setDayRange }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick(Date.now());
    setDayRange(dateRange);
  };

  return (
    <>
      <p className="text-center font-bold text-lg cursor-pointer">
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
            className="font-bold bg-amber-700 h-full rounded-lg px-2 text-white cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};

export default SelectDates;
