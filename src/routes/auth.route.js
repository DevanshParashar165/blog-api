import { Router } from "express";
import { getUserDetails, loginUser, registerUser, logout} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidator, loginValidator} from "../validators/auth.validator.js";

const userRouter = Router();

userRouter.post(
  "/register",
  validate(registerValidator),
  registerUser
);

userRouter.post(
  "/login",
  validate(loginValidator),
  loginUser
);

userRouter.post(
  "/logout",
  verifyJWT,
  logout
);

userRouter.get(
  "/user-details",
  verifyJWT,
  getUserDetails
);

export default userRouter;
