import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import User from '../User/User';

const ChatList = ({ chats, userId, onChatSelect, selectedChat }) => {
    return (
    <List>
      {chats.map((chat) => {
        const lastMessage = chat.messages.slice(-1)[0];
        return (
          <ListItemButton
            key={chat.chatId}
            onClick={() => onChatSelect(chat)}
            selected={selectedChat?.chatId === chat.chatId}
          >
            {/* Avatar and Chat Name in the same container */}
            <Box display="flex" alignItems="center" width="100%">
              {/* Avatar */}
              <Box sx={{ minWidth: '40px', maxWidth: '40px' }}>
                <User chatTitle={chat?.name} />
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
                        {chat.name ? chat.name : 'New Chat'}
                      </span>

                      {/* Timestamp */}
                      {chat.name && lastMessage && (
                        <Box
                          sx={{
                            fontSize: '0.8rem',
                            color: '#6e6e6e',
                            whiteSpace: 'nowrap',
                          }}
                        >
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
                    <Box
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                      }}
                    >
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
  );
};

export default ChatList;
