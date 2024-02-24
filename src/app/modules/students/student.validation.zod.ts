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
        city: z.string().min(1),
        road: z.string().min(1),
        zip_code: z.string().min(1),
    }),
    presentAddress: z.object({
        city: z.string().min(1),
        road: z.string().min(1),
        zip_code: z.string().min(1),
    }),
});

// Define the main Student Zod schema
const createStudentZodSchema = z.object({
    body: z.object({
        password: z.string().min(8).refine((value) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/.test(value),{
            message: 'Password must have a upper case,lower case and special character'
        }),

        students: z.object({
            name: NameZodSchema.optional(),
            email: z.string().email(),
            phone: z.string(),
            gender: z.enum(["male", "female"]),
            age: z.number().int(),
            avatar: z.string().optional(),
            bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
            nationality: z.string().min(1),
            address: AddressZodSchema.optional(),
            class: z.string().min(1),
            guardian: z.object({
                name: NameZodSchema.optional(),
                relation: z.string().min(1),
                email: z.string().email(),
                phone: z.string(),
            }),
            roll: z.number().int().optional(),
            section: z.string().min(1).optional(),
            admissionSemester: z.string(),
            academicDepartment: z.string()
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
const updateStudentZodSchema = z.object({
    body: z.object({
        students: z.object({
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
            academicDepartment: z.string().optional()
        })
    })
});

export const studentValidations = {
    createStudentZodSchema,
    updateStudentZodSchema
}
