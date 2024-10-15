import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  AppBar,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import '../../global.css';
import UserAvatar from '../UserAvatar/UserAvatar';
import './ChatHeader.css';

const ChatHeader = ({
  chat, // Current chat object
  chatTitle, // Name of the chat
  isNewChat, // Boolean to indicate if it's a new chat
  tags, // List of participants of a new chat
  setTags, // Function to update tags array
  deleteChat, // Function to delete the chat
}) => {
  // State variable to manage the input field of a new chat
  const [newChatTitle, setNewChatTitle] = useState('');

  // Handles input change for entering new participant names
  const handleInputChange = (event) => {
    setNewChatTitle(event.target.value);
  };

  // Adds a new tag (participant) to chat
  const handleAddTag = () => {
    if (newChatTitle.trim()) {
      // Add the new tag to the tags array & clear the input field
      setTags([...tags, newChatTitle.trim()]);
      setNewChatTitle('');
    }
  };

  // Function to handle "Enter" key press to add a new chat participant
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Prevent default action & add the tag when Enter is pressed
      event.preventDefault();
      handleAddTag();
    }
  };

  // State & variables for handling the dropdown menu of a chat
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handles menu opening for additional chat options
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closes menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Deletes current chat & closes menu
  const deleteCht = () => {
    deleteChat(chat);
    handleClose();
  };

  const tagsContainerRef = useRef(null); // Create a ref for scrolling

   // Scroll to the end of the tag list when tags are updated
   useEffect(() => {
    if (tagsContainerRef.current) {
      tagsContainerRef.current.scrollLeft = tagsContainerRef.current.scrollWidth;
    }
  }, [tags]);

  return (
    <AppBar
      position="static" // Position the chat header at the top
      color="inherit" // Inherit color from theme
      elevation={0} // Remove shadow
      className="chat-header"
    >
      <Toolbar>
        {/* Avatar and Chat Title Section */}
        <Box display="flex" alignItems="center" flexGrow={1}>
          {/* Show avatar if it's not a new chat */}
          {!isNewChat && (
            <UserAvatar
              isGroupChat={chat.name.length > 1}
              chatTitle={chatTitle}
            />
          )}

          {/* Chat Title display/input */}
          <Box ml={2} className="chat-new-title">
            {isNewChat ? (
              <>
                {/* Input for adding participants to a chat */}
                <Box display="flex" alignItems="center" color="#9e9e9e">
                  To: {/* Display added tags/participants */}
                  <Box
                    display="flex"
                    alignItems="center"
                    className="chat-chip-container"
                    ref={tagsContainerRef}
                  >
                    {tags.map((tag, index) => (
                      <Chip
                        key={index}
                        // display paricipant name
                        label={tag}
                        className="chat-chip"
                        onDelete={() => {
                          // Remove the tag on delete
                          setTags(tags.filter((_, i) => i !== index));
                        }}
                      />
                    ))}
                  </Box>
                  {/* Input field for adding new participant name */}
                  <TextField
                    value={newChatTitle} // Bind input value to state
                    onChange={handleInputChange} // Update state on change
                    onKeyPress={handleKeyPress} // Handle "Enter" key to add participant
                    onBlur={handleAddTag}
                    autoFocus
                    className="chat-new-title new-chat-text-field"
                    variant="standard"
                    placeholder="Enter name"
                    InputProps={{
                      // Add Button at end of input field
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            onClick={handleAddTag}
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </>
            ) : (
              // Display chat title if not creating a new chat
              <Typography className="chat-title" variant="h6">
                {chatTitle}
              </Typography>
            )}   

          </Box>
          {/* Menu for deleting a chat */}
          {!isNewChat && chat.chatId !== 0 && (
            <>
              <Box>
                <IconButton onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {/* Menu item to delete chat */}
                <MenuItem onClick={deleteCht}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar> 
    </AppBar>
  );
};

export default ChatHeader;
