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
    const [isStateCollapsed, setIsStateCollapsed] = useState(false);
    // let filteredTasks = allTasks.filter((task) => task.taskType === taskType);

    const getFilteredTasks = () => {
        let updatedTasks = allTasks.filter((task) => task.taskType === taskType);

        // console.log(selectedOption);

        if (selectedOption) {
            updatedTasks = updatedTasks.filter((task) => {
                const now = new Date();
                const startOfToday = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate()
                ).getTime();
                const endOfToday = startOfToday + (24 * 60 * 60 * 1000 - 1);
                const endOfOneWeek = startOfToday - (7 * 24 * 60 * 60 * 1000 - 1);
                const endOfOneMonth = startOfToday - (30 * 24 * 60 * 60 * 1000 - 1);

                // if (!task.dueDate) {
                //     return true;
                // }

                const taskCreatedDate = new Date(task.createdAt).getTime();

                if (selectedOption === "Today") {
                    if (taskCreatedDate >= startOfToday && taskCreatedDate <= endOfToday) {
                        return true;
                    }

                    return false;
                }

                if (selectedOption === "This Week") {
                    if (taskCreatedDate <= endOfToday && taskCreatedDate >= endOfOneWeek) {
                        return true;
                    }

                    return false;
                }

                if (selectedOption === "This Month") {
                    if (taskCreatedDate <= endOfToday && taskCreatedDate >= endOfOneMonth) {
                        return true;
                    }

                    return false;
                }
            });
        }

        return updatedTasks;
    };

    let filteredTasks = getFilteredTasks();

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
                        <img src="/images/collapse-all.png" alt="Collapse" onClick={() => setIsStateCollapsed(true)} />
                    </div>
                </div>


                <div className="task-cards">
                    {filteredTasks.map((task) => (
                        <TaskCard key={task._id} task={task} taskType={taskType} setEditTask={setEditTask} setIsDialogOpen={setIsDialogOpen} setAllTasks={setAllTasks} isStateCollapsed={isStateCollapsed} setIsStateCollapsed={setIsStateCollapsed} /> // Pass the task object to TaskCard
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