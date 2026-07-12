import ApiError from "../utils/ApiError.js";
import validator from "validator";

const validateRegister = (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!fullname || fullname.trim().length < 3) {
    res
      .status(400)
      .json({
        success: false,
        message: "Fullname must be atleast 3 characters",
      });
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ success: false, message: "Invalid Email" });
  }

  if (!password || password.length < 6) {
    res.status(400).json({ success: false, message: "Invalid Password" });
  }

  next();
};

export default validateRegister;
