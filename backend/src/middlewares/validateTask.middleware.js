import ApiError from "../utils/ApiError.js";
import validateObjectId from "../utils/validateObjectId.js";

const validateTask = (req, res, next) => {
  const { title, description, projectId, assignedTo } = req.body;

  if (!title || title.trim().length < 3) {
    throw new ApiError(400, "Title is too short!");
  }
  if (!description || description.trim().length < 3) {
    throw new ApiError(400, "Description is too short!");
  }
  if (!projectId || !validateObjectId(projectId)) {
    throw new ApiError(400, "Project id is required!");
  }
  if (!assignedTo || validateObjectId(assignedTo)) {
    throw new ApiError(400, "assignedTo is required!");
  }
  next();
};

export default validateTask;
