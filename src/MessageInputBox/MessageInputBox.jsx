import './MessageInputBox.css';
import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const MessageInputBox = ({ addMessage }) => {
  const [message, setMessage] = useState({
    text: '',
    timestamp: null,
    sender: ''
  });

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,             // Message content
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), // Current time
        sender: 'User',                // Example sender
      };
      addMessage(newMessage); // Pass the new message up to the parent component
      setMessage({}); // Clear the input field
    }
  };

  return (
    <div className="message-input-container">
      <TextField
        id="message-input"
        className="message-input-container"
        onChange={handleInputChange}
        placeholder="Type a message"
        value={message.text}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                color="primary"
                onClick={handleSendMessage}
              >
                <ArrowUpwardIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default MessageInputBox;
