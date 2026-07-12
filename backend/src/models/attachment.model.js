import mongoose, { Schema } from "mongoose";

const attachmentSchema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Attachment = mongoose.model("Attachment", attachmentSchema);

export default Attachment;