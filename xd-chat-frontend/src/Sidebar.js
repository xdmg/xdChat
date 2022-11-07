import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { Avatar, IconButton } from "@mui/material"

function Sidebar() {
    const chats = {};
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-header-profile">
                    <Avatar sx={{ height:'4.5vmin',width:'4.5vmin'}}/>
                </div>
                <div className="sidebar-header-icons">
                    <IconButton> <MapsUgcRoundedIcon /> </IconButton>
                    <IconButton> <ChatIcon /> </IconButton>
                    <IconButton> <MoreVertIcon /> </IconButton>
                </div>
            </div>
            <div className="sidebar-search">
                <div className="sidebar-searchContainer">
                    <ManageSearchOutlinedIcon />
                    <input placeholder="Find existing or new contacts" type="Text"/>
                </div>
            </div>
            <div className="sidebar-chats">
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
            </div>
        </div>
    );
}

export default Sidebar;