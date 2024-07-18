import { query } from "express";
import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Product from "../models/productModel.js";
import { FAILD, SUCCESS } from "../utils/statusText.js";

// Add a new product
export const addProduct = catchError(async (req, res, next) => {
  const newProduct = await Product.create(req.body);
  if (!newProduct) {
    return next(new AppError("Error adding new product", 400));
  }
  res.status(201).json({
    status: SUCCESS,
    message: "Added a new product",
    product: newProduct,
  });
});

// Get all products
export const getProducts = catchError(async (req, res, next) => {
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const products = await Product.find({}, { __v: false })
    .select("-slug -__v")
    .limit(limit)
    .skip(skip);
  res.status(200).json({
    status: SUCCESS,
    products,
  });
});

//Get one product by name or id
export const getProduct = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    const error = AppError.create("product not found", 404, FAILD);
    return next(error);
  }
  return res.json({ status: SUCCESS, product });
});

// Update a product
export const updateProduct = catchError(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body.quantity,
    {
      new: true,
      runValidators: true,
    }
  ).select("-slug -__v");

  if (!updatedProduct) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: SUCCESS,
    product: updatedProduct,
  });
});

// Delete a product
export const deleteProduct = catchError(async (req, res, next) => {
  const deletedProduct = await Product.deleteOne({ _id: req.params.productId });
  if (!deletedProduct) {
    return next(new AppError("Product not found", 404));
  }
  res.status(200).json({
    status: SUCCESS,
    data: null,
  });
});
