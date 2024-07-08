import express from "express";
import {
  LogIn,
  register,
  updateAccount,
  deleteUser,
} from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", LogIn);
userRoute.patch("/update/:userId", updateAccount);
userRoute.delete("/delete/:userId", deleteUser);

export default userRoute;
