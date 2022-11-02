import "./Chat.css";
import Message from './Message';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PageviewIcon from '@mui/icons-material/Pageview';
import PushPinIcon from '@mui/icons-material/PushPin';
import {IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

function Chat(){
    const msg1 = {isSender: false};
    const msg2 = {isSender: true};
    return (
        <div className="chat">
            <div className="chat-header">
                <div className="chat-header-userInfo">
                    <AlternateEmailIcon />
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
            <div className="chat-body">
                <div className="chat-body-messages">
                <Message message={msg1}/>
                <Message message={msg2}/>
                </div>
            </div>
            <div className="chat-footer">
                <div className="chat-footer-typingBoxContainer">
                    <div className="chat-footer-typingBoxContainer-sendButton">
                        <IconButton><SendIcon /></IconButton>
                    </div>
                    <input placeholder="Type a message..." type="Text"/>
                    <IconButton><MicIcon /></IconButton>
                    <IconButton><SentimentSatisfiedAltIcon /></IconButton>
                </div>
            </div>
        </div>
    );
}

export default Chat;