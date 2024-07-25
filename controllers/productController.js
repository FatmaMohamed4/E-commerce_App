import catchError from "../middlewares/catchError.js";
import Product from "../models/productModel.js";
import {
  respondWithError,
  respondWithSuccess,
} from "./../middlewares/responseHandlers.js";
let selectRoles = "-slug -__v";
// add product
export const addProduct = catchError(async (req, res, next) => {
  const image = req.body.image;
  const newProduct = await Product.create(req.body);
  if (!newProduct) {
    return respondWithError(next, "Error adding new product", 400);
  }
  respondWithSuccess(res, { message: "Added a new product", newProduct }, 201);
});

export const getProducts = catchError(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const products = await Product.find({}, { __v: false })
    .select(selectRoles)
    .limit(limit)
    .skip(skip);
  respondWithSuccess(res, { products });
});

export const getProduct = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    return respondWithError(next, "Product not found", 404);
  }
  respondWithSuccess(res, { product });
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
