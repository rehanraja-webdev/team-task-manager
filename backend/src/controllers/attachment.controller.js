import Attachment from "../models/attachment.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import fs from "fs";

const uploadAttachment = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    throw new ApiError(404, "No task found!");
  }

  const file = req.file;
  if (!file) {
    throw new ApiError(400, "Please upload a file");
  }

  const attachment = await Attachment.create({
    task: task._id,
    uploadedBy: req.user._id,
    fileName: file.filename,
    filePath: file.path,
    fileType: file.mimetype,
    fileSize: file.size,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "File upload successfully!", attachment));
});

const getTaskAttachments = asyncHandler(async (req, res) => {
  const attachments = await Attachment.find({
    task: req.params.taskId,
  }).populate("uploadedBy", "fullname email");

  if (attachments.length === 0) {
    throw new ApiError(404, "No attachment found!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "All attachments fetched", attachments));
});

const deleteAttachment = asyncHandler(async (req, res) => {
  const attachment = await Attachment.findById(req.params.attachmentId);

  if (!attachment) {
    throw new ApiError(404, "No attachment found!");
  }

  if (attachment.uploadedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Forbidden!");
  }

  await fs.promises.unlink(attachment.filePath);
  await attachment.deleteOne();

  res.status(200).json(new ApiResponse(200, "File deleted successfully!"));
});

export default { uploadAttachment, getTaskAttachments, deleteAttachment };
