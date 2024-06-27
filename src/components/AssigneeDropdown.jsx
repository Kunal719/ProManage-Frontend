import { useState, useEffect, useCallback } from 'react';
import "../pageStyles/AssigneeDropdown.css"
// use options as props later on
const AssigneeDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleClickOutside = useCallback((event) => {
        if (!event.target.closest('.assignee-dropdown')) {
            setIsOpen(false);
        }
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const options = ['akash@gmail.com', "kunal@gmail.com", "abc@gmail.com", "def@gmail.com"];
    const needScroll = options.length > 3;

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]); // Dependency array ensures the effect runs only once


    return (
        <div className="assignee-dropdown" onClick={handleClickOutside}>
            <div className="assignee-name">
                <button className={`assignee-button ${selectedOption ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption ? selectedOption : 'Add an assignee'}
                </button>
            </div>
            {isOpen && (
                <ul className={needScroll ? 'dropdown-list needScroll' : 'dropdown-list'}>
                    {options.map((option) => (
                        <li key={option} className="dropdown-item" onClick={() => handleOptionClick(option)}>
                            <span className="circle">{option?.substring(0, 2).toUpperCase()}</span>
                            <span className="option-text">{option}</span>
                            <button className="assign-button">Assign</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AssigneeDropdown;
