import express from 'express'
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { EventController } from '../controllers/EventController.ts';
import { ParticipationController } from '../controllers/ParticipationController.ts';
import { validateCreate, validateDeleteByEventandUser } from '../shared/middlewares/participation.middleware.ts';
import { validateEditEvent, validateDelete, validateEventExistsById, validateUpdate, validateBlockEvent } from '../shared/middlewares/event.middleware.ts';
import { validateDelete as validateDeleteParticipation } from '../shared/middlewares/participation.middleware.ts';

const route = express.Router();

route 
    .post('/', authMiddleware, EventController.create) // create event 
    .post('/participants/', authMiddleware, validateCreate, ParticipationController.create)  // add participants to the event

    .get('/all', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), EventController.findAllEvents) // get all events
    .get('/confirmed', authMiddleware, EventController.findConfirmedEvents)
    .get('/participants/all/:eventId', authMiddleware, validateEventExistsById, ParticipationController.findParticipationByEvent) // get all participants of a specific event
    .get('/:eventId', authMiddleware, validateEventExistsById, EventController.findEventById) // get event by id

    .delete("/participants/remove/:eventId", authMiddleware, validateDeleteByEventandUser, ParticipationController.deleteByEventandUser) // remove a user from an event

    .put('/:eventId', authMiddleware, validateUpdate, EventController.update) 
    .put('/block/:eventId', authMiddleware, validateBlockEvent, EventController.block)
    .put('/unblock/:eventId', authMiddleware, validateBlockEvent, EventController.unblock)
    .put('/confirm/:eventId', authMiddleware, validateBlockEvent, EventController.confirm)
    .put('/cancel/:eventId', authMiddleware, validateBlockEvent, EventController.cancel)

    .delete("/:eventId", authMiddleware, validateDelete, EventController.delete)
    
export default route