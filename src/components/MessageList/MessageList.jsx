import { Stack, Typography } from '@mui/material';
import Message from '../Message/Message';
import './MessageList.css'

const MessageList = ({
  selectedChat,    // The currently selected chat, containing messages
  userId,          // The ID of the current user (to identify message ownership)
  deleteMessage,   // Function to delete a message
  messagesEndRef,  // Reference to the last message for scrolling
  lastMessageDate, // Tracks the last message's date to display date separators
}) => {
    return (
    <Stack
        direction="column"      // Messages stacked vertically
        spacing={2}             // Spacing between messages
        className="message-list"
      >
        {/* Loop through the messages of a selected chat */}
        {selectedChat.messages.map((message, index) => {
          // Logic for showing date separator
          const messageDate = message.timestamp.toDateString();
          const showDate = lastMessageDate !== messageDate;
          lastMessageDate = messageDate;
          return (
            <div>
              {/* Date separator */}
              {showDate && (
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                >
                  {message.timestamp.toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              )}

              {/* Render message */}
              <Message
                currentUserId={userId}
                message={message}
                key={index}
                deleteMessage={deleteMessage}
              />
              {/* div as the scroll target */}
              <div ref={messagesEndRef} />
            </div>
          );
        })}
      </Stack>
    );
}

export default MessageList;