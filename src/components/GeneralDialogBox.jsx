import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "../pageStyles/GeneralDialogBox.css";

const GeneralDialogBox = ({ type, handleDialogClose }) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        if (type === 'logout') {
            auth.logout();
            navigate('/auth');
        }
        return;
    }
    return (
        <div className="general-dialog-box">
            <div className="general-dialog-box-content">
                <p>{type === 'logout' ? 'Are you sure you want to Logout?' : 'Are you sure you want to Delete?'}</p>
                <div className="general-dialog-box-btns">
                    <div className="general-action-button" onClick={handleLogout}>
                        {type === 'logout' ? 'Yes, Logout' : 'Yes, Delete'}
                    </div>
                    <div className="general-cancel-button" onClick={handleDialogClose}>Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default GeneralDialogBox