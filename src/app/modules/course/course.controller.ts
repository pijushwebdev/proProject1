import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";



const createCourse = asyncTryCatch(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course is created successfully',
      data: result,
    });
  });
  
  const getAllCourses = asyncTryCatch(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course are retrieved successfully',
      meta: result.meta,
      data: result.result,
    });
  });
  
  const getSingleCourse = asyncTryCatch(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course is retrieved successfully',
      data: result,
    });
  });
  
  const updateCourse = asyncTryCatch(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'course is updated successfully',
      data: result,
    });
  });
  
  const deleteCourse = asyncTryCatch(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course is deleted successfully',
      data: result,
    });
  });
  
  const assignFacultiesWithCourse = asyncTryCatch(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculties assigned  successfully',
      data: result,
    });
  });
  
  const getFacultiesWithCourse = asyncTryCatch(async (req, res) => {
    const { courseId } = req.params;
  
    const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculties retrieved successfully',
      data: result,
    });
  });
  
  const removeFacultiesFromCourse = asyncTryCatch(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;
  
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    );
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculties removed successfully',
      data: result,
    });
  });
  
  export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    getFacultiesWithCourse,
    removeFacultiesFromCourse,
  };