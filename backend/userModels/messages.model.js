import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    messages: {
      type: String,
      required: true,
      maxlength: 5000,
      trim: true,
      validate: [
        {
          validator: (value) => value.length > 0,
          message: "Message must not be empty.",
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("messages", MessagesSchema);

export default Messages;
