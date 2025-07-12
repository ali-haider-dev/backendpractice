import { Router } from "express";
const userRouter = Router();

/* GET users listing. */

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];
userRouter.post("/signin", function (req, res, next) {
  const { username, password } = req.body;
  console.log(`Received signin request for user: ${req.body.username}`);
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }
  // Here you would typically check the username and password against a database
  // For this example, we'll just return a success message
  // In a real application, you would also want to hash the password and check it securely
  console.log(`User signed in: ${username}`);
  res.send({ message: "User signed in successfully", user: username });
});
userRouter.post("/signup", function (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }
  // Here you would typically check the username and password against a database
  // For this example, we'll just return a success message
  // In a real application, you would also want to hash the password and check it securely
  res.send({ message: "User signed up successfully", user: username });
});
userRouter.post("/signout", function (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }
  // Here you would typically check the username and password against a database
  // For this example, we'll just return a success message
  // In a real application, you would also want to hash the password and check it securely
  console.log(`User signed out: ${username}`);
  res.send({ message: "User signed out successfully", user: username });
});

export default userRouter;
