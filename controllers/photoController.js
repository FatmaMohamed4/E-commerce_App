<<<<<<< HEAD
import multer from "multer";
import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import {v2 as cloudinary} from 'cloudinary';
import uploadPhoto from "../models/photoModel.js";
import path from 'path'; 
import Product from "../models/productModel.js";
cloudinary.config({ 
    cloud_name: 'djzbdq0km', 
    api_key: '348278345164438', 
    api_secret: 'c3z1MUSnR084R4Rv9abL40TQoAc' 
  });
  
  
  
  // Set storage engine
  const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize Multer upload object
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });
  
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) { // Fix the syntax issue here
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  export const uploadPhoto = catchError(async (req, res, next) => {
    upload.single('photo')(req, res, async function (err) {
      try {
        if (err) {
          console.error(err);
          return next(new AppError('Error uploading file', 500));
        }
  
        if (!req.file) {
          return next(new AppError('No file uploaded', 404));
        }
  
        const result = await cloudinary.uploader.upload(req.file.path);
        const photoUrl = result.secure_url;
        const productId = req.params.id;
  
        await Photo.create({ product: productId, photo: photoUrl });
        const updatedProduct = await Product.findByIdAndUpdate(productId, { photo: photoUrl }, { new: true });
  
        res.status(200).json({ message: 'Success', photoUrl, updatedProduct });
      } catch (uploadError) {
        console.error(uploadError);
        return next(new AppError('Error processing request', 500));
      }
    });
  });


=======
import multer from "multer";
import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import {v2 as cloudinary} from 'cloudinary';
import Photo from "../models/photoModel.js";
import path from 'path'; 
import Product from "../models/productModel.js";
cloudinary.config({ 
    cloud_name: 'djzbdq0km', 
    api_key: '348278345164438', 
    api_secret: 'c3z1MUSnR084R4Rv9abL40TQoAc' 
  });
  
  
  
  // Set storage engine
  const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize Multer upload object
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });
  
  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) { // Fix the syntax issue here
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  export const uploadPhoto = catchError(async (req, res, next) => {
    upload.single('photo')(req, res, async function (err) {
      try {
        if (err) {
          console.error(err);
          return next(new AppError('Error uploading file', 500));
        }
  
        if (!req.file) {
          return next(new AppError('No file uploaded', 404));
        }
  
        const result = await cloudinary.uploader.upload(req.file.path);
        const photoUrl = result.secure_url;
        const productId = req.params.id;
  
        await Photo.create({ product: productId, photo: photoUrl });
        const updatedProduct = await Product.findByIdAndUpdate(productId, { photo: photoUrl }, { new: true });
  
        res.status(200).json({ message: 'Success', photoUrl, updatedProduct });
      } catch (uploadError) {
        console.error(uploadError);
        return next(new AppError('Error processing request', 500));
      }
    });
  });



  
>>>>>>> 9707eb1bfa53cf63d093753fc75f7fd4c2aca5a7
