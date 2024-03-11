import { z } from 'zod';

const loginAuthValidation = z.object({
    body: z.object({
        id: z.string({ required_error: 'Id is required'}).trim(),
        password: z.string({required_error: 'Password is required'}).trim()
    })
}) 
const changePasswordAuthValidation = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: 'Old password is required'}).trim(),
        newPassword: z.string({required_error: 'New Password is required'}).trim()
    })
}) 

export const authValidations = {
    loginAuthValidation,
    changePasswordAuthValidation,
}