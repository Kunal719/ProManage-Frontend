import React from 'react';
import Select from 'react-select';
import "../pageStyles/CalendarDropDown.css";

const options = [
    { value: 'Today', label: 'Today' },
    { value: 'This Week', label: 'This Week' },
    { value: 'This Month', label: 'This Month' },
];

const customStyles = {
    container: (provided) => ({
        ...provided,
        backgroundColor: 'white', // Set white background for the dropdown container

    }),
    control: (base) => ({
        ...base,
        border: 'none', // Remove border from the selected option area
        focus: 'none', // Remove focus outline
    }),
};

const CalendarDropDown = ({ selectedOption, setSelectedOption }) => {

    const handleChange = (selected) => {
        setSelectedOption(selected);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            styles={customStyles}
        />
    );
}

export default CalendarDropDown;