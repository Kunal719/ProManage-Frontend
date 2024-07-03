import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from "./LoadingSpinner";
import "../pageStyles/AnalyticsCard.css";

const AnalyticsCard = ({ type }) => {
    // Removed commented-out task names and values

    const [taskCounts, setTaskCounts] = useState({
        taskStatusCounts: [],
        taskPriorityCounts: {},
    });

    const { taskTypeCount = {}, priorityTypeCount = {}, DueDate } = taskCounts;


    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const getCount = async () => {
            const responseData = await sendRequest(
                import.meta.env.VITE_REACT_APP_BACKEND_URL + `/user/tasks/${auth.userId}/getStatusPriorityCount`,
                'GET',
                null,
                {
                    'Authorization': `Bearer ${auth.token}`
                }
            );
            setTaskCounts(responseData);
        };

        getCount();
    }, [auth.token]);

    console.log(taskCounts)
    return (
        <div className="analytics-card">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="analytics-values">
                <div>
                    {type === 'tasks' ? (
                        Object.entries(taskTypeCount).map(([name, count], index) => {
                            return (
                                <div key={index} className='list-item'>
                                    <div className="small-circle-analytics" />
                                    <p key={index}>{name}</p>
                                </div>
                            );
                        })
                    ) : null}
                    {type === 'priorities' ? (
                        <div>
                            {Object.entries(priorityTypeCount).map(([name, count], index) => {
                                return (
                                    <div key={index} className='list-item'>
                                        <div className="small-circle-analytics" />
                                        <p key={index}>{name}</p>
                                    </div>
                                );
                            })}
                            {DueDate ? <div className="list-item"><div className="small-circle-analytics" /><p>Due Date</p></div> : null}
                        </div>
                    ) : null}
                </div>
                <div>
                    {type === 'tasks' ? (
                        Object.entries(taskTypeCount).map(([name, count], index) => {
                            return (
                                <div key={index} className="list-item">
                                    <p style={{ fontWeight: 600 }} key={index}>{count}</p>
                                </div>
                            );
                        })
                    ) : null}
                    {type === 'priorities' ? (
                        <div>
                            {Object.entries(priorityTypeCount).map(([name, count], index) => {
                                return (
                                    <div key={index} className="list-item">
                                        <p style={{ fontWeight: 600 }} key={index}>{count}</p>
                                    </div>
                                );
                            })}
                            {DueDate ? <div className="list-item"><p style={{ fontWeight: 600 }}>{DueDate}</p></div> : null}
                        </div>

                    ) : null}
                </div>
            </div>
        </div>
        // <div>Hello</div>
    );
}

export default AnalyticsCard;
