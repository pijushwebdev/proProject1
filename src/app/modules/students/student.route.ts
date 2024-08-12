import express from 'express';
import { studentControllers } from './student.controller';
import requestValidation from '../../middleware/requestValidation';
import { studentValidations } from './student.validation.zod';
import Auth from '../../middleware/auth';
import { USER_ROLE } from '../users/user.constant';

export const router = express.Router();


router.get('/getAllStudents',
    Auth(USER_ROLE.faculty, USER_ROLE.admin), 
    studentControllers.getAllStudentsData
);

router.get('/getSingleStudent/:studentId', 
    Auth(USER_ROLE.faculty, USER_ROLE.admin),
    studentControllers.getSingleStudent
);

router.get('/getStudentByAggregate/:studentId',
    Auth(USER_ROLE.faculty, USER_ROLE.admin),
    studentControllers.getSingleStudentByAggregate
);

router.patch('/updateSingleStudent/:studentId',
    Auth(USER_ROLE.faculty, USER_ROLE.admin),
    requestValidation(studentValidations.updateStudentZodSchema),
    studentControllers.updateAStudent
);

router.delete('/deleteSingleStudent/student/:studentId', 
    Auth(USER_ROLE.faculty, USER_ROLE.admin),
    studentControllers.deleteSingleStudent
);

router.get('/', 
    Auth(USER_ROLE.faculty, USER_ROLE.admin),
    studentControllers.searchInStudents
);


export const studentsRoutes = router;