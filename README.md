# 💬 Real-Time Chat App

A modern, responsive real-time chatting application built with the MERN stack and Socket.IO for seamless instant messaging.

## ✨ Features

- **Real-time messaging** - Instant message delivery with Socket.IO
- **User authentication** - Secure login and registration system
- **Responsive design** - Works perfectly on desktop and mobile devices
- **Online status** - See who's currently online
- **Message history** - Persistent chat history stored in MongoDB
- **Clean UI** - Modern and intuitive user interface
- **Fast performance** - Optimized for speed and reliability

## 🛠️ Tech Stack

### Frontend
- **React** - Modern JavaScript library for building user interfaces
- **TailwindCSS** - Styling and responsive design
- **Socket.IO Client** - Real-time bidirectional event-based communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **Socket.IO** - Real-time communication library
- **JWT** - JSON Web Tokens for authentication

### Database
- **MongoDB** - NoSQL database for storing user data and messages
- **Mongoose** - MongoDB object modeling for Node.js

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/atharva-patil-23/Convo.git
   cd Convo
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Start the application**
   
   **Terminal 1 (Server):**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 (Client):**
   ```bash
   cd client
   npm start
   ```

6. **Access the app**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## 📁 Project Structure

```
realtime-chat-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── socket/            # Socket.IO handlers
│   ├── utils/             # Utility functions
│   ├── server.js          # Entry point
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile

### Messages
- `GET /api/messages` - Get chat messages
- `POST /api/messages` - Send new message
- `DELETE /api/messages/:id` - Delete message

## 🔌 Socket Events

### Client to Server
- `sendMessage` - Send a message
- `typing` - User is typing
- `disconnect` - User disconnected

### Server to Client
- `message` - Receive new message
- `userOnline` - User came online
- `userOffline` - User went offline
- `typing` - Someone is typing

## 📱 Screenshots


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Todo

- [ ] Add emoji support
- [ ] Implement file sharing
- [ ] Add voice messages
- [ ] Create group chats
- [ ] Add message reactions
- [ ] Implement push notifications
- [ ] Add dark mode theme

## 🐛 Known Issues

- Message delivery status not implemented yet

## 👨‍💻 Author

**Your Name**
- GitHub: [@atharva-patil-23](https://github.com/atharva-patil-23)
- LinkedIn: [Atharva Patil](https://www.linkedin.com/in/atharva-patil-081198258/)
- Email: anpatil.1223@gmail.com

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/atharva-patil-23/Convo?style=social)
![GitHub forks](https://img.shields.io/github/forks/atharva-patil-23/Convo?style=social)
![GitHub issues](https://img.shields.io/github/issues/atharva-patil-23/Convo)

---

⭐ If you found this project helpful, please give it a star!

Made with lots of ☕