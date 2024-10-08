import Message from '../Message/Message';
import MessageInputBox from '../MessageInputBox/MessageInputBox';
import { useState } from 'react';

const Chat = () => {
  // chat_id
  // chat_type (single, group)
  // participant ids
  // created_at
  // updated_at
  // last_message_id

  const [messages, setMessages] = useState([]);

  // Adding a new message
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <>
      <div className="chat-container">
        {messages.map((message, index) => (
            <div key={index} className="message">
            <Message content={message}/>
          </div>
        ))}
        
      </div>
      <MessageInputBox addMessage={addMessage}/>
    </>
  );
};

export default Chat;
