import z from 'zod';
import { semesterConstants } from './academicSemester.constant';

const createAcademicSemesterValidation = z.object({

    body: z.object({
        semesterName: z.enum([...semesterConstants.SemesterName] as [string, ...string[]]),
        code: z.enum([...semesterConstants.SemesterCode] as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum([...semesterConstants.Months] as [string, ...string[]]),
        endMonth: z.enum([...semesterConstants.Months] as [string, ...string[]]),
    })

})
const updateAcademicSemesterValidation = z.object({

    body: z.object({
        semesterName: z.enum([...semesterConstants.SemesterName] as [string, ...string[]]).optional(),
        code: z.enum([...semesterConstants.SemesterCode] as [string, ...string[]]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...semesterConstants.Months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...semesterConstants.Months] as [string, ...string[]]).optional(),
    })

})

export const AcademicSemesterValidations = {
    createAcademicSemesterValidation,
    updateAcademicSemesterValidation,
};