import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: "true",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
