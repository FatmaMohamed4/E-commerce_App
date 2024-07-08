import express from "express"
import  { LogIn, getUser, register ,updateAccount} from "../controllers/userController.js";

const userRoute = express.Router();


userRoute.post('/register',register)
userRoute.post('/login',LogIn)
userRoute.get('/get', getUser)
userRoute.patch('update/:userId', updateAccount)
export default userRoute
