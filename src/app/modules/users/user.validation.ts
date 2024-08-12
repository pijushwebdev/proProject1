import {z} from 'zod';
import { userStatus } from './user.constant';

const userPasswordValidation = z.object({
    password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
      message: 'Password must have a upper case,lower case and special character'}).optional(),
   
  });

const changeStatusValidation = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]])
  })
})

export const userValidations = {
  userPasswordValidation,
  changeStatusValidation
};