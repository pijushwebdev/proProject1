import z from 'zod';

const createAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string().max(50),
        academicFaculty: z.string()
    })
})


export const AcademicDepartmentValidations = {
    createAcademicDepartmentValidation,
}