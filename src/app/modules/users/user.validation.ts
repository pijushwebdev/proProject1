import {z} from 'zod';

const UserZodSchema = z.object({
    password: z.string({
        invalid_type_error: 'Password must be string',
    }).optional(),
   
  });

export default UserZodSchema;