import express from 'express';
import Auth from '../../middleware/auth';
import requestValidation from '../../middleware/requestValidation';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { USER_ROLE } from '../users/user.constant';


const router = express.Router();

router.post(
  '/create-enrolled-course',
  Auth(USER_ROLE.student),
  requestValidation(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);

router.get(
  '/',
  Auth(USER_ROLE.faculty),
  EnrolledCourseControllers.getAllEnrolledCourses,
);

router.get(
  '/my-enrolled-courses',
  Auth(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
);

router.patch(
  '/update-enrolled-course-marks',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  requestValidation(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;