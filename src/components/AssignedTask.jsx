import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";
import "../pageStyles/AssignedTask.css";
const AssignedTask = ({ subTaskTitle, subTaskDone, setSubTasks, subTaskId, task }) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleChange = async (e) => {
        setSubTasks((subTasks) => subTasks.map((task) => task._id === subTaskId ? { ...task, done: e.target.checked } : task));

        try {
            await sendRequest(
                import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/setSubTaskCheck/${task._id}`,
                'PATCH',
                JSON.stringify({
                    subTaskId: subTaskId,
                    subTaskDone: e.target.checked
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="assigned-task">
            {isLoading && <LoadingSpinner asOverlay />}
            <input type="checkbox" className="checkbox" checked={subTaskDone} onChange={handleChange} />
            <p className="task">{subTaskTitle}</p>
        </div>
    )
}

export default AssignedTask