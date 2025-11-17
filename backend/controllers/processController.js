const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const documentExtractor = require('../services/documentExtractor');
const llmService = require('../services/llmService');
const { batchStatus } = require('./uploadController');

// In-memory storage for processing status (in production, use Redis or database)
const processingStatus = new Map();

/**
 * Process a single document
 */
exports.processDocument = async (req, res) => {
  try {
    const { fileId, options } = req.body;
    const file = req.body.file; // File metadata passed from frontend

    const processId = uuidv4();

    // Initialize processing status
    const status = {
      id: processId,
      fileId,
      fileName: file.fileName,
      status: 'Processing',
      progress: 0,
      startTime: new Date().toISOString(),
      options: options || getDefaultOptions()
    };

    processingStatus.set(processId, status);

    // Send immediate response
    res.json({
      success: true,
      message: 'Document processing started',
      processId,
      status: 'Processing'
    });

    // Process asynchronously
    processDocumentAsync(processId, file, options || getDefaultOptions());

  } catch (error) {
    console.error('Process initiation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate processing',
      details: error.message
    });
  }
};

/**
 * Process batch of documents
 */
exports.processBatch = async (req, res) => {
  try {
    const { batchId, options } = req.body;

    const batch = batchStatus.get(batchId);

    if (!batch) {
      return res.status(404).json({
        success: false,
        error: 'Batch not found'
      });
    }

    const globalOptions = options || getDefaultOptions();

    // Start processing all supported files
    const processPromises = batch.files
      .filter(f => f.status === 'Pending')
      .map(file => {
        const processId = uuidv4();
        file.processId = processId;
        file.status = 'Processing';

        const status = {
          id: processId,
          fileId: file.id,
          fileName: file.fileName,
          status: 'Processing',
          progress: 0,
          startTime: new Date().toISOString(),
          options: globalOptions
        };

        processingStatus.set(processId, status);

        return processDocumentAsync(processId, file, globalOptions);
      });

    batch.overallStatus = 'Processing';

    res.json({
      success: true,
      message: 'Batch processing started',
      batchId,
      totalProcessing: processPromises.length
    });

  } catch (error) {
    console.error('Batch process initiation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate batch processing',
      details: error.message
    });
  }
};

/**
 * Get processing status
 */
exports.getProcessingStatus = async (req, res) => {
  try {
    const { documentId } = req.params;

    const status = processingStatus.get(documentId);

    if (!status) {
      return res.status(404).json({
        success: false,
        error: 'Processing status not found'
      });
    }

    res.json({
      success: true,
      status
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
 * Get processing result
 */
exports.getProcessingResult = async (req, res) => {
  try {
    const { documentId } = req.params;

    const status = processingStatus.get(documentId);

    if (!status) {
      return res.status(404).json({
        success: false,
        error: 'Processing result not found'
      });
    }

    if (status.status !== 'Completed') {
      return res.status(400).json({
        success: false,
        error: 'Processing not yet completed',
        currentStatus: status.status,
        progress: status.progress
      });
    }

    res.json({
      success: true,
      result: status.result
    });
  } catch (error) {
    console.error('Result fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch result',
      details: error.message
    });
  }
};

/**
 * Retry failed processing
 */
exports.retryProcessing = async (req, res) => {
  try {
    const { documentId } = req.params;

    const status = processingStatus.get(documentId);

    if (!status) {
      return res.status(404).json({
        success: false,
        error: 'Processing status not found'
      });
    }

    if (status.status !== 'Failed') {
      return res.status(400).json({
        success: false,
        error: 'Can only retry failed processing'
      });
    }

    // Reset status
    status.status = 'Processing';
    status.progress = 0;
    status.error = null;
    status.retryCount = (status.retryCount || 0) + 1;
    status.retryTime = new Date().toISOString();

    // Retry processing
    processDocumentAsync(documentId, status.file, status.options);

    res.json({
      success: true,
      message: 'Processing retry initiated',
      processId: documentId
    });
  } catch (error) {
    console.error('Retry error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retry processing',
      details: error.message
    });
  }
};

/**
 * Async document processing
 */
async function processDocumentAsync(processId, file, options) {
  const status = processingStatus.get(processId);

  try {
    // Store file reference
    status.file = file;

    // Step 1: Extract text from document (10% progress)
    status.progress = 10;
    status.currentStep = 'Extracting text';

    const extractedText = await documentExtractor.extractText(
      file.extractedPath || file.filePath,
      file.fileType.toLowerCase()
    );

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('No text could be extracted from the document');
    }

    // Step 2: Classify document (30% progress)
    status.progress = 30;
    status.currentStep = 'Classifying document';

    const classification = await llmService.classifyDocument(extractedText, options);

    // Step 3: Extract structured data (50% progress)
    status.progress = 50;
    status.currentStep = 'Extracting data';

    const extractedData = await llmService.extractStructuredData(
      extractedText,
      classification.primaryType,
      options
    );

    // Step 4: Translate content (70% progress)
    status.progress = 70;
    status.currentStep = 'Translating content';

    const translatedContent = await llmService.translateContent(
      extractedData,
      options.outputLanguage
    );

    // Step 5: Generate summary (85% progress)
    status.progress = 85;
    status.currentStep = 'Generating summary';

    const summary = await llmService.generateSummary(
      extractedData,
      options.detailLevel
    );

    // Step 6: Generate insights (95% progress)
    status.progress = 95;
    status.currentStep = 'Generating insights';

    const insights = await llmService.generateInsights(
      extractedData,
      classification.primaryType,
      options.insightMode
    );

    // Step 7: Compile final result (100% progress)
    status.progress = 100;
    status.currentStep = 'Completed';
    status.status = 'Completed';
    status.endTime = new Date().toISOString();

    const result = {
      id: `PDOC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      fileName: file.fileName,
      fileType: file.fileType,
      fileSize: file.fileSize,
      processingStatus: 'Completed',
      processingProgress: 100,
      processingDuration: calculateDuration(status.startTime, status.endTime),
      processingOptions: options,
      documentClassification: classification,
      extractedData,
      translatedContent,
      summary,
      insights,
      confidence: calculateConfidence(classification, extractedData, insights),
      processingErrors: [],
      createdDate: new Date().toISOString()
    };

    status.result = result;

    // Save result to file
    const outputDir = './outputs';
    const outputPath = path.join(outputDir, `${result.id}.json`);
    await fs.writeFile(outputPath, JSON.stringify(result, null, 2));

    console.log(`✓ Document processed successfully: ${file.fileName} → ${result.id}`);

  } catch (error) {
    console.error(`✗ Processing failed for ${file.fileName}:`, error);

    status.status = 'Failed';
    status.error = error.message;
    status.endTime = new Date().toISOString();
  }
}

/**
 * Get default processing options
 */
function getDefaultOptions() {
  return {
    outputLanguage: 'English (India)',
    detailLevel: 'Detailed',
    insightMode: 'Summary + risk/issue flags'
  };
}

/**
 * Calculate processing duration in seconds
 */
function calculateDuration(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return Math.round((end - start) / 1000);
}

/**
 * Calculate overall confidence score
 */
function calculateConfidence(classification, extractedData, insights) {
  // Simple confidence calculation based on completeness
  let score = 0;
  let maxScore = 0;

  // Classification confidence
  if (classification.confidence === 'High') score += 30;
  else if (classification.confidence === 'Medium') score += 20;
  else score += 10;
  maxScore += 30;

  // Data extraction completeness
  if (extractedData.parties && extractedData.parties.length > 0) score += 20;
  maxScore += 20;

  if (extractedData.dates && Object.keys(extractedData.dates).length > 0) score += 15;
  maxScore += 15;

  if (extractedData.monetaryValues) score += 15;
  maxScore += 15;

  // Insights quality
  if (insights.riskFlags && insights.riskFlags.length > 0) score += 10;
  maxScore += 10;

  if (insights.actionItems && insights.actionItems.length > 0) score += 10;
  maxScore += 10;

  const percentage = Math.round((score / maxScore) * 100);

  let overall = 'Low';
  if (percentage >= 85) overall = 'High';
  else if (percentage >= 60) overall = 'Medium';

  return {
    overall,
    classification: classification.confidence === 'High' ? 95 : (classification.confidence === 'Medium' ? 75 : 50),
    extraction: percentage,
    translation: 90, // Assume good translation
    insights: insights.riskFlags ? 85 : 65,
    lowConfidenceFields: []
  };
}
