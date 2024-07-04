import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from '../hooks/http-hook';
import LoadingSpinner from "./LoadingSpinner";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import '../pageStyles/AuthForm.css'; // Import CSS file

const AuthForm = ({ type }) => {
    const [isLogin, setIsLogin] = useState(type);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const authSubmitHandler = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const responseData = await sendRequest(
                    import.meta.env.VITE_REACT_APP_BACKEND_URL + '/users/login',
                    'POST',
                    JSON.stringify({
                        email: email,
                        password: password,
                    }),
                    {
                        'Content-Type': 'application/json',
                    }
                );

                // if response is not an error
                auth.login(responseData.user.userID, responseData.token);
                toast.success("Login Successful!");
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                const responseData = await sendRequest(
                    import.meta.env.VITE_REACT_APP_BACKEND_URL + '/users/register',
                    'POST',
                    JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword
                    }),
                    {
                        'Content-Type': 'application/json',
                    }
                );

                // if response is not an error
                auth.login(responseData.user.userID, responseData.token);
                toast.success("Registration Successful!");
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="auth-form">
                <h1>{isLogin ? 'Login' : 'Register'}</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={authSubmitHandler} onClick={clearError}>
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
                        </div>
                        <img
                            src="/images/view.png"
                            width={10}
                            height={10}
                            className={`${showPassword ? '' : '-slash'} password-view-icon`}
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                    {!isLogin && (
                        <div className="input-container">
                            <img src="/images/passwordAvatar.PNG" alt="Confirm Password" />
                            <div className="password-container">
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
                            <img
                                src="/images/view.png"
                                width={10}
                                height={10}
                                className={`${showPassword ? '' : '-slash'} password-view-icon`}
                                onClick={togglePasswordVisibility}
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
        </>
    );
};

export default AuthForm;
