import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';
import "../pageStyles/AssigneeDropdown.css"
const AssigneeDropdown = ({ onSelectOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);


    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleClickOutside = useCallback((event) => {
        if (!event.target.closest('.assignee-dropdown')) {
            setIsOpen(false);
        }
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelectOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const responseData = await sendRequest(
                    import.meta.env.VITE_REACT_APP_BACKEND_URL + `/users/${auth.userId}/getEmailsForGroup`,
                    'GET',
                    null,
                    {
                        Authorization: `Bearer ${auth.token}`,
                    }
                );
                setOptions(responseData.emails);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOptions();
    }, [auth.token, auth.userId])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [handleClickOutside]); // Dependency array ensures the effect runs only once

    const needScroll = options.length > 3;

    // console.log(options);

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
                        <li key={option._id} className="dropdown-item" onClick={() => handleOptionClick(option.email)}>
                            <span className="circle">{option?.email.substring(0, 2).toUpperCase()}</span>
                            <span className="option-text">{option?.email}</span>
                            <button className="assign-button">Assign</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AssigneeDropdown;
