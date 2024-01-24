// Token Middleware
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import UserModel from "../models/User.model.js";

const generateToken = (id) => {
  // find user and sign token against user

  const access_token = jwt.sign(
    {
      userID: id,
    },
    "access_token"
    // {
    //   expiresIn: "7d",
    // }
  );

  return access_token;
};

const verifyToken = (req, res, next) => {

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "Unauthorized Access!" });
  }

  const token = authorization.replace("Bearer ", "");


  jwt.verify(token, "access_token", async (err, payload) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .send({ message: "Unauthorized! Access Token was expired!" });
      }
      return res.status(401).send({ message: "Unauthorized Access!" });
    }

    const { userID } = payload;

    const user = await UserModel.findById(userID);
    req.user = user?._id;
    next();
  });
};

const refreshToken = async (req, res) => {
  try {
    let { refreshToken } = req.body;

    if (refreshToken == null) {
      return res.status(403).json({
        success: false,
        data: { error: "Refresh token required" },
      });
    }

    refreshToken = await RefreshToken.findOne({ token: refreshToken });

    if (!refreshToken) {
      console.log("no refresh token");
      res.status(500).json({
        success: false,
        data: { error: "Invalid refresh token" },
      });
      return;
    }


    if (refreshToken.expiryDate.getTime() < new Date().getTime()) {
      console.log("no expired token");

      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(500).json({
        success: false,
        data: {
          error: "Refresh Token expired",
        },
      });
      return;
    }

    const access_token = generateToken(refreshToken.user._id);

    return res.status(200).json({
      accessToken: access_token,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(406).send({ error: error.REFRESH_TOKEN_ERROR });
  }
};

export { generateToken, verifyToken, refreshToken };
