import express from "express";
import {
  getProductById,
  topProductController,
} from "../controllers/getProductsController";
// import {topProductController, getProductId} from './controllers/getProductsController';
// import topProductController from "../controllers/getProductsController"
const router = express.Router();

// List the product from categoryName and productid
router.get("/category/:categoryName/products/:productid", getProductById);

// List all product from given category
router.get("/category/:categoryName/products", topProductController);

export default router;
