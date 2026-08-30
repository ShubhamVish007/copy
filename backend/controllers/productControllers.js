import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandlers.js";

//create new product => /api/v1/products 
export const getProducts = async (req , res) =>{
    const products = await Product.find()

    res.status(200).json({
        products,  
        });
};


//create new product => /api/v1/admin/products 
export const newProducts = async (req , res) =>{
   
    const product = await Product.create(req.body);

    res.status(200).json({
        product,
    });
};

//get single product details => /api/v1/products/:id 
export const getProductDetails = async (req , res, next) =>{
   
    const product = await Product.findById(req?.params?.Id);

    if(!product){
       return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        product,
    });
};


//update product detail => /api/v1/products/+:id 
export const updateProduct = async (req , res) =>{
   
    let product = await Product.findById(req?.params?.Id);

    if(!product){
       return res.status(404).json({
            error:"Product not found",
        });
    }
     
    product = await Product.findByIdAndUpdate(req?.params?.Id, req.body,{new : true})

    res.status(200).json({
        product,
    });
};


//delete product => /api/v1/products/:id 
export const deleteProduct = async (req , res) =>{
   
    const product = await Product.findById(req?.params?.Id);

    if(!product){
       return res.status(404).json({
            error:"Product not found",
        });
    }
    
    await product.deleteOne();

    res.status(200).json({
        message: "product deleted",
    });
};

