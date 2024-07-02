import "../pageStyles/AssignedTask.css";
const AssignedTask = ({ subTaskTitle, subTaskDone, setSubTasks, subTaskId, task }) => {

    const handleChange = (e) => {
        setSubTasks((subTasks) => subTasks.map((task) => task._id === subTaskId ? { ...task, done: e.target.checked } : task))
    }

    return (
        <div className="assigned-task">
            <input type="checkbox" className="checkbox" checked={subTaskDone} onChange={handleChange} />
            <p className="task">{subTaskTitle}</p>
        </div>
    )
}

export default AssignedTask