import { useState, useContext } from 'react';
import '../pageStyles/AddPeopleDialog.css';
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from "./LoadingSpinner";

const AddPeopleDialog = ({ handleDialogClose }) => {
    const [email, setEmail] = useState('');
    const [emailSaved, setEmailSaved] = useState(false);

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            await sendRequest(
                import.meta.env.VITE_REACT_APP_BACKEND_URL + `/users/${auth.userId}/addPersonToGroup`,
                'PATCH',
                JSON.stringify({ email: email }),
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                }
            );
            setEmailSaved(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='add-people-dialog-box'>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='add-people-dialog-box-content'>
                {!emailSaved && (
                    <div>
                        <p>Add people to board</p>
                        {error && <p style={{ color: 'red', fontSize: '10px' }}>{error}</p>}
                        <div className='email-input' onClick={clearError}>
                            <input type="text" placeholder='Enter the email' value={email} onChange={handleChange} />
                        </div>

                        <div className="dialog-box-btns">
                            <div className="cancel-button" onClick={handleDialogClose}>Cancel</div>
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
