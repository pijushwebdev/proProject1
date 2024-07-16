import express from 'express';
import { USER_ROLE } from '../users/user.constant';
import Auth from '../../middleware/auth';
import { OfferedCourseControllers } from './offeredCourse.controller';
import requestValidation from '../../middleware/requestValidation';
import { OfferedCourseValidations } from './offeredCourse.validation';


const router = express.Router();

router.get(
    '/',
    Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    OfferedCourseControllers.getAllOfferedCourses,
);

router.get(
    '/my-offered-courses',
    Auth(USER_ROLE.student),
    OfferedCourseControllers.getMyOfferedCourses,
);

router.get(
    '/:id',
    Auth(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    OfferedCourseControllers.getSingleOfferedCourses,
);

router.post(
    '/create-offered-course',
    Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(OfferedCourseValidations.createOfferedCourseValidationSchema),
    OfferedCourseControllers.createOfferedCourse,
);

router.patch(
    '/:id',
    Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    requestValidation(OfferedCourseValidations.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
    '/:id',
    Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export const offeredCourseRoutes = router;