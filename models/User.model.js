import mongoose from "mongoose";




const user_schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", user_schema);
