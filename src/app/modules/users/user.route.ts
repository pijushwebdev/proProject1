
import express, { NextFunction, Request, Response } from 'express';
import { usersController } from "./user.controller";
import { studentValidations } from "../students/student.validation.zod";
import requestValidation from "../../middleware/requestValidation";
import { facultyValidations } from "../faculties/faculty.validation";
import { adminValidations } from "../admin/admin.validation";
import Auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { userValidations } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();


router.post('/create-student',
    Auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidation(studentValidations.createStudentZodSchema),   //zod validation middleware
    usersController.createStudent
);
router.post('/create-faculty', 
    Auth(USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);

        next();
    },
    requestValidation(facultyValidations.createFacultyValidation),
    usersController.createFaculty
)

router.post('/create-admin', 
    Auth(USER_ROLE.superAdmin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);

        next();
    },
    requestValidation(adminValidations.createAdminValidation),
    usersController.createAdmin
);

router.patch('/change-status/:id', 
    Auth(USER_ROLE.admin),
    requestValidation(userValidations.changeStatusValidation),
    usersController.changeStatus
)

router.get('/profile', 
    Auth(USER_ROLE.student, USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.superAdmin),
    usersController.myProfile
)

export const usersRoutes = router;