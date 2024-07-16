import express from 'express';
import { USER_ROLE } from '../users/user.constant';
import requestValidation from '../../middleware/requestValidation';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import Auth from '../../middleware/auth';




const router = express.Router();

router.post(
  '/create-course',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  requestValidation(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/:id',
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  requestValidation(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseControllers.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  requestValidation(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.get(
  '/:courseId/get-faculties',
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  requestValidation(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.get(
  '/',
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getAllCourses,
);

export const CourseRoutes = router;