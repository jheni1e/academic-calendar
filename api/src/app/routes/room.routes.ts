import express from 'express'
import { RoomController } from '../../modules/room/controllers/RoomController.ts';

const route = express.Router();

const roomController = new RoomController();

route 
    .post('/', roomController.create)
    .get('/all', roomController.getAll)
    .get('/:id', roomController.getById)
    .put('/:id', roomController.update)
    .delete("/:id", roomController.delete)

export default route