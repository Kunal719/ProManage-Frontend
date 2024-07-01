import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import AssignedTask from "./AssignedTask";
import { format } from 'date-fns';
import "../pageStyles/TaskCard.css";

const TaskCard = ({ task, taskType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChecklistOpen, setIsChecklistOpen] = useState(false);
    const buttonRef = useRef(null);

    // console.log(task);

    const subTasks = task?.checklist;
    const completedSubTasksCount = subTasks?.filter((subTask) => subTask?.isDone).length;

    let taskTypes = ["To do", "Backlog", "In Progress", "Done"];
    taskTypes = taskTypes.filter((type) => type !== taskType);

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleClickOutside = (event) => {
        if (event.target !== buttonRef.current && !event.target.closest('.task-card')) {
            setIsOpen(false);
        }
    };
    const handleSwitchTaskType = async (newTaskType) => {
        try {
            await sendRequest(
                import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/changeTaskType/${task._id}`,
                'PATCH',
                JSON.stringify({
                    newTaskType: newTaskType
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            )

            // Emit the event with the new task type after successful update
            const switchTaskTypeEvent = new CustomEvent('switchTaskType');
            window.dispatchEvent(switchTaskTypeEvent);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const closeOptionsMenu = () => handleClickOutside(event);
        document.addEventListener('click', closeOptionsMenu);

        return () => document.removeEventListener('click', closeOptionsMenu);
    }, [isOpen]);

    let formattedDate;
    if (task?.dueDate) formattedDate = format(task.dueDate, 'dd MMM');


    return (
        <div className="task-card">
            <div className="priority-menu">
                <div className="task-priority">
                    <div className={`small-circle ${task?.priority === 'High' ? 'red-task-card' : task?.priority === 'Moderate' ? 'blue-task-card' : 'green-task-card'}`} />
                    <p>{task?.priority}</p>
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

            <p className="task-title">{task?.title}</p>

            <div className="checklist-toggle">
                <p className="checklist-toggle-heading">
                    Checklist ({completedSubTasksCount} / {subTasks?.length})
                </p>
                <button className="collapse-expand-btn" onClick={() => setIsChecklistOpen(!isChecklistOpen)}>
                    {isChecklistOpen ? (
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="expand-icon" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path>
                        </svg>
                    )
                        : (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" class="expand-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                        </svg>)
                    }
                </button>
            </div>

            <div className="checklist-tasks">
                {/* Conditionally render checklist tasks only if isChecklistOpen is true */}
                {isChecklistOpen &&
                    subTasks.map((subTask) => (
                        <AssignedTask key={subTask._id} subTaskTitle={subTask.title} subTaskDone={subTask.done} />
                    ))}
            </div>

            <div className="task-info">
                {task?.dueDate ? <span className='task-due-date'>{formattedDate}</span> : <span></span>}

                <div className="switch-boards">
                    {/* Filter the button which is of taskType and show rest of them */}

                    {taskTypes.map((taskType) => (
                        <button className="switch-board-btn" onClick={() => handleSwitchTaskType(taskType)}>
                            {taskType}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TaskCard