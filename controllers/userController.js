import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import catchError from "../middlewares/catchError.js";
import AppError from "../middlewares/AppError.js";
import { ERROR, SUCCESS } from "../utils/statusText.js";
dotenv.config({ path: "./config.env" });
dotenv.config();
const SECRET_Key = process.env.SECRET_Key;

export const register = catchError(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: SUCCESS,
      message: "Register correctly",
      newUser: newUser,
    });
  } else {
    return next(new AppError("Invalid data please try again", 400));
  }
});

export const LogIn = catchError(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid Email or password ", 400));
  }

  let token = Jwt.sign({ userId: user._id }, SECRET_Key, { expiresIn: "30d" });

  res.status(200).json({
    status: SUCCESS,
    message: `Welcom Again ${user.userName}`,
    token: token,
    user,
  });
});

export const updateAccount = catchError(async (req, res, next) => {
  const userId = req.params.userId;
  const updatedUser = await User.updateOne(
    { _id: userId },
    { $set: { ...req.body } }
  );
  if (!updatedUser) {
    return res.status(404).json({ status: ERROR, message: "User not found" });
  }

  res.status(200).json({
    status: SUCCESS,
    message: "success updating user",
    data: updatedUser,
  });
});

export const deleteUser = catchError(async (req, res) => {
  await User.deleteOne({ _id: req.params.userId });
  res
    .status(200)
    .json({ status: SUCCESS, message: "user is deleted", data: null });
});
