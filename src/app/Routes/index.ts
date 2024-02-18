import { Router } from "express";
import { usersRoutes } from "../modules/users/user.route";
import { studentsRoutes } from "../modules/students/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { FacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: usersRoutes
    },
    {
        path: '/students',
        route: studentsRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;