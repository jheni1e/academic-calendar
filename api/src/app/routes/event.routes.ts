import express from 'express'
import { EventController } from '../../modules/event/controllers/EventController.ts';


const route = express.Router();

const eventController = new EventController();

route 
    .post('/', eventController.create)
    .get('/all', eventController.getAll)
    .get('/:id', eventController.getById)
    .put('/:id', eventController.update)
    .delete("/:id", eventController.delete)

export default route