
import express from 'express';
import { usersController } from "./user.controller";
import { studentValidations } from "../students/student.validation.zod";
import requestValidation from "../../middleware/requestValidation";
import { facultyValidations } from "../faculties/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import Auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';


const router = express.Router();



router.post('/create-student',
    Auth(USER_ROLE.admin),
    requestValidation(studentValidations.createStudentZodSchema),   //zod validation middleware
    usersController.createStudent
);
router.post('/create-faculty', 
    requestValidation(facultyValidations.createFacultyValidation),
    usersController.createFaculty
)

router.post('/create-admin', 
    requestValidation(adminValidations.createAdminValidation),
    usersController.createAdmin
);



export const usersRoutes = router;