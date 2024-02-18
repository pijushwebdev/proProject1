import { Request, Response } from "express"

const notFound = (req: Request, res: Response) => {
    res.status(400).json({
        success: false,
        message: "404 Not Found",
        error: ""
    })
}

export default notFound;


//handle unknown route (app.ts)
// app.all( '*',(req: Request, res: Response) => {
//     res.status(400).json({
//         success: false,
//         message: "404 not found"
//     })
// });