import { ClassController } from "../controllers/ClassController.ts";
import { ClassUserController } from "../controllers/ClassUserControllers.ts";
import { ParticipationController } from "../controllers/ParticipationController.ts";
import { UserController } from "../controllers/UserController.ts";
import { authMiddleware } from "../shared/middlewares/auth.middleware.ts";
import { authorize } from "../shared/middlewares/authorization.middleware.ts";

import express from 'express'
import { validateActivate, validateCreate, validateDisable, validateUpdate, validateUserExistsByEdv, validateUserExistsById } from "../shared/middlewares/user.middleware.ts";
import { UserRole } from "../generated/prisma/enums.ts";
import { validateClassUserExistsByClassAndUser } from "../shared/middlewares/classuser.middleware.ts";
import { AuthController } from "../controllers/AuthController.ts";
import { EventController } from "../controllers/EventController.ts";

//dependencias
const route = express.Router();

route 
    .post('/', validateCreate, UserController.create) // create new user

    .get('/all', authMiddleware, UserController.getAll) // get all users
    .get('/edv/:edv', authMiddleware, validateUserExistsByEdv, UserController.getByEdv) // get user by edv
    .get('/id/:id', authMiddleware, validateUserExistsById, UserController.getById) // get user by id
    .get('/classes', authMiddleware, ClassUserController.findClassUsersByUser) // get classes of the authenticated user
    .get('/classes/:classId', authMiddleware, validateClassUserExistsByClassAndUser, ClassUserController.findClassUsersByClassAndUser) // get class by id 
    .get('/events/', authMiddleware, EventController.findEventsByUser)
    .get('/instructors', authMiddleware, UserController.getInstructors) // get instructors and admins
    .get('/subjects/:', authMiddleware, UserController.findSubjectByInstructor)

    .put('/:id', authMiddleware, validateUpdate, UserController.update) // update user by id
    .put('/disable/:id', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), validateDisable, UserController.disable) // disable a user instead of deleting them
    .put('/enable/:id', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), validateActivate, UserController.activate) // waiting implementation
    .put('/event/confirm/:id', authMiddleware, ParticipationController.updateParticipation) // confirm event participation

export default route