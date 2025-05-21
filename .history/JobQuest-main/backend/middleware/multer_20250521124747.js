const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp/"); 
    // cb(null, "uploads/"); // for local system
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".pdf", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format. Only PDF and DOCX allowed."), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
