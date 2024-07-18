import express from "express";
import {
  deleteProduct,
  getProducts,
  updateProduct,
  addProduct,
  getProduct,
} from "../controllers/productController.js";
const productRoute = express.Router();

productRoute.post("/add", addProduct);
productRoute.patch("/:productId", updateProduct);
productRoute.delete("/:productId", deleteProduct);
// get single product
productRoute.get("/:productId", getProduct);

productRoute.get("/", getProducts);

export default productRoute;
