const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { uploadSingle, uploadZip } = require('../middleware/upload');
const { validateUpload } = require('../middleware/validation');

/**
 * Upload Single File
 * POST /api/upload/single
 *
 * Accepts: PDF, DOCX, DOC, TXT
 * Max size: 50MB (configurable)
 */
router.post('/single', uploadSingle, validateUpload, uploadController.handleSingleUpload);

/**
 * Upload ZIP Archive
 * POST /api/upload/zip
 *
 * Accepts: ZIP file containing multiple documents
 * Max size: 200MB (configurable)
 * Extracts and validates all files inside
 */
router.post('/zip', uploadZip, validateUpload, uploadController.handleZipUpload);

/**
 * Get Upload Status
 * GET /api/upload/status/:batchId
 */
router.get('/status/:batchId', uploadController.getUploadStatus);

module.exports = router;
