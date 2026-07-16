import express from 'express'
import { RoomController } from '../../controllers/RoomController.ts';
import { authMiddleware } from '../../shared/middlewares/auth.middleware.ts';
import { authorize } from '../../shared/middlewares/authorization.middleware.ts';
import { Role } from '../../shared/enums/role.ts';
import { ReservationController } from '../../controllers/ReservationController.ts';

const route = express.Router();

const roomController = new RoomController();
const reservationController = new ReservationController();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), roomController.create)
    .post('/reservation/:roomId', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), reservationController.create)
    
    .get('/all', authMiddleware, roomController.getAll)
    .get('/:id', authMiddleware, roomController.getById)
    .get('/reservations', authMiddleware, reservationController.getById)
    
    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), roomController.update)

    .delete('/reservation/:roomId', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), reservationController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), roomController.delete)

export default route