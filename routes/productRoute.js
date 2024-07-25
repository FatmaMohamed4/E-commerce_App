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

productRoute.post('/add',uploadPhoto,addProduct)


productRoute.patch('/:id',updateProduct)
productRoute.delete('/:id', deleteProduct)


productRoute.get('/all',protect,getProducts)
productRoute.get('/one',getProduct)
productRoute.get('/name',getProductByName)

export default productRoute
