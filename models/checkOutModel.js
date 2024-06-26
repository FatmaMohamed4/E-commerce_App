import mongoose, { model } from "mongoose";

const checkSchema = new mongoose.Schema({
    address :{
        type : String , 
        required :[true ,"Enter your Adress in detail"] 
    } ,

    payment :{
        type: String,
        enum: ["Cash" ,"Visa"], 
        required: [true, "payment method is required"],
        default : 'Cash'
    } ,

    TotalCost :{
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
    } ,
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }

})


const CheckOut = mongoose.model('checkout', checkSchema);
export default CheckOut