import { Router } from "express";
import { academicSemesterControllers } from "./academicSemester.controller";
import requestValidation from "../../middleware/requestValidation";
import { AcademicSemesterValidations } from "./academicSemester.validation";


const router = Router();

router.post('/create-semester',
    requestValidation(AcademicSemesterValidations.createAcademicSemesterValidation),
    academicSemesterControllers.createSemester
);

router.get('/getAllSemesters', academicSemesterControllers.getAllSemester);
router.get('/getASemester/:semesterId', academicSemesterControllers.getSingleSemester);

router.patch('/update-semester/:semesterId',
    requestValidation(AcademicSemesterValidations.updateAcademicSemesterValidation),
    academicSemesterControllers.updateASemester
);

export const AcademicSemesterRoutes = router;