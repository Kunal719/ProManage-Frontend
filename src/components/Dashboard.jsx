import { useState, useContext, useEffect } from "react";
import CalendarDropDown from "./CalendarDropDown";
import TaskBoard from "./TaskBoard";
import AddPeopleDialog from "./AddPeopleDialog";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';
import { day, month, year, ordinal } from '../util/getDate';
import LoadingSpinner from "./LoadingSpinner";

import "../pageStyles/Dashboard.css";
const Dashboard = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
    const [user, setUser] = useState({});
    const [selectedOption, setSelectedOption] = useState({ value: 'This Week', label: 'This Week' });

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleDialogOpen = () => {
        setIsDialogOpen(true); // Open dialog on button click
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false); // Close dialog on close button click or outside click (optional)
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const responseData = await sendRequest(
                    import.meta.env.VITE_REACT_APP_BACKEND_URL + `/users/${auth.userId}`,
                    'GET',
                    null,
                )

                setUser(responseData.user)
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [auth.userId, auth.token, sendRequest])

    return (
        <>
            <section className="dashboard">
                {isLoading && <LoadingSpinner asOverlay />}
                {/* Header section */}

                <div className="header">
                    {/* Left Side  */}
                    <div className="header-left">
                        <h2>Welcome! {user?.name}</h2>
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
                            <CalendarDropDown selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className='parent-task-boards'>
                    <div className="task-boards">
                        <TaskBoard taskType="Backlog" tasks={user?.tasks} selectedOption={selectedOption} />
                        <TaskBoard taskType="To do" addBtn tasks={user?.tasks} selectedOption={selectedOption} />
                        <TaskBoard taskType="In Progress" tasks={user?.tasks} selectedOption={selectedOption} />
                        <TaskBoard taskType="Done" tasks={user?.tasks} selectedOption={selectedOption} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard