import "./Message.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import {IconButton} from "@mui/material";
import axios from "./axios";

const Message = ({message}) => {

    //Function to handle deletion;
    const deletionHandler = async (delId) => {
        await axios
            .delete("/api/v1/messages/delete", {
                data: {id: delId,},
            }).catch((e) => console.log(e.message));
    };

    //If the sender is the user;
    if (message.sender === "sender1") {
        return (
            <div className={`messages-sender ${message.sender === message.prevSender && "messages-sender-Consecutive"}`}>
                <div className="messages-Text-sender">
                    {message.message}
                    <div className="messages-delete">
                        <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => deletionHandler(message._id)}>
                            <ArrowDropDownCircleOutlinedIcon fontSize="inherit"/>
                        </IconButton>
                    </div>
                    <time dateTime={message.timestamp}
                          className="messages-Timestamp-sender">
                        {message.timestamp}
                    </time>
                </div>
            </div>
        );
    }

    return (
        <div className={`messages ${
            message.sender === message.prevSender && "messages-Consecutive"}`}>
        <span
            className={`messages-Name ${
                message.sender === message.prevSender && "messages-Hidden"}`}>
            <b>{message.sender}</b>
        </span>
            <div className="messages-Text">
                {message.message}
            </div>
            <time dateTime={message.timestamp} className="messages-Timestamp">
                {message.timestamp}
            </time>
        </div>
    );
};

export default Message;
