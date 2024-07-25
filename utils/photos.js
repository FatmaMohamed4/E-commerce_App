import multer from "multer";
import catchError from "../middlewares/catchError.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs"; // Add this to delete the uploaded file after uploading to cloudinary

cloudinary.config({
  cloud_name: "djzbdq0km",
  api_key: "348278345164438",
  api_secret: "c3z1MUSnR084R4Rv9abL40TQoAc",
});

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const uploadPhoto = async (req, res, next) => {
  upload.single("photo")(req, res, async function (err) {
    try {
      if (err) {
        console.error(err);
        return next(new Error("Error uploading file"));
      }

      if (!req.file) {
        return next(new Error("No file uploaded"));
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.photo = result.secure_url;
      next();
    } catch (err) {
      res.status(500).send("Error processing request");
    }
  });
};
