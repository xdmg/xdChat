import './Message.css';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Message = ({message}) => {
    message.name = "username";
    message.text = "this is a test ching chong ling long";
    message.timestamp = "3:10 PM";
    console.log(message);
    // message.isSender = true;
    if (message.isSender) {
        return (
            <p className="messages-sender">
                <div className="messages-Text-sender">
                    <time dateTime={message.timestamp} className="messages-Timestamp-sender">
                        {message.timestamp}
                    </time>
                    {message.text}
                </div>
                <div className="messages-Text-sender">
                    <time dateTime={message.timestamp} className="messages-Timestamp-sender">
                        {message.timestamp}
                    </time>
                    <p>
                    aaa
                    </p>
                </div>
            </p>
        )
    } else {
        return (
            <p className="messages">
            <span className="messages-Name">
                <b>{message.name}</b>
            </span>
                <div className="messages-Text">
                    {message.text}
                    <time dateTime={message.timestamp} className="messages-Timestamp">
                        {message.timestamp}
                    </time>
                </div>
            </p>
        )
    }

}

export default Message;