import express from 'express'
import { EventController } from '../../modules/event/controllers/EventController.ts';
import { ParticipationController } from '../../modules/participation/controllers/ParticipationController.ts';
import { authMiddleware } from '../../shared/middlewares/auth.middleware.ts';
import { authorize } from '../../shared/middlewares/authorization.middleware.ts';
import { Role } from '../../shared/enums/role.ts';


const route = express.Router();

const eventController = new EventController();
const participationController = new ParticipationController();

route 
    .post('/', authMiddleware, eventController.create) // create event 
    .post('/participants/add/:id', authMiddleware, participationController.create)   // add participants to the event

    .get('/all', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), eventController.getAll) // get all events
    .get('/:id', authMiddleware, eventController.getById) // get event by id
    .get('/participants/all', authMiddleware, participationController.getByEvent) // get all participants of a specific event
    .get('/participants/:id', participationController.getById) // get a participant by id (idk if it's necessary)

    .put('/:id', eventController.update) 

    .delete("/:id", eventController.delete)
    .delete("/participants/remove/:id", participationController.delete)

export default route