# Document Processing Module - Data Schema

## New Entity: `processedDocuments`

This entity stores all processing results, extracted data, insights, and metadata for documents that have been processed through the LLM pipeline.

```javascript
{
  id: 'PDOC-2025-0001',                    // Auto-generated ID

  // File Information
  fileName: 'Sales_Agreement.pdf',
  fileType: 'PDF',
  fileSize: '2.4 MB',
  fileSizeBytes: 2516582,
  fileHash: 'sha256_hash_here',            // For deduplication
  uploadedDate: '2025-11-17T10:30:00',
  uploadedBy: 'Prateek Mehta',

  // Processing Status
  processingStatus: 'Completed',           // Pending / Processing / Completed / Failed / PartiallyCompleted
  processingProgress: 100,                 // 0-100
  processingStartTime: '2025-11-17T10:30:05',
  processingEndTime: '2025-11-17T10:32:15',
  processingDuration: 130,                 // seconds

  // Processing Options (User selections)
  processingOptions: {
    outputLanguage: 'English (India)',     // Hindi, Marathi, etc.
    detailLevel: 'Detailed',               // Short / Detailed
    insightMode: 'Summary + Risk Flags',   // Plain / Summary + Risk / Summary + Actions
    customSettings: {}                      // Per-document overrides
  },

  // Auto-Classification
  documentClassification: {
    primaryType: 'Loan Agreement',         // Auto-detected document type
    subType: 'Term Loan',
    confidence: 'High',                     // Low / Medium / High
    alternativeTypes: ['Credit Facility Agreement', 'Debt Agreement'],
    jurisdiction: 'India',
    applicableLaws: ['Indian Contract Act 1872', 'SARFAESI Act 2002']
  },

  // Extracted Structured Data
  extractedData: {
    // Common Fields (all document types)
    parties: [
      {
        name: 'ICICI Bank Limited',
        role: 'Lender',
        type: 'Corporate',                  // Individual / Corporate / Government
        identifiers: {
          pan: 'AAACI1234F',
          cin: 'L65190MH1994PLC076074',
          gstin: '27AAACI1234F1Z5'
        },
        address: 'ICICI Bank Tower, Bandra Kurla Complex, Mumbai - 400051',
        email: 'corporate@icicibank.com',
        phone: '+91-22-2653-1414'
      },
      {
        name: 'Rajesh Kumar',
        role: 'Borrower',
        type: 'Individual',
        identifiers: {
          pan: 'ABCPK1234E',
          aadhar: 'XXXX-XXXX-1234'
        },
        address: 'Flat 101, Krishna Apartments, Andheri East, Mumbai - 400069',
        email: 'rajesh.kumar@email.com',
        phone: '+91-98765-43210'
      }
    ],

    dates: {
      executionDate: '2024-03-15',
      effectiveDate: '2024-03-15',
      expiryDate: '2029-03-15',
      keyMilestones: [
        { event: 'First Disbursement', date: '2024-03-20' },
        { event: 'First EMI Due', date: '2024-04-20' }
      ]
    },

    monetaryValues: {
      loanAmount: 5000000,                  // ₹50,00,000
      currency: 'INR',
      interestRate: 10.5,                   // %
      processingFee: 50000,
      stampDuty: 25000,
      penaltyCharges: {
        latePayment: 2,                     // % per month
        prePay: 2                           // % of outstanding
      }
    },

    // Type-Specific Fields (for Loan Agreement)
    loanSpecific: {
      tenure: 60,                           // months
      tenureUnit: 'months',
      emi: 106235,                          // Monthly EMI
      repaymentFrequency: 'Monthly',
      disbursementSchedule: [
        { tranche: 1, amount: 2500000, condition: 'Upon execution' },
        { tranche: 2, amount: 2500000, condition: 'Upon property registration' }
      ],
      collateral: {
        type: 'Property',
        description: 'Residential flat at Andheri East, Mumbai',
        marketValue: 7500000,
        surveyNumber: 'Survey No. 123/4A, Andheri Village',
        registeredOwner: 'Rajesh Kumar'
      },
      covenants: [
        'Borrower shall not create additional charge on collateral',
        'Borrower shall maintain life insurance of ₹50 lakhs',
        'Borrower shall submit ITR annually'
      ],
      defaultClauses: [
        'Non-payment of 3 consecutive EMIs triggers recall',
        'Material breach of any covenant triggers default',
        'Cross-default with other ICICI facilities'
      ],
      prepaymentTerms: 'Allowed after 12 months with 2% penalty'
    },

    // For Court Orders
    courtOrderSpecific: {
      caseNumber: '',
      cnrNumber: '',
      court: '',
      judge: '',
      petitioner: '',
      respondent: '',
      caseStatus: '',                       // Disposed / Pending / Transferred
      disposition: '',                      // Allowed / Dismissed / Partly Allowed
      orderType: '',                        // Final / Interim / Interlocutory
      nextHearingDate: '',
      directionsIssued: [],
      costsAwarded: 0
    },

    // For Sale Deed
    saleDeedSpecific: {
      propertyType: '',                     // Residential / Commercial / Agricultural
      propertyDescription: '',
      propertyAddress: '',
      surveyNumber: '',
      area: {
        value: 0,
        unit: ''                            // sq.ft / sq.m / acres
      },
      boundaries: {
        north: '',
        south: '',
        east: '',
        west: ''
      },
      considerationAmount: 0,
      stampDuty: 0,
      registrationFee: 0,
      registrationDetails: {
        districtRegistrar: '',
        subRegistrar: '',
        documentNumber: '',
        volume: '',
        page: '',
        registrationDate: ''
      }
    }
  },

  // Translated Content
  translatedContent: {
    headline: 'This is a term loan agreement between ICICI Bank and Rajesh Kumar for ₹50 lakhs at 10.5% interest for 5 years.',
    keyClauses: [
      {
        originalClause: 'Clause 5.2: Events of Default',
        translation: 'गैर-भुगतान या अनुबंध उल्लंघन पर बैंक पूर्ण राशि वसूल कर सकता है',
        translationLanguage: 'Hindi'
      }
    ],
    importantDates: [
      { label: 'Execution Date', value: '15 March 2024' },
      { label: 'Loan Tenure End', value: '15 March 2029' }
    ]
  },

  // Summary
  summary: {
    shortSummary: [
      'Term loan of ₹50 lakhs at 10.5% p.a. for 60 months',
      'Secured by residential property in Andheri East',
      'EMI of ₹1,06,235 starting from April 2024',
      'Prepayment allowed after 12 months with 2% penalty'
    ],
    detailedSummary: `This is a comprehensive loan agreement between ICICI Bank Limited (Lender) and Rajesh Kumar (Borrower) executed on 15th March 2024. The agreement governs a term loan of ₹50,00,000 (Rupees Fifty Lakhs) at an interest rate of 10.5% per annum, repayable in 60 monthly installments of ₹1,06,235 each.

The loan is secured by way of equitable mortgage over the borrower's residential flat located at Andheri East, Mumbai (Survey No. 123/4A) valued at ₹75,00,000. The disbursement is structured in two tranches: ₹25 lakhs upon execution and ₹25 lakhs upon property registration.

Key covenants include maintenance of life insurance, prohibition on creating additional charges, and annual submission of ITR. Events of default include non-payment of 3 consecutive EMIs and material breach of covenants. The agreement permits prepayment after 12 months with a 2% penalty on the outstanding principal.`,

    verdict: 'Standard term loan agreement with typical ICICI Bank terms',  // For court orders

    keyObligations: [
      { party: 'Borrower', obligation: 'Pay monthly EMI of ₹1,06,235', deadline: '20th of every month' },
      { party: 'Borrower', obligation: 'Maintain life insurance of ₹50 lakhs', deadline: 'Throughout loan tenure' },
      { party: 'Lender', obligation: 'Disburse loan amount as per schedule', deadline: 'As per milestones' }
    ]
  },

  // Insights & Risk Analysis
  insights: {
    riskFlags: [
      {
        severity: 'High',                   // High / Medium / Low
        category: 'Missing Information',
        description: 'Guarantor details are not clearly mentioned',
        recommendation: 'Verify if personal guarantee is required',
        affectedClause: 'Clause 4.1'
      },
      {
        severity: 'Medium',
        category: 'Compliance',
        description: 'Property valuation report not attached as schedule',
        recommendation: 'Obtain and attach certified valuation report',
        affectedClause: 'Schedule B'
      },
      {
        severity: 'Low',
        category: 'Documentation',
        description: 'Page 7 appears to have a minor typo in EMI amount',
        recommendation: 'Verify EMI calculation is correct',
        affectedClause: 'Page 7, Para 2'
      }
    ],

    complianceChecklist: [
      { item: 'KYC of borrower verified', status: 'Required', priority: 'High' },
      { item: 'Property title search completed', status: 'Required', priority: 'High' },
      { item: 'Property encumbrance certificate obtained', status: 'Required', priority: 'High' },
      { item: 'Life insurance policy in place', status: 'Required', priority: 'Medium' },
      { item: 'Stamp duty paid and verified', status: 'Required', priority: 'High' }
    ],

    actionItems: [
      {
        priority: 'High',
        action: 'Obtain property encumbrance certificate for last 13 years',
        assignTo: '',
        dueDate: '',
        status: 'Pending'
      },
      {
        priority: 'Medium',
        action: 'Send clause-wise comments to client for review',
        assignTo: '',
        dueDate: '',
        status: 'Pending'
      },
      {
        priority: 'High',
        action: 'Confirm execution copy has all party signatures',
        assignTo: '',
        dueDate: '',
        status: 'Pending'
      }
    ],

    unusualClauses: [
      {
        clause: 'Clause 8.3',
        description: 'Cross-default with other ICICI facilities',
        reason: 'May trigger default due to unrelated transactions',
        suggestedAction: 'Negotiate removal or scope limitation'
      }
    ],

    missingElements: [
      'Guarantor details and guarantee deed',
      'Property valuation report',
      'Insurance assignment documents',
      'Original title documents list'
    ]
  },

  // Confidence Scores
  confidence: {
    overall: 'High',                        // Low / Medium / High
    classification: 95,                     // 0-100
    extraction: 92,
    translation: 88,
    insights: 85,

    lowConfidenceFields: [
      { field: 'parties[1].identifiers.aadhar', confidence: 65, reason: 'Partially redacted' },
      { field: 'loanSpecific.collateral.marketValue', confidence: 70, reason: 'Estimated, not certified' }
    ]
  },

  // Processing Errors/Warnings
  processingErrors: [
    {
      severity: 'Warning',
      message: 'Page 12 has low OCR confidence - may contain scanning artifacts',
      affectedPages: [12],
      timestamp: '2025-11-17T10:31:45'
    }
  ],

  // CRM Linkage
  crmLinks: {
    linkedToClientId: 'CLT-2024-0067',
    linkedToClientName: 'DLF Limited',
    linkedToMatterId: 'PROJ-2025-0234',
    linkedToMatterName: 'DLF Commercial Agreement',
    linkedToCaseId: '',
    linkedToTaskId: '',
    createdNewMatter: false,                // If this document triggered new matter creation
    attachedAsEvidence: false
  },

  // Audit Trail
  auditTrail: [
    {
      timestamp: '2025-11-17T10:30:00',
      user: 'Prateek Mehta',
      action: 'Uploaded document',
      details: 'File: Sales_Agreement.pdf (2.4 MB)'
    },
    {
      timestamp: '2025-11-17T10:30:05',
      user: 'System',
      action: 'Started processing',
      details: 'LLM model: GPT-4, Language: English (India)'
    },
    {
      timestamp: '2025-11-17T10:32:15',
      user: 'System',
      action: 'Processing completed',
      details: 'Duration: 2m 10s, Status: Success'
    },
    {
      timestamp: '2025-11-17T10:35:22',
      user: 'Prateek Mehta',
      action: 'Edited extracted data',
      details: 'Changed party name from "Rajesh K." to "Rajesh Kumar"'
    },
    {
      timestamp: '2025-11-17T10:36:00',
      user: 'Prateek Mehta',
      action: 'Linked to client',
      details: 'Linked to CLT-2024-0067 (DLF Limited)'
    }
  ],

  // File References
  fileReferences: {
    originalFileId: 'DOC-2025-0521',        // Link to documents entity if applicable
    storedFilePath: '/uploads/2025/11/Sales_Agreement_abc123.pdf',
    thumbnailPath: '/uploads/2025/11/thumbs/Sales_Agreement_abc123.jpg',
    textExtractPath: '/uploads/2025/11/extracted/Sales_Agreement_abc123.txt',
    processedOutputPath: '/outputs/2025/11/PDOC-2025-0001.json'
  },

  // User Edits/Confirmations
  userEdits: {
    editedFields: ['parties[1].name', 'monetaryValues.loanAmount'],
    confirmedCorrect: true,
    confirmedBy: 'Prateek Mehta',
    confirmedDate: '2025-11-17T10:37:00',
    notes: 'Verified all amounts and party details from original document'
  },

  // Export/Download History
  downloads: [
    {
      timestamp: '2025-11-17T10:40:00',
      user: 'Prateek Mehta',
      format: 'JSON',
      purpose: 'Backup'
    }
  ],

  // Tags and Categorization
  tags: ['Loan Agreement', 'ICICI Bank', 'Term Loan', 'High Value', 'Verified'],
  category: 'Financial Agreements',
  subcategory: 'Lending',

  // Metadata
  version: 1,
  isArchived: false,
  createdDate: '2025-11-17T10:30:00',
  lastModifiedDate: '2025-11-17T10:37:00',
  lastModifiedBy: 'Prateek Mehta'
}
```

## Supporting Entity: `documentProcessingQueue`

For tracking batch uploads and ZIP file processing:

```javascript
{
  id: 'QUEUE-2025-0001',
  batchId: 'BATCH-2025-1117-001',
  uploadType: 'ZIP',                        // Single / ZIP
  totalFiles: 15,
  supportedFiles: 12,
  unsupportedFiles: 3,

  files: [
    {
      fileName: 'Agreement1.pdf',
      fileSize: '1.2 MB',
      detectedType: 'Loan Agreement',
      status: 'Completed',                  // Pending / Processing / Completed / Failed
      processedDocId: 'PDOC-2025-0001',
      progress: 100,
      error: null
    },
    {
      fileName: 'Image.png',
      fileSize: '500 KB',
      detectedType: 'Unsupported',
      status: 'Failed',
      processedDocId: null,
      progress: 0,
      error: 'Unsupported file format'
    }
  ],

  uploadedBy: 'Prateek Mehta',
  uploadedDate: '2025-11-17T10:00:00',
  processingStartTime: '2025-11-17T10:00:05',
  processingEndTime: '2025-11-17T10:45:30',
  overallStatus: 'Completed',               // Pending / Processing / Completed / PartiallyCompleted / Failed

  globalOptions: {
    outputLanguage: 'English (India)',
    detailLevel: 'Detailed',
    insightMode: 'Summary + Risk Flags'
  }
}
```

## Document Type Taxonomy (India Legal)

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
- Gift Deed
- Will / Testament
- Trust Deed

### Court Documents
- Plaint / Written Statement
- Petition (Civil / Criminal / Constitutional)
- Court Order / Judgment
- Bail Order
- Injunction Order
- Decree
- Summons / Notice
- Affidavit
- Vakalatnama (Authority Letter to Advocate)

### Corporate Documents
- Memorandum of Association (MOA)
- Articles of Association (AOA)
- Board Resolution
- Shareholder Resolution
- Annual Return (MGT-7)
- Financial Statements
- Share Certificates
- Debenture Certificate

### Legal Notices
- Legal Notice (Section 138 NI Act, Civil, Criminal)
- Demand Notice
- Eviction Notice
- Termination Notice
- Cease and Desist Notice

### Regulatory/Compliance
- GST Registration Certificate
- PAN Card
- Incorporation Certificate
- Trade License
- Environmental Clearance
- RERA Registration
- FDA License

### IP Documents
- Trademark Application / Certificate
- Patent Application / Certificate
- Copyright Registration
- Design Registration
- License Agreement

### Property Documents
- Property Title Deed
- Encumbrance Certificate
- Khata Certificate / Property Card
- Mutation Entry (Patta Transfer)
- Occupancy Certificate
- Completion Certificate
- Layout Plan Approval

## Field Extraction Rules

### Common Across All Types
1. **Parties**: Extract full names, roles, addresses, contact details, identifiers (PAN, CIN, GSTIN, Aadhar)
2. **Dates**: Execution, effective, expiry, milestones, next hearing
3. **Monetary Values**: All amounts with currency, interest rates, fees, penalties
4. **Jurisdiction**: Court name, state, city, applicable laws
5. **Signatures**: Count, verify presence, check for digital signatures

### Type-Specific
- **Loan Agreements**: Tenure, EMI, collateral, covenants, default clauses, prepayment terms
- **Court Orders**: Case number, CNR, judge, disposition, next date, directions, costs
- **Sale Deeds**: Property details, survey no., area, boundaries, stamp duty, registration details
- **Notices**: Notice type, legal basis (section), deadline for response, consequences

## Confidence Scoring Logic

- **High (85-100%)**: Clear text, standard format, all fields extracted successfully
- **Medium (60-84%)**: Some unclear sections, missing optional fields, non-standard format
- **Low (<60%)**: Poor scan quality, handwritten sections, complex layout, significant OCR errors

## Risk Flag Categories

1. **Missing Information**: Unsigned, undated, missing schedules, incomplete party details
2. **Compliance**: Missing regulatory approvals, KYC, due diligence items
3. **Documentation**: Typos, inconsistencies, version mismatches
4. **Legal**: Unfavorable clauses, unusual terms, jurisdiction issues
5. **Financial**: Payment terms unclear, penalties excessive, amounts don't match
