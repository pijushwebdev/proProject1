import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import requestValidation from "../../middleware/requestValidation";
import { academicFacultyValidations } from "./academicFaculty.validation";


const router = Router();

router.post('/create-academic-faculty',
    requestValidation(academicFacultyValidations.createAcademicFacultyValidation),
    academicFacultyController.createAcademicFaculty
);

router.get('/getAcademicFaculties', academicFacultyController.getAllAcademicFaculty);

router.get('/getAcademicFaculty/:id', academicFacultyController.getSingleAcademicFaculty);

router.patch('/updateAcademicFaculty/:id',
    requestValidation(academicFacultyValidations.updateAcademicFacultyValidation),
    academicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;