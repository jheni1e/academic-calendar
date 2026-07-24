import express from 'express'
import { validateCreate, validateDeactivate, validateRoomExistsById, validateUpdate } from '../shared/middlewares/room.middleware.ts';
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { RoomController } from '../controllers/RoomController.ts';
import { ReservationController } from '../controllers/ReservationController.ts';
import { validateDelete, validateCreate as validateCreateReservation} from '../shared/middlewares/reservation.middleware.ts';
import { validateDelete as validateDeleteRoom} from '../shared/middlewares/room.middleware.ts';

const route = express.Router();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateCreate, RoomController.create)
    .post('/reservation/:roomId', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateCreateReservation, ReservationController.create)
    
    .get('/all', authMiddleware, RoomController.findAllRooms)
    .get('/:id', authMiddleware, validateRoomExistsById, RoomController.findRoomById)
    .get('/reservations/:id', authMiddleware, validateRoomExistsById, ReservationController.findReservationById)
    .get('/events/:id', authMiddleware, validateRoomExistsById, RoomController.findEventsByRoom)

    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateUpdate, RoomController.update)
    .put('/deactivate/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateDeactivate, RoomController.disable)

    .delete('/reservation/:roomId', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateDelete, ReservationController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateDeleteRoom, RoomController.delete)

export default route