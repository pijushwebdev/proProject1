import z from 'zod';


const createFacultyValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Must be string'}).max(50)
    })
});
const updateFacultyValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Must be string'}).max(50).optional()
    })
});


export const FacultyValidations = {
    createFacultyValidation,
    updateFacultyValidation,
}