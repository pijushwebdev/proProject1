import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.schema"
import AppError from "../../ErrorHandlers/AppError";
import { User } from "../users/user.schema";
import QueryBuilder from "../../builders/QueryBuilder";

const getAllFacultyFromDB = async(query: Record<string, unknown>) => {
    const searchableFields = ['email', 'name.firstName', 'address.presentAddress'];
    const facultyQuery = new QueryBuilder(Faculty.find()
        .populate('academicFaculty'), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = facultyQuery.modelQuery;
    return result;
}

const getSingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findById(id);
    return result;
}

const updateAFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
    const { name, address, ...restPrimitiveData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = { ...restPrimitiveData};

    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if(address && Object.keys(address).length){
        for(const [key, value] of Object.entries(address)){
            modifiedUpdatedData[`address.${key}`] =  value;
        }
    }

    const result = await Faculty.findByIdAndUpdate(id, modifiedUpdatedData, {new: true, runValidators: true})
    return result;
}

const deleteSingleFacultyFromDB = async ( facultyId: string ) => {
    
    const session = await mongoose.startSession();
    try{
        session.startTransaction();

        const deletedFaculty = await Faculty.findByIdAndUpdate({_id: facultyId}, {isDeleted: true}, { new: true, session } );
        if(!deletedFaculty){
            throw new AppError(400, 'Failed to delete the faculty');
        }

        const userId = deletedFaculty.user;
        const deletedUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session} )
        if(!deletedUser){
            throw new AppError(400, 'Failed to delete user');
        }

        session.commitTransaction();
        session.endSession();
    }catch(error){
        session.abortTransaction();
        session.endSession();
        throw new AppError(400, 'Failed to delete the faculty');
    }
}


export const facultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateAFacultyFromDB,
    deleteSingleFacultyFromDB,
}