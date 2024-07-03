import React from 'react';
import "../pageStyles/CalendarDropDown.css";

const CalendarDropDown = ({ selectedOption, setSelectedOption }) => {

    return (
        <div className='calendar'>
            <select className='calendar-dropdown' defaultValue="This Week" onChange={(event) => { setSelectedOption(event.target.value); console.log(event) }}>
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
            </select>
        </div>
    );
}

export default CalendarDropDown;