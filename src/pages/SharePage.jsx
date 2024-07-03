import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import AssignedTask from "../components/AssignedTask";
import { format } from 'date-fns';

import "../pageStyles/SharePage.css"

const SharePage = () => {
    const [task, setTask] = useState();
    const [subTasks, setSubTasks] = useState();
    const { taskID } = useParams();

    const needScroll = subTasks?.length > 4;

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const completedSubTasksCount = subTasks?.filter((subTask) => subTask?.done).length;

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const responseData = await sendRequest(
                    import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/${taskID}`,
                    "GET",
                    null,
                    {}
                );
                setTask(responseData.task);
                setSubTasks(responseData.task.checklist);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTask();
    }, [taskID, sendRequest]);

    let formattedDate;
    if (task?.dueDate) formattedDate = format(task.dueDate, 'dd MMM');
    return (
        <div className="center-card">
            <div className="share-task-card">
                <div className="priority-menu">
                    <div className="task-priority">
                        <div className={`small-circle ${task?.priority === 'High' ? 'red-task-card' : task?.priority === 'Moderate' ? 'blue-task-card' : 'green-task-card'}`} />
                        <p>{task?.priority}</p>
                    </div>
                </div>

                <p className="task-title">{task?.title}</p>

                <div className="checklist-toggle">
                    <p className="checklist-toggle-heading">
                        Checklist ({completedSubTasksCount} / {subTasks?.length})
                    </p>
                </div>

                <div className={`share-checklist-tasks ${needScroll ? 'scroll' : ''}`}>
                    {/* Conditionally render checklist tasks only if isChecklistOpen is true */}
                    {
                        subTasks?.map((subTask) => (
                            <AssignedTask
                                key={subTask._id}
                                subTaskTitle={subTask?.title}
                                subTaskDone={subTask?.done}
                                setSubTasks={setSubTasks}
                                subTaskId={subTask?._id}
                                task={task}
                                isShare={true}
                            />
                        ))}
                </div>

                <div className="share-task-info">
                    <p>{task?.dueDate ? 'Due Date' : ''}</p>{task?.dueDate ? <span className='share-task-due-date'> {formattedDate}</span> : <span></span>}
                </div>
            </div>
        </div>
    )
}

export default SharePage