import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/env.js";

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = new Error("Email  already exists");
      error.statusCode = 409; // Conflict
      throw error;
    }
    //Hash the password before saving
    // const salt = await bcrypt.genSalt(10);

    //  const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [
        {
          name,
          email,
          password,
        },
      ],
      { session }
    );
    console.log(newUsers);
    //create token
    const token = jwt.sign({ id: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token: token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = {};
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401; // Unauthorized
      throw error;
    }
    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401; // Unauthorized
      throw error;
    }
    //Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
   
    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token: token,
        user: user,
      },
    });
  } catch (error) {
    
    next(error);
  }
};

export const signout = (req, res) => {};
