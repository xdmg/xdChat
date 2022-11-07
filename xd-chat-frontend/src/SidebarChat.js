import './SidebarChat.css';
import { Avatar, IconButton } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';

const SidebarChat = ({chats}) => {
    chats.contact = "username";
    chats.lastMessage = "this is a test bruh momento numero uno this is a test";
    chats.unread = true;
    return (
        <div className="sidebarChat">
            <span><b>#0000</b></span>
            <Avatar />
            <div className="sidebarChat-info">
                <h2>{chats.contact}</h2>
                <p>{chats.lastMessage}</p>
            </div>
            {chats.unread && <div className="sidebarChat-unread"><CircleIcon /></div>}
        </div>
    );
}

export default SidebarChat;