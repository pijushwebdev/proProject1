
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import asyncTryCatch from "../../utils/asyncTryCatch";
import httpStatus from "http-status";

const createStudent = asyncTryCatch( async (req, res) => {

    const { password, student: studentData } = req.body;

    const data = await userServices.createStudentIntoDB(password, studentData, req.file); 

    // this will force to maintain the format
    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "New Student is created",
        data: data
    })

})

const createFaculty = asyncTryCatch( async (req, res) => {
    const {password, faculty: facultyData} = req.body;
    const data = await userServices.createFacultyIntoDB(password, facultyData, req.file);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Faculty is created',
        data: data
    })
})

const createAdmin = asyncTryCatch( async (req,res) => {
    const {password, admin} = req.body;

    const data = await userServices.createAdminIntoDB(password,admin, req.file);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Admin is successfully created',
        data: data
    })
})

const changeStatus = asyncTryCatch( async (req, res) => {
    const id = req.params.id;
    const result = await userServices.changeStatus(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User status successfully changed',
        data: result,
    })
})

const myProfile = asyncTryCatch( async (req, res) => {
    const { userId, role } = req.user;
    const result = await userServices.myProfile(userId, role);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'My profile info retrieve successfully',
        data: result,
    })
})
export const usersController = {
    createStudent,
    createFaculty,
    createAdmin,
    changeStatus,
    myProfile,
}