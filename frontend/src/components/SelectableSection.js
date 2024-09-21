import React, { useState, useEffect } from 'react';
import Selectible from './Selectible';

// SelectableSection component allows users to select one or more options, with optional input support
const SelectableSection = ({
  label, 
  options, 
  onSelect, // Callback function when an option is selected
  allowMultiple = false, // Boolean to allow selecting multiple options
  appendInput = false, // Boolean to allow appending typed input to selected options
  gridColumns = '', // Custom grid column class for layout
}) => {
  const [selectedOptions, setSelectedOptions] = useState(allowMultiple ? [] : null);
  const [inputValue, setInputValue] = useState('');

  // Handle option selection
  const handleSelect = (option) => {
    if (allowMultiple) {
      // If multiple selection is allowed, toggle the option in the selectedOptions array
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option) // Remove option if already selected
        : [...selectedOptions, option]; // Add option if not selected yet
      
      setSelectedOptions(updatedOptions);
      onSelect(option, updatedOptions); // Notify parent component with the updated options
    } else {
      // For single selection, set the selected option and clear any input
      setSelectedOptions(option);
      setInputValue(''); // Clear the input value when an option is selected
      onSelect(option, [option]); // Wrap the single option in an array for consistency
    }
  };

  // Handle changes in the input field for custom options
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // If appending input, ensure it doesn't conflict with existing selected options
    if (appendInput && value) {
      const updatedOptions = selectedOptions.filter(opt => !opt.startsWith(inputValue)); // Filter out previous input
      updatedOptions.push(value); // Add the new input value
      setSelectedOptions(updatedOptions);
      onSelect(updatedOptions); // Notify parent component with updated options
    } else if (!allowMultiple) {
      // Clear the selected option when input is used in single-selection mode
      setSelectedOptions(null);
      onSelect(value, []); // Reset the selection in the parent component
    }
  };

  // Effect to clear selection if input is used in single-selection mode
  useEffect(() => {
    if (!allowMultiple && inputValue) {
      setSelectedOptions(null); // Clear selected option if user types in custom input
    }
  }, [inputValue]);

  return (
    <div className="lg:col-span-1">
      {/* Section label */}
      <div className="text-center text-lg pb-2 text-green-950">
        <span className="font-semibold">{label}</span>
      </div>

      {/* Displaying options in a grid layout, if specified */}
      <div className={gridColumns}>
        {options.map((option, index) => (
          <div key={index} className="text-center cursor-pointer">
            <Selectible
              label={option} // Label for each selectable option
              onClick={() => handleSelect(option)} // Handle option click
              isSelected={allowMultiple ? selectedOptions.includes(option) : selectedOptions === option} // Determine if the option is selected
            />
          </div>
        ))}
      </div>

      {/* Optional input field for custom categories */}
      {label === "Let's pick a category!" && (
        <div className="text-center my-3">
          <input
            type="text"
            placeholder="It's not listed, let me just type it..." // Placeholder for custom input
            className="w-full rounded-md py-3 pl-4 focus:ring-2 focus:ring-inset focus:ring-green-600 placeholder:text-md shadow-md placeholder:text-gray-500"
            value={inputValue} // Bind input field to state
            onChange={handleInputChange} // Handle input change
          />
        </div>
      )}
    </div>
  );
};

export default SelectableSection;