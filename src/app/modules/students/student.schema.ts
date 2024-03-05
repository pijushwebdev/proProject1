import { Schema, model } from "mongoose";
import { StudentModel, TAddress, TGuardian, TStudent, TName, TBloodGroup, TGender } from "./student.interface";
import AppError from "../../ErrorHandlers/AppError";
// import bcrypt from 'bcrypt';
// import config from "../../config";




export const NameSchema = new Schema<TName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        maxlength: [20, "First Name can't be more than 20 characters"],
        trim: true,
        //custom validation
        // validate: {
        //     validator: function (value: string) {
        //         const convertedFirstName = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        //         return convertedFirstName === value;
        //     }
        // }
    },
    middleName: {
        type: String,
        trim: true,
        maxlength: [20, "Middle Name can't be more than 20 characters"],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        maxlength: [20, "Last Name can't be more than 20 characters"],
        trim: true
    }
});

const GuardianSchema = new Schema<TGuardian>({
    name: {
        type: NameSchema,
        required: [true, 'Guardian Name is required']
    },
    relation: {
        type: String,
        required: [true, 'Relation is required']
    },
    email: {
        type: String,
        required: [true, 'Guardian email is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Guardian Phone No. is required'],
        trim: true
    }
});

export const AddressSchema = new Schema<TAddress>({
    permanentAddress: {
        city: { type: String, required: [true, 'Permanent City is required'], trim: true },
        road: { type: String, required: [true, 'Permanent Road No. is required'], trim: true },
        zip_code: { type: String, required: [true, 'Permanent Zip Code is required'], trim: true },
    },
    presentAddress: {
        city: { type: String, required: [true, 'Present City is required'], trim: true },
        road: { type: String, required: [true, 'Present Road is required'], trim: true },
        zip_code: { type: String, required: [true, 'Present Zip Code is required'], trim: true },
    }
});

export const BloodGroup: TBloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const Gender: TGender[] = ['female', 'male', 'others']; 

//for custom instance // add parameter in student schema: TStudent, StudentModel, StudentExistsMethod
// for custom static // add parameter in student schema : TStudent, StudentModel(must use in interface(StudentModel))
const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        required: [true, "id is required"],
        unique: true,
        message: 'id already exists'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "user id required"],
        unique: true,
        ref: 'User'
    },
    name: {
        type: NameSchema,
        required: [true, 'Student Name is required']
    },
    email: {
        type: String,
        required: [true, 'Student Email is required'],
        unique: true,
        trim: true,
        message: 'Email already exist'
    },
    phone: { type: String, required: [true, 'Student Phone No. is required'], trim: true },
    gender: {
        type: String,
        enum: {
            values: Gender,
            message: '{VALUE} is not valid'
        },
        required: [true, 'Gender is required']
    },
    age: { type: Number, required: [true, 'Age is required'], trim: true },
    dateOfBirth: { type: String, required: [true, 'Birth date is required']},
    avatar: { type: String , trim: true},
    bloodGroup: {
        type: String,
        enum: {
            values: BloodGroup,
            message: '{VALUE} is not valid blood group'
        }
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required'],
        trim: true
    },
    address: {
        type: AddressSchema,
        required: [true, 'Address is required'],
    },
    class: {
        type: String,
        required: [true, 'Class is required'],
        trim: true
    },
    guardian: {
        type: GuardianSchema,
        required: [true, 'Guardian details are required']
    },
    roll: {
        type: Number,
        trim: true
    },
    section: {
        type: String,
        trim: true
    },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        required: [true, 'Academic Semester is required'],
        ref: 'AcademicSemester'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: [true, 'Academic Department is required'],
        ref: 'AcademicDepartment'  // model name
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

},
    {
        //enable virtual for create field but not send to DB only send to client
        toJSON: {
            virtuals: true,
        }
    }
);

//mongoose virtual // data that does not exists but we can create// for this we need to enable virtual
studentSchema.virtual('fullName').get(function () {
    return (this?.name?.middleName ? `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}` : `${this?.name?.firstName} ${this?.name?.lastName}`);
})



//Query middleware
studentSchema.pre('find', function (next) {
    // console.log(this); // 'this' means 'find'
    this.find({ isDeleted: { $ne: true } }) // filter data through find// isDeleted: false data will be found
    next();
})
studentSchema.pre('findOne', async function (next) {
    // console.log(this); // 'this' means 'find'
    this.find({ isDeleted: { $ne: true } }) // filter data through findOne // isDeleted: false data will be found

    next();
})

//    {$match: isDeleted: { $ne: true}},{ $match: { _id: new mongoose.Types.ObjectId(_id) } } // have to apply to prevent isDeleted: true get
studentSchema.pre('aggregate', function (next) {
    // console.log(this.pipeline); 
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

    next();
})

studentSchema.pre('save', async function (next) {
    const isExists = await Student.findOne({ email: this.email })
    if (isExists) {
        throw new AppError(404,'Student is already exists');
    }
    next();
})

studentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isExist = await Student.findOne(query);

    if (!isExist) {
        throw new AppError(404,"This student does not exists")
    }

    next();
})


studentSchema.statics.isStudentExists = async function (id: string) {
    const existStudent = await Student.findById(id);
    return existStudent;
}

//custom static method
studentSchema.statics.isUserExists = async function (email: string) {
    const existUser = await Student.findOne({ email });
    return existUser;
}


// custom instance method
// studentSchema.methods.isUserExists = async function (email: string) {
//     const existUser = await Student.findOne({ email });
//     return existUser;
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
//
// export const StudentModel = model<TStudent>('Student', studentSchema); // without custom instance and static method


// pre save middleware or hooks: will execute while create() or save() is call Student.create() ... student.save()
