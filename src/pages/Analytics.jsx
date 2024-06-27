import AnalyticsDashboard from "../components/AnalyticsDashboard";
import SideBar from "../components/SideBar";
import "../pageStyles/Analytics.css";
const Analytics = () => {
    return (
        <div className="analytics">
            <SideBar />
            <AnalyticsDashboard />
        </div>
    )
}

export default Analytics