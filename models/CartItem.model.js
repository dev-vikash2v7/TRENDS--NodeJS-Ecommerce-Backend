import mongoose from "mongoose";

const cart_schema = mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        unique: true,
      },
      products: [
        {
            productId : {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            quantity:  {
              type: Number,
              default : 0
            } 
          }
        ],
    }
  )

export default mongoose.model("CartItem", cart_schema);
