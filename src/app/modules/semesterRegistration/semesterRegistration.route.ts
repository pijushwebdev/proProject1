import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { USER_ROLE } from '../users/user.constant';
import requestValidation from '../../middleware/requestValidation';
import Auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-semester-registration',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  requestValidation(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  requestValidation(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.delete(
  '/:id',
  Auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get(
  '/',
  Auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getAllSemesterRegistrations,
);

export const semesterRegistrationRoutes = router;