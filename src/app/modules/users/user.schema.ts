import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const userSchema = new Schema<TUser, UserModel>({
    id: { type: String, required: [true, 'id is required'], unique: true },
    password: {
        type: String,
        minlength: [6, 'Minimum 6 character required'],
        select: 0
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true
    },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: { type: Date },
    role: {
        type: String,
        enum: ['student', 'admin', 'faculty'],
        required: [true, 'Role is required'],
    },
    status: { type: String, enum: ['in-progress', 'blocked'], default: 'in-progress' },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const data = this;
    data.password = await bcrypt.hash(data.password, Number(config.bcrypt_salt_round));

    next();
})
userSchema.post('save', async function (doc, next) {
    doc.password = "";

    next();
})

userSchema.statics.isUserExists = async function (id: string) {
    const user = await User.findOne({ id }).select('+password');  //id -> custom generated id
    return user;
}
userSchema.statics.isPasswordMatched = async function (password, hashPassword) {
    const isMatched = await bcrypt.compare(password, hashPassword);
    return isMatched;
}

export const User = model<TUser, UserModel>('User', userSchema);