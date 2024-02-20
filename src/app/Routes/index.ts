import { Router } from "express";
import { usersRoutes } from "../modules/users/user.route";
import { studentsRoutes } from "../modules/students/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { FacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { departmentRoutes } from "../modules/academicDepartment/academicDepartment.route";


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
    },
    {
        path: '/departments',
        route: departmentRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;