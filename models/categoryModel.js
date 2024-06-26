import mongoose from "mongoose";
import slugify from 'slugify';

const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: [true, "Category Name is required"],
            unique: true
        },
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] ,
        slug: {
            type: String,
            unique: true
        }
    },
    { timestamps: true }
);

// Pre-save hook to generate slug from categoryName
categorySchema.pre('save', function(next) {
    if (this.isModified('categoryName') || this.isNew) {
        this.slug = slugify(this.categoryName, { lower: true, strict: true });
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
