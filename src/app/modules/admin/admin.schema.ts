import { Schema, model } from "mongoose";
import { AdminModel, TAdmin } from "./admin.interface";
import { AddressSchema, NameSchema } from "../students/student.schema";
import { BloodGroup, Gender } from "../students/student.constant";
import AppError from "../../ErrorHandlers/AppError";


const adminSchema = new Schema<TAdmin, AdminModel>({
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
        required: [true, 'Name is required'],
    },
    address: {
        type: AddressSchema,
        required: [true, 'address is required']
    },
    avatar: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        enum: {
            values: Gender,
            message: '{VALUE} is invalid'
        },
        required: [true, 'gender is required']
    },
    bloodGroup: {
        type: String,
        enum: {
            values: BloodGroup,
            message: '{VALUE} is invalid'
        },
        required: [true, 'blood group is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'age is required']
    },
    dateOfBirth: {
        type: String,
        required: [true, 'dateOfBirth is required']
    },
    designation: {
        type: String,
        required: [true, 'designation is required']
    },
    phone: {
        type: String,
        required: [true, 'phone is required']
    },
    nationality: {
        type: String,
        required: [true, 'nationality is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

adminSchema.statics.isAdminExists = async function (id: string) {
    const existedAdmin = await Admin.findOne({ id });
    if (existedAdmin) {
        throw new AppError(400, 'Admin already exists')
    }
}

adminSchema.pre('save', async function (next) {
    const existingAdmin = await Admin.findOne({ email: this.email })
    if (existingAdmin) {
        throw new AppError(400, 'Admin email already exists')
    }
    next();
})

adminSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
})

adminSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next();
});
adminSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
})
adminSchema.pre('findOneAndUpdate', async function(next) {
    const query = this.getQuery();
    const isExists = await Admin.find(query);
    if(!isExists){
        throw new AppError(404, 'Admin not found');
    }
    
    next();
});

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);