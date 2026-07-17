import express from 'express'
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { ClassController } from '../controllers/ClassController.ts';
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { ClassUserController } from '../controllers/ClassUserControllers.ts';

const route = express.Router();


route 
    .post('/', ClassController.create)
    .get('/all', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ClassController.findAll)
    .get('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ClassController.findClassById)
    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ClassController.update)
    .post('/participants', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ClassUserController.create)
    .delete('/participants/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ClassUserController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ClassController.delete)

export default route