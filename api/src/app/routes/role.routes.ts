import express from 'express'
import { RoleController } from '../../modules/role/controllers/RoleControllers.ts';
const route = express.Router();

const roleController = new RoleController();

route 
    .post('/', roleController.create)
export default route