import express from 'express'
import { PrismaRoleRepository } from '../../modules/role/repositories/PrismaRoleRepository.ts';
import { RoleController } from '../../modules/role/controllers/RoleControllers.ts';
import { authMiddleware } from '../../shared/middlewares/auth.middleware.ts';

const route = express.Router();

const roleController = new RoleController();
route 
    .post('/', roleController.create)
    .get('/all', roleController.getAll)
    .get('/:id', roleController.getById)
    .put('/:id', roleController.update)
    .delete("/:id", roleController.delete)
export default route