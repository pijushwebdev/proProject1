
import mongoose from "mongoose";
// import { TStudent } from "./student.interface";
import { Student } from "./student.schema";


// const createStudentIntoDB = async (studentData: TStudent) => {
//     // const result = await StudentModel.create(studentData); // build in static method


//     // const student = new Student(studentData); // instance created

//     //custom instance method
//     // const existingUser = await student.isUserExists(studentData.email);


//     //custom static method
//     const existingUser = await Student.isUserExists(studentData.email);
//     if (existingUser) {
//         throw new Error("User already exists");
//     }

//     const result = await Student.create(studentData);  // have to write after existingUser

//     // end custom static method

//     // const result = student.save();  // built in instance method
//     return result;
// }

const getAllStudentsDataFromDB = async () => {
    const result = await Student.find();
    return result;
}

const getSingleStudentFromDB = async (_id: string) => {
    // const result = await Student.findById(id);
    const result = await Student.findOne({ _id });
    return result;
}
const getSingleStudentFromDBbyAggregate = async (_id: string) => {
    const result = await Student.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(_id) } }]);
    return result;
}

const deleteSingleStudentFromDB = async (_id: string) => {
    // const result = await Student.deleteOne({ _id });
    // return result;

    //soft delete  // for we need help of 'pre' middleware
    const result = await Student.updateOne({ _id }, { isDeleted: true });
    return result;
}



export const studentServices = {
    // createStudentIntoDB,
    getAllStudentsDataFromDB,
    getSingleStudentFromDB,
    getSingleStudentFromDBbyAggregate,
    deleteSingleStudentFromDB,
}