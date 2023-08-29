import  { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SelectValue = ({ items, onSelect }) => {
  const location = useLocation();
  const isDashboard = location.pathname === "/";
  const [selected, setSelected] = useState("");
  const [suggestedValues, setSuggestedValues] = useState([]);

  const handleValueChange = (event) => {
    const inputValue = event.target.value;
    
    setSelected(inputValue);

    // Find suggested cities based on input
    const newSuggestedValues = items.filter((value) =>{
    if (typeof value == "string") {
      return value.toLowerCase().includes(inputValue.toLowerCase());
    }

    if (typeof value == "number") {
      return String(value).includes(inputValue);
    }
      
    });
    setSuggestedValues(newSuggestedValues);
  };
   
   const handleSelect = (value) => {
     if (value === selected) {
       setSelected("");
       onSelect(""); // Send the special value to the parent component
     } else {
       setSelected(value); // Update selected city when a suggestion is clicked
       onSelect(value); // Pass the selected city to the parent component
     }

     setSuggestedValues([]); // Clear suggestions
   };


  return (
    <div className="relative">
      <input
        type="text"
        placeholder={isDashboard ? "Enter city name" : "Enter serial number"}
        value={selected}
        onChange={handleValueChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <ul className="absolute w-full max-h-40 overflow-y-auto bg-white border border-t-0 rounded-b-md mt-1 shadow-md z-10">
        {suggestedValues.map((value, index) => (
          <li
            key={index}
            onClick={() => handleSelect(value)}  
            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
          >
            {value}
          </li>
        ))}
        {selected && (
          <li
            onClick={() => handleSelect(selected)}  
            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
          >
            Clear Selected
          </li>
        )}
      </ul>
    </div>
  );
};

export default SelectValue;
