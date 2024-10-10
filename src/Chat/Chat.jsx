import AddIcon from '@mui/icons-material/Add';
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatList from '../ChatList/ChatList';
import Message from '../Message/Message';
import MessageInputBox from '../MessageInputBox/MessageInputBox';

const Chat = () => {
  const userId = 123; // This could be dynamically set after login
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([
    { chatId: 0, name: 'You', messages: [] },
    {
      chatId: 1,
      name: 'Bob',
      messages: [
        {
          userId: 124,
          messageId: 'bobs-message',
          text: 'hey!',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ],
    },
    { chatId: 2, name: 'Charlie', messages: [] },
  ]);
  const [tags, setTags] = useState([]); // Tags from header
  const [isNewChat, setIsNewChat] = useState(false);
  

  const [chatTitle, setChatTitle] = useState(''); // Chat title from header

  const deleteMessage = (message) => {
    if (message.userId === userId) {
      setSelectedChat({
        chatId: selectedChat.chatId,
        name: selectedChat.name,
        messages: selectedChat.messages.filter(
          (msg) => msg.messageId !== message.messageId,
        ),
      });
    }
  };

  const addMessage = (message) => {
    if (isNewChat) {  
      // Set chatTitle to the new title
      setChatTitle(tags[0]);
  
      // Update the chats array with the new chat title
      setChats(
        chats.map((chat) =>
          chat.chatId === selectedChat.chatId
            ? { ...chat, name: tags[0] } // Use newTitle directly
            : chat
        )
      );
    }
  
    // After setting chatTitle and updating chats, you can then update the selected chat
    setIsNewChat(false);
  
    setSelectedChat({
      chatId: selectedChat.chatId,
      name: chatTitle || 'hello', // Fallback to 'hello' if chatTitle is not yet updated
      messages: [...selectedChat.messages, message],
    });
    
    setTags([]);
  };

  const selectChat = (chat) => {
    setChatTitle(chat.name);
    setSelectedChat(chat);

    if (isNewChat) {
      setIsNewChat(false);
      const updatedChats = chats.slice(0, chats.length - 1);
      setChats(updatedChats);
    }
  };

  const addChat = () => {
    let newChat = {
      chatId: chats.length,
      name: '',
      messages: [],
    };
    setIsNewChat(true);
    setChats([...chats, newChat]);
    setSelectedChat(newChat);
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Chat list on the left */}
      <Grid
        item
        size={3}
        sx={{
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
        }}
      >
        <AppBar
          elevation={0}
          position="static"
          color="default"
          sx={{ borderBottom: '1px solid #ddd' }}
        >
          <Toolbar sx={{ paddingRight: '10px !important' }}>
            <Box display="flex" alignItems="center" flexGrow={1}>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                Chat
              </Typography>
            </Box>
            <Tooltip title="New Chat">
              <IconButton onClick={addChat} disabled={isNewChat}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <ChatList
          chats={chats}
          onChatSelect={selectChat}
          selectedChat={selectedChat}
        />
      </Grid>

      {/* Chat window on the right */}
      <Grid item size={9} sx={{ display: 'flex', flexDirection: 'column' }}>
        {selectedChat && (
          <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            {/* Chat Header */}
            <ChatHeader
              chatTitle={chatTitle}
              setChatTitle={setChatTitle}
              isNewChat={isNewChat}
              tags={tags}
              setTags={setTags}
            />

            {/* Messages List */}
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
              {selectedChat.messages.map((message, index) => (
                <Message
                  currentUserId={userId}
                  message={message}
                  key={index}
                  deleteMessage={deleteMessage}
                />
              ))}
            </Stack>

            {/* Message Input */}
            <Box sx={{ padding: '10px' }}>
              <MessageInputBox addMessage={addMessage} userId={userId} />
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Chat;
