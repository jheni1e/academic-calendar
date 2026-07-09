import { PrismaAssignmentRepository } from "../../modules/assignment/repositories/PrismaAssignmentRepository.ts";
import { AuthController } from "../../modules/auth/Controllers/authController.ts";
import { UserController } from "../../modules/user/controllers/UserController.ts";
import { PrismaUserRepository } from "../../modules/user/repositories/PrismaUserRepository.ts";
import { AuthService } from "../../shared/services/auth.service.ts";
import express from 'express'

//dependencias
const assignmentRepository = new PrismaAssignmentRepository();
const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository, assignmentRepository);
const userController = new UserController();

const route = express.Router();

route 
    .post('/create', userController.create)
    .get('/all', userController.getAll)

export default route