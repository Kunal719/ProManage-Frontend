import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from '../hooks/http-hook';
import { AuthContext } from "../context/auth-context";
import LoadingSpinner from "./LoadingSpinner";
import "../pageStyles/EditAccount.css";

const EditAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const responseData = await sendRequest(
                    import.meta.env.VITE_REACT_APP_BACKEND_URL + `/users/${auth.userId}`,
                    'GET',
                    null,
                )

                setName(responseData.user.name);
                setEmail(responseData.user.email);
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [auth.userId, auth.token, sendRequest]);

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                import.meta.env.VITE_REACT_APP_BACKEND_URL + `/users/updateUser/${auth.userId}`,
                'PATCH',
                JSON.stringify({
                    name: name,
                    updatedEmail: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }),
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                }
            );

            if (responseData) {
                auth.logout();
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="edit-account">
            {isLoading && <LoadingSpinner asOverlay />}
            <p>Settings</p>
            <form onSubmit={handleUpdateUser}>
                <div className="settings-input-container">
                    <img src="/images/nameAvatar.PNG" alt="Name" />
                    <input
                        type="text"
                        placeholder="Name"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="settings-input-container">
                    <img src="/images/emailAvatar.png" alt="Email" />
                    <input
                        type="email"
                        placeholder="Update Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="settings-input-container">
                    <img src="/images/passwordAvatar.PNG" alt="Password" />
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Old Password"
                            id="password"
                            name="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`fas fa-eye${showPassword ? '' : '-slash'}`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                </div>

                <div className="settings-input-container">
                    <img src="/images/passwordAvatar.PNG" alt="Confirm Password" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="settings-submit-button" type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditAccount