
import mongoose from "mongoose";
import { Student } from "./student.schema";
import { TStudent } from "./student.interface";
import AppError from "../../ErrorHandlers/AppError";
import { User } from "../users/user.schema";
import QueryBuilder from "../../builders/QueryBuilder";


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
    const result = await Student.find().populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty' // field name
        }
    });
    return result;
}

const getSingleStudentFromDB = async (_id: string) => {
    const result = await Student.findById({ _id });
    return result;
}

const getSingleStudentFromDBbyAggregate = async (_id: string) => {
    const result = await Student.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(_id) } }]);
    return result;
}

const updateAStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, address, ...restPrimitiveData } = payload;

    if(restPrimitiveData.email){
        throw new AppError(403, "Can't change email address");
    }
    if(restPrimitiveData.id){
        throw new AppError(403, "Can't change id");
    }

    const modifiedUpdatedData: Record<string, unknown> = { ...restPrimitiveData };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (address && Object.keys(address).length) {
        for (const [key, value] of Object.entries(address)) {
            modifiedUpdatedData[`address.${key}`] = value;
        }
    }

    const result = await Student.findOneAndUpdate(
        { _id: id },
        modifiedUpdatedData,
        { new: true, runValidators: true }
    );
    return result;
}

const deleteSingleStudentFromDB = async (studentId: string) => {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // const deletedUser = await User.findByIdAndUpdate({ _id: userId }, { isDeleted: true }, { new: true, session });
        // if (!deletedUser) {
        //     throw new AppError(400, 'Failed to delete the user')
        // }

        const deletedStudent = await Student.findByIdAndUpdate({ _id: studentId }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError(400, 'Failed to delete the student')
        }

        const userId = deletedStudent.user;
        const deletedUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session});
        if(!deletedUser){
            throw new AppError(400, 'Failed to delete user');
        }

        await session.commitTransaction();
        await session.endSession();

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, `${error}`);
    }

    // //soft delete  // for this we need help of 'pre' middleware hook for prevent find deleted data
    // const result = await Student.updateOne({ _id }, { isDeleted: true });
    // return result;
}

// const searchInStudentsFromDB = async (query: Record<string, unknown>) => {

//     let searchTerm = '';
//     const copyQuery = { ...query };
//     if (query?.searchTerm) {
//         searchTerm = query.searchTerm as string;
//     }
//     // partial match  for searching 
//     const searchQuery = Student.find({
//         $or: ['email', 'name.firstName', 'address.presentAddress'].map((field) => ({
//             [field]: { $regex: searchTerm, $options: 'i' }
//         }))
//     });
//     //filtering
//     const excludingField = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
//     excludingField.map(el => delete copyQuery[el]);
//     // console.log({ query }, { copyQuery });
//     const filterQuery = searchQuery.find(copyQuery).populate('admissionSemester').populate({
//         path: 'academicDepartment',
//         populate: {
//             path: 'academicFaculty'
//         }
//     });
//     let sort = '-createdAt';
//     if (query?.sort) {
//         sort = query?.sort as string;
//     }
//     const sortQuery = filterQuery.sort(sort);
//     let limit = 1;
//     if (query.limit) {
//         limit = Number(query.limit);
//     }
//     //pagination
//     let skip = 0;
//     let page = 1;
//     if (query?.page) {
//         page = Number(query.page);
//         skip = Number(page - 1) * limit;
//     }
//     const paginateQuery = sortQuery.skip(skip);
//     // paginate = sortQuery.skip(skip).limit(limit);
//     const limitQuery = paginateQuery.limit(limit);
//     // field limiting
//     let fields = '-__v';
//     if (query?.fields) {
//         fields = String(query.fields).split(',').join(' ');
//     }
//     const fieldsQuery = await limitQuery.select(fields);
//     return fieldsQuery;
// }

const searchInStudentsFromDB = async (query: Record<string, unknown>) => {
    const searchableFields = ['email', 'name.firstName', 'address.presentAddress'];

    const studentQuery = new QueryBuilder(Student.find()
        .populate('user')
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: { path: 'academicFaculty' }
        }), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fieldLimit()

    const result = studentQuery.modelQuery;

    return result;
}


export const studentServices = {
    // createStudentIntoDB,
    getAllStudentsDataFromDB,
    getSingleStudentFromDB,
    getSingleStudentFromDBbyAggregate,
    deleteSingleStudentFromDB,
    updateAStudentFromDB,
    searchInStudentsFromDB,
}