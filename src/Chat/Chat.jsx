import Message from '../Message/Message';
import MessageInputBox from '../MessageInputBox/MessageInputBox';
import { useState } from 'react';
import { Box, Stack } from '@mui/material';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  // Adding a new message
  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <Box>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}
      >
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </Stack>
      <MessageInputBox addMessage={addMessage} />
    </Box>
  );
};

export default Chat;
