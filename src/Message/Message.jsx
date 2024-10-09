import './Message.css';
import { Paper, Typography } from '@mui/material';

const Message = ({message}) => {
  // message_id
  // sender_id
  // chat_id
  // content
  // timestamp
  // is_read
  // message_type

  // Message status: message_id, user_id, is_read, reat_at
  return (
    <Paper 
            // key={index}
            sx={{
              padding: '10px',
              maxWidth: '70%',
              backgroundColor: '#1976d2', 
              borderRadius: '10px',
              wordWrap: 'break-word'
            }}
          >
            <Typography variant="body1" sx={{ color: 'white' }}>
              {message.text}
            </Typography>
            <Typography variant="caption" sx={{ textAlign: 'right', display: 'block', marginTop: '5px', color: 'white' }}>
              {message.timestamp}
            </Typography>
          </Paper>
  );
};

export default Message;
