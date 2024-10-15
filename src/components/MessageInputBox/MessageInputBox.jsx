import SendIcon from '@mui/icons-material/Send';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import './MessageInputBox.css';

const MessageInputBox = ({
  message,      // Current Message text
  setMessage,   // Setting the Message text
  addMessage,   // Function for adding a message
  userId,       // Current user Id
  isNewChat,    // Boolean to indicate if it's a new chat
  tags,         // List of participants of a new chat
}) => {
  const handleSendMessage = () => {
    const newMessage = {
      userId: userId, // Current User Id
      userName: 'You', // Current User Name
      messageId: uuidv4(), // Generate unique message ID
      text: message, // Message content
      timestamp: new Date(), // Current time
    };

    if (newMessage.text?.trim()) {
      // If Message is not empty
      addMessage(newMessage); // Pass the new message up to the parent component
      setMessage(''); // Clear the input field
    }
  };

  // Function to handle "Enter" key press to add a new message
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Prevent default action & add the tag when Enter is pressed
      event.preventDefault();
      // If it is not a new chat then send message
      // Or it is a new chat & there are recipients
      if (!isNewChat || (isNewChat && tags.length)) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="message-input">
      {/* Input field for adding a new message */}
      <TextField
        id="message-input"
        className="message-input"
        onChange={(e) => {
          setMessage(e.target.value); // Update state on change
        }}
        onKeyPress={handleKeyPress} // Handle "Enter" key to add a message
        placeholder="Type a message"
        value={message} // Bind input value to state
        InputProps={{
          // Send Button at end of input field
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                color="primary"
                onClick={handleSendMessage}
                // disable when it is a new chat, and there are no recipients
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
