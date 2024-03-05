import { z } from 'zod'

const NameValidation = z.object({
    firstName: z.string().max(20).trim().refine(value => /^[A-Z]/.test(value), {
        message: 'First name must start with capital letter'
    }),
    middleName: z.string().trim().max(20).optional(),
    lastName: z.string().trim().max(20)
})

const AddressValidation = z.object({
    presentAddress: z.object({
        city: z.string().trim(),
        road: z.string().trim(),
        zip_code: z.string().trim()
    }),
    permanentAddress: z.object({
        city: z.string().trim(),
        road: z.string().trim(),
        zip_code: z.string().trim()
    })
})

const createFacultyValidation = z.object({
    body: z.object({
        password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
            message: 'Password must have a upper case,lower case and special character'
        }).optional(),
    }),
    faculty: z.object({
        name: NameValidation,
        email: z.string().trim(),
        designation: z.string().trim(),
        address: AddressValidation,
        phone: z.string().trim(),
        avatar: z.string().trim().optional(),
        bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
        age: z.number().int(),
        dateOfBirth: z.string().trim(),
        gender: z.enum(["male", "female"]),
        nationality: z.string().min(1),
        academicFaculty: z.string().trim()
    })
})
const updateFacultyValidation = z.object({
    body: z.object({
        password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
            message: 'Password must have a upper case,lower case and special character'
        }).optional(),
    }),
    faculty: z.object({
        name: NameValidation.optional(),
        email: z.string().trim().optional(),
        designation: z.string().trim().optional(),
        address: AddressValidation.optional(),
        phone: z.string().trim().optional(),
        avatar: z.string().trim().optional(),
        bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
        age: z.number().int().optional(),
        dateOfBirth: z.string().trim().optional(),
        gender: z.enum(["male", "female"]).optional(),
        nationality: z.string().min(1).optional(),
        academicFaculty: z.string().trim().optional()
    })
})

export const facultyValidations = {
    createFacultyValidation,
    updateFacultyValidation,
}