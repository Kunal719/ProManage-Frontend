import SideBar from "../components/SideBar";
import EditAccount from "../components/EditAccount";
import "../pageStyles/Settings.css";

const Settings = () => {
    return (
        <div className="settings">
            <SideBar />
            <EditAccount />
        </div>
    )
}

export default Settings