import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const userSchema = new Schema<TUser>({
    id: { type: String, required: [true, 'id is required'], unique: true },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        minlength: [8, 'Minimum 8 character required'] 
    },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
        type: String,
        enum: ['student', 'admin', 'faculty'],
        required: [true, 'Role is required'],
    },
    status: {type: String, enum: ['in-progress', 'blocked'], default: 'in-progress'},
    isDeleted: {type: Boolean, default: false}
},{
    timestamps: true
})


userSchema.pre('save', async function(next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const data = this;
    data.password = await bcrypt.hash(data.password, Number(config.bcrypt_salt_round));
    
    next();
})
userSchema.post('save', async function(doc, next){
    doc.password = "";

    next();
})

export const User = model<TUser>('User', userSchema);