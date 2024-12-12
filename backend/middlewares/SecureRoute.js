import jwt from "jsonwebtoken";
import userModel from "../userModels/userModel.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // If no token exists, return an error
    if (!token) {
      return res
        .status(401)
        .json({ errorMessage: "Unauthorized access, token missing" });
    }

    // Attempt to verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      // Log the exact error from JWT verification
      console.error("JWT verification failed:", err);
      return res.status(401).json({ errorMessage: "Invalid or expired token" });
    }

    // If token is successfully decoded, log decoded information

    // Fetch user data from the database
    const user = await userModel
      .findOne({ _id: decoded.userId })
      .select("-password");
    if (!user) {
      return res.status(401).json({ errorMessage: "User not found" });
    }

    req.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Failed to secure route: ", err);
    return res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

export default secureRoute;
