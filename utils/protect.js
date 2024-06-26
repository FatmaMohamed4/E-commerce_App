import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import {promisify} from 'util'
import User from '../models/userModel.js';
import catchError from '../middlewares/catchError.js';
import AppError from '../middlewares/AppError.js';
dotenv.config({path:'./config.env'})
dotenv.config();
const SECRET_Key = process.env.SECRET_Key; 


const protect = catchError(async (req, res, next) => {
    let token ;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
            token=req.headers.authorization.split(" ")[1]
        }
        // console.log(token)
        if(!token){
            return next(new AppError('Please Login and Try again',401))
        }
        
        
        //verfiy token with secret key
        const decodedToken = await promisify (jwt.verify)(token,SECRET_Key) //return id
        // console.log(decodedToken)
        //check user (of token) is exist
        const currentUser =await User.findById(decodedToken.userId)
        
        
          if(!currentUser){
            return res.status(404).json({
                message : "Sesstion is expired"
            })
          }
        
        
          req.user=currentUser
        next()
        
});

export default protect