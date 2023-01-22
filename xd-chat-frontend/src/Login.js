import "./Login.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import {useEffect, useMemo, useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let properUsername = false, properPassword = false;

    //Validate if the username and password entered are valid;
    //useMemo doesn't run after the Render, like useEffect;
    useMemo(() => {
        const uRegex = /^[a-zA-Z0-9_.]+$/; //Username regex;
        const pRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/; //Password regex;
        properUsername = uRegex.test(username);
        properPassword = pRegex.test(password);
        // console.log(properUsername);
    }, [username, password]);

    return (
        <div className="login">
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
        </div>
    )
}

export default Login;