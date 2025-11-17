# 🚀 Quick Start Guide - Document Processing Module

## What You've Got

A **complete AI-powered document processing system** that:

✅ Takes single documents or ZIP files
✅ Uses LLM (OpenAI GPT-4 / Google Gemini / Anthropic Claude)
✅ Extracts data document-wise (parties, dates, amounts, clauses)
✅ Translates to your preferred language (Hindi, Marathi, Tamil, etc.)
✅ Provides summaries and insights
✅ Helps advocates by analyzing orders, judgments, contracts, legal documents

## 🎯 Get Started in 5 Minutes

### Step 1: Install Backend Dependencies (2 min)

```bash
cd backend
npm install
```

### Step 2: Configure API Key (1 min)

Create `.env` file in `backend/` folder:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

**Option A: Use Google Gemini (Recommended for Indian users)**
```env
GOOGLE_API_KEY=your_gemini_api_key_here
GOOGLE_MODEL=gemini-pro
```
Get free API key: https://makersuite.google.com/app/apikey

**Option B: Use OpenAI GPT-4**
```env
OPENAI_API_KEY=sk-your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
```
Get API key: https://platform.openai.com/api-keys

**Option C: Use Anthropic Claude**
```env
ANTHROPIC_API_KEY=sk-ant-your_anthropic_key_here
ANTHROPIC_MODEL=claude-3-opus-20240229
```

### Step 3: Start Backend Server (30 sec)

```bash
cd backend
npm start
```

You should see:
```
✓ Server running on port 3001
✓ LLM Model: gemini-pro
```

### Step 4: Open Frontend (30 sec)

**Option A: Using Live Server (VS Code)**
- Install "Live Server" extension
- Right-click `document-processing.html` → "Open with Live Server"

**Option B: Using Python**
```bash
python -m http.server 8080
```

**Option C: Using Node.js**
```bash
npx http-server -p 8080
```

### Step 5: Process Your First Document (1 min)

1. Open browser: `http://localhost:8080/document-processing.html`
2. Drag & drop a PDF/DOCX legal document
3. Select language (e.g., Hindi for translation)
4. Click "Process All"
5. Wait 30-60 seconds
6. Click "View" to see results!

## 📚 What It Processes

### Supported Documents

**Court Documents:**
- Orders & Judgments ⚖️
- Petitions (Civil, Criminal, Constitutional)
- Bail Orders, Injunction Orders
- Summons, Affidavits

**Contracts & Agreements:**
- Loan Agreements (all types)
- Sale Deed / Agreement to Sell
- Lease Agreements
- Partnership Deeds
- NDAs, Service Agreements

**Legal Notices:**
- Section 138 NI Act notices
- Demand notices
- Eviction notices

**Property Documents:**
- Title Deeds
- Encumbrance Certificates
- Khata Certificates

**Corporate Documents:**
- MOA, AOA
- Board Resolutions
- Shareholder Agreements

## 🎨 What You Get

For each document, the system extracts:

### 1. Classification
- Document type (e.g., "Loan Agreement", "Court Order")
- Confidence score (High/Medium/Low)
- Applicable laws (e.g., "Indian Contract Act 1872")

### 2. Structured Data
- **Parties**: Names, roles, PAN, GSTIN, addresses
- **Dates**: Execution date, expiry, hearing dates
- **Monetary Values**: Amounts, interest rates, fees (in ₹)
- **Case Details**: Case number, CNR, court, judge
- **Property Details**: Survey no., area, boundaries

### 3. Translation
- Headline summary in chosen language
- Key clauses translated
- Legal terms kept in English

### 4. Summary
- 3-7 bullet point summary
- Detailed 2-3 paragraph summary
- Key obligations table

### 5. Insights & Risks
- **Risk Flags**: Missing signatures, unclear terms, unfavorable clauses
- **Compliance Checklist**: KYC, certifications needed
- **Action Items**: Next steps with priorities
- **Unusual Clauses**: Non-standard terms
- **Missing Elements**: What's missing from the document

## 💡 Example Use Cases for Advocates

### Use Case 1: Quick Judgment Review
**Scenario**: You receive a 50-page court judgment
**Action**: Upload → Process
**Result**:
- 5-bullet summary of the judgment
- Key findings extracted
- Disposition (Allowed/Dismissed)
- Next hearing date
- Risk flags for appeal considerations

### Use Case 2: Client Contract Analysis
**Scenario**: Client sends 20-page loan agreement for review
**Action**: Upload → Process
**Result**:
- All parties, amounts, dates extracted
- Risk flags: "Missing guarantor details"
- Action items: "Verify collateral valuation report"
- Unusual clauses: "Cross-default clause is concerning"

### Use Case 3: Bulk Notice Processing
**Scenario**: Firm receives 15 legal notices in one day
**Action**: Create ZIP → Upload → Process All
**Result**:
- All 15 notices summarized in 5 minutes
- Critical deadlines extracted
- Priority sorted by response timeline
- Ready for delegation to juniors

### Use Case 4: Property Due Diligence
**Scenario**: Client buying property, needs title verification
**Action**: Upload sale deed, encumbrance certificate, mutation entry
**Result**:
- All property details extracted
- Ownership chain verified
- Missing documents flagged
- Compliance checklist for registration

## 🌐 Language Support

The system translates summaries to:
- English (India) 🇮🇳
- Hindi (हिन्दी)
- Marathi (मराठी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Gujarati (ગુજરાતી)
- Bengali (বাংলা)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)

**Note**: Legal terms and section references remain in English.

## 🔗 CRM Integration

After processing, you can:
- Link document to client
- Link to matter/case
- Create new matter from document
- Tag and categorize
- Add notes
- Download JSON for records

All data saves to browser localStorage automatically.

## 📊 Batch Processing (ZIP Files)

1. Create a ZIP file with multiple documents:
   ```
   my_documents.zip
   ├── Agreement1.pdf
   ├── Court_Order.pdf
   ├── Notice.docx
   └── Property_Deed.pdf
   ```

2. Upload the ZIP

3. System automatically:
   - Extracts all files
   - Shows supported/unsupported files
   - Processes all documents in parallel

4. Get individual results for each document

## 🎛️ Processing Options

Before processing, configure:

### Output Language
Choose the language for summaries and translations

### Detail Level
- **Short**: 3-4 bullet points (quick review)
- **Detailed**: 2-3 paragraphs (comprehensive analysis)

### Insight Mode
- **Plain summary only**: Just the facts
- **Summary + Risk Flags**: + Risk analysis, compliance issues
- **Summary + Action Items**: + Specific next steps with priorities

## 🆘 Common Questions

**Q: Does it work with scanned PDFs?**
A: Yes! Enable OCR in `.env` file:
```env
ENABLE_OCR=true
OCR_LANGUAGE=eng+hin+mar
```

**Q: Is my data secure?**
A: Documents are processed server-side and text is sent to the LLM API. For production, use secure API keys and proper access control.

**Q: Can I process documents in bulk?**
A: Yes! Create a ZIP file with up to 200MB of documents and upload.

**Q: What's the processing time?**
A: 30-90 seconds per document depending on size and LLM provider.

**Q: Can I customize the extraction fields?**
A: Yes! Edit `backend/services/llmService.js` to customize prompts.

**Q: Does it support handwritten documents?**
A: OCR works best with typed text. Handwritten text recognition is limited.

## 📞 Next Steps

1. ✅ Start the backend server
2. ✅ Open the frontend
3. ✅ Upload a test document
4. ✅ Review the extracted data
5. ✅ Link to CRM
6. ✅ Process real documents!

## 🎓 Pro Tips

1. **Start with Short Summary**: Process faster, get key points quickly
2. **Use Risk Flags**: Always enable for contract reviews
3. **Tag Everything**: Makes searching easier later
4. **Link to Matters**: Keep documents organized by case
5. **Download JSON**: Backup important extractions
6. **Batch Process**: Use ZIP for multiple related documents
7. **Check Confidence**: Low confidence fields may need manual review

---

**Ready to save 80% of your document review time?**

Start processing: `http://localhost:8080/document-processing.html`

For detailed documentation, see: `DOCUMENT_PROCESSING_README.md`
