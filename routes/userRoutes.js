import express from 'express';
import {createChat, createProfile, delChat, getAllChats, getChatConversations, getLatestChat, getProfile } from '../controllers/userController.js';
import { isAuth } from '../utils/checkUserAuthorization.js';

const router = express.Router();

router.post('/create-profile', isAuth, createProfile);
router.get('/get-profile', isAuth, getProfile);
router.post('/create-chat', isAuth, createChat);
router.get('/get-latest-chat', isAuth , getLatestChat )
router.get('/get-all-chats', isAuth , getAllChats )
router.get('/get-chat-conversation/:chatId', isAuth, getChatConversations )
router.delete('/del-chat', isAuth, delChat)

export default router;