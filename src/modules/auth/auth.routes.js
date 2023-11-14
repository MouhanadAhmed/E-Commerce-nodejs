import express from "express";
import * as authController from "./auth.controller.js"
const authRouter = express.Router();

authRouter.post("/signup",authController.signUp);
authRouter.post("/logout",authController.logOut);
authRouter.post("/signin",authController.signIn);
authRouter.get('/verify/:token',authController.verifyEmail);
authRouter.post('/forgotPassword',authController.forgotPassword);
authRouter.post('/verifyRessetCode',authController.verifyRessetCode);
authRouter.put('/changeMyPassword',authController.changeMyPassword);
authRouter.put('/resetPassword',authController.ressetPassword);

export default authRouter;