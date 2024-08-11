import { z } from "zod";

// Define Zod schemas for reusable parts
const NameZodSchema = z.object({
    firstName: z.string().min(1).max(20).trim().refine(value => /^[A-Z]/.test(value), {
        message: "FirstName must be start with capital letter"
    }),
    middleName: z.string().max(20).optional(),
    lastName: z.string().min(1).max(20),
});

const AddressZodSchema = z.object({
    permanentAddress: z.object({
        city: z.string().min(1).trim(),
        road: z.string().min(1).trim(),
        zip_code: z.string().min(1).trim(),
    }),
    presentAddress: z.object({
        city: z.string().min(1).trim(),
        road: z.string().min(1).trim(),
        zip_code: z.string().min(1).trim(),
    }),
});

// Define the main Student Zod schema
const createStudentZodSchema = z.object({
    body: z.object({
        password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
            message: 'Password must have a upper case,lower case and special character'
        }).optional(),

        student: z.object({
            name: NameZodSchema,
            email: z.string().email(),
            phone: z.string(),
            gender: z.enum(["male", "female"]),
            age: z.number().int(),
            avatar: z.string().optional(),
            bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
            nationality: z.string().min(1),
            address: AddressZodSchema,
            class: z.string().min(1).trim(),
            guardian: z.object({
                name: NameZodSchema,
                relation: z.string().min(1).trim(),
                email: z.string().email().trim(),
                phone: z.string().trim(),
            }),
            roll: z.number().int().optional(),
            section: z.string().min(1).optional(),
            admissionSemester: z.string().trim(),
            academicDepartment: z.string().trim(),
            academicFaculty: z.string().trim()
        })
    })
});


// update 
const UpdateNameZodSchema = z.object({
    firstName: z.string().min(1).max(20).trim().refine(value => /^[A-Z]/.test(value), {
        message: "FirstName must be start with capital letter"
    }).optional(),
    middleName: z.string().max(20).optional().optional(),
    lastName: z.string().min(1).max(20).optional(),
}).optional();

const UpdateAddressZodSchema = z.object({
    permanentAddress: z.object({
        city: z.string().min(1).optional(),
        road: z.string().min(1).optional(),
        zip_code: z.string().min(1).optional(),
    }).optional(),
    presentAddress: z.object({
        city: z.string().min(1).optional(),
        road: z.string().min(1).optional(),
        zip_code: z.string().min(1).optional(),
    }).optional(),
});

//main update schema
const updateStudentZodSchema = z.object({
    body: z.object({
        password: z.string().min(6).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
            message: 'Password must have a upper case,lower case and special character'
        }).optional(),
        
        student: z.object({
            name: UpdateNameZodSchema.optional(),
            email: z.string().email().optional(),
            phone: z.string().optional(),
            gender: z.enum(["male", "female"]).optional(),
            age: z.number().int().optional(),
            avatar: z.string().optional(),
            bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
            nationality: z.string().min(1).optional(),
            address: UpdateAddressZodSchema.optional(),
            class: z.string().min(1).optional(),
            guardian: z.object({
                name: UpdateNameZodSchema.optional(),
                relation: z.string().min(1).optional(),
                email: z.string().email().optional(),
                phone: z.string().optional(),
            }).optional(),
            roll: z.number().int().optional(),
            section: z.string().min(1).optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
            academicFaculty: z.string().trim().optional(),
        })
    })
});

export const studentValidations = {
    createStudentZodSchema,
    updateStudentZodSchema
}
