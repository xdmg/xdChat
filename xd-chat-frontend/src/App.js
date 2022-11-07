import React,{useEffect,useState} from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
    const [messages, setMessages] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(()=> {
        axios.get('/api/v1/messages/sync').then((response) => {
            setMessages(response.data);
            setLoaded(true);
        });
    },[]);

    useEffect(() => {
        const pusher = new Pusher('d42b7154fc93085a26bb', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessages) => {
            setMessages([...messages, newMessages]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    },[messages]);

    if (loaded){
        return (
            <div className="app">
                <div className="app-body">
                    <Sidebar />
                    <Chat messages={messages}/>
                </div>
            </div>
        );
    } else return (<div>loading...</div>);

}

export default App;
