import asyncTryCatch from "../../utils/asyncTryCatch"
import sendResponse from "../../utils/sendResponse";
import { departmentServices } from "./academicDepartment.service"


const createDepartment = asyncTryCatch( async (req,res) => {
    const data = req.body;
    const result = await departmentServices.createDepartmentIntoDB(data);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Department is created",
        data: result
    })
});


const getAllDepartment = asyncTryCatch( async (req, res) => {
    const data = await departmentServices.getAllDepartmentFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Department Data received',
        data: data
    })
})

const getADepartment = asyncTryCatch( async(req,res) => {
    const id = req.params.id;
    const data = await departmentServices.getADepartmentFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "A deapartme data arrived",
        data: data
    })
})


export const departmentController = {
    createDepartment,
    getAllDepartment,
    getADepartment,
}