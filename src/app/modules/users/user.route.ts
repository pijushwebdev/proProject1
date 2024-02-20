
import { router } from "../students/student.route";
import { usersController } from "./user.controller";
import { studentValidations } from "../students/student.validation.zod";
import requestValidation from "../../middleware/requestValidation";





router.post('/create-student',
    requestValidation(studentValidations.createStudentZodSchema),   //zod validation middleware
    usersController.createStudent
);



export const usersRoutes = router;