import jwt from "jsonwebtoken";

export const createTokenAndSaveCookie = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "Strict",
    });
    console.log("Cookie set successfully");
    return token;
  } catch (err) {
    console.error("Error in createTokenAndSaveCookie:", err);
  }
};
