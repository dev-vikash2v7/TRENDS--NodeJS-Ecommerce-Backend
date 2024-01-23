import Admin from "../models/Admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const registerAdmin = async (req, res) => {
  try {
    const {  email, password } = req.body;

    // Check if the username already exists in the database
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin document and save it to the database
    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    // Generate the access token
    const accessToken = jwt.sign(
      { email: newAdmin.email },
      "access_token",
      {
        // expiresIn: '1h', // Access token expiration time (can be adjusted as per your requirement)
      }
    );

    // Generate the refresh token
    const refreshToken = jwt.sign(
      { email: newAdmin.email },
      "your_refresh_secret",
      {
        expiresIn: "7d", // Refresh token expiration time (can be adjusted as per your requirement)
      }
    );

    // Return the access token and the refresh token in the response
    return res.status(201).json({ accessToken, refreshToken });

  } catch (err) {
    console.error("Error in registerAdmin:", err);
    // return res.status(500).json({ error: "Internal server error" });
    return res.status(500).json({ error: err.message });
  }
};


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin in the database by the provided username
    const admin = await Admin.findOne({ email });

    if (!admin) {
       return res.status(404).json({ error: "Admin not found" });
    }

    if (admin) {
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate the access token
      const accessToken = jwt.sign(
        { email: admin.email },
        "access_token",
        {
          // expiresIn: '1h', // Access token expiration time (can be adjusted as per your requirement)
        }
      );

      // Generate the refresh token
      const refreshToken = jwt.sign(
        { username: admin.email },
        "your_refresh_secret",
        {
          expiresIn: "7d", // Refresh token expiration time (can be adjusted as per your requirement)
        }
      );

      // Return the access token and the refresh token in the response
      return res.status(200).json({ accessToken, refreshToken, role: "admin" });

    } 

   
    return res.status(500).json({ error: "Internal server error" });

  } catch (err) {
    console.error("Error in loginAdmin:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export {
  registerAdmin,
  loginAdmin,
};
