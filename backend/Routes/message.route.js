import express from "express";
import secureRoute from "../middlewares/SecureRoute.js";
import coversationModel from "../userModels/conversation.model.js";
import Messages from "../userModels/messages.model.js";
import { getReceiverId, io } from "../SocketIO/server.js";
const router = express.Router();

router.post("/send/:id", secureRoute, async (req, res) => {
  const { id: recieverId } = req.params;
  const senderId = req.user._id;
  const messages = req.body.message;

  try {
    let conversation = await coversationModel.findOne({
      participants: { $all: [recieverId, senderId] },
    });
    if (!conversation) {
      conversation = await coversationModel.create({
        participants: [recieverId, senderId],
      });
    }
    const newMessage = new Messages({
      senderId,
      recieverId,
      messages,
      read: false,
    });

    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);
    const reciverSocketId = getReceiverId(recieverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);

      const unreadCount = await Messages.countDocuments({
        recieverId,
        read: false,
      });
      io.to(reciverSocketId).emit("unreadCount", unreadCount);
    }
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error in messages.js:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // Send a message to the user with the provided ID
});

router.get("/get/:id", secureRoute, async (req, res) => {
  const { id: chatUser } = req.params;
  const senderId = req.user._id;
  try {
    const messages = await Messages.find({
      $or: [
        { senderId: chatUser, recieverId: senderId },
        { senderId: senderId, recieverId: chatUser },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error in messages.js: line number 55", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
