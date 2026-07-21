import express from 'express'
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { EventController } from '../controllers/EventController.ts';
import { ParticipationController } from '../controllers/ParticipationController.ts';


const route = express.Router();

route 
    .post('/', authMiddleware, EventController.create) // create event 
    .post('/participants/add/:id', authMiddleware, ParticipationController.create)   // add participants to the event

    .get('/all', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), EventController.findAllEvents) // get all events
    .get('/:id', authMiddleware, EventController.findEventById) // get event by id
    .get('/participants/all', authMiddleware, ParticipationController.findParticipationByEvent) // get all participants of a specific event
    .get('/participants/:id', ParticipationController.findParticipationById) // get a participant by id (idk if it's necessary)

    .put('/:id', EventController.update) 

    .delete("/:id", EventController.delete)
    .delete("/participants/remove/:id", ParticipationController.delete) // remove a user from an event

export default route