const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');
const { validateProcessingOptions } = require('../middleware/validation');

/**
 * Process Document
 * POST /api/process/document
 *
 * Body:
 * {
 *   fileId: 'uploaded_file_id',
 *   options: {
 *     outputLanguage: 'English (India)',
 *     detailLevel: 'Detailed',
 *     insightMode: 'Summary + Risk Flags'
 *   }
 * }
 */
router.post('/document', validateProcessingOptions, processController.processDocument);

/**
 * Process Batch (multiple documents from ZIP)
 * POST /api/process/batch
 *
 * Body:
 * {
 *   batchId: 'batch_id_from_zip_upload',
 *   options: { ... }
 * }
 */
router.post('/batch', validateProcessingOptions, processController.processBatch);

/**
 * Get Processing Status
 * GET /api/process/status/:documentId
 */
router.get('/status/:documentId', processController.getProcessingStatus);

/**
 * Get Processing Result
 * GET /api/process/result/:documentId
 */
router.get('/result/:documentId', processController.getProcessingResult);

/**
 * Retry Failed Processing
 * POST /api/process/retry/:documentId
 */
router.post('/retry/:documentId', processController.retryProcessing);

module.exports = router;
