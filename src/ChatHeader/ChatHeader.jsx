import React, { useState } from 'react';
import {
  AppBar,
  Chip,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const ChatHeader = ({ chatTitle, isNewChat, tags, setTags }) => {
  const [newChatTitle, setNewChatTitle] = useState('');
  const handleInputChange = (event) => {
    setNewChatTitle(event.target.value);
  };

  const handleAddTag = () => {
    if (newChatTitle.trim()) {
      // Add the new tag to the state
      setTags([...tags, newChatTitle.trim()]);
      setNewChatTitle(''); // Clear the input field
    }
  };

  // Function to handle "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default action (like form submit)
      handleAddTag(); // Call add tag function
    }
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid #ddd' }}
    >
      <Toolbar>
        {/* Avatar and Chat Title */}
        <Box display="flex" alignItems="center" flexGrow={1}>
          {/* <Avatar alt={chatTitle} src={avatarUrl} /> */}
          <Box ml={2} sx={{ width: '100%' }}>
            {isNewChat ? (
              <>
                <Box display="flex" alignItems="center">
                  To:{' '}
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ marginLeft: '10px' }}
                  >
                    {tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        sx={{ marginRight: '5px' }}
                        onDelete={() => {
                          // Remove the tag on delete
                          setTags(tags.filter((_, i) => i !== index));
                        }}
                      />
                    ))}
                  </Box>
                  <TextField
                    value={newChatTitle}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    sx={{ width: '100%', paddingLeft: '10px' }}
                    variant="standard"
                    placeholder="Enter name"
                    InputProps={{
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
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                {chatTitle}
              </Typography>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ChatHeader;
