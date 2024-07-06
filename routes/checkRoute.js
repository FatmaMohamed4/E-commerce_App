
import express from 'express'
import protect from '../utils/protect.js';
import { editCheckOut, getCheckOut } from '../controllers/checkController.js';
const checkRoute = express.Router();

checkRoute.get('/:orderId', protect,getCheckOut)
checkRoute.patch('/:orderId' , protect, editCheckOut)
export default checkRoute