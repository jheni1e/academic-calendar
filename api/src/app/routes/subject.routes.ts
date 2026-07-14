import express from 'express'
import { authMiddleware } from '../../shared/middlewares/auth.middleware.ts';
import { authorize } from '../../shared/middlewares/authorization.middleware.ts';
import { Role } from '../../shared/enums/role.ts';
import { SubjectController } from '../../modules/subject/controllers/SubjectController.ts';
import { SubjectInstructorController } from '../../modules/subjectInstructor/controllers/subjectInstructorControllers.ts';


const subjectController = new SubjectController();
const subjectInstructorController = new SubjectInstructorController();

const route = express.Router();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), subjectController.create)
    .get('/all', authMiddleware, subjectController.getAll)
    .get('/:id', authMiddleware, subjectController.getById)
    .get('/instructors', authMiddleware, subjectInstructorController.getBySubject) // get all instructors by subject

    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), subjectController.update)
    .put('/instructor/add/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), subjectInstructorController.create)
    
    .delete('/instructor/remove/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), subjectInstructorController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), subjectController.delete)

export default route