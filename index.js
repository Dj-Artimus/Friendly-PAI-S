import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import connectDB from './database/database.config.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import PAIRoutes from './routes/PAIRoutes.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
));

const PORT = process.env.PORT || 5000;
const SERVER = process.env.SERVER || 'http://localhost';


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', PAIRoutes);
app.use((err, req, res, next) => {
    console.error('Global Error Handler:', err.stack);
    res.status(500).json({ message: 'An error occurred' });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res) => { 
    res.send("Your Friendly PAI Welcomes You")
 })

app.listen(PORT,() => {
    console.log(`The server is started on the port : ${PORT} \n You can visit the server on this link ${SERVER}:${PORT}`); 
    // mongoose connection
    connectDB();
 })