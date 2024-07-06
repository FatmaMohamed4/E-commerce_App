import express from "express"
import  { LogIn, getUser, register } from "../controllers/userController.js";

const userRoute = express.Router();


userRoute.post('/register',register)
userRoute.post('/login',LogIn)
userRoute.get('/get', getUser)
export default userRoute