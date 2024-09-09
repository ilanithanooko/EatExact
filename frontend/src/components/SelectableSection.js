import React, { useState, useEffect } from 'react';
import Selectible from './Selectible';

const SelectableSection = ({ label, options, onSelect, allowMultiple = false, appendInput = false, gridColumns = '' }) => {
  const [selectedOptions, setSelectedOptions] = useState(allowMultiple ? [] : null);
  const [inputValue, setInputValue] = useState('');

const handleSelect = (option) => {
  if (allowMultiple) {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(updatedOptions);
    onSelect(option, updatedOptions);
  } else {
    setSelectedOptions(option);
    setInputValue(''); // Clear the input value when an option is selected
    onSelect(option, [option]); // Wrap the single option in an array for consistency
  }
};


  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear previous input value from selectedOptions before appending the new value
    if (appendInput && value) {
      const updatedOptions = selectedOptions.filter(opt => !opt.startsWith(inputValue));
      updatedOptions.push(value);
      setSelectedOptions(updatedOptions);
      onSelect(updatedOptions);
    } else if (!allowMultiple) {
      setSelectedOptions(null); // Clear the selected option when input is used
      onSelect(value, []); // Reset the selection in the parent component
    }
  };

  useEffect(() => {
    if (!allowMultiple && inputValue) {
      // If not allowing multiple selections and input is used, clear the previous selection
      setSelectedOptions(null);
    }
  }, [inputValue]);

  return (
    <div className="lg:col-span-1">
      <div className="text-center text-lg pb-2 text-green-950">
        <span className="font-semibold">{label}</span>
      </div>
      <div className={gridColumns}>
        {options.map((option, index) => (
          <div key={index} className="text-center cursor-pointer">
            <Selectible
              label={option}
              onClick={() => handleSelect(option)}
              isSelected={allowMultiple ? selectedOptions.includes(option) : selectedOptions === option}
            />
          </div>
        ))}
      </div>
      {label === "Let's pick a category!" && 
      <div className="text-center my-3">
        <input
          type="text"
          placeholder="It's not listed, let me just type it..."
          className="w-full rounded-md py-3 pl-4 focus:ring-2 focus:ring-inset focus:ring-green-600 placeholder:text-md shadow-md placeholder:text-gray-500"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>}
    </div>
  );
};

export default SelectableSection;
