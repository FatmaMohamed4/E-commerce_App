
import express from 'express'
import { addEmployee, deleteEmployee, getEmployee, updateEmployee } from '../controllers/employeeController.js';
import protect from '../utils/protect.js';
const employeeRoute = express.Router();

employeeRoute.post('/add',protect, addEmployee)
employeeRoute.get('/get', protect , getEmployee)
employeeRoute.patch('/update',protect ,updateEmployee)
employeeRoute.delete('/delete', protect,deleteEmployee)
export default employeeRoute
