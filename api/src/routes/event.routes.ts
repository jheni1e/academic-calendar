import express from 'express'
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { EventController } from '../controllers/EventController.ts';
import { ParticipationController } from '../controllers/ParticipationController.ts';
import { validateCreate, validateDeleteByEventandUser } from '../shared/middlewares/participation.middleware.ts';
import { validateDelete, validateEventExistsById, validateUpdate } from '../shared/middlewares/event.middleware.ts';
import { validateDelete as validateDeleteParticipation } from '../shared/middlewares/participation.middleware.ts';
import { validateClassExistsById } from '../shared/middlewares/class.middleware.ts';
import { UserRole } from '../generated/prisma/enums.ts';
import { ClassUserController } from '../controllers/ClassUserControllers.ts';

const route = express.Router();

route 
    .post('/', authMiddleware, EventController.create) // create event 
    .post('/participants/', authMiddleware, validateCreate, ParticipationController.create)  // add participants to the event

    .get('/all', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), EventController.findAllEvents) // get all events
    .get('/:id', authMiddleware, validateEventExistsById, EventController.findEventById) // get event by id
    .get('/participants/all/:id', authMiddleware, validateEventExistsById, ParticipationController.findParticipationByEvent) // get all participants of a specific event
    .get('/participants/:id', authMiddleware, ParticipationController.findParticipationByEvent) // get a participant by id (idk if it's necessary)

    // participation
    .get('/participants/:eventId', authMiddleware, validateClassExistsById, ClassUserController.findClassUsersByClass) // get participants by class id
    .delete("/participants/remove/:eventId", authMiddleware, validateDeleteByEventandUser, ParticipationController.deleteByEventandUser) // remove a user from an event
    .post('/participant', authMiddleware, authorize(UserRole.ADMIN, UserRole.INSTRUCTOR), ClassUserController.create) // add a new participant
    
    .put('/:id', authMiddleware, validateUpdate, EventController.update) 

    .delete("/:id", authMiddleware, validateDelete, EventController.delete)
    
export default route