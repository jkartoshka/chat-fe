import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import UserAvatar from '../UserAvatar/UserAvatar';
import './Message.css';

const Message = ({
  currentUserId, // Current User Id
  message, // Current Message Object
  deleteMessage, // Function for deleting a message
}) => {
  // Boolean for determining whether the message is sent from the current user
  const isMyMessage = message.userId === currentUserId;

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
  const deleteMsg = () => {
    deleteMessage(message);
    handleClose();
  };

  return (
    <>
      <Box
        className="message-container"
        sx={{
          // Align messages based on ownership
          justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
        }}
      >
        {/* Message Avatar */}
        <Box className="message-avatar">
          {!isMyMessage && <UserAvatar chatTitle={message.userName} />}
        </Box>

        {/* Message Section */}
        <Paper
          sx={{
            // Changes background color based on  ownership
            backgroundColor: isMyMessage ? '#1976d2' : '#f1f1f1',
          }}
          className="message"
          // Removes shadow
          elevation={0}
          // Opens menu on click
          onClick={handleClick}
        >
          {/* Message Text */}
          <Typography
            variant="body1"
            // Changes color of text based on ownership
            sx={{ color: isMyMessage ? 'white' : 'black' }}
          >
            {message.text}
          </Typography>

          {/* Message Timestamp */}
          <Typography
            variant="caption"
            className="message-timestamp"
            sx={{
              color: isMyMessage ? 'white' : 'black',
            }}
          >
            {message.timestamp
              .toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
              .replace(/^0+/, '')}
          </Typography>
        </Paper>
      </Box>

      {/* Menu for deleting a chat */}
      {isMyMessage && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {/* Menu item to delete chat */}
          <MenuItem onClick={deleteMsg}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default Message;
