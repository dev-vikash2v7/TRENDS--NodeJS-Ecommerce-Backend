import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import rateLimit from "express-rate-limit";
// import verificationRouter from "./routes/Verification.routes.js";

import adminRouter from "./routes/Admin.routes.js";
import { refreshToken, verifyToken } from "./middlewares/Token.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;


const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // maximum number of requests allowed within the window
  message: "Too many requests, please try again later.",
});


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


  app.use("/admin", adminRouter);
  app.use("/refresh/token", rateLimiter, refreshToken );

  app.get('/' , verifyToken , (req , res)=>{
    res.json({message : 'you are a verified user'})
  })

