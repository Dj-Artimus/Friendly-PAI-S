import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import connectDB from './database/database.config.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import PAIRoutes from './routes/PAIRoutes.js';
import http from 'http';  // Add http for Socket.IO integration
import { Server } from 'socket.io';  // Import Socket.IO

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', PAIRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ message: 'An error occurred' });
});

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Home route
app.get('/', (req, res) => {
  res.send('Your Friendly PAI Welcomes You');
});

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.IO connection handling
io.on('connection', (socket) => {
});

// Start the server
const PORT = process.env.PORT || 5000;
const SERVER = process.env.SERVER || 'http://localhost';

server.listen(PORT, () => {
  console.log(`The server is started on the port: ${PORT}`);
  console.log(`You can visit the server on this link: ${SERVER}:${PORT}`);

  // Connect to the database
  connectDB();
});