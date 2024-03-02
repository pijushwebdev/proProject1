import z from 'zod';


const createAcademicFacultyValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Must be string'}).max(50)
    })
});
const updateAcademicFacultyValidation = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Must be string'}).max(50).optional()
    })
});


export const academicFacultyValidations = {
    createAcademicFacultyValidation,
    updateAcademicFacultyValidation,
}