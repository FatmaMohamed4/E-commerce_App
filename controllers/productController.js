import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Product from "../models/productModel.js";

// Get all products
export const getProducts = catchError(async (req, res, next) => {
    const products = await Product.find().select('-_id -slug -__v').limit(3)
    if (!products.length) {
        return next(new AppError('Products not found', 404));
    }
    res.status(200).json({
        status: true,
        message: products
    });
});

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
            const product = await Product.create(req.body)
            res.status(201).json({
                status: true,
                message : "Created",    
                product
            });
          
    }
)

// export const getProduct = catchError(async (req, res, next) => {
//     const productName =req.body
//     const regex = new RegExp(productName, 'i'); // 'i' makes it case-insensitive
//     let product

//     if(productName){
//         product = await Product.find(
//             { $or: 
//                 [{ productName: { $regex: regex } },
//                  { slug: { $regex: regex } } ,
//                 ] })
//     }
//     res.status(200).json({
//         status: true,
//         message: product
//     });
// });



export const getProductByName= catchError(async (req, res, next) => {
    const { name } = req.body;
    let product;

    if (name) {
        const regex = new RegExp(name, 'i'); // 'i' makes it case-insensitive
        product = await Product.find(
            { $or: [{ productName: { $regex: regex } }, { slug: { $regex: regex } }] }
        ).select('-__v -slug');
    }

    if (!product || product.length === 0) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: 'success',
        product: product
    });
});

export const getProduct =catchError(async(req,res,next)=>{
   const product = await Product.findById(req.body.id)
   if(!product){
    return next(new AppError('Product not found', 404));
   }
   res.status(200).json({
    status: 'success',
    product: product
});
})