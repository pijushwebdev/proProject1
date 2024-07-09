import config from "../../config";
import asyncTryCatch from "../../utils/asyncTryCatch";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";


const loginUser = asyncTryCatch(async (req, res) => {
    const userInfo = req.body;
    const data = await authServices.loginUser(userInfo);
    const { refreshToken, accessToken, needsPasswordChange } = data;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 120,
    })
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 1,
    })
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login in successfully',
        data: {
            accessToken,
            needsPasswordChange
        }
    })
})

const changePassword = asyncTryCatch(async (req, res) => {

    // console.log(req.user, req.body);
    const user = req.user;
    const { ...password } = req.body;
    const data = await authServices.changePassword(user, password);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully',
        data: data
    })
});

const refreshToken = asyncTryCatch(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await authServices.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Access token is retrieved successfully!',
      data: result,
    });
  });

export const authControllers = {
    loginUser,
    changePassword,
    refreshToken,
}