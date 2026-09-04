import mongoose from "mongoose";
import Products from "./data.js"
import Product from "../models/product.js"

const seedProducts = async () =>{
    try {
       
        await mongoose.connect("mongodb://127.0.0.1:27017/shopping");

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(Products);
        console.log("Products are added");

     process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();