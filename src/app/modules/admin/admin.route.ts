import { Router } from "express";
import { adminControllers } from "./admin.controller";
import requestValidation from "../../middleware/requestValidation";
import { adminValidations } from "./admin.validation";


const router = Router();

router.get('/getAdmins', adminControllers.getAllAdmin);
router.get('/getSingleAdmin/:adminId', adminControllers.getSingleAdmin);
router.patch('/updateSingleAdmin/:adminId', 
    requestValidation(adminValidations.updateAdminValidation),
    adminControllers.updateSingleAdmin
);
router.delete('/deleteSingleAdmin/admin/:adminId', adminControllers.deleteSingleAdmin);

export const adminRoutes = router;