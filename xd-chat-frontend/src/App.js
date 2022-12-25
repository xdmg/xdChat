import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
// import { ObjectId } from "mongoose";

function App() {
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //   const canvasRef = useRef(null);

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
      console.log("Newest message out there");
      console.log("new", newMessages);
      setMessages([...messages, newMessages]);
    });

    channel.bind("deleted", (msg) => {
      // console.log(messages.filter((i) => i._id !== msg.id));
      setMessages(messages.filter((i) => i._id !== msg.id));
      // console.log("bind working", msg.id);
    });

    // const d = () => {
    //   console.log("gdg");
    // };

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  if (loaded) {
    return (
      <div className="app">
        <div className="app-body">
          <Sidebar />
          <Chat messages={messages} />
        </div>
      </div>
    );
  } else return <div>loading...</div>;
}

export default App;
