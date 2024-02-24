import { Router } from "express";
import { semesterControllers } from "./academicSemester.controller";
import requestValidation from "../../middleware/requestValidation";
import { AcademicSemesterValidations } from "./academicSemester.validation";


const router = Router();

router.post('/create-semester',
    requestValidation(AcademicSemesterValidations.createAcademicSemesterValidation),
    semesterControllers.createSemester
);

router.get('/getAllSemesters', semesterControllers.getAllSemester);
router.get('/getASemester/:semesterId', semesterControllers.getSingleSemester);

router.patch('/update-semester/:semesterId',
    requestValidation(AcademicSemesterValidations.updateAcademicSemesterValidation),
    semesterControllers.updateASemester
);

export const AcademicSemesterRoutes = router;