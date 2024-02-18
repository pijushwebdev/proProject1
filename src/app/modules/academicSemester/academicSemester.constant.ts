import { TMonths, TNameCodeMapped, TSemesterCode, TSemesterName } from "./academicSemester.interface";



const Months: TMonths[] = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]
const SemesterName: TSemesterName[] = ['Spring' , 'Summer' , 'Fall'];
const SemesterCode: TSemesterCode[] = ['01', '02', '03'];

export const semesterConstants = {
    Months,
    SemesterCode,
    SemesterName
}

export const semesterNameCodeMapped: TNameCodeMapped = {
    'Spring': '01',
    'Summer': '02',
    'Fall': '03'
}