import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["task", "project", "comment", "member", "system"],
      default: "system",
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    referenceId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Notification", notificationSchema);
