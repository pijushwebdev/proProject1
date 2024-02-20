import { Router } from "express";
import requestValidation from "../../middleware/requestValidation";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { departmentController } from "./academicDepartment.controller";


const router = Router();

router.post('/create-department',
    requestValidation(AcademicDepartmentValidations.createAcademicDepartmentValidation),
    departmentController.createDepartment
);


export const departmentRoutes = router;