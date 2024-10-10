import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './MessageInputBox.css';
import SendIcon from '@mui/icons-material/Send';

const MessageInputBox = ({ addMessage, userId }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const newMessage = {
      userId: userId,
      messageId: uuidv4(), // Generate unique message ID
      text: message,             // Message content
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), // Current time
    };
    if (newMessage.text?.trim()) {
      addMessage(newMessage); // Pass the new message up to the parent component
      setMessage(''); // Clear the input field
     }
  };

   // Function to handle "Enter" key press
   const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default action (like form submit)
      handleSendMessage(); // Call send message function
    }
  };

  return (
    <div className="message-input-container">
      <TextField
        id="message-input"
        className="message-input-container"
        onChange={handleInputChange}
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
