import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please enter product name"],
        maxLength: [200,"product name cannot exceed 200 characters"],
    },
    price:{
        type: Number,
        required: [true,"please enter the price"],
        maxLength:[7,"product price cannot exceed 7 digits "],
    },
     description:{
        type: String,
        required:[true,"please enter product name"],
    },
    ratings:{
        type: Number,
        default:0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        },
    ],
    category:{
        type: String,
        required:[true,"please enter product name"],
        enum:{
            values:[
                "laptops",
                "cameras",
                "Electronics",
                "Accessories",
                "book",
            ],
            message: "please select correct category",
        },
    },
    seller:{
        type: String,
        required:[true,"please enter product seller"],
    },
    stock:{
        type: Number,
        required:[true,"please enter the product stock"],
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User',
                required: true,
            },
            rating: {
                type:Number,
                required: true,
            },
            comment:{
                type:String,
                required: true,
            },
        },
    ],
    user:{
             type: mongoose.Schema.Types.ObjectId,
             ref:'User',
             required: false,
         },
},
{timestamps: true}
);

export default mongoose.model("Product",productSchema);