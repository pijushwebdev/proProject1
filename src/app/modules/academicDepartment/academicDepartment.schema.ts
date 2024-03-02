import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../ErrorHandlers/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: { type: String, required: true, unique: true },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    }
},
    {
        timestamps: true
    }
)

// duplicate value error handled by this and handleDuplicate error : first check this one
academicDepartmentSchema.pre('save', async function (next) {
    const isExist = await AcademicDepartment.findOne({ name: this.name });

    if (isExist) {
        throw new AppError(400, `This department already exists`)
    }

    next();
})

export const AcademicDepartment = model('AcademicDepartment', academicDepartmentSchema);





