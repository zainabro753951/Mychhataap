import mongoose from "mongoose";
import userModel from "./userModel.js";
import Messages from "./messages.model.js";

let converationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Messages,
        default: [],
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const coversationModel = mongoose.model("conversation", converationSchema);

export default coversationModel;
