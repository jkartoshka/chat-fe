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
import './Message.css'

const Message = ({ currentUserId, message, deleteMessage }) => {
  const isMyMessage = message.userId === currentUserId;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
          justifyContent: isMyMessage ? 'flex-end' : 'flex-start'
        }}
      >
        <Box className="message-avatar">
          {!isMyMessage && <UserAvatar chatTitle={message.userName} />}
        </Box>
        <Paper
          sx={{backgroundColor: isMyMessage ? '#1976d2' : '#f1f1f1'}}
          className="message"
          elevation={0}
          onClick={handleClick}
        >
          <Typography
            variant="body1"
            sx={{ color: isMyMessage ? 'white' : 'black' }}
          >
            {message.text}
          </Typography>
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
      {isMyMessage && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
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
