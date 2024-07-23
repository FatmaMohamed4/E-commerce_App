
import express from "express"
import { addProduct, deleteProduct, getProducts, updateProduct  } from '../controllers/productController.js'
import protect from "../utils/protect.js";
import { uploadPhoto } from './../utils/photos.js';
const productRoute = express.Router();


productRoute.post('/add',uploadPhoto,addProduct)


productRoute.patch('/:id',updateProduct)
productRoute.delete('/:id', deleteProduct)
productRoute.get('/all',protect,getProducts)


export default productRoute