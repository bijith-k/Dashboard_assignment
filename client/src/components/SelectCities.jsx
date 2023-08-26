import React, { useState } from 'react';

const SelectCities = ({ cities, onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [suggestedCities, setSuggestedCities] = useState([]);

  const handleCityChange = (event) => {
    const inputValue = event.target.value;
    setSelectedCity(inputValue);

    // Find suggested cities based on input
    const newSuggestedCities = cities.filter((city) =>
      city.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestedCities(newSuggestedCities);
  };

   const handleCitySelect = (city) => {
    if (city === selectedCity) {
      // Clear the selected city and send a special value
      setSelectedCity('');
      onCitySelect(''); // Send the special value to the parent component
    } else {
      setSelectedCity(city); // Update selected city when a suggestion is clicked
      onCitySelect(city); // Pass the selected city to the parent component
    }
    
    setSuggestedCities([]); // Clear suggestions
  };


  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter city name"
        value={selectedCity}
        onChange={handleCityChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <ul className="absolute w-full max-h-40 overflow-y-auto bg-white border border-t-0 rounded-b-md mt-1 shadow-md z-10">
        {suggestedCities.map((city, index) => (
          <li
            key={index}
            onClick={() => handleCitySelect(city)} // Call handleCitySelect when suggestion is clicked
            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
          >
            {city}
          </li>
        ))}
        {selectedCity && (
          <li
            onClick={() => handleCitySelect(selectedCity)} // Call handleCitySelect to clear selected city
            className="px-3 py-2 cursor-pointer hover:bg-gray-200"
          >
            Clear Selected City
          </li>
        )}
      </ul>
    </div>
  );
};

export default SelectCities;
