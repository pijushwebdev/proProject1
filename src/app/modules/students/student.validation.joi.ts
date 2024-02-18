import Joi from "joi";

//joi validation start // no need student.schema . it gives schema and validation
const userNameSchema = Joi.object({
    firstName: Joi.string().required().max(20),
    middleName: Joi.string().max(20),
    lastName: Joi.string().required().max(20)
});

const guardianValidationSchema = Joi.object({
    name: Joi.object({
        firstName: Joi.string().required().max(20),
        lastName: Joi.string().required().max(20)
    }),
    relation: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
});

const addressValidationSchema = Joi.object({
    permanentAddress: Joi.object({
        city: Joi.string().required(),
        road: Joi.string().required(),
        zip_code: Joi.string().required()
    }),
    presentAddress: Joi.object({
        city: Joi.string().required(),
        road: Joi.string().required(),
        zip_code: Joi.string().required()
    })
});

const studentValidationSchema = Joi.object({
    name: userNameSchema.required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid('male', 'female').required(),
    age: Joi.number().required(),
    avatar: Joi.string(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    nationality: Joi.string().required(),
    address: addressValidationSchema.required(),
    class: Joi.string().required(),
    department: Joi.string().required(),
    guardian: guardianValidationSchema.required(),
    roll: Joi.number(),
    section: Joi.string()
});

// joi validation end

export default studentValidationSchema;