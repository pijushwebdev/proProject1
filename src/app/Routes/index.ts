import { Router } from "express";
import { usersRoutes } from "../modules/users/user.route";
import { studentsRoutes } from "../modules/students/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { departmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { facultyRoutes } from "../modules/faculties/faculty.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { authRoutes } from "../modules/auth/auth.route";
import { CourseRoutes } from "../modules/course/course.router";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.route";
import { EnrolledCourseRoutes } from "../modules/enrolledCourse/enrolledCourse.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";


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
    },
    {
        path: '/courses',
        route: CourseRoutes
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes
    },
    {
        path: '/enrolled-courses',
        route: EnrolledCourseRoutes
    },
    {
        path: '/semester-registration',
        route: semesterRegistrationRoutes
    },
    
];

moduleRoutes.forEach(route => router.use(route.path, route.route));


export default router;