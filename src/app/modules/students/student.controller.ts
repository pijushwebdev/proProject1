
import { studentServices } from "./student.service";
import asyncTryCatch from "../../utils/asyncTryCatch";


const getAllStudentsData = asyncTryCatch( async (req, res) => {
    
    const data = await studentServices.getAllStudentsDataFromDB();

    res.status(200).json({
        success: true,
        message: "All Student data is here",
        data: data
    })

});


const getSingleStudent = asyncTryCatch( async (req, res) => {
   
        const id = req.params._id;
        const data = await studentServices.getSingleStudentFromDB(id);

        res.status(200).json({
            success: true,
            message: "Specific Student data has received",
            data: data
        })
    
})

// const getSingleStudent: RequestHandler = async (req, res, next) => {
//     try {
//         const id = req.params._id;
//         const data = await studentServices.getSingleStudentFromDB(id);

//         res.status(200).json({
//             success: true,
//             message: "Specific Student data has received",
//             data: data
//         })
//     } catch (error) {
//         next(error);
//     }
// }
const getSingleStudentByAggregate = asyncTryCatch( async (req, res) => {
    
    const id  = req.params._id;
    const data = await studentServices.getSingleStudentFromDBbyAggregate(id);

    res.status(200).json({
        success: true,
        message: "Specific Student data has received",
        data: data
    })
})


const deleteSingleStudent = asyncTryCatch( async (req, res) => {
    
    const id = req.params._id;
    const data = await studentServices.deleteSingleStudentFromDB(id);

    res.status(200).json({
        success: true,
        message: "Student data has been deleted",
        data: data
    })

})



export const studentControllers = {
    // createStudent,
    getAllStudentsData,
    getSingleStudent,
    getSingleStudentByAggregate,
    deleteSingleStudent
}