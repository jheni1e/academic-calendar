import express from 'express'
import { RoomController } from '../../modules/room/controllers/RoomController.ts';
import { authMiddleware } from '../../shared/middlewares/auth.middleware.ts';
import { authorize } from '../../shared/middlewares/authorization.middleware.ts';
import { Role } from '../../shared/enums/role.ts';

const route = express.Router();

const roomController = new RoomController();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), roomController.create)
    .get('/all', authMiddleware, roomController.getAll)
    .get('/:id', authMiddleware, roomController.getById)
    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), roomController.update)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), roomController.delete)

export default route