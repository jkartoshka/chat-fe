import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './MessageInputBox.css';

const MessageInputBox = ({ addMessage, userId, isNewChat, tags }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const newMessage = {
      userId: userId,
      userName: "You",
      messageId: uuidv4(), // Generate unique message ID
      text: message, // Message content
      timestamp: new Date(), // Current time
    };

    if (newMessage.text?.trim()) {
      addMessage(newMessage); // Pass the new message up to the parent component
      setMessage(''); // Clear the input field
    }
  };

  // Function to handle "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!isNewChat || (isNewChat && tags.length)) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="message-input">
      <TextField
        id="message-input"
        className="message-input"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
        value={message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                color="primary"
                onClick={handleSendMessage}
                disabled={isNewChat && tags.length === 0}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default MessageInputBox;
