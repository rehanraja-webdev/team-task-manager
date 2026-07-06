import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const isUserExists = await User.findOne({
      email: email.toLowerCase(),
    });

    if (isUserExists) {
      return res.status(403).json({
        success: false,
        message: "User with the given email already exist!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
      role,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Some error occurs while registering user!",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user) {
      return res.status(404).json({ stauts: false, message: "No user found" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Credentials!" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully!", user });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Some error occurs while login!",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "User logged out successfully!" });
};

const getCurrentUser = async (req, res) => {
  const currUser = req.user;

  return res.status(200).json({
    success: true,
    message: "User details fetched successfully!",
    user: currUser,
  });
};

export default { registerUser, loginUser, logoutUser, getCurrentUser };
