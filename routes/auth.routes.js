import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller.js";
const userRouter = Router();

userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.post("/signout", signout);

export default userRouter;
