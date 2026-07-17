import express from 'express'
import { RoleController } from "../controllers/roleControllers.ts";

const route = express.Router();

const roleController = new RoleController();
route 
    .post('/', roleController.create)
    .get('/all', roleController.getAll)
    .get('/:id', roleController.getById)
    .put('/:id', roleController.update)
    .delete("/:id", roleController.delete)
export default route