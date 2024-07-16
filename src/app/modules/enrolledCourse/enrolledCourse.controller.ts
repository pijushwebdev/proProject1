
import asyncTryCatch from '../../utils/asyncTryCatch';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = asyncTryCatch(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  });
});

const getAllEnrolledCourses = asyncTryCatch(async (req, res) => {
  const facultyId = req.user.userId;

  const result = await EnrolledCourseServices.getAllEnrolledCoursesFromDB(
    facultyId,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Enrolled courses are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getMyEnrolledCourses = asyncTryCatch(async (req, res) => {
  const studentId = req.user.userId;

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Enrolled courses are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateEnrolledCourseMarks = asyncTryCatch(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Marks is updated successfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getAllEnrolledCourses,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
};