import { Router } from "express";
import { facultyController } from "./academiccFaculty.controller";
import requestValidation from "../../middleware/requestValidation";
import { FacultyValidations } from "./academicFaculty.validation";


const router = Router();

router.post('/create-faculty',
    requestValidation(FacultyValidations.createFacultyValidation),
    facultyController.createFaculty
);

router.get('/getFaculties', facultyController.getAllFaculty);

router.get('/getAFaculty/:id', facultyController.getSingleFaculty);

router.patch('/updateAFaculty',
    requestValidation(FacultyValidations.updateFacultyValidation),
    facultyController.updateAFaculty
);

export const FacultyRoutes = router;