import "./Sidebar.css";
import SidebarChat from './SidebarChat';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import { Avatar, IconButton } from "@mui/material"
import {auth} from "./firebase";
import {signOut} from "firebase/auth";

const Sidebar = () => {
    const chats = {}; //Empty array to maintain chats;

    return (
        <div className="sidebar">
            {/*Header*/}
            <div className="sidebar-header">
                {/*Account avatar, currently logs the user out*/}
                <div className="sidebar-header-profile">
                    <IconButton onClick={() => signOut(auth)}><Avatar  sx={{ height:'4.5vmin',width:'4.5vmin'}}/></IconButton>
                </div>

                {/*Non-function STC buttons*/}
                <div className="sidebar-header-icons">
                    <IconButton> <MapsUgcRoundedIcon /> </IconButton>
                    <IconButton> <ChatIcon /> </IconButton>
                    <IconButton> <MoreVertIcon /> </IconButton>
                </div>

            </div>
            {/*Search-bar*/}
            <div className="sidebar-search">
                <div className="sidebar-searchContainer">
                    <ManageSearchOutlinedIcon />
                    <input placeholder="Find existing or new contacts" type="Text"/>
                </div>
            </div>

            {/*Chats*/}
            <div className="sidebar-chats">
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
                <SidebarChat chats={chats}/>
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