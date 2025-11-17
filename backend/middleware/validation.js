const validator = require('validator');

/**
 * Validate file upload
 */
const validateUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded'
    });
  }

  // Additional validation can be added here
  // e.g., virus scanning, additional file checks, etc.

  next();
};

/**
 * Validate processing options
 */
const validateProcessingOptions = (req, res, next) => {
  const { fileId, batchId, options } = req.body;

  if (!fileId && !batchId) {
    return res.status(400).json({
      success: false,
      error: 'Either fileId or batchId is required'
    });
  }

  if (options) {
    const validLanguages = [
      'English (India)',
      'Hindi',
      'Marathi',
      'Tamil',
      'Telugu',
      'Gujarati',
      'Bengali',
      'Kannada',
      'Malayalam',
      'Punjabi'
    ];

    const validDetailLevels = ['Short', 'Detailed'];
    const validInsightModes = [
      'Plain summary only',
      'Summary + risk/issue flags',
      'Summary + action items / next steps'
    ];

    if (options.outputLanguage && !validLanguages.includes(options.outputLanguage)) {
      return res.status(400).json({
        success: false,
        error: `Invalid output language. Allowed: ${validLanguages.join(', ')}`
      });
    }

    if (options.detailLevel && !validDetailLevels.includes(options.detailLevel)) {
      return res.status(400).json({
        success: false,
        error: `Invalid detail level. Allowed: ${validDetailLevels.join(', ')}`
      });
    }

    if (options.insightMode && !validInsightModes.includes(options.insightMode)) {
      return res.status(400).json({
        success: false,
        error: `Invalid insight mode. Allowed: ${validInsightModes.join(', ')}`
      });
    }
  }

  next();
};

module.exports = {
  validateUpload,
  validateProcessingOptions
};
