import { Router } from "express";
const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({title:"User route is working"});
});
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