const fs = require('fs').promises;
const path = require('path');
const JSZip = require('jszip');
const { v4: uuidv4 } = require('uuid');

// In-memory storage for batch status (in production, use Redis or database)
const batchStatus = new Map();

/**
 * Handle single file upload
 */
exports.handleSingleUpload = async (req, res) => {
  try {
    const file = req.file;

    const fileData = {
      id: uuidv4(),
      fileName: file.originalname,
      storedFileName: file.filename,
      fileType: path.extname(file.originalname).substring(1).toUpperCase(),
      fileSize: formatFileSize(file.size),
      fileSizeBytes: file.size,
      filePath: file.path,
      uploadedDate: new Date().toISOString(),
      status: 'Uploaded',
      detectedType: null // Will be set during processing
    };

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: fileData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload file',
      details: error.message
    });
  }
};

/**
 * Handle ZIP file upload and extraction
 */
exports.handleZipUpload = async (req, res) => {
  try {
    const zipFile = req.file;
    const batchId = uuidv4();
    const extractDir = path.join(process.env.TEMP_DIR || './temp', batchId);

    // Create extraction directory
    await fs.mkdir(extractDir, { recursive: true });

    // Read ZIP file
    const zipData = await fs.readFile(zipFile.path);
    const zip = await JSZip.loadAsync(zipData);

    const files = [];
    const supportedExtensions = ['pdf', 'docx', 'doc', 'txt'];
    let supportedCount = 0;
    let unsupportedCount = 0;

    // Extract all files
    const extractPromises = [];

    zip.forEach((relativePath, file) => {
      if (file.dir) return; // Skip directories

      const ext = path.extname(relativePath).substring(1).toLowerCase();
      const isSupported = supportedExtensions.includes(ext);

      if (isSupported) {
        supportedCount++;
      } else {
        unsupportedCount++;
      }

      const fileData = {
        id: uuidv4(),
        fileName: path.basename(relativePath),
        relativePath,
        fileType: ext.toUpperCase(),
        status: isSupported ? 'Pending' : 'Unsupported',
        detectedType: null,
        progress: 0,
        error: isSupported ? null : 'Unsupported file format'
      };

      files.push(fileData);

      // Extract supported files
      if (isSupported) {
        const extractPath = path.join(extractDir, `${fileData.id}_${fileData.fileName}`);
        extractPromises.push(
          file.async('nodebuffer').then(async (content) => {
            await fs.writeFile(extractPath, content);
            fileData.extractedPath = extractPath;
            const stats = await fs.stat(extractPath);
            fileData.fileSize = formatFileSize(stats.size);
            fileData.fileSizeBytes = stats.size;
          })
        );
      }
    });

    // Wait for all extractions to complete
    await Promise.all(extractPromises);

    // Store batch status
    const batch = {
      id: batchId,
      uploadType: 'ZIP',
      zipFileName: zipFile.originalname,
      totalFiles: files.length,
      supportedFiles: supportedCount,
      unsupportedFiles: unsupportedCount,
      files,
      uploadedDate: new Date().toISOString(),
      extractedDir: extractDir,
      overallStatus: 'Extracted'
    };

    batchStatus.set(batchId, batch);

    // Clean up ZIP file
    await fs.unlink(zipFile.path);

    res.json({
      success: true,
      message: 'ZIP file extracted successfully',
      batch: {
        id: batch.id,
        totalFiles: batch.totalFiles,
        supportedFiles: batch.supportedFiles,
        unsupportedFiles: batch.unsupportedFiles,
        files: batch.files.map(f => ({
          id: f.id,
          fileName: f.fileName,
          fileType: f.fileType,
          status: f.status,
          error: f.error
        }))
      }
    });
  } catch (error) {
    console.error('ZIP upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process ZIP file',
      details: error.message
    });
  }
};

/**
 * Get upload/batch status
 */
exports.getUploadStatus = async (req, res) => {
  try {
    const { batchId } = req.params;

    const batch = batchStatus.get(batchId);

    if (!batch) {
      return res.status(404).json({
        success: false,
        error: 'Batch not found'
      });
    }

    res.json({
      success: true,
      batch
    });
  } catch (error) {
    console.error('Status fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch status',
      details: error.message
    });
  }
};

/**
 * Helper: Format file size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Export batch status map for use in processController
exports.batchStatus = batchStatus;
