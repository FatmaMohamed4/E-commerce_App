import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import CheckOut from "../models/checkOutModel.js";
import Order from "../models/orderModel.js";


export const getCheckOut =catchError(async (req,res,next)=>{
    const user =req.user._id
    const id =req.params.OrderId 
    const address = req.body.address
    const payment =req.body.payment 
    const order = await Order.findOne(id)
    if(!order){
        return next(new AppError('Order not found', 404));
    }

// Ensure address and payment details are provided
if (!address || !payment) {
    return next(new AppError('Address and payment details are required', 400));
}

const checkOut = await CheckOut.create({ address, payment, order: id ,userId :user});
const totalCost =await Order.findOne(id).select('-userId -products -totalAmount -_id -createdAt -updatedAt -__v')
checkOut.TotalCost = order.totalCost

await checkOut.save()

if (!checkOut){
    return next (new AppError('Oops! Order Failed',400))
}
res.status(201).json ({
    status : true  ,
    message : "Your Order has been accepted" ,
    address ,
    payment ,
    totalCost
})
})

export const editCheckOut = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const orderId = req.params.OrderId;
    const { address, payment } = req.body;

    // Find the order by ID
    const order = await Order.findOne(orderId).populate('products.productId');
    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    // Check if the user is authorized to access this order
    if (order.userId.toString() !== userId.toString()) {
        return next(new AppError('Unauthorized to access this order', 403));
    }


    // Update the CheckOut record
    const checkOut = await CheckOut.findOneAndUpdate(
        { order: orderId },
        { address, payment },
        { new: true, runValidators: true }
    ).select('-_id -__v');

    if (!checkOut) {
        return next(new AppError('Checkout not found', 404));
    }

    // Send a response
    res.status(200).json({
        status: true,
        message: 'Checkout updated successfully',
        checkOut
    });
});