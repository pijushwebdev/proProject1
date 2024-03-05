import express from 'express';
import { studentControllers } from './student.controller';
import requestValidation from '../../middleware/requestValidation';
import { studentValidations } from './student.validation.zod';

export const router = express.Router();

// createStudent from controller
// router.post('/create-student', studentControllers.createStudent );

router.get('/getAllStudents', studentControllers.getAllStudentsData);

router.get('/getSingleStudent/:studentId', studentControllers.getSingleStudent);

router.get('/getStudentByAggregate/:_id', studentControllers.getSingleStudentByAggregate);

router.patch('/updateSingleStudent/:studentId',
    requestValidation(studentValidations.updateStudentZodSchema),
    studentControllers.updateAStudent
);

router.delete('/deleteSingleStudent/user/:userId/student/:studentId', studentControllers.deleteSingleStudent);

router.get('/', studentControllers.searchInStudents);


export const studentsRoutes = router;