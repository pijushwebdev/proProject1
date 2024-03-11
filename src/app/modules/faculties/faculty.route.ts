import { Router } from "express";
import { facultyControllers } from "./faculty.controller";
import requestValidation from "../../middleware/requestValidation";
import { facultyValidations } from "./faculty.validation";



const router = Router();

router.get('/getAllFaculties', facultyControllers.getAllFaculty);

router.get('/getSingleFaculty/:facultyId', facultyControllers.getSingleFaculty);

router.patch('/updateSingleFaculty/:facultyId', 
    requestValidation(facultyValidations.updateFacultyValidation),
    facultyControllers.updateAFaculty);

router.delete('/deleteSingleFaculty/faculty/:facultyId', 
    facultyControllers.deleteSingleFaculty);


export const facultyRoutes = router;