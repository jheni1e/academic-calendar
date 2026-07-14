import { PrismaAssignmentRepository } from "../../modules/assignment/repositories/PrismaAssignmentRepository.ts";
import { AuthController } from "../../modules/auth/Controllers/authController.ts";
import { ClassUserController } from "../../modules/classUser/controllers/ClassUserControllers.ts";
import { UserController } from "../../modules/user/controllers/UserController.ts";
import { PrismaUserRepository } from "../../modules/user/repositories/PrismaUserRepository.ts";
import { Role } from "../../shared/enums/role.ts";
import { authMiddleware } from "../../shared/middlewares/auth.middleware.ts";
import { authorize } from "../../shared/middlewares/authorization.middleware.ts";

import { AuthService } from "../../shared/services/auth.service.ts";
import express from 'express'

//dependencias
const assignmentRepository = new PrismaAssignmentRepository();
const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository, assignmentRepository);
const userController = new UserController();
const classUserController = new ClassUserController();

const route = express.Router();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), userController.create)
    .get('/all', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR),userController.getAll)
    .get('/edv/:edv', authMiddleware, userController.getByEdv)
    .get('/id/:id', authMiddleware, userController.getById)
    .get('/classes', authMiddleware, classUserController.getByUser) 
    .get('/classes/:classId', authMiddleware, classUserController.getByClassAndUser)
    .put('/:id', authMiddleware, userController.update)
    .put('/disable/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), userController.disable)

export default route