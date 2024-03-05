import { Schema, model } from "mongoose";
import { FacultyExistMethod, FacultyModel, TFaculty } from "./faculty.interface";
import { AddressSchema, BloodGroup, Gender, NameSchema } from "../students/student.schema";
import AppError from "../../ErrorHandlers/AppError";


const facultySchema = new Schema<TFaculty, FacultyModel, FacultyExistMethod>({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'user id is required'],
        unique: true,
        ref: 'User'
    },
    name: {
        type: NameSchema,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true
    },
    designation: {
        type: String,
        required:[true, 'Designation is required'],
        trim: true,
    },
    address: {
        type: AddressSchema,
        required: [true, 'Address is required']
    },
    age: { type: Number, required: [true, 'Age is required'] },
    dateOfBirth: { type: String, required: [true, 'Date of Birth is required'] },
    phone: { type: String, required: [true, 'Phone number is required'] },
    gender: {
        type: String,
        enum: {
            values: Gender,
            message: '{VALUE} is invalid'
        },
        required: [true, 'Gender is required']
    },
    bloodGroup: {
        type: String,
        enum: {
            values: BloodGroup,
            message: '{VALUE} is invalid'
        },

    },
    avatar: { type: String },
    nationality: { type: String, required: [true, 'Nationality is required'] },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: [true, 'Academic Faculty id is required'],
        ref: 'AcademicFaculty'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

facultySchema.methods.isFacultyExists = async (id: string) => {
    const existFaculty = await Faculty.findById(id);
    return existFaculty;
}

facultySchema.pre('save', async function (next) {
    const isExists = await Faculty.findById({ _id: this._id });
    if(isExists){
        throw new AppError(400, 'Faculty already exists');
    }
    next();
})
facultySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})
facultySchema.pre('findOne', function(next){
    this.find({isDeleted: {$ne: true}})
    next();
});
facultySchema.pre('aggregate', function(next) {
    this.pipeline().unshift({$match: { isDeleted: { $ne: true}}});
    next();
})
facultySchema.pre('findOneAndUpdate', async function(next) {
    const query = this.getQuery();
    const isExist = await Faculty.find(query);
    if(isExist){
        throw new AppError(404, 'Faculty does not exists');
    }
    next();
})



export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);