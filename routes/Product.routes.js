import express from "express";

import {
  createNewProduct,
  getAllProducts,
} from "../controllers/Product.controller.js";

import { verifyToken } from "../middlewares/Token.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/addNewProduct", verifyToken, createNewProduct);


export default productRouter;
