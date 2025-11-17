const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Allowed file types
const ALLOWED_SINGLE_FILE_TYPES = /pdf|docx|doc|txt/;
const ALLOWED_ZIP_TYPES = /zip/;

// File size limits (in bytes)
const MAX_FILE_SIZE = (process.env.MAX_FILE_SIZE_MB || 50) * 1024 * 1024;
const MAX_ZIP_SIZE = (process.env.MAX_ZIP_SIZE_MB || 200) * 1024 * 1024;

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 50);
    cb(null, `${basename}_${uniqueId}${ext}`);
  }
});

// File filter for single files
const fileFilterSingle = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype.toLowerCase();

  const isValidExt = ALLOWED_SINGLE_FILE_TYPES.test(ext.substring(1));
  const isValidMime = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain'
  ].includes(mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: PDF, DOCX, DOC, TXT. Received: ${ext}`));
  }
};

// File filter for ZIP files
const fileFilterZip = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype.toLowerCase();

  const isValidExt = ALLOWED_ZIP_TYPES.test(ext.substring(1));
  const isValidMime = [
    'application/zip',
    'application/x-zip-compressed'
  ].includes(mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only ZIP files are allowed.'));
  }
};

// Multer instance for single file upload
const uploadSingle = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: fileFilterSingle
}).single('file');

// Multer instance for ZIP upload
const uploadZip = multer({
  storage,
  limits: { fileSize: MAX_ZIP_SIZE },
  fileFilter: fileFilterZip
}).single('file');

module.exports = {
  uploadSingle,
  uploadZip
};
