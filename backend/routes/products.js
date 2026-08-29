import express from "express";
import {deleteProduct, getProductDetails, getProducts, updateProduct} from "../controllers/productControllers.js";
import { newProducts } from "../controllers/productControllers.js";
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/admin/products").post(newProducts);

router.route("/products/:Id").get(getProductDetails);
router.route("/products/:Id").put(updateProduct);
router.route("/products/:Id").delete(deleteProduct);

export default router;  