import ApiError from "../utils/ApiError.js";
import validateObjectId from "../utils/validateObjectId.js";

const validateTask = (req, res, next) => {
  const { title, description, dueDate, projectId, assignedTo } = req.body;

  if (!title || title?.trim().length < 3) {
    throw new ApiError(400, "Title is too short or required!");
  }
  if (!description || description?.trim().length < 3) {
    throw new ApiError(400, "Description is too short or required!");
  }
  if (!dueDate) {
    throw new ApiError(400, "dueDate is required!");
  }
  if (!projectId || !validateObjectId(projectId)) {
    throw new ApiError(400, "Project id is required or Invalid!");
  }
  if (!assignedTo || !validateObjectId(assignedTo)) {
    throw new ApiError(400, "assignedTo is required or invalid!");
  }
  next();
};

export default validateTask;
