<<<<<<< HEAD
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

=======
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

>>>>>>> 9707eb1bfa53cf63d093753fc75f7fd4c2aca5a7
export default Photo