import React, {useEffect, useState} from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Login";

function App() {
    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        axios
            .get("/api/v1/messages/sync")
            .then((response) => {
                setMessages(response.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

    if (token === null)
        return (
            <div className="app">
                <div className="login-body">
                    <Login />
                </div>
            </div>
        )

    if (loaded)
        return (
            <div className="app">
                <div className="app-body">
                    <Sidebar/>
                    <Chat messages={messages}/>
                </div>
            </div>
        );

    return <div>loading...</div>;
}

export default App;
