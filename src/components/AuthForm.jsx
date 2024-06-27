import { useState } from "react";
import '../pageStyles/AuthForm.css'; // Import CSS file

const AuthForm = ({ type }) => {
    const [isLogin, setIsLogin] = useState(type);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-form">
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form>
                {!isLogin && (
                    <div className="input-container">
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
                )}
                <div className="input-container">
                    <img src="/images/emailAvatar.png" alt="Email" />
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <img src="/images/passwordAvatar.PNG" alt="Password" />
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
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
                {!isLogin && (
                    <div className="input-container">
                        <img src="/images/passwordAvatar.PNG" alt="Confirm Password" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button className="submit-button" type="submit">{isLogin ? 'Log in' : 'Register'}</button>

                {!isLogin && <p className="auth-info">Have an account?</p>}
                {!isLogin && <button className="switch-button" onClick={() => setIsLogin(true)}>Login</button>}
                {isLogin && <p className="auth-info">Have no account yet?</p>}
                {isLogin && <button className="switch-button" onClick={() => setIsLogin(false)}>Register</button>}
            </form>
        </div>
    );
};

export default AuthForm;
