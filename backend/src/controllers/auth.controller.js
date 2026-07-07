import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  const isUserExists = await User.findOne({
    email: email.toLowerCase(),
  });

  if (isUserExists) {
    throw new ApiError(409, "User already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullname,
    email,
    password: hashPassword,
  });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully!", user));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password",
  );

  if (!user) {
    throw new ApiError(404, "User Not Found!");
  }

  const isPassCorrect = await bcrypt.compare(password, user.password);

  if (!isPassCorrect) {
    throw new ApiError(401, "Invalid Credentials!");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  user.password = undefined; //Is will not send the password while login

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged in successfully!", user));
});

const logoutUser = async (req, res) => {
  res.clearCookie("token");

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully!"));
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  return res
    .status(200)
    .json(new ApiResponse(200, "User details fetched successfully!", user));
};

export default { registerUser, loginUser, logoutUser, getCurrentUser };
