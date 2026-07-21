import express from 'express'
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { ClassController } from '../controllers/ClassController.ts';
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { ClassUserController } from '../controllers/ClassUserControllers.ts';
import { UserRole } from '../generated/prisma/enums.ts';

const route = express.Router();


route 
    .post('/', ClassController.create)
    .get('/all', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassController.findAll)
    .get('/:id', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassController.findClassById)
    .get('/participants/:id', authMiddleware, ClassUserController.findClassUsersByClass)

    .put('/:id', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassController.update)
    .put("/enable/:id", authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassController.enable)
    .put("/disable/:id", authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassController.disable)

    .post('/participants', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassUserController.create)
    .delete('/participants/:id', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassUserController.delete)
    .delete("/:id", authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassController.delete)

export default route