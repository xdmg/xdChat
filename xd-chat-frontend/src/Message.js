import "./Message.css";
// import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "./axios";

const Message = ({ message }) => {
  const delHandler = async (delId) => {
    await axios
      .delete("/api/v1/messages/delete", {
        data: {
          id: delId,
        },
      })
      .then((_) => {
        console.log(delId);
      });
  };

  if (message.sender === "sender1") {
    return (
      <p
        className={`messages-sender ${
          message.sender === message.prevSender && "messages-sender-Consecutive"
        }`}
      >
        <div className="messages-Text-sender">
          <time
            dateTime={message.timestamp}
            className="messages-Timestamp-sender"
          >
            {message.timestamp}
          </time>
          {message.message}
          <div className="messages-delete">
            <IconButton
              size="small"
              color="inherit"
              onClick={() => delHandler(message._id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      </p>
    );
  } else {
    return (
      <p
        className={`messages ${
          message.sender === message.prevSender && "messages-Consecutive"
        }`}
      >
        <span
          className={`messages-Name ${
            message.sender === message.prevSender && "messages-Hidden"
          }`}
        >
          <b>{message.sender}</b>
        </span>
        <div className="messages-Text">
          {message.message}
          <time dateTime={message.timestamp} className="messages-Timestamp">
            {message.timestamp}
          </time>
        </div>
      </p>
    );
  }
};

export default Message;
