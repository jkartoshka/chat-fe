import './Message.css';

const Message = ({content, timestamp}) => {
  // message_id
  // sender_id
  // chat_id
  // content
  // timestamp
  // is_read
  // message_type

  // Message status: message_id, user_id, is_read, reat_at
  return (
    <div className="message-container">
      <p>{content}</p>
    </div>
  );
};

export default Message;
