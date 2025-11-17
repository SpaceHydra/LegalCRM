# 📑 Document Processing Module

A comprehensive AI-powered document processing system for LegalCRM that automatically classifies, extracts, translates, summarizes, and generates insights from legal documents.

## 🌟 Features

### Upload & File Handling
- ✅ **Single file upload**: PDF, DOCX, DOC, TXT
- ✅ **ZIP upload**: Batch process multiple documents
- ✅ **Drag & drop interface**: Easy file selection
- ✅ **OCR support**: Process scanned PDFs (requires Tesseract.js)
- ✅ **File validation**: Size limits and format checks
- ✅ **Progress tracking**: Real-time status updates

### AI-Powered Processing
- 🤖 **Auto-classification**: Detects document type (40+ Indian legal document types)
- 📊 **Structured data extraction**: Parties, dates, amounts, jurisdiction
- 🌐 **Multi-language translation**: English, Hindi, Marathi, Tamil, Telugu, etc.
- 📝 **Intelligent summarization**: Short and detailed summaries
- ⚠️ **Risk analysis**: Identifies missing info, compliance issues, unusual clauses
- ✅ **Action items**: Auto-generates next steps with priorities

### CRM Integration
- 🔗 **Link to clients**: Connect documents to existing client records
- 📁 **Link to matters**: Attach to matters/cases/projects
- 🏷️ **Tagging**: Categorize with custom tags
- 💾 **localStorage persistence**: All results saved locally
- 📋 **Audit trail**: Track all processing and edits

### Processing Options
- 🌍 **Output language**: 10 Indian languages supported
- 📑 **Detail level**: Short (3-4 bullets) or Detailed summary
- 🎯 **Insight mode**: Plain / Risk flags / Action items

## 📂 Project Structure

```
LegalCRM/
├── backend/                          # Node.js backend server
│   ├── controllers/
│   │   ├── uploadController.js       # File upload handling
│   │   └── processController.js      # Document processing logic
│   ├── routes/
│   │   ├── health.js                 # Health check endpoint
│   │   ├── upload.js                 # Upload routes
│   │   └── process.js                # Processing routes
│   ├── services/
│   │   ├── documentExtractor.js      # Text extraction (PDF, DOCX, TXT, OCR)
│   │   └── llmService.js             # LLM integration (OpenAI GPT-4)
│   ├── middleware/
│   │   ├── upload.js                 # Multer file upload middleware
│   │   └── validation.js             # Request validation
│   ├── server.js                     # Main server file
│   ├── package.json                  # Dependencies
│   ├── .env.example                  # Environment variables template
│   └── .gitignore
│
├── frontend/                         # Frontend files (root directory)
│   ├── document-processing.html      # Main UI page
│   ├── js/
│   │   ├── document-processing.js    # Frontend logic
│   │   ├── navigation.js             # Navigation (updated)
│   │   ├── data.js                   # localStorage CRUD
│   │   └── common.js                 # Utility functions
│   └── css/
│       ├── document-processing.css   # Module styles
│       └── main.css                  # Global styles
│
└── DOCUMENT_PROCESSING_SCHEMA.md     # Data structure documentation
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **OpenAI API Key**: For GPT-4 LLM processing (or Anthropic/Google API key)

### Backend Setup

#### 1. Install Dependencies

```bash
cd backend
npm install
```

#### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=sk-your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview

# File Upload Configuration
MAX_FILE_SIZE_MB=50
MAX_ZIP_SIZE_MB=200
UPLOAD_DIR=./uploads
TEMP_DIR=./temp

# CORS Configuration (update with your frontend URL)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080,http://127.0.0.1:5500

# OCR Configuration
ENABLE_OCR=true
OCR_LANGUAGE=eng+hin+mar

# Processing Configuration
PROCESSING_TIMEOUT_MS=300000
MAX_CONCURRENT_PROCESSING=5
```

**Important**: Get your OpenAI API key from https://platform.openai.com/api-keys

#### 3. Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

You should see:
```
┌─────────────────────────────────────────────────────┐
│   Legal CRM - Document Processing Server           │
└─────────────────────────────────────────────────────┘

✓ Server running on port 3001
✓ Environment: development
✓ LLM Model: gpt-4-turbo-preview
✓ OCR Enabled: true
✓ Max File Size: 50MB
```

### Frontend Setup

#### 1. Update API URL (if needed)

If your backend is not running on `localhost:3001`, update the API URL in `js/document-processing.js`:

```javascript
const API_BASE_URL = 'http://localhost:3001/api'; // Change this
```

#### 2. Serve Frontend Files

The frontend is a static HTML/JS/CSS application. You can serve it using:

**Option A: Live Server (VS Code)**
- Install "Live Server" extension in VS Code
- Right-click `document-processing.html` → "Open with Live Server"

**Option B: Python HTTP Server**
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

**Option C: Node.js http-server**
```bash
npx http-server -p 8080
```

#### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:8080/document-processing.html
```

## 📖 Usage Guide

### Step 1: Configure Processing Options

1. Select **Output Language** (e.g., English (India), Hindi, Marathi)
2. Choose **Detail Level** (Short or Detailed summary)
3. Select **Insight Mode**:
   - Plain summary only
   - Summary + Risk Flags
   - Summary + Action Items

### Step 2: Upload Documents

**Single File:**
- Drag & drop a file onto the upload area
- OR click "Browse Files" to select

**Multiple Files (ZIP):**
- Create a ZIP file containing your documents
- Drag & drop the ZIP file
- System will extract and show all files

### Step 3: Process Documents

1. Click "**Process All**" to process all uploaded files
2. OR click "**Process**" button on individual files
3. Monitor progress in the file queue table

### Step 4: View Results

1. Once processing is complete, click "**View**" button
2. Review the results in the modal:
   - **Summary**: Document classification, bullet points, obligations
   - **Extracted Data**: Parties, dates, monetary values
   - **Insights & Risks**: Risk flags, compliance checklist, unusual clauses
   - **Action Items**: Next steps with priorities
   - **Link to CRM**: Connect to clients/matters

### Step 5: Save to CRM

1. In the "**Link to CRM**" tab:
   - Select a client
   - Select a matter/project
   - OR create a new matter
2. Add tags and notes
3. Click "**Save to CRM**"

### Step 6: Download Results

- Click "**Download JSON**" to save the full extraction result
- Click "**Copy Summary**" to copy the summary to clipboard

## 🎯 Supported Document Types

### Contracts & Agreements
- Loan Agreement (Term Loan, Working Capital, Home Loan, Vehicle Loan)
- Sale Deed / Agreement to Sell
- Lease Agreement / Rent Agreement
- Partnership Deed / LLP Agreement
- Shareholders Agreement
- Employment Agreement
- Service Agreement
- Non-Disclosure Agreement (NDA)
- Power of Attorney (General / Special)

### Court Documents
- Plaint / Written Statement
- Petition (Civil / Criminal / Constitutional)
- Court Order / Judgment
- Bail Order, Injunction Order, Decree
- Summons / Notice
- Affidavit, Vakalatnama

### Corporate Documents
- MOA, AOA, Board Resolution
- Shareholder Resolution
- Annual Return (MGT-7)

### Legal Notices
- Legal Notice (Section 138 NI Act, Civil, Criminal)
- Demand Notice, Eviction Notice
- Termination Notice

### Property Documents
- Property Title Deed
- Encumbrance Certificate
- Khata Certificate
- Mutation Entry

## 🔧 API Endpoints

### Health Check
```
GET /api/health
```

### Upload Single File
```
POST /api/upload/single
Content-Type: multipart/form-data

Body:
- file: (binary file)
```

### Upload ZIP
```
POST /api/upload/zip
Content-Type: multipart/form-data

Body:
- file: (ZIP file)
```

### Process Document
```
POST /api/process/document
Content-Type: application/json

Body:
{
  "fileId": "uuid",
  "file": { ... },
  "options": {
    "outputLanguage": "English (India)",
    "detailLevel": "Detailed",
    "insightMode": "Summary + risk/issue flags"
  }
}
```

### Get Processing Status
```
GET /api/process/status/:documentId
```

### Get Processing Result
```
GET /api/process/result/:documentId
```

## 🧪 Testing

### Manual Testing

1. **Test Single File Upload**:
   - Upload a PDF loan agreement
   - Verify file appears in queue
   - Check file size and type detection

2. **Test ZIP Upload**:
   - Create ZIP with 5 different documents
   - Upload ZIP
   - Verify all files extracted correctly

3. **Test Processing**:
   - Process a sample loan agreement
   - Verify all fields extracted:
     - Parties with PAN/GSTIN
     - Loan amount, interest rate, tenure
     - Key dates
     - Risk flags identified

4. **Test Language Translation**:
   - Set output language to Hindi
   - Process a document
   - Verify summary is translated

5. **Test CRM Integration**:
   - Link processed document to a client
   - Link to a matter
   - Verify saved in localStorage
   - Refresh page and check persistence

### Sample Documents

Create test documents with:
- Clear party names
- Monetary values in ₹
- Dates in various formats
- PAN/GSTIN identifiers
- Missing elements (to test risk detection)

## ⚙️ Configuration Options

### LLM Provider Options

**Option 1: OpenAI (Default)**
```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview
```

**Option 2: Anthropic Claude**
```env
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-opus-20240229
```

**Option 3: Google Gemini**
```env
GOOGLE_API_KEY=...
GOOGLE_MODEL=gemini-pro
```

### OCR Languages

Configure OCR to recognize multiple languages:
```env
OCR_LANGUAGE=eng+hin+mar+tam+tel
```

Supported: `eng`, `hin`, `mar`, `tam`, `tel`, `guj`, `ben`, `kan`, `mal`, `pan`

### File Size Limits

Adjust based on your needs:
```env
MAX_FILE_SIZE_MB=50        # Single file limit
MAX_ZIP_SIZE_MB=200        # ZIP file limit
```

## 🐛 Troubleshooting

### Backend Server Won't Start

**Error**: `OPENAI_API_KEY is not defined`
- Solution: Ensure `.env` file exists with valid API key

**Error**: `Port 3001 is already in use`
- Solution: Change `PORT` in `.env` or kill the process using port 3001

### File Upload Fails

**Error**: `File size exceeds maximum allowed limit`
- Solution: Increase `MAX_FILE_SIZE_MB` in `.env`

**Error**: `CORS policy: Origin not allowed`
- Solution: Add your frontend URL to `ALLOWED_ORIGINS` in `.env`

### Processing Fails

**Error**: `No text could be extracted from the document`
- Solution: Enable OCR in `.env` (`ENABLE_OCR=true`)
- For scanned PDFs, ensure Tesseract is installed

**Error**: `OpenAI API rate limit exceeded`
- Solution: Wait and retry, or upgrade your OpenAI plan

### OCR Not Working

**Error**: `OCR is disabled`
- Solution: Set `ENABLE_OCR=true` in `.env`

**Error**: `Failed to perform OCR on document`
- Solution: Ensure Tesseract language packs are installed:
  ```bash
  # On Ubuntu/Debian
  sudo apt-get install tesseract-ocr-hin tesseract-ocr-mar

  # On macOS
  brew install tesseract-lang
  ```

## 📊 Data Storage

### localStorage Schema

Processed documents are stored in `localStorage` under key `legalCRM_processedDocuments`:

```javascript
{
  id: "PDOC-2025-0001",
  fileName: "Agreement.pdf",
  documentClassification: { ... },
  extractedData: { ... },
  summary: { ... },
  insights: { ... },
  crmLinks: { ... }
}
```

### Viewing Stored Data

Open browser DevTools → Console:
```javascript
// Get all processed documents
legalCRM.get('processedDocuments')

// Get specific document by ID
legalCRM.getById('processedDocuments', 'PDOC-2025-0001')
```

## 🔒 Security Considerations

### Production Deployment

1. **API Keys**: Never commit `.env` file or expose API keys
2. **CORS**: Restrict `ALLOWED_ORIGINS` to your production domain
3. **File Storage**: Use S3/GCS for production file storage
4. **Authentication**: Add user authentication before deployment
5. **Rate Limiting**: Already configured in server (100 requests per 15 minutes)
6. **Helmet.js**: Security headers already enabled

### Sensitive Data

- Documents are processed server-side
- Text is sent to LLM API (OpenAI/Anthropic/Google)
- Ensure compliance with data privacy laws
- For highly sensitive documents, consider on-premise LLM deployment

## 🚀 Performance Optimization

### Backend

- Concurrent processing limit: 5 documents (configurable)
- Processing timeout: 5 minutes (configurable)
- Response compression enabled
- Rate limiting enabled

### Frontend

- Polling interval: 2 seconds (can be adjusted)
- Results cached in localStorage
- Lazy loading of modal content

## 📝 Future Enhancements

- [ ] Support for more file formats (RTF, ODT, images)
- [ ] Multi-page PDF visualization
- [ ] Clause-by-clause comparison
- [ ] Document similarity detection
- [ ] Bulk export to Excel/CSV
- [ ] Email integration (process email attachments)
- [ ] Calendar integration (auto-extract dates)
- [ ] Custom LLM prompts per document type
- [ ] Version control for processed documents
- [ ] Collaboration features (comments, annotations)

## 🆘 Support

For issues or questions:
1. Check this README
2. Review `DOCUMENT_PROCESSING_SCHEMA.md` for data structure
3. Check browser console for errors
4. Check backend logs for server errors

## 📄 License

Part of LegalCRM system.

---

**Built with ❤️ for Indian Legal Professionals**
