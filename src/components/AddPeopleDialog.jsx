import { useState } from 'react';
import '../pageStyles/AddPeopleDialog.css';

const AddPeopleDialog = ({ handleDialogClose }) => {
    const [email, setEmail] = useState('');
    const [emailSaved, setEmailSaved] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSave = () => {
        setEmailSaved(true);
    }

    return (
        <div className='add-people-dialog-box'>
            <div className='add-people-dialog-box-content'>
                {!emailSaved && (
                    <div>
                        <p>Add people to board</p>
                        <div className='email-input'>
                            <input type="text" placeholder='Enter the email' value={email} onChange={handleChange} />
                        </div>

                        <div className="dialog-box-btns">
                            <div className="cancel-button">Cancel</div>
                            <div className="save-button" onClick={handleSave}>Save</div>
                        </div>
                    </div>
                )}

                {emailSaved && (
                    <div className='email-selected'>
                        <p>{email} added to board</p>
                        <div className="save-button" onClick={handleDialogClose}>Okay, got it!</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddPeopleDialog