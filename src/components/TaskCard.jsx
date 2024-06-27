import { useState, useEffect, useRef } from "react";
import AssignedTask from "./AssignedTask";
import "../pageStyles/TaskCard.css";

const TaskCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const handleClickOutside = (event) => {
        if (event.target !== buttonRef.current && !event.target.closest('.task-card')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const closeOptionsMenu = () => handleClickOutside(event);
        document.addEventListener('click', closeOptionsMenu);

        return () => document.removeEventListener('click', closeOptionsMenu);
    }, [isOpen]);
    return (
        <div className="task-card">
            <div className="priority-menu">
                <div className="task-priority">
                    <div className="small-circle-red-task-card" />
                    <p>High Priority</p>
                </div>

                <div className="option-button" onClick={() => { setIsOpen(!isOpen) }} ref={buttonRef}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="48"></circle><circle cx="416" cy="256" r="48"></circle><circle cx="96" cy="256" r="48"></circle></svg>
                    {isOpen && (
                        <div className="options-menu">
                            <p>Edit</p>
                            <p>Share</p>
                            <p style={{ color: 'red' }}>Delete</p>
                        </div>
                    )}
                </div>
            </div>

            <p className="task-title">Task Name</p>

            <div className="checklist-toggle">
                <p className="checklist-toggle-heading">
                    Checklist (0 / 0)
                </p>
                <button className="collapse-expand-btn">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="expand-icon" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path></svg>
                    {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="expand-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg> */}
                </button>
            </div>

            <div className="checklist-tasks">
                <AssignedTask />
                <AssignedTask />
                <AssignedTask />
            </div>

            <div className="task-info">
                <span className='task-due-date'>Jun 28</span>

                <div className="switch-boards">
                    <button className="switch-board-btn">TO DO</button>
                    <button className="switch-board-btn">IN PROGRESS</button>
                    <button className="switch-board-btn">DONE</button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard