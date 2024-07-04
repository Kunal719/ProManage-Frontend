import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import AssignedTask from "./AssignedTask";
import GeneralDialogBox from "./GeneralDialogBox";
import { format } from 'date-fns';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import "../pageStyles/TaskCard.css";

const TaskCard = ({ task, taskType, setEditTask, setIsDialogOpen, setAllTasks, isStateCollapsed, setIsStateCollapsed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isChecklistOpen, setIsChecklistOpen] = useState(false);
    const [subTasks, setSubTasks] = useState();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [assigneeEmails, setAssigneeEmails] = useState([]);
    const [showEmail, setShowEmail] = useState(null);
    const buttonRef = useRef(null);


    const shareLink = `http://localhost:5173/share/${task._id}`;
    const handleShareClick = () => {
        toast.success("Link Copied!"); // Display toast notification
    };

    const completedSubTasksCount = subTasks?.filter((subTask) => subTask?.done).length;

    let taskTypes = ["To do", "Backlog", "In Progress", "Done"];
    taskTypes = taskTypes.filter((type) => type !== taskType);

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleOpenDialog = () => {
        setIsDeleteDialogOpen(true); // Open dialog on button click
    };

    const handleDialogClose = () => {
        setIsDeleteDialogOpen(false); // Close dialog on close button click
    };

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

    const handleEditButtonClick = () => {
        setEditTask(task); // Set the task to be edited
        setIsDialogOpen(true); // Open the dialog
    };

    const handleDelete = async () => {
        try {
            await sendRequest(
                import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/deleteTask/${task._id}`,
                'DELETE',
                null,
                {
                    'Authorization': `Bearer ${auth.token}`
                }
            )

            // Filter out deleted task
            setAllTasks((allTasks) => allTasks.filter((deletedTask) => (deletedTask._id !== task._id)))
        } catch (error) {

        }
    }

    useEffect(() => {
        const getAssigneeEmails = async () => {

            try {
                const assigneeEmails = await sendRequest(
                    import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/getAssigneeEmailsByTask/${task._id}`,
                    'GET',
                    null,
                    {
                        'Authorization': `Bearer ${auth.token}`
                    }
                );
                setAssigneeEmails(assigneeEmails.assigneeEmails);
            } catch (error) {
                console.log(error);
            }
        };

        getAssigneeEmails();
        console.log(assigneeEmails)
    }, []);

    useEffect(() => {
        const closeOptionsMenu = () => handleClickOutside(event);
        document.addEventListener('click', closeOptionsMenu);

        return () => document.removeEventListener('click', closeOptionsMenu);
    }, [isOpen]);

    useEffect(() => {
        setSubTasks(task?.checklist);
    }, [task]);

    useEffect(() => {
        if (isStateCollapsed && isChecklistOpen) {
            setIsChecklistOpen(false);
            setIsStateCollapsed(false)
        }
    }, [isStateCollapsed, isChecklistOpen]);

    let formattedDate;
    if (task?.dueDate) formattedDate = format(task.dueDate, 'dd MMM');
    const isOverdue = taskType !== 'Done' && task?.dueDate && new Date(task?.dueDate) < new Date();

    return (
        <div className="task-card">
            <div className="priority-menu">
                <div className="task-priority">
                    <div className={`small-circle ${task?.priority === 'High' ? 'red-task-card' : task?.priority === 'Moderate' ? 'blue-task-card' : 'green-task-card'}`} />
                    <p>{task?.priority}</p>


                    {/* Show Assignee Email id with first 2 letters of email in capital inside a circle */}
                    {assigneeEmails && assigneeEmails.length > 0 && (
                        <div className="task-assignee">
                            {assigneeEmails.map((assigneeEmail, index) => (
                                <div key={index} className="task-assignee-email" onMouseEnter={() => setShowEmail(assigneeEmail)}
                                    onMouseLeave={() => setShowEmail(null)}>
                                    <p>{assigneeEmail.substring(0, 2).toUpperCase()}</p>
                                    {showEmail === assigneeEmail && (
                                        <div className="email-overlay">{assigneeEmail}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="option-button" onClick={() => { setIsOpen(!isOpen) }} ref={buttonRef}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="256" cy="256" r="48"></circle><circle cx="416" cy="256" r="48"></circle><circle cx="96" cy="256" r="48"></circle></svg>
                    {isOpen && (
                        <div className="options-menu">
                            <p onClick={handleEditButtonClick}>Edit</p>
                            <CopyToClipboard text={shareLink} onCopy={handleShareClick}>
                                <p>Share</p>
                            </CopyToClipboard>
                            <p onClick={handleOpenDialog} style={{ color: 'red' }}>Delete</p>

                        </div>
                    )}
                </div>
                {isDeleteDialogOpen && (
                    <div className="dialog-container">
                        <div className="dialog-content">
                            <GeneralDialogBox type="delete" handleDialogClose={handleDialogClose} handleDelete={handleDelete} />
                        </div>
                        <div className="dialog-overlay" onClick={handleDialogClose} />
                    </div>
                )}
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
                        <AssignedTask
                            key={subTask._id}
                            subTaskTitle={subTask?.title}
                            subTaskDone={subTask?.done}
                            setSubTasks={setSubTasks}
                            subTaskId={subTask?._id}
                            task={task}
                        />
                    ))}
            </div>

            <div className="task-info">
                {task?.dueDate ? <span className={`task-due-date ${isOverdue ? 'overdue' : (taskType === 'Done' && 'done')}`}>{formattedDate}</span> : <span></span>}

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