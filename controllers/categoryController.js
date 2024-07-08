import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import { SUCCESS } from "../utils/statusText.js";

export const addCategory = catchError(async (req, res, next) => {
  const { categoryName, products } = req.body;

  const categoty = await Category.findOne({
    $or: [{ categoryName: categoryName }, { slug: categoryName }],
  });

  if (!categoty) {
    const catgory = await Category.create(req.body);
    res.status(201).json({
      status: SUCCESS,
      message: "Category is created",
      catgory: catgory,
    });
  } else {
    return next(new AppError("Category is exist ", 409));
  }
});

export const getCategories = catchError(async (req, res, next) => {
  const all = await Category.find().select(
    "-products -_id -__v -slug -createdAt -updatedAt"
  );
  //    .populate('products')
  if (!all) {
    return next(new AppError("Categories not found", 404));
  } else {
    res.status(200).json({
      status: SUCCESS,
      categories: all,
    });
  }
});

export const getCategory = catchError(async (req, res, next) => {
  const categoryName = req.params.categoryName;
  const category = await Category.findOne({
    $or: [{ categoryName: categoryName }, { slug: categoryName }],
  })
    .select("-_id -__v -slug -createdAt -updatedAt")
    .populate("products");

  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({
    status: SUCCESS,
    message: category,
  });
});

export const upateCategory = catchError(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!id) {
    return next(new AppError("Category not found", 404));
  } else {
    res.status(200).json({
      status: SUCCESS,
      message: "Category Is updated",
      category: category,
    });
  }
});

export const deleteCategory = catchError(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new AppError("Category not found", 404));
  }
  res.status(200).json({
    status: SUCCESS,
    message: "Category Is Deleted",
  });
});

//
export const addProductsToCategory = catchError(async (req, res, next) => {
  const { categoryId, productIds } = req.body;

  try {
    // Find the category by ID
    const category = await Category.findById(categoryId);

    if (!category) {
      return next(new AppError("Category not found", 404));
    }

    // Find products by their IDs
    const products = await Product.find({
      _id: { $in: productIds }, // Use $in operator to find products by array of IDs
    });

    // if (products.length !== productIds.length) {
    //     return next(new AppError('One or more products not found', 404));
    // }

    // Add products to the category
    category.products.push(...products.map((product) => product._id));
    await category.save();

    res.status(200).json({
      status: SUCCESS,
      message: "Products added to category successfully",
      category,
    });
  } catch (err) {
    // Handle other potential errors
    return next(err);
  }
});

export const getProductsAndCategory = catchError(async (req, res, next) => {
  try {
    const categoryName = req.body.categoryName;
    const products = await Product.find({ categoryName })
      // .select( '-_id -__v -slug -createdAt -updatedAt -stock -quantity -categoryName')
      .populate("products");

    if (!products) {
      return next(new AppError("Products not found", 404));
    }

    res.status(200).json({
      status: SUCCESS,
      products: products,
    });
  } catch (err) {
    // Handle errors
    return next(err);
  }
});
