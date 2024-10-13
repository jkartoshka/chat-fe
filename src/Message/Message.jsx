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
        sx={{
          display: 'flex',
          justifyContent: isMyMessage ? 'flex-end' : 'flex-start', // Align messages based on ownership
          margin: '10px 0',
        }}
      >
        <Box sx={{ paddingRight: '10px' }}>
          {!isMyMessage && <UserAvatar chatTitle={message.userName} />}
        </Box>
        <Paper
          sx={{
            padding: '10px',
            maxWidth: '70%',
            backgroundColor: isMyMessage ? '#1976d2' : '#f1f1f1',
            borderRadius: '10px',
            wordWrap: 'break-word',
          }}
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
            sx={{
              textAlign: 'right',
              display: 'block',
              marginTop: '5px',
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
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
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
