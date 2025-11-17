const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';

/**
 * Classify document type
 */
exports.classifyDocument = async (documentText, options) => {
  try {
    const prompt = `You are a legal document classification expert specializing in Indian law.

Analyze the following document and classify it.

Document:
${documentText.substring(0, 4000)} ${documentText.length > 4000 ? '...(truncated)' : ''}

Classify this document into one of the following categories (Indian legal context):

**Contracts & Agreements:**
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

**Court Documents:**
- Plaint / Written Statement
- Petition (Civil / Criminal / Constitutional)
- Court Order / Judgment
- Bail Order
- Injunction Order
- Decree
- Summons / Notice
- Affidavit
- Vakalatnama

**Corporate Documents:**
- Memorandum of Association (MOA)
- Articles of Association (AOA)
- Board Resolution
- Shareholder Resolution
- Annual Return (MGT-7)
- Financial Statements

**Legal Notices:**
- Legal Notice (Section 138 NI Act, Civil, Criminal)
- Demand Notice
- Eviction Notice
- Termination Notice

**Property Documents:**
- Property Title Deed
- Encumbrance Certificate
- Khata Certificate
- Mutation Entry

**Others:**
- (specify if none of the above)

Return your analysis in the following JSON format:
{
  "primaryType": "exact document type",
  "subType": "specific subtype if applicable",
  "confidence": "High/Medium/Low",
  "alternativeTypes": ["alternative type 1", "alternative type 2"],
  "jurisdiction": "India/specific state",
  "applicableLaws": ["relevant act/law 1", "relevant act/law 2"]
}`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a legal document classification expert specializing in Indian law. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;

  } catch (error) {
    console.error('Document classification error:', error);
    // Return fallback classification
    return {
      primaryType: 'Unknown',
      subType: '',
      confidence: 'Low',
      alternativeTypes: [],
      jurisdiction: 'India',
      applicableLaws: []
    };
  }
};

/**
 * Extract structured data based on document type
 */
exports.extractStructuredData = async (documentText, documentType, options) => {
  try {
    const typeSpecificInstructions = getExtractionInstructions(documentType);

    const prompt = `You are a legal data extraction expert specializing in Indian law.

Extract structured data from this ${documentType}.

Document:
${documentText}

Extract the following information in JSON format:

**Common Fields (all documents):**
- parties: array of {name, role, type (Individual/Corporate/Government), identifiers (PAN/CIN/GSTIN/Aadhar), address, email, phone}
- dates: {executionDate, effectiveDate, expiryDate, keyMilestones: [{event, date}]}
- monetaryValues: {amount, currency, interestRate, fees, penalties}
- jurisdiction: {court, state, city}

${typeSpecificInstructions}

Important:
- Extract exact values as they appear
- Use null for missing fields
- For Indian names/addresses, preserve exact spelling
- Extract PAN (format: ABCDE1234F), GSTIN (format: 22AAAAA0000A1Z5), Aadhar as XXXX-XXXX-1234
- Amounts in ₹ (INR)
- Dates in YYYY-MM-DD format

Return valid JSON only.`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a legal data extraction expert. Extract structured data from legal documents with high accuracy. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;

  } catch (error) {
    console.error('Data extraction error:', error);
    return {
      parties: [],
      dates: {},
      monetaryValues: {},
      error: 'Extraction failed'
    };
  }
};

/**
 * Translate content to target language
 */
exports.translateContent = async (extractedData, targetLanguage) => {
  if (targetLanguage === 'English (India)') {
    return {
      headline: generateHeadline(extractedData),
      keyClauses: [],
      importantDates: extractImportantDates(extractedData)
    };
  }

  try {
    const languageMap = {
      'Hindi': 'Hindi',
      'Marathi': 'Marathi',
      'Tamil': 'Tamil',
      'Telugu': 'Telugu',
      'Gujarati': 'Gujarati',
      'Bengali': 'Bengali',
      'Kannada': 'Kannada',
      'Malayalam': 'Malayalam',
      'Punjabi': 'Punjabi'
    };

    const lang = languageMap[targetLanguage] || 'English';

    const headline = generateHeadline(extractedData);

    const prompt = `Translate the following legal document summary to ${lang}.

Keep legal terms, section references, and proper names in English.
Only translate the descriptive parts.

Summary:
${headline}

Return JSON:
{
  "translatedHeadline": "translation here"
}`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: `You are a legal translator specializing in Indian languages. Translate legal content to ${lang} while keeping legal terms intact.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);

    return {
      headline: result.translatedHeadline || headline,
      keyClauses: [],
      importantDates: extractImportantDates(extractedData)
    };

  } catch (error) {
    console.error('Translation error:', error);
    return {
      headline: generateHeadline(extractedData),
      keyClauses: [],
      importantDates: extractImportantDates(extractedData)
    };
  }
};

/**
 * Generate summary
 */
exports.generateSummary = async (extractedData, detailLevel) => {
  try {
    const dataJson = JSON.stringify(extractedData, null, 2);

    const prompt = `Generate a ${detailLevel.toLowerCase()} summary of this legal document.

Extracted Data:
${dataJson}

Generate:
1. Short summary: 3-7 bullet points covering key aspects
2. ${detailLevel === 'Detailed' ? 'Detailed summary: 2-3 paragraphs with comprehensive details' : ''}
3. Key obligations: List of main obligations with party, deadline

Return JSON:
{
  "shortSummary": ["point 1", "point 2", ...],
  ${detailLevel === 'Detailed' ? '"detailedSummary": "paragraph text",' : ''}
  "verdict": "one-line outcome/purpose",
  "keyObligations": [{party: "name", obligation: "description", deadline: "date"}]
}`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a legal summarization expert. Create clear, concise summaries of legal documents.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;

  } catch (error) {
    console.error('Summary generation error:', error);
    return {
      shortSummary: ['Summary generation failed'],
      detailedSummary: '',
      verdict: '',
      keyObligations: []
    };
  }
};

/**
 * Generate insights (risk flags, compliance, action items)
 */
exports.generateInsights = async (extractedData, documentType, insightMode) => {
  try {
    const dataJson = JSON.stringify(extractedData, null, 2);

    let instructions = '';
    if (insightMode === 'Plain summary only') {
      instructions = 'Provide basic insights only.';
    } else if (insightMode === 'Summary + risk/issue flags') {
      instructions = 'Identify risk flags, compliance issues, missing information, and unusual clauses.';
    } else {
      instructions = 'Identify risks, compliance issues, AND generate specific action items with priorities.';
    }

    const prompt = `Analyze this ${documentType} and provide legal insights.

${instructions}

Extracted Data:
${dataJson}

Analyze for:
1. Risk Flags: Missing info, unclear terms, unfavorable clauses (severity: High/Medium/Low)
2. Compliance Checklist: Items that need verification (KYC, certifications, registrations)
3. Action Items: Specific next steps with priorities
4. Unusual Clauses: Non-standard or concerning clauses
5. Missing Elements: What's missing from the document

Return JSON:
{
  "riskFlags": [
    {
      "severity": "High/Medium/Low",
      "category": "category name",
      "description": "what's wrong",
      "recommendation": "what to do",
      "affectedClause": "clause reference"
    }
  ],
  "complianceChecklist": [
    {
      "item": "verification needed",
      "status": "Required/Optional",
      "priority": "High/Medium/Low"
    }
  ],
  "actionItems": [
    {
      "priority": "High/Medium/Low",
      "action": "specific action",
      "assignTo": "",
      "dueDate": "",
      "status": "Pending"
    }
  ],
  "unusualClauses": [
    {
      "clause": "clause reference",
      "description": "what's unusual",
      "reason": "why it's concerning",
      "suggestedAction": "what to do"
    }
  ],
  "missingElements": ["element 1", "element 2"]
}`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a legal risk analysis expert specializing in Indian law. Identify risks, compliance issues, and provide actionable recommendations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;

  } catch (error) {
    console.error('Insights generation error:', error);
    return {
      riskFlags: [],
      complianceChecklist: [],
      actionItems: [],
      unusualClauses: [],
      missingElements: []
    };
  }
};

/**
 * Get type-specific extraction instructions
 */
function getExtractionInstructions(documentType) {
  const instructions = {
    'Loan Agreement': `
**Loan-Specific Fields:**
- loanSpecific: {
    tenure, tenureUnit, emi, repaymentFrequency,
    disbursementSchedule: [{tranche, amount, condition}],
    collateral: {type, description, marketValue, surveyNumber, registeredOwner},
    covenants: [list of covenants],
    defaultClauses: [list of default triggers],
    prepaymentTerms: "terms"
  }`,

    'Court Order': `
**Court Order-Specific Fields:**
- courtOrderSpecific: {
    caseNumber, cnrNumber, court, judge,
    petitioner, respondent,
    caseStatus: "Disposed/Pending",
    disposition: "Allowed/Dismissed/Partly Allowed",
    orderType: "Final/Interim",
    nextHearingDate,
    directionsIssued: [list],
    costsAwarded: amount
  }`,

    'Sale Deed': `
**Sale Deed-Specific Fields:**
- saleDeedSpecific: {
    propertyType: "Residential/Commercial/Agricultural",
    propertyDescription, propertyAddress, surveyNumber,
    area: {value, unit},
    boundaries: {north, south, east, west},
    considerationAmount, stampDuty, registrationFee,
    registrationDetails: {districtRegistrar, subRegistrar, documentNumber, volume, page, registrationDate}
  }`
  };

  return instructions[documentType] || '**Type-Specific Fields:** Extract any other relevant fields specific to this document type.';
}

/**
 * Generate headline from extracted data
 */
function generateHeadline(extractedData) {
  const parties = extractedData.parties || [];
  const monetary = extractedData.monetaryValues || {};

  if (parties.length >= 2 && monetary.loanAmount) {
    return `Agreement between ${parties[0]?.name} and ${parties[1]?.name} for ₹${formatAmount(monetary.loanAmount)}`;
  }

  if (parties.length > 0) {
    return `Legal document involving ${parties.map(p => p.name).join(', ')}`;
  }

  return 'Legal document summary';
}

/**
 * Extract important dates
 */
function extractImportantDates(extractedData) {
  const dates = extractedData.dates || {};
  const result = [];

  if (dates.executionDate) {
    result.push({ label: 'Execution Date', value: formatDate(dates.executionDate) });
  }

  if (dates.expiryDate) {
    result.push({ label: 'Expiry Date', value: formatDate(dates.expiryDate) });
  }

  return result;
}

/**
 * Format amount
 */
function formatAmount(amount) {
  return new Intl.NumberFormat('en-IN').format(amount);
}

/**
 * Format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
