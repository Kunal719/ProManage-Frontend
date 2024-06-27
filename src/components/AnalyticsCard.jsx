import "../pageStyles/AnalyticsCard.css";

const AnalyticsCard = ({ type }) => {
    const tasksNames = ['Backlog Tasks', 'To-do Tasks', 'In-Progress Tasks', 'Completed Tasks']
    const taskNamesValues = [10, 11, 12, 13];

    const priorityNames = ['Low Priority', 'Moderate Priority', 'High Priority', 'Due Date Tasks'];
    const priorityValues = [2, 3, 4, 5];
    return (
        <div className="analytics-card">
            <div className="analytics-values">
                <div>

                    {type === 'tasks' ? tasksNames.map((name, index) => {
                        return (
                            <div key={index} className='list-item'>
                                <div className="small-circle-analytics" />
                                <p key={index}>{name}</p>
                            </div>
                        )
                    }) : priorityNames.map((name, index) => {
                        return (
                            <div key={index} className='list-item'>
                                <div className="small-circle-analytics" />
                                <p key={index}>{name}</p>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {type === 'tasks' ? taskNamesValues.map((value, index) => {
                        return (
                            <div key={index} className="list-item">
                                <p style={{ fontWeight: 600 }} key={index}>{value}</p>
                            </div>
                        )
                    }) : priorityValues.map((value, index) => {
                        return (
                            <div key={index} className="list-item">
                                <p style={{ fontWeight: 600 }} key={index}>{value}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AnalyticsCard