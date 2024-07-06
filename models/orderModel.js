import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
    }] ,
    
    totalPrice:Number ,
    totalAmount : Number

},{
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order