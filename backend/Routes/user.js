import express from "express";
import multer from "multer";
import path from "path";
import userModel from "../userModels/userModel.js";
import bcrypt from "bcryptjs";
import { createTokenAndSaveCookie } from "../jwt/generateToken.js";
import secureRoute from "../middlewares/SecureRoute.js";
import coversationModel from "../userModels/conversation.model.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/userImg/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/signup", (req, res) => {
  upload.single("userPic")(req, res, async (err) => {
    if (err) {
      console.error("Multer Error:", err); // Log Multer error
      return res.status(400).json({ message: "Error uploading file" });
    }
    try {
      const { fullName, email, phoneNum, password, conpassword } = req.body;
      console.log(fullName, email, phoneNum, password);

      if (password !== conpassword) {
        return res.json({ passwordError: "Passwords do not match" });
      }

      const user = await userModel.findOne({ email });
      if (user) {
        return res.json({ emailExists: "Email already exists" });
      }

      const pic = req.file ? req.file.destination + req.file.filename : null;
      const userPic = pic.substring(6);
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
        fullName,
        email,
        phoneNum,
        userPic,
        password: hashPassword,
      });

      await newUser.save();
      if (newUser) {
        let token = createTokenAndSaveCookie(newUser._id, res);
        return res.status(201).json({
          successMessage: "User created successfully",
          token,
          user: {
            id: newUser._id,
            username: newUser.fullName,
            email: newUser.email,
            phoneNum: newUser.phoneNum,
            userPic: newUser.userPic,
          },
        });
      }
    } catch (error) {
      console.error("Error in user.js:", error); // Log specific error
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ emailError: "Email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ passwordError: "Incorrect password" });
    }
    let token = createTokenAndSaveCookie(user._id, res);

    res.json({
      successMessage: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.fullName,
        email: user.email,
        phoneNum: user.phoneNum,
        userPic: user.userPic,
      },
    });
  } catch (err) {
    console.error("Error in user.js:", err); // Log specific error
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getUserProfile", secureRoute, async (req, res) => {
  const loggedInUser = req.user._id;
  try {
    const conversations = await coversationModel
      .find({ participants: loggedInUser })
      .populate("participants", "_id fullName email userPic")
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      });
    const conversationList = conversations.map((conversation) => {
      const otherParticipants = conversation.participants.filter(
        (participant) => participant._id.toString() !== loggedInUser.toString()
      );
      return {
        _id: conversation._id,
        participants: otherParticipants,
        lastMessage: conversation.messages[0],
      };
    });

    res.json(conversationList);
  } catch (error) {
    console.error("Error in user.js:", error); // Log specific error
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getAllUsers", secureRoute, async (req, res) => {
  const loggedInUser = req.user._id;
  try {
    const users = await userModel.find({ _id: { $ne: loggedInUser } });
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error("Error in user.js:", error); // Log specific error
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
