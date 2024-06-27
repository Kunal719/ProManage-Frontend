// import '../pageStyles/TaskName.css'
// const TaskName = () => {
//     return (
//         <div className="task-name">
//             <input type="checkbox" />
//             <div className="task-input-field">
//                 <input type="text" placeholder="Add a task" />
//             </div>
//             <img src="/images/Delete.png" alt="Delete task" />
//         </div>
//     )
// }

// export default TaskName
import "../pageStyles/TaskName.css";

const TaskName = ({ onDelete }) => {
    return (
        <div className="task-name-field">
            <input type="checkbox" />
            <div className="task-input-field">
                <input type="text" placeholder="Add a task" />
            </div>
            <img src="/images/Delete.png" alt="Delete task" onClick={onDelete} />
        </div>
    );
};

export default TaskName;

