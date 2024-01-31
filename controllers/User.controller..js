import UserModel from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const registerUser = async (req, res) => {
  try {
    const {  email, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new UserModel document and save it to the database
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();


    // Generate the access token
    const accessToken = jwt.sign(
      { email: newUser.email },
      "access_token",
      {
        // expiresIn: '1h', // Access token expiration time (can be adjusted as per your requirement)
      }
    );

    // Generate the refresh token
    const refreshToken = jwt.sign(
      { email: newUser.email },
      "your_refresh_secret",
      {
        expiresIn: "7d", // Refresh token expiration time (can be adjusted as per your requirement)
      }
    );

    // Return the access token and the refresh token in the response
    return res.status(201).json({ accessToken, refreshToken });

  } catch (err) {
    console.error("Error in registerUser:", err);
    // return res.status(500).json({ error: "Internal server error" });
    return res.status(500).json({ error: err.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the UserModel in the database by the provided email
    const User = await UserModel.findOne({ email });

    if (!User) {
       return res.status(404).json({ error: "UserModel not found" });
    }

    if (User) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, User.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate the access token
      const accessToken = jwt.sign(
        { email: User.email },
        "access_token",
        {
          // expiresIn: '1h', // Access token expiration time (can be adjusted as per your requirement)
        }
      );

      // Generate the refresh token
      const refreshToken = jwt.sign(
        { username: User.email },
        "your_refresh_secret",
        {
          expiresIn: "7d", // Refresh token expiration time (can be adjusted as per your requirement)
        }
      );

      // Return the access token and the refresh token in the response
      return res.status(200).json({userDetails : User ,  accessToken, refreshToken, role: "User" });

    } 

   
    return res.status(500).json({ error: "Internal server error" });

  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const getAllUsers = async (req, res) => {

  try {
   
    const users = await UserModel.find() ;
   
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR',
    });
  }
};



export {
  registerUser,
  loginUser,
  getAllUsers
};
