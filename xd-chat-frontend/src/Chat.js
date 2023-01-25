import "./Chat.css";
import Message from './Message';
import axios from "./axios";
import {useRef, useEffect, useState} from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PageviewIcon from '@mui/icons-material/Pageview';
import PushPinIcon from '@mui/icons-material/PushPin';
import {IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const Chat = ({messages}) => {
    const inputRef = useRef(null); //Reference to the chat input box;
    const sendButtonRef = useRef(null); //Reference to the send button;
    const scrollbarRef = useRef(null); //Reference to the scrollbar, used for always starting from bottom;
    const [posting, setPosting] = useState(false); //State for mutual exclusion;

    //Add prevSender tag to messages;
    if (messages.length > 0) {
        messages[0].prevSender = null;
        let prevSender = messages[0].sender;
        for (let i = 1; i < messages.length; i++) {
            messages[i].prevSender = prevSender;
            prevSender = messages[i].sender;
        }
    }

    //Adding an event listener to the chat input box such that it sends the message when the "enter" key is;
    useEffect(() => {
        inputRef.current.addEventListener("keyup", (event) => {
            //"event.key=13": Enter key
            if (event.key === 13 || event.which === 13) {
                if (inputRef.current.value !== "") {
                    event.preventDefault();
                    sendButtonRef.current.click();
                }
            }
        });
    }, []);

    //Function to send the message;
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!posting && inputRef.current.value !== "") {
            setPosting(posting); //Lock;
            await axios.post('/api/v1/messages/new', {
                message: inputRef.current.value,
                sender: "sender1",
                receiver: "sender2",
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            });
            inputRef.current.value = "";
            setPosting(false); //Unlock;
        }
    };

    //Always scroll to the bottom end of the chats;
    useEffect(() => {
        scrollbarRef.current.scrollTop = scrollbarRef.current.scrollHeight;
    }, [messages]);

    return (
        <div className="chat">
            {/*Header*/}
            <div className="chat-header">
                <div className="chat-header-userInfo">
                    <AlternateEmailIcon id="chat-header-atLogo"/>
                    <h3>Username</h3>
                    <span>Last-seen @ <b>18:30</b></span>
                </div>
                <IconButton> <PushPinIcon/> </IconButton>
                <div className="chat-header-functions">
                    <div className="chat-header-searchContainer">
                        <PageviewIcon/>
                        <input placeholder="Search for messages" type="Text"/>
                    </div>
                </div>
            </div>

            {/*Body*/}
            <div className="chat-body" ref={scrollbarRef}>
                <div className="chat-body-messages">
                    {messages.map((messages) => (
                        <Message message={messages}/>
                    ))}
                </div>
            </div>

            {/*Footer*/}
            <div className="chat-footer">
                <div className="chat-footer-typingBoxContainer">
                    <div className="chat-footer-typingBoxContainer-sendButton">
                        <IconButton ref={sendButtonRef} onClick={sendMessage}><SendIcon/></IconButton>
                    </div>
                    <input placeholder="Type a message..." type="Text" ref={inputRef}/>
                    <IconButton><MicIcon/></IconButton>
                    <IconButton><SentimentSatisfiedAltIcon/></IconButton>
                </div>
            </div>
        </div>
    );
}

export default Chat;
