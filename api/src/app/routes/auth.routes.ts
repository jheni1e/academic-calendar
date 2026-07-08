import express from 'express'
import { AuthController } from '../../modules/auth/Controllers/authController.ts';
import { AuthService } from '../../shared/services/auth.service.ts';
import { PrismaUserRepository } from '../../modules/user/repositories/PrismaUserRepository.ts';

//dependencias
const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const route = express.Router();

route 
    .post('/login', authController.login)

export default route