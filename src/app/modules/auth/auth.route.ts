import { Router } from "express";
import requestValidation from "../../middleware/requestValidation";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";
import Auth from "../../middleware/auth";
import { USER_ROLE } from "../users/user.constant";

const router = Router();


router.post('/login',
    requestValidation(authValidations.loginAuthValidation),
    authControllers.loginUser
);

router.post('/refresh-token',
    requestValidation(authValidations.refreshTokenValidation),
    authControllers.refreshToken
);

router.post('/change-password',
    Auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    requestValidation(authValidations.changePasswordAuthValidation),
    authControllers.changePassword
);


export const authRoutes = router;