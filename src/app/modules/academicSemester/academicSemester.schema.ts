import { Schema, model } from "mongoose";
import { TAcademicSemester} from "./academicSemester.interface";
import { semesterConstants } from "./academicSemester.constant";



const academicSemesterSchema = new Schema<TAcademicSemester>({

    semesterName: {
        type: String,
        enum: semesterConstants.SemesterName,
        required: true,
    },
    code: {
        type: String,
        enum: semesterConstants.SemesterCode,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: semesterConstants.Months,
        required: true,
    },
    endMonth: {
        type: String,
        enum: semesterConstants.Months,
        required: true,
    }
},
{
    timestamps: true
}
);

academicSemesterSchema.pre('save', async function(next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        semesterName: this.semesterName,
    })

    if(isSemesterExists){
        throw new Error("This Semester already exists this year");
    }

    next();
})


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
