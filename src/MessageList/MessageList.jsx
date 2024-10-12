import { Stack, Typography } from '@mui/material';
import Message from '../Message/Message';

const MessageList = ({selectedChat, userId, deleteMessage, messagesEndRef, lastMessageDate}) => {
    return (
    <Stack
        direction="column"
        spacing={2}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '16px',
          justifyContent: 'flex-start',
        }}
      >
        {selectedChat.messages.map((message, index) => {
          const messageDate = message.timestamp.toDateString();

          const showDate = lastMessageDate !== messageDate;
          lastMessageDate = messageDate; // Update for the next message
          return (
            <div>
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
              <Message
                chatTitle={selectedChat?.name}
                currentUserId={userId}
                message={message}
                key={index}
                deleteMessage={deleteMessage}
              />
              {/* This div will act as the scroll target */}
              <div ref={messagesEndRef} />
            </div>
          );
        })}
      </Stack>
    );
}

export default MessageList;