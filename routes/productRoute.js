import express from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { uploadPhoto } from "../utils/photos.js";

const productRoute = express.Router();

productRoute.post("/addProduct", uploadPhoto, addProduct);
productRoute.get("/", getProducts);
productRoute.get("/:productId", getProduct);
productRoute.patch("/:productId", updateProduct);
productRoute.delete("/:productId", deleteProduct);

export default productRoute;
