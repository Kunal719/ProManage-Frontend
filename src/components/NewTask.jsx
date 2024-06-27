import { useState } from "react";
import AssigneeDropdown from "./AssigneeDropdown";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TaskName from "./TaskName";

import "../pageStyles/NewTask.css";

const NewTask = () => {
    const [tasks, setTasks] = useState([]); // Array to store tasks
    const needScroll = tasks.length > 2;
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority === selectedPriority ? null : priority);
    };

    const handleAddTask = () => {
        // Add a new empty task object to the tasks array
        setTasks([...tasks, { completed: false, text: "" }]);
    };

    const handleTaskDelete = (index) => {
        // Remove a task from the tasks array by index
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };
    return (
        <div className="dialog-box">

            {/* New Task Name  */}
            <div className="new-task-entry">
                <div className="new-task-field">
                    <p>Title</p>
                    <span className='mandatory-field'>*</span>
                </div>

                {/* Input field */}
                <div className="input-field">
                    <input type="text" placeholder="Enter Task Title" />
                </div>
            </div>

            {/* New Task Priority */}
            <div className="new-task-priority">
                <div className="new-task-field">
                    <p>Select Priority</p>
                    <span className='mandatory-field'>*</span>

                    <div className={`priority-option ${selectedPriority === 'high' ? 'selected' : ''}`}
                        onClick={() => handlePriorityClick('high')}
                    >
                        <div className="small-circle-red"></div>
                        <p>HIGH PRIORITY</p>
                    </div>
                    <div className={`priority-option ${selectedPriority === 'moderate' ? 'selected' : ''}`}
                        onClick={() => handlePriorityClick('moderate')}
                    >
                        <div className="small-circle-blue"></div>
                        <p>MODERATE PRIORITY</p>
                    </div>
                    <div className={`priority-option ${selectedPriority === 'low' ? 'selected' : ''}`}
                        onClick={() => handlePriorityClick('low')}
                    >
                        <div className="small-circle-green"></div>
                        <p>LOW PRIORITY</p>
                    </div>
                </div>
            </div>

            {/* Assign to  */}
            <div className="assign-task">
                <div className="new-task-field">
                    <p>Assign to</p>
                    <span className='mandatory-field'>*</span>
                </div>

                <div className="drop-down-menu">
                    <AssigneeDropdown />
                </div>
            </div>

            {/* New Tasks Checklist  */}
            <div className="checklist">
                <div className="new-task-field">
                    <p>Checklist (0/0)</p>
                    <span className='mandatory-field'>*</span>
                </div>

                <div className={needScroll ? 'tasks needScroll' : 'tasks'}>
                    {tasks.map((task, index) => (
                        <TaskName
                            key={index} // Provide unique key for each component
                            onDelete={() => handleTaskDelete(index)} // Pass index for deletion
                        />
                    ))}
                </div>

                <div className="add-task-btn" onClick={handleAddTask}>
                    <img src="/images/addBtn.png" alt="Add Task" width={15} height={15} />
                    <p>Add</p>
                </div>
            </div>

            {/* Footer buttons  */}
            <div className="footer-btns">
                <div className="due-date">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd-MMM-yyyy"
                        placeholderText="Select Due Date"
                    />
                </div>

                <div className="action-btns">
                    <div className="cancel-btn">Cancel</div>
                    <div className="save-btn">Save</div>
                </div>
            </div>
        </div>
    )
}

export default NewTask