import mongoose, { model } from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      },

      price: {
        type: Number,
        required: [true, "Product Price is required"],
        validate: {
           validator: function(v) {
            return v >= 0; // Ensures the price is not negative
       },
         message : 'not valid value '
    }
      } ,

      inStock :{
        type: Boolean ,
        default :true
      } ,

     quantity:{
        type: Number ,
        default : 1
      } ,

      size: {
        type: String,
        enum: ['s', 'xs', 'm', 'l', 'xl'],
        // required:  [true, "Size is required"], 
    } ,

      productDetail :{
        type : String ,
        required: [true, "Product Detail is required"],
      } ,
      
      rate: {
        type: Number,
        enum: [0, 1, 1.5 , 2 ,2.5 , 3 , 3.5 , 4, 4.5, 5 ], 
        required: [true, "Rate is required"],
        default : 0
      }, 

      categoryName :{
        type: String , 
        ref :"Category" ,
        required : true
      } , 

      colours :{
        type: String,
        enum :['red' , 'blue' , 'green' , 'black' ,'white', 'yello']
      } ,
      photo :{
        type : String ,
        
      } ,
      bestSelling :{
        type :Boolean ,
        default :false
      }
    ,
    slug: {
      type: String,
    },

    price: {
      type: Number,
      required: [true, "Product Price is required"],
      validate: {
        validator: function (v) {
          return v >= 0; // Ensures the price is not negative
        },
        message: "not valid value ",
      },
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    size: {
      type: String,
      enum: ["s", "xs", "m", "l", "xl"],
      // required: [true, "Size is required"],
    },

    productDetail: {
      type: String,
      required: [true, "Product Detail is required"],
    },

    rate: {
      type: Number,
      enum: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      required: [true, "Rate is required"],
      default: 0,
    },

    categoryName: {
      type: String,
      ref: "Category",
      required: true,
    },

    colours: {
      type: String,
      enum: ["red", "blue", "green", "black", "white", "yello"],
    },
    photo: {
      type: String,
    },
    bestSelling: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Middleware to create or update the slug field
productSchema.pre("save", function (next) {
  if (!this.isModified("productName")) {
    return next();
  }
  this.slug = slugify(this.productName, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
