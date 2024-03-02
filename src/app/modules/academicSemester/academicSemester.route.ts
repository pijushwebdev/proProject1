import { Router } from "express";
import { semesterControllers } from "./academicSemester.controller";
import requestValidation from "../../middleware/requestValidation";
import { academicSemesterValidations } from "./academicSemester.validation";


const router = Router();

router.post('/create-semester',
    requestValidation(academicSemesterValidations.createAcademicSemesterValidation),
    semesterControllers.createSemester
);

router.get('/getAllSemesters', semesterControllers.getAllSemester);
router.get('/getASemester/:semesterId', semesterControllers.getSingleSemester);

router.patch('/update-semester/:semesterId',
    requestValidation(academicSemesterValidations.updateAcademicSemesterValidation),
    semesterControllers.updateASemester
);

export const AcademicSemesterRoutes = router;