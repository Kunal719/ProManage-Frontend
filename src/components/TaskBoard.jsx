import { useState } from "react";
import "../pageStyles/TaskBoard.css";
import NewTask from "./NewTask";
import TaskCard from "./TaskCard";

const TaskBoard = ({ task, addBtn }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

    const handleAddButtonClick = () => {
        setIsDialogOpen(true); // Open dialog on button click
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false); // Close dialog on close button click or outside click (optional)
    };
    return (
        <>
            <div className='task-board'>
                <div className="task-board-header">
                    <div className="task-name">
                        <h5>{task}</h5>
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
                    <TaskCard />
                    {/* <TaskCard /> */}
                </div>

                {isDialogOpen && (
                    <div className="dialog-container">
                        <div className="dialog-content">
                            <NewTask />
                        </div>
                        <div className="dialog-overlay" onClick={handleDialogClose} />
                    </div>
                )}
            </div>
        </>
    )
}

export default TaskBoard