<<<<<<< HEAD
import express from "express";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import userRoute from "./routes/userRoute.js";
import globalError from "./middlewares/errMiddleware.js";
import cors from "cors";
import orderRoute from "./routes/orderRoute.js";
import checkRoute from "./routes/checkRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import photoRoute from "./routes/photoRoute.js";
=======
import express  from 'express';
import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import userRoute from './routes/userRoute.js';
import globalError from './middlewares/errMiddleware.js';
import cors from 'cors'
import orderRoute from './routes/orderRoute.js';
import checkRoute from './routes/checkRoute.js';
import employeeRoute from './routes/employeeRoute.js';
import photoRoute from './routes/photoRoute.js';
>>>>>>> 9707eb1bfa53cf63d093753fc75f7fd4c2aca5a7
const app = express();
app.use(express.json());
app.use(cors())

<<<<<<< HEAD
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/checkout", checkRoute);
app.use("/employee", employeeRoute);
=======
app.use('/product',productRoute)
app.use('/category', categoryRoute)
app.use('/user',userRoute)
app.use('/order',orderRoute)
app.use('/checkout',checkRoute)
app.use('/employee',employeeRoute)
>>>>>>> 9707eb1bfa53cf63d093753fc75f7fd4c2aca5a7
app.use('/photo',photoRoute)
// app.use('/',(req,res)=>{
//   res.send("Hello Supermarket App")
// })

app.use(globalError)

app.use('*', (req, res) => {
    res.json({ msg: "Cannot find the URL :" + req.originalUrl });
  });
 
export default app