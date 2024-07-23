import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Product from "../models/productModel.js";
import {uploadPhoto } from './../utils/photos.js';


// Get all products
export const getProducts = catchError(async (req, res, next) => {
    const products = await Product.find().select('-_id -slug -__v');
    if (!products.length) {
        return next(new AppError('Products not found', 404));
    }
    res.status(200).json({
        status: true,
        message: products
    });
});

// export const getOneProduct = catchError(async (req, res, next) => {
//     const { productName } = req.body.productName;
//     let product;

//     product = await Product.find({
//         productName: { $regex: productName, $options: 'i' } // 'i' for case-insensitive matching
//     });

//     if (!product || product.length === 0) {
//         return next(new AppError('Product not found', 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         product: product
//     });
// });






// Update a product
export const updateProduct = catchError(async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body.quantity, {
        new: true,
        runValidators: true
    }).select('-_id -slug -__v');

    if (!updatedProduct) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: true,
        message: updatedProduct
    });
});

// Delete a product
export const deleteProduct = catchError(async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id).select('-_id -slug -__v');
    if (!deletedProduct) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: true,
        deletedProduct: deletedProduct
    });
});


export const addProduct = catchError(async(req,res,next)=>{
            const photo = req.body.photo;
            await Product.create(req.body)
            res.status(201).json({
                status: true,
                message : "Created",   
            });
          
    }
)