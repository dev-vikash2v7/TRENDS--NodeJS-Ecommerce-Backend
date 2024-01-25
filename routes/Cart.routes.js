import express from "express";

import {
  addToUserCart,
  getUserCartProducts
} from "../controllers/Cart.controller.js";

import { verifyToken } from "../middlewares/Token.js";

const cartRouter = express.Router();


cartRouter.get("/getUserCart", getUserCartProducts);
cartRouter.post("/addToUserCart", addToUserCart);

export default cartRouter;
