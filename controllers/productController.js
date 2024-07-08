import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Product from "../models/productModel.js";
import { SUCCESS } from "../utils/statusText.js";

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
  const products = await Product.find().select("-_id -slug -__v");
  if (!products.length) {
    return next(new AppError("Products not found", 404));
  }
  res.status(200).json({
    status: SUCCESS,
    message: products,
  });
});

//Get one product by name or id
export const getOneProduct = catchError(async (req, res, next) => {
  const { name, id } = req.body;
  let product;

  if (name) {
    product = await Product.findOne({
      $or: [{ productName: name }, { slug: name }],
    }).select("-__v -slug");
  } else if (id) {
    product = await Product.findById(id).select("-__v -slug");
  }

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: SUCCESS,
    product: product,
  });
});

// Update a product
export const updateProduct = catchError(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body.quantity,
    {
      new: true,
      runValidators: true,
    }
  ).select("-_id -slug -__v");

  if (!updatedProduct) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: SUCCESS,
    message: updatedProduct,
  });
});

// Delete a product
export const deleteProduct = catchError(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id).select(
    "-_id -slug -__v"
  );
  if (!deletedProduct) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: true,
    deletedProduct: deletedProduct,
  });
});
