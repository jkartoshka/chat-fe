import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const ChatList = ({ chats, onChatSelect, selectedChat }) => {
  return (
    <List>
      {chats.map((chat) => (
        <ListItemButton
          key={chat.chatId}
          onClick={() => onChatSelect(chat)}
          selected={selectedChat?.chatId === chat.chatId}
        >
          <ListItem >
            <ListItemText primary={chat.name ? chat.name : 'New Chat'} />
          </ListItem>
        </ListItemButton>
      ))}
    </List>
  );
};

export default ChatList;
