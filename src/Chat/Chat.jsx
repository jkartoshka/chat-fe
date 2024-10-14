import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useRef, useState } from 'react';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatList from '../ChatList/ChatList';
import MessageInputBox from '../MessageInputBox/MessageInputBox';
import MessageList from '../MessageList/MessageList';
import './Chat.css';

const Chat = () => {
  const userId = 123; // This could be dynamically set after login
  const [chats, setChats] = useState([
    { chatId: 0, name: ['You'], messages: [] },
    {
      chatId: 1,
      name: ['Lisa'],
      messages: [
        {
          userId: 124,
          userName: 'Lisa',
          messageId: 'bobs-message',
          text: 'hey!',
          timestamp: new Date(),
        },
      ],
    },
    {
      chatId: 2,
      name: ['Bob', 'Julia'],
      messages: [
        {
          userId: 124,
          userName: 'Bob',
          messageId: 'lisas-message',
          text: 'Hey! I hope that you are well',
          timestamp: new Date(2024, 3, 8, 8, 8),
        },
        {
          userId: 123,
          messageId: 'my-message',
          text: 'Whats up?',
          timestamp: new Date(2024, 3, 10, 8, 12),
        },
        {
          userId: 125,
          userName: 'Julia',
          messageId: 'lisas-message-1',
          text: 'What are your plans for the weekend?',
          timestamp: new Date(2024, 3, 10, 8, 15),
        },
      ],
    },
  ]);
  const [selectedChat, setSelectedChat] = useState({
    chatId: 0,
    name: ['You'],
    messages: [],
  });
  const [tags, setTags] = useState([]); // Tags from header
  const [isNewChat, setIsNewChat] = useState(false);
  const [chatTitle, setChatTitle] = useState('You'); // Chat title from header

  const deleteChat = (deleteChat) => {
    const updatedChats = chats.filter(
      (chat) => chat.chatId !== deleteChat.chatId,
    );
    setChats(updatedChats);

    // Select the next chat (if it exists)
    const nextChat =
      updatedChats[deleteChat.chatId] ||
      updatedChats[deleteChat.chatId - 1] ||
      null;

    setSelectedChat(nextChat);
    setChatTitle(nextChat.name.join(', '));
  };

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
    // Helper function to update the chat title in the chats array
    const updateChatTitle = (newTitle) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.chatId === selectedChat.chatId
            ? { ...chat, name: newTitle, messages: [...chat.messages, message] } // Update the chat name and add new message
            : chat,
        ),
      );
    };

    if (isNewChat) {
      const newTitle = tags || ['New Chat']; // Use the first tag or fallback to 'New Chat'
      setChatTitle(newTitle.join(', ')); // Set the new chat title
      updateChatTitle(newTitle); // Update the chats array with the new title
      // Update the selected chat
      setSelectedChat((prevChat) => ({
        chatId: prevChat.chatId,
        name: tags || ['User'], // Use updated chatTitle or fallback
        messages: [...prevChat.messages, message], // Add the new message
      }));
    } else {
      // If not a new chat, just update the existing chat with the new message
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.chatId === selectedChat.chatId
            ? { ...chat, messages: [...chat.messages, message] } // Add new message to existing chat
            : chat,
        ),
      );
      // Update the selected chat
      setSelectedChat((prevChat) => ({
        chatId: prevChat.chatId,
        name: chatTitle.split(', ') || ['User'], // Use updated chatTitle or fallback
        messages: [...prevChat.messages, message], // Add the new message
      }));
    }

    // Reset state for new chat and tags
    setIsNewChat(false);
    setTags([]);
  };

  const selectChat = (chat) => {
    setChatTitle(chat.name.join(', '));
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
      name: [],
      messages: [],
    };
    setIsNewChat(true);
    setChats([...chats, newChat]);
    setSelectedChat(newChat);
  };
  let lastMessageDate = null;
  const messagesEndRef = useRef(null); // Create a ref for scrolling

  useEffect(() => {
    // Scroll to the bottom of the messages container when a new message is added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]); // Listen to changes in messages array

  return (
    <Grid container className="chat-container">
      {/* Chat list on the left */}
      <Grid
        item
        size={{xs: 12, sm: 4, md: 3}}
        className="chat-list"
      >
        <ChatList
          addChat={addChat}
          isNewChat={isNewChat}
          chats={chats}
          userId={userId}
          onChatSelect={selectChat}
          selectedChat={selectedChat}
        />
      </Grid>

      {/* Chat window on the right */}
      <Grid
        item
        size={{xs: 12, sm: 8, md: 9}}
        className="chat-window"
      >
        {selectedChat && (
          <Box className="chat-window">
            {/* Chat Header */}
            <ChatHeader
              chat={selectedChat}
              chatTitle={chatTitle}
              isNewChat={isNewChat}
              tags={tags}
              setTags={setTags}
              deleteChat={deleteChat}
            />

            {/* Messages List */}
            <MessageList
              selectedChat={selectedChat}
              userId={userId}
              deleteMessage={deleteMessage}
              messagesEndRef={messagesEndRef}
              lastMessageDate={lastMessageDate}
            />

            {/* Message Input */}
            <Box className="chat-message-input">
              <MessageInputBox
                addMessage={addMessage}
                userId={userId}
                isNewChat={isNewChat}
                tags={tags}
              />
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Chat;
