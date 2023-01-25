import React, {useEffect, useState} from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import {auth} from "./firebase";
import Pusher from "pusher-js";
import axios from "./axios";
import Authenticate from "./Authenticate";
import {onAuthStateChanged} from "firebase/auth";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [token, setToken] = useState(null);
    const [fixWidth, enableFixWidth] = useState(false);


    //This is a hook like useEffect,
    //It runs everytime the authentication state changes;
    onAuthStateChanged(auth, (currentUser) => setToken(currentUser));

    //Fetch all messages !STC;
    useEffect(() => {
        if (token !== null) {
            axios
                .get("/api/v1/messages/sync")
                .then((response) => {
                    setMessages(response.data);
                    setLoaded(true);

                    //This is done only for animation purposes;
                    //It sets the minimum width on the app-body half-a-second after it has loaded;
                    // setTimeout(() => enableFixWidth(true), 1000);

                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [token]);

    //Add pusher channel's for insertion & deletion;
    useEffect(() => {
        const pusher = new Pusher("5fd72bdbc25ba07c8de1", {
            cluster: "ap2",
        });

        const channel = pusher.subscribe("messages");

        channel.bind("inserted", (newMessages) => {
            setMessages([...messages, newMessages]);
        });

        channel.bind("deleted", (msg) => {
            setMessages(messages.filter((i) => i._id !== msg.id));
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages]);

    //If user is not logged in;
    if (token === null)
        return (
            <div className="app">
                <div className="auth-body">
                    <Authenticate/>
                </div>
            </div>
        )

    //If authentication is done & content is loaded:
    if (loaded)
        return (
            <div className="app">
                <div className={"app-body" + (fixWidth ? " min" : "")}>
                    <Sidebar/>
                    <Chat messages={messages}/>
                </div>
            </div>
        );

    //Otherwise while loading content:
    return (<div className="app">
        <div className="auth-body"></div>
    </div>);
}

export default App;
