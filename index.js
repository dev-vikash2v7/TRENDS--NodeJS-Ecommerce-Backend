import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

import userRouter from "./routes/User.routes.js";
import productRouter from "./routes/Product.routes.js";
import cartRouter from "./routes/Cart.routes.js";

dotenv.config();



const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


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



  
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount  , currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({

        amount,
       currency ,

       payment_method_types: ['card'],
       description: 'Payment Request From CloudLumous Pvt, Ltd',
       receipt_email : 'vikashvermacom92@gmail.com',      
    });


    res.status(200).json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error('Error creating Payment Intent:', error.message);
    res.status(500).json({ error: 'Error creating Payment Intent : ' + error.message });
  }
});



app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
