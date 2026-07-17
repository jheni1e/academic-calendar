import express from 'express'
import { RoleController } from '../controllers/RoleControllers.ts';
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';

const route = express.Router();

route 
    .post('/', authMiddleware, RoleController.create)
    .get('/all', RoleController.findAllRoles)
    .get('/:id', RoleController.findRoleById)
    .put('/:id', RoleController.update)
    .delete("/:id", RoleController.deleteRole)
export default route