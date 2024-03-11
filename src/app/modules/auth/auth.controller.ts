import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";


const loginUser = asyncTryCatch( async (req, res) => {
    const userInfo = req.body;
    const data = await authServices.loginUser(userInfo);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login in successfully',
        data: data
    })
})

const changePassword = asyncTryCatch( async (req, res) => {
    
    // console.log(req.user, req.body);
    const user = req.user;
    const {...password} = req.body;
    const data = await authServices.changePassword(user, password);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully',
        data: data
    })
})

export const authControllers = {
    loginUser,
    changePassword,
}