import express from "express"
import  { LogIn, register } from "../controllers/userController.js";

const userRoute = express.Router();


userRoute.post('/register',register)
userRoute.post('/login',LogIn)

export default userRoute