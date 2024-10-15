import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';

// Function for determining color of avatar based on name hash
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Extract the RGB components
  const red = (hash & 0xff0000) >> 16; // Red
  const green = (hash & 0x00ff00) >> 8; // Green
  const blue = hash & 0x0000ff; // Blue

  // Create pastel-like colors by scaling down the RGB values
  const pastelFactor = 0.6; // Reduces the intensity for a pastel effect
  const newRed = Math.min(255, Math.floor(red * pastelFactor + 255 * 0.4)); // Blend with white
  const newGreen = Math.min(255, Math.floor(green * pastelFactor + 255 * 0.4)); // Blend with white
  const newBlue = Math.min(255, Math.floor(blue * pastelFactor + 255 * 0.4)); // Blend with white

  // Construct the pastel color string
  const color = `#${`00${newRed.toString(16)}`.slice(-2)}${`00${newGreen.toString(16)}`.slice(-2)}${`00${newBlue.toString(16)}`.slice(-2)}`;

  return color;
}

// Avatar Props
function stringAvatar(name, isGroupChat) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children:
      name === '' ? null : isGroupChat ? (
        <GroupsIcon />
      ) : (
        `${name?.split('')[0]?.[0]}`
      ),
  };
}

const UserAvatar = ({ chatTitle, isGroupChat }) => {
  return <Avatar {...stringAvatar(chatTitle, isGroupChat)} />;
};

export default UserAvatar;
