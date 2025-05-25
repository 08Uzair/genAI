import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AIchatSchema = new Schema(
  {
    messageId: {
      type: String,
      required: true,
    },
    userContent: {
      type: String,
      required: true,
    },
    aiContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AIchat = model("AIchat", AIchatSchema);
export default AIchat;
