import "../pageStyles/AssignedTask.css";
const AssignedTask = ({ subTaskTitle, subTaskDone }) => {
    return (
        <div className="assigned-task">
            <input type="checkbox" className="checkbox" value={subTaskDone} />
            <p className="task">{subTaskTitle}</p>
        </div>
    )
}

export default AssignedTask