import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


export const addOrder = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const products = req.body.products;
    const existingOrder = await Order.findOne({ userId });

    if (existingOrder) {
        return next(new AppError('User already has an order', 409));
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return next(new AppError('Please add products to order', 400));
    }

    for (const productId of products) {
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return next(new AppError(`Product with ID ${productId} not found`, 404));
        }
    }
    const newOrder = await Order.create({ userId, products });

    res.status(201).json({
        status: true,
        message: "Order created successfully",
        order: newOrder
    });
});

export const getOrder= catchError(async (req, res, next) => {
    const userId = req.user._id;

    try {
        const order = await Order.findOne({ userId }).populate('products');

        if (!order) {
            return next(new AppError('Order not found', 404));
        }

        // Populate products with actual product documents
        const populatedOrder = await (await order.populate('products','-__v -slug -createdAt -updatedAt -_id -stock')).populate('userId','-password -__v -_id')

        res.status(200).json({
            status: true,
            message: populatedOrder
        });
    } catch (err) {
        return next(new AppError(err.message, 500));
    }
});


export const addProductsToOrder = catchError(async (req, res, next) => {
    const orderId = req.params.id;
    const userId = req.user._id;
    const order = await Order.findById(orderId);
    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    if (order.userId.toString() !== userId.toString()) {
        return next(new AppError('Unauthorized to update this order', 403));
    }

    if (req.body.products && Array.isArray(req.body.products)) {
        order.products.push(...req.body.products);
    }

    const updatedOrder = await order.save();

    res.status(200).json({
        status: true,
        message: "Order updated successfully",
        order: updatedOrder
    });
});

export const calculateOrderTotals =catchError( async( req,res,next) => {
    const { orderId } = req.params.id;
    const userId =req.user._id 

    const order = await Order.findOne(orderId).populate('products');

    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    // Calculate totals
    let totalAmount = 0;
    let totalPrice = 0;

    for (const item of order.products) {
        const product = await Product.findOne(item.productId);
        if (product) {
            totalAmount += item.quantity;
            totalPrice += item.price * item.quantity;

            
        }
    }
    order.totalAmount = totalAmount
    order.totalPrice = totalPrice
    await order.save()

    // Respond with calculated totals
    res.status(200).json({
        status: true,
        message: "Order totals calculated successfully" ,
        totalAmount,
        totalPrice,
        order: order  
        
    });
})

export const addProductsTo_FAV = catchError(async (req, res, next) => {
    const orderId = req.params.id;
    const userId = req.user._id;
    const order = await Order.findById(orderId);
    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    if (order.userId.toString() !== userId.toString()) {
        return next(new AppError('Unauthorized to update this order', 403));
    }

    if (req.body.products && Array.isArray(req.body.products)) {
        order.products.push(...req.body.products);
    }

    const updatedOrder = await order.save();

    res.status(200).json({
        status: true,
        message: "Order updated successfully",
        order: updatedOrder
    });
});
