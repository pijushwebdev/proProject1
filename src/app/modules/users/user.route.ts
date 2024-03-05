
import { router } from "../students/student.route";
import { usersController } from "./user.controller";
import { studentValidations } from "../students/student.validation.zod";
import requestValidation from "../../middleware/requestValidation";
import { facultyValidations } from "../faculties/faculty.validation";





router.post('/create-student',
    requestValidation(studentValidations.createStudentZodSchema),   //zod validation middleware
    usersController.createStudent
);
router.post('/create-faculty', 
    requestValidation(facultyValidations.createFacultyValidation),
    usersController.createFaculty
)



export const usersRoutes = router;