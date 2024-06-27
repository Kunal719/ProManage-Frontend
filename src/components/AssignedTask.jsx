import "../pageStyles/AssignedTask.css";
const AssignedTask = () => {
    return (
        <div className="assigned-task">
            <input type="checkbox" className="checkbox" />
            <p className="task">Do more tasks</p>
        </div>
    )
}

export default AssignedTask