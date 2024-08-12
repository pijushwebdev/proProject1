import { Router } from "express";
import { facultyControllers } from "./faculty.controller";
import requestValidation from "../../middleware/requestValidation";
import { facultyValidations } from "./faculty.validation";
import Auth from "../../middleware/auth";
import { USER_ROLE } from "../users/user.constant";



const router = Router();

router.get('/getAllFaculties',
    Auth(USER_ROLE.admin),
    facultyControllers.getAllFaculty);

router.get('/getSingleFaculty/:facultyId',
    Auth(USER_ROLE.admin),
    facultyControllers.getSingleFaculty);

router.patch('/updateSingleFaculty/:facultyId', 
    requestValidation(facultyValidations.updateFacultyValidation),
    facultyControllers.updateAFaculty);

router.delete('/deleteSingleFaculty/faculty/:facultyId', 
    facultyControllers.deleteSingleFaculty);


export const facultyRoutes = router;