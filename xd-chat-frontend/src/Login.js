import "./Login.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import {useMemo, useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(true);
    let properUsername = false, properPassword = false;

    //Validate if the username and password entered are valid;
    //useMemo doesn't run after the Render, like useEffect;
    useMemo(() => {
        const uRegex = /^[a-zA-Z0-9_.]+$/; //Username regex;
        const pRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,55}$/; //Password regex;
        properUsername = uRegex.test(username);
        properPassword = pRegex.test(password);
        // console.log(properUsername);
    }, [username, password]);

    return (
        <div className="login-outer">
            <div className={"login" + register ? " left" : " "}>
                <div className={"login-input" + (properUsername ? " underline" : "")}>
                    <AccountCircleIcon className={properUsername ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Username" className={properUsername ? "blueBorder" : "whiteBorder"} value={username}
                           type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                </div>
                <div className={"login-input" + (properPassword ? " underline" : "")}>
                    <PasswordIcon className={properPassword ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Password" className={properPassword ? "blueBorder" : "whiteBorder"} value={password}
                           type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </div>
                <div className="login-border m-t-20">
                </div>
                <div className="login-button m-t-5 button-normal">
                    <button>
                    <span>
                    Sign-in
                    </span>
                        <LoginIcon/>
                    </button>
                </div>
                <div className="login-button m-t-5 button-google">
                    <button>
                    <span>
                    Sign-in with Google
                    </span>
                        <GoogleIcon/>
                    </button>
                </div>
                <div className="register m-t-15">
                    <p>Already have an account? <button className="register-button">REGISTER</button></p>
                </div>
            </div>

            <div className={"login" + register ? " " : " right"}>
                <div className={"login-input" + (properUsername ? " underline" : "")}>
                    <AccountCircleIcon className={properUsername ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Username" className={properUsername ? "blueBorder" : "whiteBorder"} value={username}
                           type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                </div>
                <div className={"login-input" + (properPassword ? " underline" : "")}>
                    <PasswordIcon className={properPassword ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Password" className={properPassword ? "blueBorder" : "whiteBorder"} value={password}
                           type="password" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </div>
                <div className="login-border m-t-20">
                </div>
                <div className="login-button m-t-5 button-normal">
                    <button>
                    <span>
                    Register
                    </span>
                        <LoginIcon/>
                    </button>
                </div>
                <div className="login-button m-t-5 button-google">
                    <button>
                    <span>
                    Sign-up with Google
                    </span>
                        <GoogleIcon/>
                    </button>
                </div>
                <div className="register m-t-15">
                    <p>Don't have an account? <button className="register-button" onClick={() => {setRegister(false);}} >LOGIN</button></p>
                </div>
            </div>
        </div>
    )
}

export default Login;