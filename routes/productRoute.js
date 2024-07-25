
import express from "express"
import { addProduct, deleteProduct, getProduct, getProductByName, getProducts, updateProduct  } from '../controllers/productController.js'
import protect from "../utils/protect.js";
import { uploadPhoto } from './../utils/photos.js';
const productRoute = express.Router();


productRoute.post('/add',uploadPhoto,addProduct)


productRoute.patch('/:id',updateProduct)
productRoute.delete('/:id', deleteProduct)


productRoute.get('/all',protect,getProducts)
productRoute.get('/one',getProduct)
productRoute.get('/name',getProductByName)

export default productRoute