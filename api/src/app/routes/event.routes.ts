import express from 'express'
import { EventController } from '../../modules/event/controllers/EventController.ts';
import { ParticipationController } from '../../modules/participation/controllers/ParticipationController.ts';


const route = express.Router();

const eventController = new EventController();
const participationController = new ParticipationController();

route 
    .post('/', eventController.create)
    .get('/all', eventController.getAll)
    .get('/:id', eventController.getById)
    .put('/:id', eventController.update)
    .delete("/:id", eventController.delete)
    .post('/participants/add/:id', participationController.create)
    .delete("/participants/remove/:id", participationController.delete)

export default route