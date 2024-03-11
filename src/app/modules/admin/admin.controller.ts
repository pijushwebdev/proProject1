import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.service";


const getAllAdmin = asyncTryCatch( async (req, res) => {
    const query = req.params;
    const data = await adminServices.getAllAdminFromDB(query);
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Admin data is successfully received',
        data: data
    })
});

const getSingleAdmin = asyncTryCatch( async (req, res) => {
    const id = req.params.adminId;
    const data = await adminServices.getSingleAdminFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Admin data is successfully received',
        data: data
    })
})

const updateSingleAdmin = asyncTryCatch( async (req, res) => {
    const id = req.params.adminId;
    const data = req.body;

    const updatedData = await adminServices.updateSingleAdminFromDB(id, data);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Admin data is successfully received',
        data: updatedData
    })
});

const deleteSingleAdmin = asyncTryCatch( async (req, res) => {
    const adminId = req.params.adminId;
    const data = await adminServices.deleteSingleAdminFromDB(adminId);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Admin data is successfully received',
        data: data
    })
})

export const adminControllers = {
    getAllAdmin,
    getSingleAdmin,
    updateSingleAdmin,
    deleteSingleAdmin
}