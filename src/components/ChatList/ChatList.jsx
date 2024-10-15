import AddIcon from '@mui/icons-material/Add';
import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import '../../global.css';
import UserAvatar from '../UserAvatar/UserAvatar';
import './ChatList.css';

const ChatList = ({
  chats, // Chats array object
  userId, // Current user Id
  onChatSelect, // Function for selecting a chat
  selectedChat, // Current selected chat object
  addChat, // Function to add a new chat
  isNewChat, // Boolean to indicate if it's a new chat
}) => {
  return (
    <>
      {/* Chat List Header */}
      <AppBar
        elevation={0} // Remove shadow
        position="static" // Position chat list header at the top
        color="default" // Use defuult color
        className="chat-list-header"
      >
        <Toolbar className="chat-toolbar">
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Typography className="chat-title" variant="h6">
              Chat
            </Typography>
          </Box>
          {/* Button for adding a new chat */}
          <Tooltip title="New Chat">
            <IconButton onClick={addChat} disabled={isNewChat}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <List>
        {chats.map((chat) => {
          const lastMessage = chat.messages.slice(-1)[0];
          return (
            <ListItemButton
              key={chat.chatId}
              onClick={() => onChatSelect(chat)}
              selected={selectedChat?.chatId === chat.chatId}
            >
              <Box display="flex" alignItems="center" width="100%">
                {/* Avatar */}
                <Box className="chat-avatar">
                  {chat.name && (
                    <UserAvatar
                      isGroupChat={chat.name.length > 1}
                      chatTitle={chat?.name.join(', ')}
                    />
                  )}
                </Box>

                {/* Chat Name and Last Message */}
                <Box ml={2} flexGrow={1} overflow="hidden">
                  <ListItemText
                    primary={
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                      >
                        {/* Chat Name */}
                        <span
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {chat.name.length !== 0
                            ? chat.name.join(', ')
                            : 'New Chat'}
                        </span>

                        {/* Timestamp */}
                        {chat.name && lastMessage && (
                          <Box className="chat-timestamp">
                            {new Date(lastMessage?.timestamp).toDateString() ===
                            new Date().toDateString()
                              ? new Date(lastMessage?.timestamp)
                                  .toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                  .replace(/^0+/, '')
                              : `${new Date(lastMessage?.timestamp).getMonth() + 1}/${new Date(lastMessage?.timestamp).getDate()}`}
                          </Box>
                        )}
                      </Box>
                    }
                    secondary={
                      <Box className="chat-last-message">
                        {lastMessage?.userId === userId
                          ? `You: ${lastMessage?.text}`
                          : lastMessage?.text}
                      </Box>
                    }
                  />
                </Box>
              </Box>
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
};

export default ChatList;
