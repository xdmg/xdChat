import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAxE_Leh_wq4wbjCsiYEqdaZetRIB9zGws",
    authDomain: "xdchat-78b34.firebaseapp.com",
    projectId: "xdchat-78b34",
    storageBucket: "xdchat-78b34.appspot.com",
    messagingSenderId: "373937177279",
    appId: "1:373937177279:web:6f6a31a6787585452bbc0a",
    measurementId: "G-8QJMP5WMQY"
};

//Initialize Firebase;
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);