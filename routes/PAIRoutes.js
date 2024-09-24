import express from 'express'
import { AskFriendlyPAI } from '../controllers/PAIController.js';
import { isAuth } from '../utils/checkUserAuthorization.js';

const route = express.Router();

route.post('/ask-PAI', isAuth, AskFriendlyPAI)

export default route;
