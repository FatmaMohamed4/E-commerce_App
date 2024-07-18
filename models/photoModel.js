import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({

    product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
    }    

},{
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema)

export default Photo