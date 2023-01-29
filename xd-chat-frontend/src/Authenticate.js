import "./Authenticate.css";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import logo from "./logos/xdchat logo - full text - white.png"
import PasswordIcon from '@mui/icons-material/Password';
import GoogleIcon from '@mui/icons-material/Google';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import {auth} from "./firebase";
import {useEffect, useMemo, useState} from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import {CircularProgress} from "@mui/material";

const Authenticate = () => {
    const [email, setEmail] = useState(""); //Email-field state;
    const [password, setPassword] = useState(""); //Password-field state;
    const [switcher, setSwitcher] = useState(false);//State for switching between login and register;
    const [loading, setLoading] = useState(false);//State for displaying loading animation;
    const [emailCheck, setEmailCheck] = useState(false);//State for maintaining email-check;
    const [passwordCheck, setPasswordCheck] = useState(false);//State for maintaining password-check;

    //Validate if the username and password entered are valid;
    //useMemo memo-izes previous computations making it less expensive;
    useMemo(() => {
        const eRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //Password regex;
        setEmailCheck(eRegex.test(email));
    }, [email]);

    useMemo(() => {
        const pRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,55}$/; //Password regex;
        setPasswordCheck(pRegex.test(password));
    }, [password]);


    //Switch between the Registration and Authenticate Window;
    const Switch = () => setSwitcher(!switcher);

    //Function to Register;
    const Register = async () => {
        try {
            setLoading(true);
            const result = await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            //Errors yet to be handled;
            setLoading(false);
        }
    };

    //Function to Sign in with email;
    const Login = async () => {
        try {
            setLoading(true);
            const result = await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            //Errors yet to be handled;
            setLoading(false);
        }
    };

    //Function to Sign in with Google;
    const GoogleLogin = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth,provider);
        } catch (e) {
            //Errors yet to be handled;
            setLoading(false);
        }
    }

    return (
        <div className="outer-box">
            {loading && <CircularProgress color="primary"/>}
            {/*Authenticate pane*/}
            <div className={"inner-box" + (switcher || loading ? " shift-left" : " ")}>
                <div className="image">
                    <img src={logo} alt=""/>
                </div>
                {/*Input fields*/}
                <div className={"input-field" + (emailCheck ? " underline" : "")}>
                    {/*Email*/}
                    <AlternateEmailIcon className={emailCheck ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Email" className={emailCheck ? "blueBorder" : "whiteBorder"} value={email}
                           type="text" onChange={(e) => {
                        setEmail(e.target.value.trim());
                    }}/>
                </div>

                <div className={"input-field" + (passwordCheck ? " underline" : "")}>
                    {/*Password*/}
                    <PasswordIcon className={passwordCheck ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Password" className={passwordCheck ? "blueBorder" : "whiteBorder"} value={password}
                           type="password" onChange={(e) => {
                        setPassword(e.target.value.trim());
                    }}/>
                </div>

                {/*Border*/}
                <div className="login-border m-t-20"></div>

                {/*Buttons*/}
                <div className={'m-t-5 button-normal ' + (emailCheck && passwordCheck ? "confirm-button" : "disable-button")}>
                    <button disabled={!(passwordCheck && emailCheck)}
                            onClick={Login}>
                        <span>Sign-in</span><LoginIcon/>
                    </button>
                </div>
                <div className="confirm-button m-t-5 button-google">
                    <button onClick={GoogleLogin}>
                        <span>Sign-in with Google</span><GoogleIcon/>
                    </button>
                </div>

                {/*Switch to Registration*/}
                <div className="switcher m-t-15">
                    <p>Already have an account? <button className="switcher-button" onClick={Switch}>REGISTER</button></p>
                </div>
            </div>

            {/*Registration pane*/}
            <div className={"inner-box " + (loading ? "shift-right " : " ") + (switcher ? " " : " shift-right")}>
                <div className="image">
                    <img src={logo} alt=""/>
                </div>
                {/*Input fields*/}
                <div className={"input-field" + (emailCheck ? " underline" : "")}>
                    {/*Email*/}
                    <AlternateEmailIcon className={emailCheck ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Email" className={emailCheck ? "blueBorder" : "whiteBorder"} value={email}
                           type="text" onChange={(e) => {
                        setEmail(e.target.value.trim());
                    }}/>
                </div>

                <div className={"input-field" + (passwordCheck ? " underline" : "")}>
                    {/*Password*/}
                    <PasswordIcon className={passwordCheck ? "svgBlue" : "svgGrey"}/>
                    <input placeholder="Password" className={passwordCheck ? "blueBorder" : "whiteBorder"} value={password}
                           type="password" onChange={(e) => {
                        setPassword(e.target.value.trim());
                    }}/>
                </div>

                {/*Border*/}
                <div className="login-border m-t-20"></div>
                {/*Buttons*/}
                <div className={'m-t-5 button-normal ' + (emailCheck && passwordCheck ? "confirm-button" : "disable-button")}>
                    <button disabled={!(passwordCheck && emailCheck)}
                            onClick={Register}>
                        <span>Register</span><PersonAddIcon/>
                    </button>
                </div>
                <div className="confirm-button m-t-5 button-google">
                    <button onClick={GoogleLogin}>
                        <span>Sign-up with Google</span><GoogleIcon/>
                    </button>
                </div>

                {/*Switch to Sign-in*/}
                <div className="switcher m-t-15">
                    <p>Don't have an account? <button className="switcher-button" onClick={Switch}>LOGIN</button></p>
                </div>
            </div>
        </div>
    )
}

export default Authenticate;