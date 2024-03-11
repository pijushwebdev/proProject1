import { Router } from "express";
import { usersRoutes } from "../modules/users/user.route";
import { studentsRoutes } from "../modules/students/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { departmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { facultyRoutes } from "../modules/faculties/faculty.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { authRoutes } from "../modules/auth/auth.route";


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
        path: '/academic-faculties',
        route: AcademicFacultyRoutes
    },
    {
        path: '/departments',
        route: departmentRoutes
    },
    {
        path: '/faculties',
        route: facultyRoutes
    },
    {
        path: '/admins',
        route: adminRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;