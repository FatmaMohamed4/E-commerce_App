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
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).select(selectRoles);

  if (!updatedProduct) {
    return respondWithError(next, "Product not found", 404);
  }

  respondWithSuccess(res, { product: updatedProduct });
});

// Delete a product
export const deleteProduct = catchError(async (req, res, next) => {
  const deletedProduct = await Product.deleteOne({ _id: req.params.productId });
  if (deletedProduct.deletedCount === 0) {
    return respondWithError(next, "Product not found", 404);
  }
  const products = await Product.find({}).select(selectRoles);
  respondWithSuccess(res, { products });
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
