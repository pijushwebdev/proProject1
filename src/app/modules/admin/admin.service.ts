import mongoose from "mongoose"
import QueryBuilder from "../../builders/QueryBuilder"
import { TAdmin } from "./admin.interface"
import { Admin } from "./admin.schema"
import { User } from "../users/user.schema"
import AppError from "../../ErrorHandlers/AppError"



const getAllAdminFromDB = async (query: Record<string, unknown>) => {
    const searchableFields = ['email', 'designation', 'address.presentAddress']
    const adminQuery = new QueryBuilder(Admin.find(), query)
        .search(searchableFields)
        .filter()
        .sort()
        .paginate()
        .fieldLimit()

    const result = adminQuery.modelQuery;
    return result;
}

const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id);
    return result;
}

const updateSingleAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
    const { name, address, ...restPrimitiveData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = { ...restPrimitiveData };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (address && Object.keys(address).length) {
        for (const [key, value] of Object.entries(address)) {
            modifiedUpdatedData[`address.${key}`] = value;
        }
    }

    const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, { new: true, runValidators: true });
    return result;
}

const deleteSingleAdminFromDB = async (adminId: string) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // const deletedUser = await User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true, session });
        // if (!deletedUser) {
        //     throw new AppError(400, 'Failed to delete the user');
        // }

        const deletedAdmin = await Admin.findByIdAndUpdate(adminId, { isDeleted: true }, { new: true, session })
        if (!deletedAdmin) {
            throw new AppError(400, 'Failed to create admin');
        }

        const userId = deletedAdmin.user;
        const deletedUser = await User.findByIdAndUpdate(userId, {isDeleted: true}, {new: true, session});
        if(!deletedUser){
            throw new AppError(400, 'Failed to delete user');
        }

        session.commitTransaction();
        session.endSession();

    } catch (error) {
        session.abortTransaction();
        session.endSession();
        throw new AppError(400, 'Failed to create Admin');
    }
}

export const adminServices = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateSingleAdminFromDB,
    deleteSingleAdminFromDB,
}