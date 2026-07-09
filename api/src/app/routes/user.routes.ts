import { AuthController } from "../../modules/auth/Controllers/authController.ts";
import { UserController } from "../../modules/user/controllers/UserController.ts";
import { PrismaUserRepository } from "../../modules/user/repositories/PrismaUserRepository.ts";
import { AuthService } from "../../shared/services/auth.service.ts";
import express from 'express'

//dependencias
const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
const userController = new UserController();

const route = express.Router();

route 
    .post('/create', userController.create)
    .get('/all', userController.getAll)

export default route