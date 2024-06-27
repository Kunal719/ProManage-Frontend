import AuthForm from "../components/AuthForm";
import "../pageStyles/Auth.css";
const Auth = () => {
    return (
        <div className="login-container">
            <div className="login-left">
                <img src="/images/loginAvatar.PNG" alt="" />
                <h3>Welcome aboard my friend</h3>
                <p>just a couple of clicks and we start</p>
            </div>
            <div className="login-right">
                <AuthForm type='login' />
            </div>
        </div>
    );
};

export default Auth;