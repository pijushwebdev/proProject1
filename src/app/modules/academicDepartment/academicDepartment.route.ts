import { Router } from "express";
import requestValidation from "../../middleware/requestValidation";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { departmentController } from "./academicDepartment.controller";


const router = Router();

router.post('/create-department',
    requestValidation(AcademicDepartmentValidations.createAcademicDepartmentValidation),
    departmentController.createDepartment
);
 
router.get('/getAllDepartments', departmentController.getAllDepartments);

router.get('/getADepartment', departmentController.getADepartment);


export const departmentRoutes = router;