import express from 'express'
import { CreateEventController } from '../../modules/event/controllers/CreateEventController.ts';
import { GetEventRolesController } from '../../modules/eventRole/controllers/GetEventRolesController.ts';

const route = express.Router();

const eventController = new 
route 
    .post('/', createEvent.handle)
    .get('/all', getRoles.handle)
    .get('/:id', getById.handle)
    .put('/:id', updateRole.handle)
    .delete("/:id", deleteRole.handle)

export default route