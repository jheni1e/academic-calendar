import express from 'express'

import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { RoomController } from '../controllers/RoomController.ts';
import { ReservationController } from '../controllers/ReservationController.ts';


const route = express.Router();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), RoomController.create)
    .post('/reservation/:roomId', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ReservationController.create)
    
    .get('/all', authMiddleware, RoomController.findAllRooms)
    .get('/:id', authMiddleware, RoomController.findRoomById)
    .get('/reservations', authMiddleware, ReservationController.findReservationById)
    
    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), RoomController.update)
    .put('/disable/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), RoomController.disable)

    .delete('/reservation/:roomId', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), ReservationController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), RoomController.delete)

export default route