import catchAsyncError from "../middlewares/catchAsyncError.js";
import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandlers.js";

//create new product => /api/v1/products 
export const getProducts = catchAsyncError(async (req , res) =>{
    const products = await Product.find()

    res.status(200).json({
        products,  
        });
});


//create new product => /api/v1/admin/products 
export const newProducts = catchAsyncError(async (req , res) =>{
   
    const product = await Product.create(req.body);

    res.status(200).json({
        product,
    });
});

//get single product details => /api/v1/products/:id 
    export const getProductDetails = catchAsyncError(async (req , res, next) =>{
    
        const product = await Product.findById(req?.params?.Id);

        if(!product){
        return next(new ErrorHandler('Product not found', 404));
        }

        res.status(200).json({
            product,
        });
    });


//update product detail => /api/v1/products/+:id 
export const updateProduct = catchAsyncError(async (req , res) =>{
   
    let product = await Product.findById(req?.params?.Id);

    if(!product){
      return next(new ErrorHandler('Product not found', 404));
    }
     
    product = await Product.findByIdAndUpdate(req?.params?.Id, req.body,{new : true})

    res.status(200).json({
        product,
    });
});


//delete product => /api/v1/products/:id 
export const deleteProduct = catchAsyncError(async (req , res) =>{
   
    const product = await Product.findById(req?.params?.Id);

    if(!product){
     return next(new ErrorHandler('Product not found', 404));
    }
    
    await product.deleteOne();

    res.status(200).json({
        message: "product deleted",
    });
});

