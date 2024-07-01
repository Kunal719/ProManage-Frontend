import { useState, useEffect, useContext } from "react";
import NewTask from "./NewTask";
import TaskCard from "./TaskCard";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';

import "../pageStyles/TaskBoard.css";

const TaskBoard = ({ taskType, addBtn, tasks }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [allTasks, setAllTasks] = useState([]);

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
                const filteredTasks = fetchedTasks.filter((task) => task.taskType === taskType);
                setAllTasks(filteredTasks);
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

    // console.log(allTasks);

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
                    {/* <TaskCard />
                    <TaskCard /> */}

                    {allTasks.map((task) => (
                        <TaskCard key={task._id} task={task} taskType={taskType} /> // Pass the task object to TaskCard
                    ))}
                </div>

                {isDialogOpen && (
                    <div className="dialog-container">
                        <div className="dialog-content">
                            <NewTask handleNewTaskDialogClose={handleNewTaskDialogClose} />
                        </div>
                        <div className="dialog-overlay" onClick={handleNewTaskDialogClose} />
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskBoard