import express from 'express'
import { AuthController } from '../controllers/AuthController.ts';
import { validateLogin } from '../shared/middlewares/auth.middleware.ts';


const route = express.Router();

route 
    .post('/login', validateLogin, AuthController.login)

export default route