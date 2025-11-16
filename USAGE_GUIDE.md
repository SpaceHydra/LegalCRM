# Legal CRM - Quick Start Guide

## 🚀 How to Use

### Starting the Application

1. **Open the Dashboard**
   - Simply open `dashboard.html` in your web browser
   - Or start with any module page (they all have navigation)

2. **Navigation**
   - Use the **left sidebar** to switch between modules
   - Click the **logo** in the top-left to return to dashboard
   - All pages have consistent navigation

### Working with Data

#### Adding Records

1. Click the **"+ Add New"** button on any module page
2. Fill in the required fields (marked with *)
3. Click **"Save"** to create the record
4. Changes are immediately saved to localStorage

#### Editing Records

1. Click the **✏️ Edit** button on any record
2. Modify the fields you want to change
3. Click **"Save"** to update
4. Changes reflect across all modules instantly

#### Deleting Records

1. Click the **🗑️ Delete** button on any record
2. Confirm the deletion
3. Record is removed from all views

#### Searching & Filtering

- Use the **search box** to find records by name, ID, email, etc.
- Use **dropdown filters** to narrow down by status, type, priority, etc.
- Results update in real-time as you type

### Module-Specific Features

#### Lead Management
- **Convert to Client**: Click ✅ button to convert qualified leads
- **Aging Indicators**: Color dots show lead age (🟢 new, 🟡 moderate, 🔴 old)
- **Lead Scoring**: Track lead quality (0-100 score)

#### Client Management
- **SPOC Management**: Add multiple contacts per client
- **Revenue Tracking**: See total revenue per client
- **Category Management**: VIP, Active, Prospective, Dormant

#### Project Management
- **Milestones**: Track project progress with milestones
- **Team Assignment**: Assign lead advocate and collaborators
- **Timeline Tracking**: Monitor start, expected, and actual end dates

#### Task Management
- **Quick Complete**: Check the checkbox to mark tasks done
- **Priority Levels**: High, Medium, Low with color coding
- **Overdue Alerts**: Overdue tasks highlighted in red
- **Time Tracking**: Log estimated vs actual hours

#### Document Management
- **Version Control**: Upload new versions of documents
- **Access Levels**: Public, Team, Restricted, Confidential
- **Tagging**: Organize documents with custom tags

#### Billing & Revenue
- **GST Calculation**: Automatic 18% GST on all invoices
- **Line Items**: Add multiple services/products per invoice
- **Payment Status**: Track Paid, Pending, Overdue, Partially Paid
- **Live Preview**: See invoice total while adding line items

#### Calendar Integration
- **Meeting Types**: Client Meeting, Internal Review, Court Hearing, Consultation
- **Attendee Management**: Track who's attending each meeting
- **Location Tracking**: Physical locations or virtual meeting links

#### Reporting
- **Period Filters**: View data by Today, Week, Month, Quarter, Year
- **Practice Area Analysis**: See revenue breakdown by practice area
- **Top Clients**: Ranked by revenue contribution
- **Export Reports**: Download reports (placeholder for PDF)

### Dashboard Features

The **dashboard** is your command center:

1. **Quick Stats**: 6 key metrics updated in real-time
   - Click any stat card to jump to that module

2. **Today's Meetings**: See your schedule at a glance

3. **Recent Activity**: Track all system changes

4. **Priority Tasks**: Focus on what needs attention
   - Check boxes to mark tasks complete

5. **Aging Leads**: See leads that need follow-up

6. **Quick Actions**: One-click access to common tasks

### Data Persistence

- All data is stored in **browser's localStorage**
- Data persists across sessions (won't be lost on page refresh)
- Each browser has its own data (Chrome ≠ Firefox)
- To reset: Clear browser data or use browser dev tools → Application → Local Storage

### Pre-loaded Data

The system comes with **Indian dummy data**:

- **4 Leads**: Kumar Enterprises, Sharma Builders, etc.
- **5 Clients**: DLF, Tech Mahindra, Infosys, TCS, Verma Construction
- **4 Projects**: Active legal matters
- **5 Tasks**: Sample tasks with different priorities
- **3 Invoices**: With GST calculations
- **3 Meetings**: Today's schedule
- **5 Users**: Prateek Mehta (logged in), Harish, Meera, Anjali, Rahul

### Testing CRUD Operations

Try these scenarios:

1. **Create a Lead** → Convert to Client → See it in Client Management
2. **Add a Task** → Mark as Complete → See dashboard update
3. **Create an Invoice** → Check Billing dashboard stats
4. **Add a Meeting** → See it on Dashboard "Today's Meetings"
5. **Edit a Project** → Update status → See in Reporting

### Tips & Tricks

1. **Search is Powerful**: Search works across multiple fields
2. **Stats Auto-Update**: All summary cards update when you make changes
3. **Color Coding**: Learn the color codes for quick insights
   - 🟢 Green = Good/Active/Completed
   - 🟡 Yellow = Warning/In Progress
   - 🔴 Red = Overdue/Critical
4. **Required Fields**: Look for * to know what's mandatory
5. **Validation**: Forms validate before saving
6. **Confirmation**: Deletes always ask for confirmation

### Common Workflows

#### New Lead to Billing
1. **Lead Management** → Add New Lead
2. Fill in details, set score and status
3. When qualified → Click ✅ Convert to Client
4. **Project Management** → Create New Project for client
5. **Task Management** → Add tasks for the project
6. Complete work, track time
7. **Billing** → Generate Invoice → Link to project
8. Track payment status

#### Daily Operations
1. Open **Dashboard** to see today's overview
2. Check **Today's Meetings** widget
3. Review **Priority Tasks** and complete them
4. Follow up on **Aging Leads**
5. Check **Recent Activity** for team updates

### Browser Compatibility

Works best on:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

**Note**: Requires JavaScript enabled

### Mobile Usage

The interface is **responsive** and works on mobile:
- Sidebar auto-hides on small screens
- Tables scroll horizontally
- Forms stack vertically
- Touch-friendly buttons

### Troubleshooting

**Problem**: Data not saving
- **Solution**: Check if JavaScript is enabled
- Check browser console for errors

**Problem**: Page looks broken
- **Solution**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache

**Problem**: Want to reset data
- **Solution**: Open browser DevTools → Application → Local Storage → Clear all items starting with "legalCRM_"

**Problem**: Changes not reflecting on dashboard
- **Solution**: Refresh the dashboard page (auto-refreshes every 60 seconds)

### Advanced Features

#### Activity Log
Every action is logged:
- Lead conversions
- Document uploads
- Task completions
- Payments received
- All tracked with timestamps

#### Auto-Refresh
- Dashboard refreshes every **60 seconds** automatically
- Keeps stats up-to-date without manual refresh

#### ID Generation
- Automatic ID generation for all entities
- Format: PREFIX-YEAR-NUMBER
- Examples: LD-2025-0001, CLT-2025-0012, PROJ-2025-0189

### Getting Help

1. Check the **README.md** for technical details
2. Review **fsd.md** for complete functional specifications
3. Inspect the code in `js/data.js` for data operations

---

**Enjoy using Legal CRM!** 🎉

For questions or issues, refer to the comprehensive documentation in README.md
