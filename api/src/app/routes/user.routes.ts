import { PrismaAssignmentRepository } from "../../modules/assignment/repositories/PrismaAssignmentRepository.ts";
import { AuthController } from "../../modules/auth/Controllers/authController.ts";
import { UserController } from "../../modules/user/controllers/UserController.ts";
import { PrismaUserRepository } from "../../modules/user/repositories/PrismaUserRepository.ts";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.ts";
import { AuthService } from "../../shared/services/auth.service.ts";
import express from 'express'

//dependencias
const assignmentRepository = new PrismaAssignmentRepository();
const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository, assignmentRepository);
const userController = new UserController();

const route = express.Router();

route 
    .post('/', userController.create)
    .get('/all', userController.getAll)
    .get('/edv/:edv', userController.getByEdv)
    .get('/id/:id', userController.getById)
    .put('/:id', authMiddleware, userController.update)

export default route