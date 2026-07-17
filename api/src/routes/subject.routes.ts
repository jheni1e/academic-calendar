import express from 'express'
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { SubjectController } from '../controllers/SubjectController.ts';
import { SubjectInstructorController } from '../controllers/SubjectInstructorControllers.ts';

const route = express.Router();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), SubjectController.create)
    .get('/all', authMiddleware, SubjectController.findAllSubjects)
    .get('/:id', authMiddleware, SubjectController.findSubjectById)
    .get('/instructors', authMiddleware, SubjectInstructorController.findSubjectInstructorsByInstructor) // get all instructors by subject

    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), SubjectController.update)
    .put('/instructor/add/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), SubjectInstructorController.create)
    
    .delete('/instructor/remove/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), SubjectInstructorController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), SubjectController.delete)

export default route