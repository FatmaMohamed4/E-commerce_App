import express from "express"
import { addCategory, addProductsToCategory, deleteCategory, getCategories, getCategory, getProductsAndCategory, upateCategory } from "../controllers/categoryController.js";
import protect from "../utils/protect.js";
import { addProd_ToOrderMW, getCategoryMW, getProd_CategoryMW } from "../validations/categoryValidations.js";

const categoryRoute = express.Router();


categoryRoute.post('/add',addCategory)
categoryRoute.patch('/:id', upateCategory)
categoryRoute.delete('/:id',deleteCategory)



categoryRoute.get('/all',
    protect,getCategories)

categoryRoute.get('/:categoryName' ,
    protect,getCategoryMW,getCategory)

categoryRoute.post('/',
    protect,addProd_ToOrderMW,addProductsToCategory)

// categoryRoute.post('/filter', 
//     protect, getProd_CategoryMW,getProductsAndCategory )

// categoryRoute.patch('/update/:id', upateCategory)
export default categoryRoute
