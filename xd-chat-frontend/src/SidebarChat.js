import './SidebarChat.css';
import { Avatar, IconButton } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';

const SidebarChat = ({chats}) => {
    //TODO: Change to dynamic values;
    chats.contact = "Placeholder";
    chats.lastMessage = "This is a test to check for overflow and hide it";
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