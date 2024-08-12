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
        newPassword: z.string({required_error: 'New Password is required'}).min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
          message: 'Password must have a upper case,lower case and special character'})
    })
}) 

const forgetPasswordValidation = z.object({
  body: z.object({
    id: z.string({required_error: 'Id is required'}).trim()
  })
})

const resetPasswordValidation = z.object({
  body: z.object({
    id: z.string({required_error: 'Id is required'}).trim(),
    newPassword: z.string({required_error: 'New Password required'}).min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
      message: 'Password must have a upper case,lower case and special character'})
  })
})

export const authValidations = {
    loginAuthValidation,
    changePasswordAuthValidation,
    refreshTokenValidation,
    forgetPasswordValidation,
    resetPasswordValidation
}