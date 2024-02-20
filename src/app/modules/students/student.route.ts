import express from 'express';
import { studentControllers } from './student.controller';
import requestValidation from '../../middleware/requestValidation';
import { studentValidations } from './student.validation.zod';

export const router = express.Router();

// createStudent from controller
// router.post('/create-student', studentControllers.createStudent );

router.get('/getAllStudents', studentControllers.getAllStudentsData);

router.get('/getStudent/:_id', studentControllers.getSingleStudent);
router.get('/getStudentByAggregate/:_id', studentControllers.getSingleStudentByAggregate);

router.patch('/update-student/:id',
    requestValidation(studentValidations.updateStudentZodSchema),
    studentControllers.updateAStudent
);

router.delete('/deleteAStudent/:_id', studentControllers.deleteSingleStudent);


export const studentsRoutes = router;