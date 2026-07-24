import express from 'express'
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { ClassController } from '../controllers/ClassController.ts';
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { ClassUserController } from '../controllers/ClassUserControllers.ts';
import { UserRole } from '../generated/prisma/enums.ts';
import { validateClassExistsById, validateCreate } from '../shared/middlewares/class.middleware.ts';
import { validateDelete } from '../shared/middlewares/classuser.middleware.ts';
import { validateDelete as validateDeleteClass } from '../shared/middlewares/class.middleware.ts'

const route = express.Router();


route 
    .post('/', validateCreate, ClassController.create) // create a new class
 
    .get('/all', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassController.findAll) // get all classes
    .get('/:id', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), validateClassExistsById, ClassController.findClassById) // get class by id

    .put('/:id', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), validateClassExistsById, ClassController.update) // get class by id
    .put("/enable/:id", authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), validateClassExistsById, ClassController.enable) // enable class
    .put("/disable/:id", authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), validateClassExistsById, ClassController.disable) // disable class

    .delete("/:id", authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), validateDeleteClass, ClassController.delete) // delete a class

export default route