# Chat Frontend Application

This is a frontend-only chat application built using React and Material UI (MUI). The application simulates a real-time messaging interface with features such as chat list management, user avatars, timestamp display, and message input.

## Tech Stack

React: Core framework used for building the UI.
Material UI (MUI): UI component library used for styling and responsive design.
MUI Grid v2: For responsive, mobile-friendly layouts.
React Hooks: Used for state management and side effects.
JavaScript (ES6): The main language used for logic and functionality.

## Installation

To run the project locally, follow these steps:

Clone the repository:

`git clone https://github.com/jkartoshka/chat-fe.git`
`cd chat-frontend`

Install dependencies: Make sure you have Node.js installed, then run:
`npm install`

Run the development server:
`npm start`
The app will be available at http://localhost:3000.

## Usage

### Existing Chats

A chat list is displayed on the left with mock data of messages.
Select a chat from the chat list to view or send messages.
The chat window will display messages with timestamps and user names.

### Starting a New Chat

Click on "+" in Chat List Header to start a new conversation.
Add participants by typing in the input box and pressing the "+" button.
The participants will display as chips in the header.
Start typing and send messages.
Once you send a message the chat will be created.

### Group Chats

Add multiple participants in a new chat to create a group conversation.
Group participants are displayed with their avatars and names.
