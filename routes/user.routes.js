import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import { authorize } from "../middlewere/auth.middleware.js";
const userRouter = Router();

userRouter.get("/",authorize, getAllUsers);
userRouter.get("/:id",authorize, getUserById);
userRouter.post("/", (req, res) => {
  res.send("Add new user profile");
});

userRouter.put("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Update user profile with ID: ${userId}`);
});
userRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  console.log(`Delete user profile with ID: ${userId}`);
  res.send(`Delete user profile with ID: ${userId}`);
});

export default userRouter;
