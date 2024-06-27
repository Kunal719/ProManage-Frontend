import "../pageStyles/AnalyticsDashboard.css";
import AnalyticsCard from "./AnalyticsCard";

const AnalyticsDashboard = () => {
    return (
        <div className="analytics-dashboard">
            <p>Analytics</p>

            {/* 2 Analytic Cards  */}
            <div className="analytics-cards">
                <AnalyticsCard type='tasks' />
                <AnalyticsCard type='priorities' />
            </div>
        </div>
    )
}

export default AnalyticsDashboard