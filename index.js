import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./routes/User.routes.js";
import productRouter from "./routes/Product.routes.js";

dotenv.config();


const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  app.listen(port , ()=>console.log('surver running on port ' + 8080))

  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });


app.use("/user", userRouter);
app.use("/product", productRouter);
