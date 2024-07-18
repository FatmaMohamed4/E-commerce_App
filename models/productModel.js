import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    _id: Schema.ObjectId,
    title: {
      type: String,
      required: [true, "Product Name is required"],
    },

    slug: {
      type: String,
      unique: true,
    },

    price: {
      type: Number,
      required: [true, "Product Price is required"],
      validate: {
        validator: function (v) {
          return v >= 0;
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
      // required: true
    },

    description: {
      type: String,
      required: [true, "Product Detail is required"],
    },

    rate: {
      type: Number,
      enum: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      // required: [true, "Rate is required"],
      default: 0,
    },

    category: {
      type: String,
      ref: "Category",
      required: true,
    },

    colors: {
      type: String,
      enum: ["red", "blue", "green", "black", "white", "yello"],
    },
    image: {
      type: String,
    },
    bestSelling: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    return next();
  }
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
