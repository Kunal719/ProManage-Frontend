
import "../pageStyles/GeneralDialogBox.css";

const GeneralDialogBox = ({ type, handleDialogClose }) => {
    return (
        <div className="general-dialog-box">
            <div className="general-dialog-box-content">
                <p>{type === 'logout' ? 'Are you sure you want to Logout?' : 'Are you sure you want to Delete?'}</p>
                <div className="general-dialog-box-btns">
                    <div className="general-action-button">
                        {type === 'logout' ? 'Yes, Logout' : 'Yes, Delete'}
                    </div>
                    <div className="general-cancel-button" onClick={handleDialogClose}>Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default GeneralDialogBox