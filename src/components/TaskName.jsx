import { useState } from "react";
import "../pageStyles/TaskName.css";

const TaskName = ({ onTaskChange, index, onDelete }) => {
    const [taskText, setTaskText] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    const handleChange = (event) => {
        if (event.target.type === "text") {
            setTaskText(event.target.value);
        } else if (event.target.type === "checkbox") {
            setIsCompleted(event.target.checked);
        }
    };

    const handleTaskUpdate = () => {
        onTaskChange({ title: taskText, done: isCompleted }, index);
    };
    return (
        <div className="task-name-field">
            <input type="checkbox" onChange={handleChange} checked={isCompleted} onBlur={handleTaskUpdate} />
            <div className="task-input-field">
                <input type="text" placeholder="Add a task" value={taskText} onChange={handleChange} onBlur={handleTaskUpdate} />
            </div>
            <img src="/images/Delete.png" alt="Delete task" onClick={onDelete} />
        </div>
    );
};

export default TaskName;

