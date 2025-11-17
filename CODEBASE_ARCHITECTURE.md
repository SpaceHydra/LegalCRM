# LegalCRM Codebase Architecture Analysis

## 1. PROJECT STRUCTURE & TECH STACK

### Overall Architecture
- **Type**: Pure Frontend Application (HTML5 + CSS3 + Vanilla JavaScript)
- **Data Persistence**: Browser localStorage only (no backend server)
- **Frontend Framework**: Vanilla JavaScript (no React/Vue/Angular)
- **Styling**: CSS (organized in modular component files)
- **Deployment**: Static files (can be served by any HTTP server)

### Directory Structure
```
LegalCRM/
├── index.html                          # Entry point/help page
├── dashboard.html                      # Main dashboard
├── *.html                              # 50+ module pages (standalone SPAs)
├── js/
│   ├── data.js                        # Core data layer (1916 lines) - localStorage CRUD
│   ├── common.js                      # Shared utility functions
│   ├── navigation.js                  # Dynamic nav injection
│   ├── advocates-data.js              # Advocate module helpers
│   └── drafting-data.js               # Drafting module helpers
├── css/
│   ├── common-styles.css              # Base layout & nav styles
│   ├── styles.css                     # Main stylesheet
│   ├── components/                    # Component-level styles
│   │   ├── buttons.css
│   │   ├── forms.css
│   │   ├── tables.css
│   │   ├── badges.css
│   │   └── cards.css
│   ├── modules/                       # Module-specific styles
│   │   └── drafting.css
│   ├── layout/
│   │   └── topnav.css
│   └── utilities/
│       └── helpers.css
└── Documentation/
    ├── README.md                      # Feature overview
    ├── fsd.md                         # Functional spec (720 lines)
    ├── drafting_module.md             # Drafting requirements
    └── [Design & Integration docs]
```

---

## 2. DATA LAYER & DATABASE STRUCTURE

### Storage Mechanism
- **Location**: Browser's localStorage
- **Key Pattern**: `legalCRM_[entityName]` (e.g., `legalCRM_leads`, `legalCRM_documents`)
- **Format**: JSON strings in localStorage
- **Initialization**: Auto-loads default Indian dummy data on first visit

### Core Data Entities

#### A. Client-Related
1. **leads** (7 records)
   - Fields: id, name, company, email, phone, source, referralBy, practiceArea, status, score, agingDays, lastActivity, createdDate, escalationStatus, notes
   - Status options: New, In Progress, Qualified, Won, Lost
   - Score range: 0-100

2. **clients** (5 records)
   - Fields: id, companyName, website, pan, gstin, industry, registeredAddress, communicationAddress, category, totalRevenue, lastInteraction, createdDate, spocs[]
   - SPOC structure: id, name, email, phone, department, communicationPreference
   - Categories: VIP, Active, Inactive, etc.

3. **opportunities** (5 records)
   - Fields: id, dealName, accountId, accountName, expectedRevenue, closingDate, stage, dealType, owner, probability, sourceLeadId, region, industry, status, etc.
   - Stages: New, Qualification, Proposal Preparation, Proposal Sent, Negotiation, Commercial Approval, Lost

#### B. Matter & Project Management
1. **projects** (4 records) - referred to as "matters"
   - Fields: id, serialNo, name, description, clientId, clientName, practiceArea, projectType, status, leadAdvocate, collaborators[], startDate, expectedEndDate, createdBy, milestones[]
   - Milestone structure: name, status, date
   - Project Types: Advisory, Litigation, Transaction

2. **matters** (3 records) - specialized project type
   - Fields: id, matterName, linkedOpportunityId, clientId, practiceArea, matterType, region, city, slaStartDate, targetEndDate, priority, internalMatterOwner, status, riskFlags[], createdBy, etc.
   - Matter Types: BPR, TSR, POSH Investigation, Implementation
   - Status: New, In Execution, Completed, At Risk

3. **matterTasks** (4 records)
   - Fields: id, matterId, taskTitle, taskType, createdBy, owner, assignee, assigneeRole, dueDate, status, percentComplete, priority, instructions, dependsOn[], blockedBy[], isCritical, createdDate, lastUpdatedDate
   - Task Types: Drafting, Review, Data Compilation, Analysis
   - Status: Open, In Progress, On Hold, Completed, Cancelled

4. **matterDocuments** (4 records)
   - Fields: id, matterId, folderPath, fileName, fileType, versionNo, uploadedBy, uploadedOn, notes, isFinalDeliverable, linkedQCItemId
   - Folder structure: /01. Client Inputs, /02. Drafts, /03. Final Deliverables, /04. Internal Notes

5. **advocateAssignments** (3 records)
   - Fields: id, matterId, primaryAdvocate, supportingAdvocates[], panel, zone, branchCluster, assignmentStartDate, assignmentEndDate, status

6. **qcItems** (2 records) - Quality Control
   - Fields: id, matterId, documentId, deliverableName, deliverableType, submittedBy, submittedOn, reviewer, qcChecklist, reviewerComments, qcStatus, qcDecisionDate

#### C. Work Management
1. **tasks** (5 records)
   - Fields: id, title, description, projectId, projectName, assignedTo, createdBy, priority, status, dueDate, createdDate, estimatedEffort, actualTimeSpent, dependencyTaskId, tags[]
   - Status: New, In Progress, Completed
   - Priority: Low, Medium, High

2. **documents** (3 records)
   - Fields: id, fileName, fileType, fileSize, projectId, projectName, tags[], uploadedBy, uploadedDate, version, accessLevel, description
   - File types: PDF, DOCX, XLSX, JPG, PNG
   - Access levels: Public, Team, Restricted, Confidential

#### D. Financial
1. **invoices** (3 records)
   - Fields: id, invoiceDate, clientId, clientName, projectId, projectName, amount, gst, totalAmount, status, paymentDate, lineItems[], dueDate
   - Status: Draft, Sent, Paid, Partially Paid, Overdue
   - GST calculation: 18% standard rate for India

#### E. Communication & Users
1. **meetings** (5 records)
   - Fields: id, title, meetingType, clientId, projectId, date, startTime, endTime, location, attendees[], agenda, status, createdBy, notes, followUpTasks[]
   - Meeting types: Client Meeting, Internal Review

2. **users** (5 records)
   - Fields: id, name, email, phone, role, department, designation, status, joinDate, permissions[]
   - Roles: Senior Advocate, Advocate, Associate, Junior Associate
   - Departments: Litigation, Real Estate, Corporate
   - Status: Active, Inactive

3. **advocates** (5 records) - Empaneled advocates
   - Fields: id, name, email, phone, barCouncilNo, enrollmentYear, specialization[], courtsOfPractice[], location, city, state, experienceYears, qualifications[], languagesKnown[], availabilityStatus, rating, casesHandled, successRate, hourlyRate, retainerRate, bankAccountDetails{}, panNumber, gstNumber, documents[], assignedCases[], activeAssignments, totalEarnings, empaneledDate, status, notes
   - Availability: Available, Busy, On Leave
   - Rating: 0-5 scale

#### F. Drafting & Contracts
1. **requests** (4 records) - Draft requests
   - Fields: id, title, type, practiceArea, priority, status, linkedTo, requester, assignee, dueDate, lastUpdated, bank, description, attachments, slaHours

2. **templates** (3 records) - Document templates
   - Fields: id, name, type, practiceArea, version, status, jurisdiction, clientSpecific, updatedBy, updatedOn, riskLabel, tags[], variables[], notes

3. **clauses** (3 records) - Clause library
   - Fields: id, title, category, variant, jurisdiction, practiceArea, riskLevel, updatedOn, summary, clauseText

4. **obligations** (3 records) - Contract obligations tracking
   - Fields: id, document, party, startDate, expiryDate, noticePeriod, renewalType, nextTrigger, obligation, owner, status

#### G. Audit & Activity
1. **activities** (stored) - Activity log
   - Fields: id, type, title, description, timestamp, user, relatedId
   - Types: lead_conversion, document_upload, task_overdue, payment_received, etc.
   - Max 100 recent activities stored

---

## 3. CORE CRUD LAYER (data.js)

### Main Class: `LegalCRMData`
Located in `/home/user/LegalCRM/js/data.js` (1916 lines)

#### Key Methods:
```javascript
// Basic CRUD
legalCRM.get(entity)                    // Get all records of entity
legalCRM.getById(entity, id)            // Get single record
legalCRM.create(entity, item)           // Create new record
legalCRM.update(entity, id, updatedItem) // Update record
legalCRM.delete(entity, id)             // Delete record

// ID Generation
legalCRM.generateId(entity, prefix)     // Auto-generate unique ID

// Business Logic
legalCRM.convertLeadToClient(leadId)    // Lead → Client conversion
legalCRM.getDashboardStats()            // Dashboard statistics
legalCRM.logActivity(activity)          // Log activity

// Matter Management (Section B)
legalCRM.getMatterStats()               // Matter statistics
legalCRM.getMatterTasks(matterId)       // Get tasks for matter
legalCRM.getMatterDocuments(matterId)   // Get documents for matter
legalCRM.getMatterAdvocates(matterId)   // Get advocate assignment
legalCRM.getMatterQCItems(matterId)     // Get QC items
legalCRM.getAdvocateWorkload()          // Advocate workload analysis
legalCRM.getMattersByPracticeArea()     // Group by practice area
legalCRM.createDefaultFolders(matterId) // Auto-create folder structure
legalCRM.convertToMatter(type, id)      // Convert project/opportunity to matter
legalCRM.canCompleteMatter(matterId)    // Check completion readiness
legalCRM.getMatterTaskProgress(matterId) // Task completion %
legalCRM.checkTaskDependencies(taskId)  // Check if task can start
legalCRM.autoUpdateMatterRisk(matterId) // Auto-update risk based on tasks
legalCRM.getTasksForUser(matterId, userName, role) // Role-based task view
legalCRM.getBlockedTasks(matterId)      // Get blocked tasks
```

#### Auto-Activity Logging
Every CRUD operation automatically:
1. Logs activity with type (entity_created, entity_updated, entity_deleted)
2. Timestamps the action
3. Stores user info
4. Records related entity ID
5. Maintains max 100 activities (FIFO)

---

## 4. AUTHENTICATION & AUTHORIZATION

### Current Implementation
- **No backend authentication** - Frontend only
- **No login/password system** - All users see same data
- **Hardcoded user context**: "Prateek Mehta (Senior Advocate)" in header
- **Role-based UI filtering**: Only at UI level (no server-side enforcement)

### User Data Structure
- User object in data with: id, name, email, role, department, designation, permissions[]
- Permissions are array strings like: "Lead Management", "Client Management", "Document Management"
- Currently not enforced in code - permissions are informational only

### Considerations for Document Processing Module
- No user authentication/authorization to enforce
- Document access levels (Public, Team, Restricted, Confidential) are metadata only
- No file encryption or access control implemented
- Multi-user collaboration assumes trust/manual management

---

## 5. FRONTEND STRUCTURE

### Page Architecture
- **Type**: Server-side rendered HTML (not SPA)
- **Each page is independent**: dashboard.html, lead-management.html, document-management.html, etc.
- **Navigation**: Static sidebar + top nav injected by navigation.js
- **No routing library**: Direct HTML file navigation

### Navigation System (navigation.js)
```
Injected at DOM ready:
├── Top Navigation (static header with logo, search, user profile)
├── Sidebar with sections:
│   ├── Core Modules (MVP): Dashboard, Leads, Clients, Projects, Tasks, Documents, Users, Reporting
│   ├── Phase 2: Calendar, Billing, Drafting, Advocates
│   └── System: Settings, Help
└── Mobile toggle (hamburger menu)
```

### Component Libraries Used
- **Forms**: Custom HTML inputs with CSS styling
- **Tables**: Vanilla HTML tables with inline styles
- **Modals**: Custom modal divs (not Bootstrap/UI library)
- **Charts**: None in current MVP (mentioned in FSD for future)
- **Icons**: Emoji/Unicode characters (📊, 👥, 📁, etc.)

### CSS Architecture
```
common-styles.css (main)
├── Layout: Top nav, sidebar, main-content grid
├── Typography: Colors, fonts
├── Components in separate files:
│   ├── buttons.css
│   ├── forms.css
│   ├── tables.css
│   ├── badges.css
│   └── cards.css
├── Module-specific:
│   └── drafting.css
└── Utilities:
    └── helpers.css
```

### Utility Functions (common.js)
```javascript
formatCurrency(amount)        // ₹ format with locale
formatDate(dateString)        // en-IN format (DD MMM YYYY)
daysBetween(date1, date2)    // Calculate days
getStatusBadgeClass(status)  // CSS class for status
showNotification(msg, type)  // Toast-style notifications
updateNotificationCount()    // Update badge
```

---

## 6. EXISTING FILE UPLOAD HANDLING

### Current Document Upload Feature
**Location**: `/add-document.html` and `/document-management.html`

#### Upload Mechanism
```html
<!-- File input (hidden, triggered by drag-drop area) -->
<input type="file" id="fileInput" multiple 
       accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png">

<!-- Max file size: 50MB per file -->
<!-- Supports: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG -->
```

#### JavaScript Handling
1. **File Selection**: `handleFileSelect(e)` - displays file list with size
2. **File Storage**: NOT actually stored - only metadata
   ```javascript
   {
     id: 'DOC-' + Date.now(),
     fileName: file.name,
     fileSize: file.size,
     fileType: file.type,
     // ... other metadata fields
   }
   ```
3. **Limitations**:
   - Files are NOT saved anywhere (no backend storage)
   - Only metadata stored in localStorage
   - Client-side validation only
   - No actual file processing/OCR capability

#### Document Metadata Stored
```javascript
{
  id,
  fileName,
  fileType,
  fileSize,
  projectId,
  projectName,
  tags,
  uploadedBy,
  uploadedDate,
  version,
  accessLevel,        // Public, Team, Restricted, Confidential
  description,
  category,           // Legal, Financial, Administrative, Compliance, Communication
  docDate,
  status,             // Draft, Under Review, Approved, Final, Archived
  confidentiality     // Public, Internal, Confidential, Highly Confidential
}
```

#### Existing Features
- Version control (manual version field)
- Access level management (metadata only)
- Tag-based organization
- Search & filter on list page
- Document categorization
- Status tracking
- Relationship to clients and projects

---

## 7. DRAFTING & CONTRACT MODULE

### Module Location
- **Pages**: drafting-dashboard.html, drafting-requests.html, drafting-templates.html, drafting-clauses.html, drafting-execution.html
- **Data**: `js/drafting-data.js` (254 lines)

### Key Entities
1. **Draft Requests** (4 records)
   - SLA hours tracking (48-120 hours depending on type)
   - Status: New, In Draft, Under Review, Approved, Executed
   - Link to leads/matters
   - Priority-based workflow

2. **Templates** (3 records)
   - Versioning system (v1.8, v2.1, etc.)
   - Merge fields/variables ({{Bank_Name}}, {{Property_Address}})
   - Risk labels (Low, Medium, High)
   - Client-specific vs generic templates

3. **Clause Library** (3 records)
   - Variants: Preferred, Neutral, Fallback
   - Risk levels: Low, Medium, High
   - Jurisdiction-specific
   - Reusable components

4. **Obligations** (3 records)
   - Expiry date tracking
   - Auto-renewal tracking
   - Notice period management
   - Status: Upcoming, Critical, Completed

---

## 8. MATTER MANAGEMENT SYSTEM

### Unique Features
- **Structured workflow**: Matters → Tasks → QC → Delivery
- **Folder-based organization**: Auto-creates 4 standard folders per matter
- **Task dependencies**: Tasks can depend on other tasks
- **Risk tracking**: Auto-updates risk flags based on task delays
- **QC workflow**: Deliverables go through QC before completion
- **Advocate assignment**: Primary advocate + supporting advocates
- **SLA tracking**: Targets with compliance percentage

### Matter Lifecycle
```
New → In Execution → [At Risk] → Completed
```

---

## 9. KEY ARCHITECTURAL PATTERNS

### 1. Data First Design
- All state in localStorage
- UI reads from single source of truth
- Changes immediately reflected across pages (via DOM updates)

### 2. Timestamp-based IDs
- Format: `PREFIX-YYYY-SEQUENCE` (e.g., LD-2025-0001)
- Auto-incremented per entity type
- Ensures uniqueness and readability

### 3. Metadata-Rich Entities
- Multiple categorizations per record
- Tags system for flexible organization
- Status tracking at multiple levels
- Activity logging on all changes

### 4. Default Data Pattern
- Loads Indian dummy data on first visit
- Can be reset via resetToDefaultData()
- Used for demo/testing
- Real data would replace this

### 5. Component Isolation
- Each page is self-contained HTML file
- No shared page state (except localStorage)
- Sidebars/navs dynamically injected
- Reusable CSS classes

---

## 10. INDIAN CONTEXT FEATURES

### Localization
- **Currency**: ₹ (Indian Rupees)
- **Date Format**: DD/MM/YYYY (en-IN locale)
- **Company Fields**: PAN, GSTIN (Indian compliance)
- **Addresses**: Indian cities and states
- **Phone Format**: +91 country code
- **Tax**: GST calculations (18% standard rate)

### Sample Data
- Companies: DLF, Infosys, TCS, Tech Mahindra, Verma Construction
- Users: Prateek Mehta, Harish Kumar, Meera Patel, etc.
- Practice Areas: Banking, Real Estate, Corporate, Litigation, IP
- Locations: Delhi, Mumbai, Bangalore, Pune, Noida, Jaipur

---

## 11. KEY METRICS & CALCULATIONS

### Dashboard Statistics
```javascript
{
  activeLeads,        // leads with status != Won/Lost
  totalClients,       // count of all clients
  ongoingProjects,    // projects with status = "In Progress"
  tasksDueToday,      // tasks due on current date
  overdueTasks,       // incomplete tasks past due date
  meetingsToday,      // meetings scheduled for today
  monthlyRevenue      // sum of invoices from current month
}
```

### Matter Statistics
```javascript
{
  activeMatters,          // In Execution or At Risk
  atRiskMatters,          // Status = At Risk
  slaCompliancePercent,   // % matters within target date
  openTasks,              // incomplete matter tasks
  delayedTasks,           // incomplete tasks past due
  pendingQC,              // QC items with status = Pending
  totalMatters            // total count
}
```

---

## 12. DESIGN SYSTEM

### Color Palette
- **Primary**: #667eea, #764ba2 (purple gradient)
- **Secondary**: #3498db (blue)
- **Success**: #27ae60 (green)
- **Warning**: #f39c12 (orange)
- **Error**: #e74c3c (red)
- **Neutral**: #95a5a6 (grey)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Heading**: 20-28px, weight 600-700
- **Body**: 14px, weight 400
- **Label**: 13-14px, weight 600

### Components
- **Cards**: White bg, 12px border-radius, 0 2px 8px shadow
- **Buttons**: Gradient fills, 6-8px border-radius, hover: -2px transform
- **Badges**: Small colored pills for status, file type, access level
- **Tables**: Striped rows on hover, left-aligned
- **Forms**: Label + input pairs, 3px focus ring

---

## 13. SCALABILITY CONSIDERATIONS

### Current Limitations
1. **No backend**: Cannot scale beyond client-side storage
2. **localStorage cap**: ~5-10MB per domain (would limit records)
3. **No database**: Cannot handle concurrent users
4. **No API**: Cannot integrate with external systems
5. **No authentication**: Cannot enforce multi-tenancy

### For Document Processing Module
- File storage would need separate solution (S3, GCS, etc.)
- Document processing (OCR, parsing) requires backend service
- Real-time collaboration would need WebSockets/backend
- Access control enforcement requires server-side checks

---

## 14. FUTURE ENHANCEMENTS MENTIONED IN FSD

1. **AI Features**: Template suggestions, document summaries, lead scoring
2. **Integrations**: E-courts, email/WhatsApp, calendar APIs
3. **Advanced Analytics**: Dashboards, reports, forecasting
4. **Mobile App**: Native iOS/Android application
5. **Voice**: Voice notes and transcription
6. **Collaboration**: Real-time document editing, comments
7. **Automation**: Workflow automation, bulk operations

---

## 15. FILES NOT REQUIRING AUTHENTICATION

The system is completely open - no login needed. To access any page, just open the HTML file.
Hardcoded user: "Prateek Mehta, Senior Advocate"

All module pages have embedded navigation and can be accessed directly.

---

## SUMMARY FOR DOCUMENT PROCESSING MODULE

### Integration Points
1. **Data Layer**: Use `legalCRM.create('documents', docObj)` to store metadata
2. **Activity Logging**: Automatic via `legalCRM.logActivity()`
3. **Navigation**: Add to sidebar via `navigation.js`
4. **Styling**: Follow existing CSS patterns in `common-styles.css`
5. **Utilities**: Use `formatDate()`, `showNotification()`, `formatCurrency()`

### Recommended Architecture
```
New Files Needed:
├── document-processing.html           # Main page
├── document-processing-config.html    # Configuration/rules
├── js/document-processing.js          # Processing logic
├── css/document-processing.css        # Styling
└── Potentially:
    └── Backend service for actual processing
```

### Data Storage
- Document metadata: localStorage (existing `documents` entity)
- Actual files: Would need backend (S3, GCS, local storage, etc.)
- Processing results: New `documentProcessingResults` entity in localStorage
- Processing logs: Extend `activities` or new `processingLog` entity

---

