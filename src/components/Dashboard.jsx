import { useState } from "react";
import CalendarDropDown from "./CalendarDropDown";
import "../pageStyles/Dashboard.css";
import TaskBoard from "./TaskBoard";
import AddPeopleDialog from "./AddPeopleDialog";

const Dashboard = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

    const handleDialogOpen = () => {
        setIsDialogOpen(true); // Open dialog on button click
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false); // Close dialog on close button click or outside click (optional)
    };

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' }); // Get month name
    const year = today.getFullYear();

    // Add ordinal suffix (st, nd, rd, th)
    const ordinal = (day % 10 === 1 && day !== 11)
        ? 'st'
        : (day % 10 === 2 && day !== 12)
            ? 'nd'
            : (day % 10 === 3 && day !== 13)
                ? 'rd'
                : 'th';


    return (
        <>
            <section className="dashboard">
                {/* Header section */}

                <div className="header">
                    {/* Left Side  */}
                    <div className="header-left">
                        <h2>Welcome! Kumar</h2>
                        <div className='header-left-base-content'>
                            <span>Board</span>
                            <img src="/images/addPeople.png" className="addBoardImg" alt="" onClick={handleDialogOpen} />
                            <p onClick={handleDialogOpen}>Add People</p>

                            {isDialogOpen && (
                                <div className="dialog-container">
                                    <div className="dialog-content">
                                        <AddPeopleDialog handleDialogClose={handleDialogClose} />
                                    </div>
                                    <div className="dialog-overlay" onClick={handleDialogClose} />
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="header-right">
                        <span className='date'>{day}{ordinal} {month}, {year}</span>
                        <div className='dropdown-menu'>
                            <CalendarDropDown />
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className='parent-task-boards'>
                    <div className="task-boards">
                        <TaskBoard task="Backlog" />
                        <TaskBoard task="To do" addBtn />
                        <TaskBoard task="In Progress" />
                        <TaskBoard task="Done" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard