import { Router } from "express";
import { getUserDetails, loginUser, registerUser,logout } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(verifyJWT,loginUser)
userRouter.route('/user-details').get(verifyJWT,getUserDetails)

export default userRouter