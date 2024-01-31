import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 5,
    },
    reviewCount: {
      type: Number,
      default: 500,
    },
    price: {
      type: Number,
      require: true,
    },
    originalPrice: {
      type: Number,
      require: true,
    },
   
    stock: {
      type: Number,
      default: 10,

    },
    delivery: {
      type: String,
      default: '',
    },
   
    // images: {
    //   type: Array[String],
    //   default: [],
    // },
    // colors: {
    //   type: Array[String],
    //   default: [],
    // },
    // sizes: {
    //   type: Array[String],
    //   default: [],
    // },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Product", productSchema);