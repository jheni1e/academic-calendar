import express from 'express'
import { ClassController } from '../../modules/class/controllers/ClassController.ts';
import { ClassUserController } from '../../modules/classUser/controllers/ClassUserControllers.ts';

const route = express.Router();

const classController = new ClassController();
const classUserController = new ClassUserController();

route 
    .post('/', classController.create)
    .get('/all', classController.getAll)
    .get('/:id', classController.getById)
    .put('/:id', classController.update)
    .post('/participants', classUserController.create)
    .delete('/participants/:id', classUserController.delete)
    .delete("/:id", classController.delete)

export default route