import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import AppError from "../../ErrorHandlers/AppError";


const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
},
{
    timestamps: true
}
)

academicFacultySchema.pre('save', async function (next){

    const isExist = await AcademicFaculty.findOne({name: this.name});
    if(isExist){
        throw new AppError(400, 'This faculty already exist');
    }
    next();
})

export const AcademicFaculty = model('AcademicFaculty', academicFacultySchema);