import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const DataBase = process.env.DataBase;

async function connectDB() {
  await mongoose.connect( process.env.DataBase)
 .then(()=>{
   console.log("DB is Connected");
 }) 
}

// connectDB();
export default connectDB
