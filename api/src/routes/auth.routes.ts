import express from 'express'
import { AuthController } from '../controllers/AuthController.ts';


const route = express.Router();

route 
    .post('/login', AuthController.login)

export default route