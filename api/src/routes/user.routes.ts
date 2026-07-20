import { ClassController } from "../controllers/ClassController.ts";
import { ClassUserController } from "../controllers/ClassUserControllers.ts";
import { ParticipationController } from "../controllers/ParticipationController.ts";
import { UserController } from "../controllers/UserController.ts";
import { Role } from "../shared/enums/role.ts";
import { authMiddleware } from "../shared/middlewares/auth.middleware.ts";
import { authorize } from "../shared/middlewares/authorization.middleware.ts";

import express from 'express'

//dependencias
const route = express.Router();

route 
    .post('/', UserController.create) // create new user

    .get('/all', UserController.getAll) // get all users
    .get('/edv/:edv', authMiddleware, UserController.getByEdv) // get user by edv
    .get('/id/:id', authMiddleware, UserController.getById) // get user by id
    .get('/classes', authMiddleware, ClassUserController.findClassUsersByUser) // get classes of the authenticated user
    .get('/classes/:classId', authMiddleware, ClassUserController.findClassUsersByClassAndUser) // get class by id 
    .get('/events/', authMiddleware, ParticipationController.findParticipationByUser) // get events by user

    .put('/:id', authMiddleware, UserController.update) // update user by id
    .put('/disable/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), UserController.disable) // disable a user instead of deleting them
    // .put('/enable/:id', ) // waiting implementation
    .put('/event/confirm/', authMiddleware, ParticipationController.updateParticipation) // confirm event participation

export default route