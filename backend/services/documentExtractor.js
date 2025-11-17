const fs = require('fs').promises;
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');

/**
 * Extract text from various document formats
 */
exports.extractText = async (filePath, fileType) => {
  try {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return await extractFromPdf(filePath);
      case 'docx':
      case 'doc':
        return await extractFromDocx(filePath);
      case 'txt':
        return await extractFromTxt(filePath);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error(`Text extraction error for ${filePath}:`, error);
    throw error;
  }
};

/**
 * Extract text from PDF
 * If text extraction fails (scanned PDF), fallback to OCR
 */
async function extractFromPdf(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);

    let text = data.text.trim();

    // If very little text extracted, it might be a scanned PDF
    if (text.length < 100) {
      console.log('PDF appears to be scanned, attempting OCR...');
      text = await performOCR(filePath);
    }

    return text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    // Fallback to OCR
    if (process.env.ENABLE_OCR === 'true') {
      console.log('Falling back to OCR...');
      return await performOCR(filePath);
    }
    throw error;
  }
}

/**
 * Extract text from DOCX
 */
async function extractFromDocx(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    console.error('DOCX extraction error:', error);
    throw error;
  }
}

/**
 * Extract text from TXT
 */
async function extractFromTxt(filePath) {
  try {
    const text = await fs.readFile(filePath, 'utf-8');
    return text;
  } catch (error) {
    console.error('TXT extraction error:', error);
    throw error;
  }
}

/**
 * Perform OCR on document (for scanned PDFs and images)
 */
async function performOCR(filePath) {
  if (process.env.ENABLE_OCR !== 'true') {
    throw new Error('OCR is disabled. Cannot process scanned documents.');
  }

  try {
    const languages = process.env.OCR_LANGUAGE || 'eng+hin';

    console.log(`Performing OCR with languages: ${languages}`);

    const { data: { text } } = await Tesseract.recognize(
      filePath,
      languages,
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );

    return text;
  } catch (error) {
    console.error('OCR error:', error);
    throw new Error('Failed to perform OCR on document');
  }
}

/**
 * Extract metadata from document
 */
exports.extractMetadata = async (filePath, fileType) => {
  try {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return await extractPdfMetadata(filePath);
      default:
        return {};
    }
  } catch (error) {
    console.error('Metadata extraction error:', error);
    return {};
  }
};

/**
 * Extract metadata from PDF
 */
async function extractPdfMetadata(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);

    return {
      pages: data.numpages,
      info: data.info,
      metadata: data.metadata
    };
  } catch (error) {
    console.error('PDF metadata extraction error:', error);
    return {};
  }
}
