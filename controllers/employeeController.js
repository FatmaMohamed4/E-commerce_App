import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import catchError from "../middlewares/catchError.js";
import AppError from "../middlewares/AppError.js";
import Employee from "./../models/employeeModel.js";
import { SUCCESS } from "../utils/statusText.js";
dotenv.config({ path: "./config.env" });
dotenv.config();
const SECRET_Key = process.env.SECRET_Key;

export const addEmployee = catchError(async (req, res, next) => {
  const user = req.user;
  if (user.isAdmin == true) {
    await Employee.create(req.body);
    res.status(201).json({
      status: SUCCESS,
      message: `New Employee is added by Admin: ${user.userName}`,
    });
  } else {
    return next(new AppError("Unauthorized , You are not an Admin", 401));
  }
});

export const getEmployee = catchError(async (req, res, next) => {
  const user = req.user;
  const id = req.body.id;
  if (user.isAdmin == true) {
    var employee = await Employee.findById(id);
    res.status(200).json({
      status: SUCCESS,
      employee,
    });
  } else {
    return next(new AppError("Unauthorized , You are not an Admin", 401));
  }
});

export const updateEmployee = catchError(async (req, res, next) => {
  const user = req.user;
  if (user.isAdmin == true) {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.body.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validators on the update operation
      }
    );
    if (!updatedEmployee) {
      return next(new AppError("Employee not found", 404));
    }
    res.status(200).json({
      status: SUCCESS,
      updatedEmployee,
    });
  } else {
    return next(new AppError("Unauthorized , You are not an Admin", 401));
  }
});

export const deleteEmployee = catchError(async (req, res, next) => {
  const user = req.user;
  if (user.isAdmin == true) {
    const emp = await Employee.findByIdAndDelete(req.body.id);
    if (!emp) {
      return next(new AppError("Employee not found", 404));
    }
    res.status(200).json({
      status: SUCCESS,
      message: "Employee is deleted ",
      Employee: emp,
    });
  } else {
    return next(new AppError("Unauthorized , You are not an Admin", 401));
  }
});
