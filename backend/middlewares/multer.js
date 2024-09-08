import multer from 'multer';
import path from 'path';

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const singleUpload = multer({ storage }).single('file'); // Make sure 'file' matches the form field name in frontend
