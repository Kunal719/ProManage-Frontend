import { useState, useEffect, useContext } from "react";
import AssigneeDropdown from "./AssigneeDropdown";
import DatePicker from "react-datepicker";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from "./LoadingSpinner";

import "react-datepicker/dist/react-datepicker.css";
import TaskName from "./TaskName";
import "../pageStyles/NewTask.css";

const NewTask = ({ setAllTasks, handleNewTaskDialogClose, editTask }) => {
    const [tasks, setTasks] = useState([]); // Array to store tasks
    const needScroll = tasks.length > 2;
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAssignee, setSelectedAssignee] = useState("");
    const [taskTitle, setTaskTitle] = useState("");

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority === selectedPriority ? null : priority);
    };

    const handleAddTask = () => {
        // Add a new empty task object to the tasks array
        setTasks([...tasks, { done: false, title: "" }]);
    };

    const handleTaskChange = (updatedTask, index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);
    };

    const handleTaskDelete = (index) => {
        // Remove a task from the tasks array by index
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const handleSaveNewTask = async () => {
        const url = editTask ?
            import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/updateTask/${editTask._id}/` :
            import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/${auth.userId}/createTask`;

        const method = editTask ? 'PATCH' : 'POST';
        let responseData;
        try {
            responseData = await sendRequest(
                url,
                method,
                JSON.stringify({
                    title: taskTitle,
                    priority: selectedPriority,
                    dueDate: selectedDate,
                    assignNow: selectedAssignee,
                    checklist: tasks
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`,
                }
            );

            if (!editTask) {
                setAllTasks((allTasks) => [...allTasks, responseData.task]);
            }
            else {
                setAllTasks((allTasks) =>
                    allTasks.map((task) => (task._id === editTask._id ? responseData.task : task))
                );
            }

            if (responseData.task) {
                handleNewTaskDialogClose();
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (editTask) {
            setTasks(editTask.checklist);
            setSelectedPriority(editTask.priority || null);
            setSelectedDate(editTask.dueDate ? new Date(editTask.dueDate) : null);
            setSelectedAssignee(editTask.assignNow || "");
            setTaskTitle(editTask.title || "");
        }
    }, [editTask]);

    console.log(tasks);
    return (
        <div className="dialog-box">
            {isLoading && <LoadingSpinner asOverlay />}
            {/* New Task Name  */}
            <div className="new-task-entry" onClick={clearError}>
                {error && <p style={{ color: 'red', fontWeight: 'bold', fontSize: '10px' }}>{error}</p>}
                <div className="new-task-field">
                    <p>Title</p>
                    <span className='mandatory-field'>*</span>
                </div>

                {/* Input field */}
                <div className="input-field">
                    <input type="text" placeholder="Enter Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                </div>
            </div>

            {/* New Task Priority */}
            <div className="new-task-priority">
                <div className="new-task-field">
                    <p>Select Priority</p>
                    <span className='mandatory-field'>*</span>

                    <div className={`priority-option ${selectedPriority === 'High' ? 'selected' : ''}`}
                        onClick={() => handlePriorityClick('High')}
                    >
                        <div className="small-circle-red"></div>
                        <p>HIGH PRIORITY</p>
                    </div>
                    <div className={`priority-option ${selectedPriority === 'Moderate' ? 'selected' : ''}`}
                        onClick={() => handlePriorityClick('Moderate')}
                    >
                        <div className="small-circle-blue"></div>
                        <p>MODERATE PRIORITY</p>
                    </div>
                    <div className={`priority-option ${selectedPriority === 'Low' ? 'selected' : ''}`}
                        onClick={() => handlePriorityClick('Low')}
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
                    <AssigneeDropdown selectedAssignee={selectedAssignee} onSelectOption={(option) => setSelectedAssignee(option)} />
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
                            onTaskChange={handleTaskChange}
                            index={index}
                            task={task}
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
                    <div className="save-btn" onClick={handleSaveNewTask}>Save</div>
                </div>
            </div>
        </div>
    )
}

export default NewTask