import express from 'express'
import { AskFriendlyPAI} from '../controllers/PAIController.js';
import { upload, UploadImage } from '../controllers/uploadsController.js';
import { isAuth } from '../utils/checkUserAuthorization.js';

const route = express.Router();

route.post('/ask-PAI', isAuth, AskFriendlyPAI)
route.post('/upload-img', upload.single('image') , UploadImage)

export default route;
