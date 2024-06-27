import { useState } from "react";
import "../pageStyles/EditAccount.css";

const EditAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="edit-account">
            <p>Settings</p>

            <form>
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="settings-submit-button" type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditAccount