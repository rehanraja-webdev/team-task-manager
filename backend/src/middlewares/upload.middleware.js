import multer from "multer";
import ApiError from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Fixed typo: changed cd to cb
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    // Fixed typo: changed cd to cb
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        null,
        new ApiError(400, "Only jpg, jpeg, png and pdf files are allowed"),
      );
    }
  },
});

export default upload;
