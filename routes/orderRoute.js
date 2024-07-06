import express from "express"
import { addOrder, getOrder, addProductsToOrder, calculateOrderTotals,  } from "../controllers/orderController.js";
import protect from "../utils/protect.js";


const orderRoute = express.Router();
orderRoute.post('/create',protect,addOrder)
orderRoute.get('/get',protect,getOrder)
orderRoute.patch('/add/:id',protect,addProductsToOrder)
orderRoute.get('/total/:id',protect,calculateOrderTotals)

export default orderRoute