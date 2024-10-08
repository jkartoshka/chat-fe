import './MessageInputBox.css';
import { useState } from 'react';

const MessageInputBox = ({addMessage}) => {
    const [message, setMessage] = useState('');
  
    const handleInputChange = (event) => {
      setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
          addMessage(message); // Pass the new message up to the parent component
          setMessage(''); // Clear the input field
        }
      };

  return (
    <div className="message-input-container">
        <input
          type="text"
          id="message-input"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageInputBox;
