import express from "express";

import {
  addToUserCart,
  getUserCartProducts,
  updateCartItemQuantity
} from "../controllers/Cart.controller.js";

// import { verifyToken } from "../middlewares/Token.js";

const cartRouter = express.Router();

cartRouter.get("/getUserCart", getUserCartProducts);
cartRouter.post("/addToUserCart", addToUserCart);
cartRouter.post("/updateCartItemQuantity", updateCartItemQuantity);

export default cartRouter;
