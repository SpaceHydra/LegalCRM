# Legal CRM Portal - HTML Prototype

A comprehensive Legal CRM platform built with HTML, CSS, and JavaScript featuring full CRUD operations and Indian dummy data.

## 🚀 MVP Modules

### ✅ Completed Features

1. **Dashboard** (`dashboard.html`)
   - Real-time statistics from all modules
   - Today's meetings and activities
   - Priority tasks and aging leads
   - Quick action buttons
   - Auto-refreshing every minute

2. **Lead Management** (`lead-management.html`)
   - Full CRUD operations
   - Lead scoring (0-100)
   - Aging indicators (color-coded)
   - Lead conversion to client
   - Search and filter capabilities

3. **Client Management** (`client-management.html`)
   - Master client records
   - Multiple SPOC management
   - PAN/GSTIN compliance fields
   - Client categorization (VIP, Active, etc.)
   - Industry segmentation

4. **Matter/Project Management** (`project-management.html`)
   - Project lifecycle tracking
   - Milestone management
   - Client and team assignment
   - Practice area categorization
   - Timeline tracking

5. **Task Management** (`task-management.html`)
   - Priority-based task tracking
   - Task dependencies
   - Time logging (estimated vs actual)
   - Overdue highlighting
   - Quick completion action

6. **Document Management** (`document-management.html`)
   - Version control system
   - Access level management
   - Tag-based organization
   - File type filtering
   - Project-level segregation

7. **User & Role Management** (`user-management.html`)
   - Role-based access control
   - Department assignment
   - Granular permissions
   - User status tracking

8. **Basic Reporting** (`reporting.html`)
   - Revenue by practice area
   - Top clients analysis
   - Team performance metrics
   - Lead pipeline status
   - Exportable reports

9. **Billing & Revenue** (`billing.html`)
   - GST-compliant invoicing
   - Line item billing
   - Payment status tracking
   - Hourly rate calculations
   - Overdue invoice alerts

10. **Calendar Integration** (`calendar.html`)
    - Meeting scheduling
    - Attendee management
    - Location tracking
    - Agenda and notes
    - Status management

11. **Drafting & Contract Management** (`drafting-dashboard.html`, `drafting-requests.html`, `drafting-templates.html`, `drafting-clauses.html`, `drafting-execution.html`)
    - Draft request intake with SLA tracking and workflow boards
    - Template and clause libraries with versioning, tags, and merge fields
    - Workspace tips plus AI-ready placeholders for clause insertion
    - Execution, e-sign readiness, and renewal/obligation tracking

> Detailed requirements live in `drafting_module.md` and every new HTML page above maps back to that blueprint.

## 📁 File Structure


```
LegalCRM/
├── dashboard.html                  # Main dashboard (dynamic)
├── drafting-dashboard.html         # Drafting hub overview
├── drafting-requests.html          # Request queue & workflow
├── drafting-templates.html         # Template library
├── drafting-clauses.html           # Clause bank
├── drafting-execution.html         # Execution & obligations
├── add-draft-request.html          # Intake form
├── lead-management.html            # Lead module
├── client-management.html          # Client module
├── project-management.html         # Project/Matter module
├── task-management.html            # Task module
├── document-management.html        # Document module
├── user-management.html            # User & Role module
├── reporting.html                  # Analytics & Reports
├── billing.html                    # Billing & Invoices
├── calendar.html                   # Meeting Calendar
├── legal_crm_dashboard (1).html    # Original static dashboard
├── fsd.md                          # Functional Specification
├── js/
│   ├── data.js                     # Shared data layer (localStorage)
│   ├── drafting-data.js            # Drafting module sample data + helpers
│   └── common.js                   # Common utilities
└── css/
    └── common-styles.css           # Shared styles
```


## 🔧 Technical Features

### Data Management
- **localStorage-based persistence** - All data persists across sessions
- **Shared data layer** (`js/data.js`) - Centralized CRUD operations
- **Automatic ID generation** - Unique IDs for all entities
- **Activity logging** - All changes tracked in activity feed
- **Real-time updates** - Changes reflect immediately across modules

### CRUD Operations
All modules support full CRUD:
- **Create**: Add new records with validation
- **Read**: List, search, and filter records
- **Update**: Edit existing records inline
- **Delete**: Remove records with confirmation

### Indian Context
- Currency: ₹ (Indian Rupees)
- Compliance: PAN, GSTIN fields
- Names: Indian names and companies
- Locations: Indian cities and addresses
- Date format: DD/MM/YYYY (Indian standard)

## 🎨 Design Features

- **Consistent UI/UX** across all modules
- **Responsive design** for mobile and desktop
- **Color-coded status indicators**
- **Modal-based forms** for add/edit operations
- **Empty state messages** for better UX
- **Hover effects** and smooth transitions
- **Search and filter** on all list pages
- **Summary statistics** on every page

## 🚀 Getting Started

### Option 1: Direct File Access
Simply open `dashboard.html` in your web browser to start using the system.

### Option 2: Local Server
For better performance, run a local server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

Then navigate to `http://localhost:8000/dashboard.html`

## 📊 Pre-loaded Data

The system comes with Indian dummy data:

### Leads (4 records)
- Kumar Enterprises, Sharma Builders, Agarwal & Sons, Reddy Consultants

### Clients (5 records)
- DLF Limited, Tech Mahindra, Verma Construction, Infosys Limited, TCS

### Projects (4 records)
- Infosys Merger Advisory, TCS Contract Review, Verma Property Dispute, DLF Commercial Agreement

### Tasks (5 records)
- Various priority tasks across projects

### Invoices (3 records)
- Sample invoices with GST calculations

### Meetings (3 records)
- Today's scheduled meetings

### Users (5 records)
- Prateek Mehta (Senior Advocate), Harish Kumar, Meera Patel, Anjali Singh, Rahul Verma

## 🔄 Data Flow

```
User Action → Module Page → data.js (CRUD) → localStorage → Dashboard Update
```

All changes in any module automatically:
1. Update localStorage
2. Log activity in activity feed
3. Refresh dashboard statistics
4. Update related modules

## 🎯 Next Steps (Phase 2 & 3)

Future enhancements as per FSD:
- Smart Meeting Scheduler
- Opportunity Management
- Email/WhatsApp Integration
- Advanced Analytics
- AI-powered features (templates, summaries, scoring)
- E-Courts integration
- Voice notes & transcription

## 📝 Notes

- All data is stored in browser's localStorage
- Clearing browser data will reset to default dummy data
- Best viewed in modern browsers (Chrome, Firefox, Edge, Safari)
- No backend required - fully functional frontend prototype

## 👨‍💻 Development

### Key Functions (data.js)

```javascript
legalCRM.get(entity)                    // Get all records
legalCRM.getById(entity, id)            // Get single record
legalCRM.create(entity, data)           // Create new record
legalCRM.update(entity, id, data)       // Update record
legalCRM.delete(entity, id)             // Delete record
legalCRM.generateId(entity, prefix)     // Generate unique ID
legalCRM.getDashboardStats()            // Get dashboard statistics
legalCRM.convertLeadToClient(leadId)    // Convert lead to client
```

### Supported Entities
- `leads`
- `clients`
- `projects`
- `tasks`
- `documents`
- `invoices`
- `meetings`
- `users`
- `activities`

## 📄 License

© 2025 Cubictree (A Gaba Projects Private Limited Company)

---

**Built for:** SNG & Partners - Business Development Platform
**Version:** 1.0 (MVP)
**Last Updated:** November 2025
