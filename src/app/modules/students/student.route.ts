import express from 'express';
import { studentControllers } from './student.controller';
import requestValidation from '../../middleware/requestValidation';
import { studentValidations } from './student.validation.zod';
import Auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

export const router = express.Router();

// createStudent from controller
// router.post('/create-student', studentControllers.createStudent );

router.get('/getAllStudents',Auth(USER_ROLE.student), studentControllers.getAllStudentsData);

router.get('/getSingleStudent/:studentId', studentControllers.getSingleStudent);

router.get('/getStudentByAggregate/:studentId', studentControllers.getSingleStudentByAggregate);

router.patch('/updateSingleStudent/:studentId',
    requestValidation(studentValidations.updateStudentZodSchema),
    studentControllers.updateAStudent
);

router.delete('/deleteSingleStudent/student/:studentId', studentControllers.deleteSingleStudent);

router.get('/', studentControllers.searchInStudents);


export const studentsRoutes = router;