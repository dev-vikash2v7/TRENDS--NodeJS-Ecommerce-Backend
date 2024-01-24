import express from "express";

import {
  loginUser,
  registerUser,
  getAllUsers
} from "../controllers/User.controller..js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);


export default userRouter;
  