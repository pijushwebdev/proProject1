import { z } from 'zod';

const loginAuthValidation = z.object({
    body: z.object({
        id: z.string({ required_error: 'Id is required'}).trim(),
        password: z.string({required_error: 'Password is required'}).trim()
    })
}) 
const refreshTokenValidation = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });


const changePasswordAuthValidation = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: 'Old password is required'}).trim(),
        newPassword: z.string({required_error: 'New Password is required'}).trim()
    })
}) 

export const authValidations = {
    loginAuthValidation,
    changePasswordAuthValidation,
    refreshTokenValidation,
}