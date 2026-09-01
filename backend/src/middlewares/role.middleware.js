import ApiError from "../utils/ApiError.js";

//store user role in roles[] an array
const authorizeRoles = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "You don't hava permission to perform this action!",
      );
    }
    next();
  };
};

export default authorizeRoles;
