import {z} from 'zod';

const userValidation = z.object({
    password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
      message: 'Password must have a upper case,lower case and special character'
  }).optional(),
   
  });

export default userValidation;