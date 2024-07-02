import { useState, useEffect, useContext } from "react";
import NewTask from "./NewTask";
import TaskCard from "./TaskCard";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';

import "../pageStyles/TaskBoard.css";

const TaskBoard = ({ taskType, addBtn, tasks, selectedOption }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [allTasks, setAllTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);

    let filteredTasks = allTasks.filter((task) => task.taskType === taskType);

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleAddButtonClick = () => {
        setIsDialogOpen(true); // Open dialog on button click
    };

    const handleNewTaskDialogClose = () => {
        setIsDialogOpen(false); // Close dialog on close button click or outside click (optional)
    };

    useEffect(() => {
        const getAllTaskDetails = async () => {
            try {
                const fetchedTasks = [];
                for (const taskId of tasks) {
                    const responseData = await sendRequest(
                        import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/${taskId}`,
                        'GET',
                        null,
                        {}
                    )

                    fetchedTasks.push(responseData.task);
                }
                setAllTasks(fetchedTasks);
            } catch (error) {
                console.log(error);
            }
        }
        getAllTaskDetails();

        // Listen for the switchTaskType event and re-fetch tasks
        const handleSwitchTaskType = async () => {
            getAllTaskDetails();
        };

        window.addEventListener('switchTaskType', handleSwitchTaskType);

        return () => {
            window.removeEventListener('switchTaskType', handleSwitchTaskType);
        };
    }, [tasks, sendRequest, auth.token, taskType]);

    useEffect(() => {
        if (filteredTasks) {
            const filterTasks = () => {
                const now = new Date();
                let filteredTasksByCalendar;

                if (selectedOption.value === 'Today') {
                    filteredTasksByCalendar = filteredTasks.filter(task => {
                        const taskDate = new Date(task.dueDate);
                        return taskDate.toDateString() === now.toDateString();
                    });
                } else if (selectedOption.value === 'This Week') {
                    filteredTasksByCalendar = filteredTasks.filter(task => {
                        const taskDate = new Date(task.dueDate);
                        const oneWeekFromNow = new Date();
                        oneWeekFromNow.setDate(now.getDate() + 7);
                        return taskDate >= now && taskDate <= oneWeekFromNow;
                    });
                } else if (selectedOption.value === 'This Month') {
                    filteredTasksByCalendar = filteredTasks.filter(task => {
                        const taskDate = new Date(task.dueDate);
                        const oneMonthFromNow = new Date();
                        oneMonthFromNow.setDate(now.getDate() + 30);
                        return taskDate >= now && taskDate <= oneMonthFromNow;
                    });
                }

                filteredTasks = filteredTasksByCalendar;
            };

            filterTasks();
        }
    }, [selectedOption]);

    return (
        <>
            <div className='task-board'>
                <div className="task-board-header">
                    <div className="task-name">
                        <h5>{taskType}</h5>
                    </div>
                    <div className="task-board-buttons">
                        {
                            addBtn &&
                            <img src="/images/addBtn.png" className='add-btn' alt="Add Task" onClick={handleAddButtonClick} />
                        }
                        <img src="/images/collapse-all.png" alt="Collapse" />
                    </div>
                </div>


                <div className="task-cards">
                    {filteredTasks.map((task) => (
                        <TaskCard key={task._id} task={task} taskType={taskType} setEditTask={setEditTask} setIsDialogOpen={setIsDialogOpen} /> // Pass the task object to TaskCard
                    ))}
                </div>

                {isDialogOpen && (
                    <div className="dialog-container">
                        <div className="dialog-content">
                            <NewTask setAllTasks={setAllTasks} handleNewTaskDialogClose={handleNewTaskDialogClose} editTask={editTask} />
                        </div>
                        <div className="dialog-overlay" onClick={handleNewTaskDialogClose} />
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskBoard