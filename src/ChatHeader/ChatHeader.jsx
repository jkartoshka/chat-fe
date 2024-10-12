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
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import './ChatHeader.css';

const ChatHeader = ({ chat, chatTitle, isNewChat, tags, setTags, deleteChat }) => {
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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteCht = () => {
    deleteChat(chat);
    handleClose();
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
        {!isNewChat && <UserAvatar chatTitle={chatTitle} />}
              <Box ml={2} sx={{ width: '100%' }}>
            {isNewChat ? (
              <>
                <Box display="flex" alignItems="center" color="#9e9e9e">
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
                    sx={{ width: '100%', paddingLeft: '10px', paddingTop: '3px' }}
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
          {!isNewChat && chat.chatId !== 0 && (
            <>
              <Box>
                <IconButton onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
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
