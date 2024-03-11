import { z } from 'zod';
import { BloodGroup, Gender } from '../students/student.constant';

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

const createAdminValidation = z.object({
    body: z.object({
        password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
            message: 'Password must have a upper case,lower case and special character'
        }).optional(),

        admin: z.object({
            name: NameValidation,
            email: z.string().trim(),
            designation: z.string().trim(),
            age: z.number(),
            dateOfBirth: z.string().trim(),
            gender: z.enum([...Gender] as [string, ...string[]]),
            bloodGroup: z.enum([...BloodGroup as [string, ...string[]]]),
            address: AddressValidation,
            phone: z.string().trim(),
            nationality: z.string().trim()
        })
    })
})

const UpdateNameValidation = z.object({
    firstName: z.string().max(20).trim().refine(value => /^[A-Z]/.test(value), {
        message: 'First name must start with capital letter'
    }).optional(),
    middleName: z.string().trim().max(20).optional(),
    lastName: z.string().trim().max(20).optional()
})

const UpdateAddressValidation = z.object({
    presentAddress: z.object({
        city: z.string().trim().optional(),
        road: z.string().trim().optional(),
        zip_code: z.string().trim().optional()
    }),
    permanentAddress: z.object({
        city: z.string().trim().optional(),
        road: z.string().trim().optional(),
        zip_code: z.string().trim().optional()
    })
})
const updateAdminValidation = z.object({
    body: z.object({
        password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
            message: 'Password must have a upper case,lower case and special character'
        }).optional(),

        admin: z.object({
            name: UpdateNameValidation.optional(),
            email: z.string().trim().optional(),
            designation: z.string().trim().optional(),
            age: z.number().optional(),
            dateOfBirth: z.string().trim().optional(),
            gender: z.enum([...Gender] as [string, ...string[]]).optional(),
            bloodGroup: z.enum([...BloodGroup as [string, ...string[]]]).optional(),
            address: UpdateAddressValidation.optional(),
            phone: z.string().trim().optional(),
            nationality: z.string().trim().optional()
        })
    })
})

export const adminValidations = {
    createAdminValidation,
    updateAdminValidation
}