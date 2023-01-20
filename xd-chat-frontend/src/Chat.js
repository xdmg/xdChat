import "./Chat.css";
import Message from './Message';
import axios from "./axios";
import {useRef,useEffect} from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PageviewIcon from '@mui/icons-material/Pageview';
import PushPinIcon from '@mui/icons-material/PushPin';
import {IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const Chat = ({messages}) => {
    const sendRef = useRef(null);
    const sendMessageRef = useRef(null);
    const scrollRef = useRef(null);

    //Add prevSender tag to messages;
    if(messages.length > 0){
        messages[0].prevSender = null;
        let prevSender = messages[0].sender;
        for (let i = 1; i < messages.length; i++){
            messages[i].prevSender = prevSender;
            prevSender = messages[i].sender;
        }
    }

    //Adding an event listener to the chat input box;
    useEffect(() => {
        sendRef.current.addEventListener("keypress", (event) => {
            console.log('sent')
            if (event.key === 13 || event.which === 13){
                if (sendRef.current.value !== ""){
                    event.preventDefault();
                    sendMessageRef.current.click();
                }
            }
        });
    },[]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (sendRef.current.value !== ""){
            await axios.post('/api/v1/messages/new',{
                message: sendRef.current.value,
                sender: "sender1",
                receiver: "sender2",
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            });
        }
        sendRef.current.value = "";
    };

    //Always scroll to the bottom end of the chats;
    useEffect(() => {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    },[messages]);

    // const t = {
    //     sender:'sender1',
    //     text
    // }
    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-header-userInfo">
                    <AlternateEmailIcon  id="chat-header-atLogo"/>
                    <h3>Username</h3>
                    <span>Last-seen @ <b>18:30</b></span>
                </div>
                <IconButton> <PushPinIcon /> </IconButton>
                <div className="chat-header-functions">
                    <div className="chat-header-searchContainer">
                       <PageviewIcon />
                       <input placeholder="Search for messages" type="Text"/>
                    </div>
                </div>
            </div>
            <div className="chat-body" ref={scrollRef}>
                {/* <div className="test">
                    <Message message={}/>
                </div> */}
                <div className="chat-body-messages">
                    {
                        messages.map((messages) => (
                        <Message message={messages}/>
                    ))}
                </div>
            </div>
            <div className="chat-footer">
                <div className="chat-footer-typingBoxContainer">
                    <div className="chat-footer-typingBoxContainer-sendButton">
                        <IconButton ref={sendMessageRef} onClick={sendMessage}><SendIcon /></IconButton>
                    </div>
                    <input placeholder="Type a message..." type="Text" ref={sendRef}/>
                    <IconButton><MicIcon /></IconButton>
                    <IconButton><SentimentSatisfiedAltIcon /></IconButton>
                </div>
        </div>
        </div>
    );
}

export default Chat;
