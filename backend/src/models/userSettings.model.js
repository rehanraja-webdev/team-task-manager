import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "dark",
    },

    emailNotifications: {
      type: Boolean,
      default: true,
    },

    browserNotifications: {
      type: Boolean,
      default: true,
    },

    taskAssigned: {
      type: Boolean,
      default: true,
    },

    dueReminder: {
      type: Boolean,
      default: true,
    },

    projectUpdates: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("UserSettings", userSettingsSchema);
