import {z} from 'zod';

const userValidation = z.object({
    password: z.string({
        invalid_type_error: 'Password must be string',
    }).optional(),
   
  });

export default userValidation;