import express from 'express'
import { authMiddleware } from '../shared/middlewares/auth.middleware.ts';
import { authorize } from '../shared/middlewares/authorization.middleware.ts';
import { Role } from '../shared/enums/role.ts';
import { SubjectController } from '../controllers/SubjectController.ts';
import { SubjectInstructorController } from '../controllers/SubjectInstructorControllers.ts';
import { validateCreate } from '../shared/middlewares/subjectinstructor.middleware.ts';
import { validateDelete, validateSubjectExistsById, validateUpdate } from '../shared/middlewares/subject.middleware.ts';
import { validateDelete as validateDeleteSI } from '../shared/middlewares/subjectinstructor.middleware.ts'

const route = express.Router();

route 
    .post('/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR) , SubjectController.create) // create a new subject
    .post('/instructor/', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateCreate, SubjectInstructorController.create) // add a new subject responsible instructor

    .get('/all', authMiddleware, SubjectController.findAllSubjects) // get all subjects
    .get('/:id', authMiddleware, validateSubjectExistsById, SubjectController.findSubjectById) // get a subject by its id
    .get('/instructors/:id', authMiddleware, validateSubjectExistsById, SubjectInstructorController.findSubjectInstructorsBySubject) // get all instructors by subject

    .get('/instructor/:instructorId/ongoing', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), SubjectController.findOnGoingSubjectsByInstructor) // get active subjects by instructor
    .get('class/:classId/ongoing', SubjectController.findOnGoingSubjectsByClass)

    .put('/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateUpdate, SubjectController.update) // update subject
    
    .delete('/instructor/remove/:id', authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateDeleteSI, SubjectInstructorController.delete)
    .delete("/:id", authMiddleware, authorize(Role.ADMIN, Role.INSTRUCTOR), validateDelete, SubjectController.delete)

export default route