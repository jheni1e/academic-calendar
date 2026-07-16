import express from 'express'
import { ClassController } from '../controllers/ClassController.ts';
import { ClassUserController } from '../controllers/ClassUserControllers.ts';
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';

const route = express.Router();

const classController = new ClassController();
const classUserController = new ClassUserController();

route 
    .post('/', classController.create)
    .get('/all', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), classController.getAll)
    .get('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), classController.getById)
    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), classController.update)
    .post('/participants', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), classUserController.create)
    .delete('/participants/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), classUserController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), classController.delete)

export default route