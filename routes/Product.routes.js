import express from "express";

import {
  createNewProduct,
  getAllProducts,
  addToUserCart,
  getUserCartProducts
} from "../controllers/Product.controller.js";

import { verifyToken } from "../middlewares/Token.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/addNewProduct", verifyToken, createNewProduct);

productRouter.get("/getUserCart", getUserCartProducts);
productRouter.post("/addToUserCart", addToUserCart);

export default productRouter;
