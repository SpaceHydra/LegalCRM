Legal CRM Platform – Comprehensive Functional Specification Document (FSD)
Version 1.0 — Consolidated Master Document
🧭 TABLE OF CONTENTS

Project Overview

System Architecture Overview

User Roles & Permissions

Core Modules

Dashboard

Lead Management

Client Management

Project/Matter Management

Task Management

Smart Meeting Scheduler

Document Management

Billing & Revenue

Opportunity Management

Reporting & Analytics

Communication Hub



Cross-Cutting Features

Integrations

Mobile Application



Data Dictionary (All Fields, All Modules)

Business Rules

Non-Functional Requirements

Phase-Wise Delivery Plan

Appendices

1️⃣ PROJECT OVERVIEW
Purpose

Build India's most advanced, AI-powered Legal CRM Platform, covering end-to-end workflow from Lead → Client → Mandate → Tasks → Billing → Completion.

Key Principles

Single Master Record per Client

Project-first architecture

Strong governance + AI augmentation

DPDPA-compliant

Mobile-first + Cloud-based

2️⃣
Key Features

Multi-source lead capture

Lead aging with color indicators

Lead scoring (0–100)

Lead journey timeline

Assignment & escalation

Lead → Client conversion

Duplicate detection

Lead Fields (Complete List)
Basic Details
Field	Type	Rules
Lead ID	Auto	LD-YYYY-XXXX
Lead Name	Text	Required
Company Name	Text	Required
Email	Email	Optional
Phone	Phone	Required
Lead Source	Dropdown	Phone, Website, Referral etc
Referral By	FK	Visible if Lead Source = Referral
Practice Area	Dropdown	Required
Status & Tracking
Field	Type	Notes
Status	Enum	New, In Progress, Qualified, Won, Lost
Aging Days	Number	Auto-calculated
Score	Number	0–100
Last Activity Date	Date	Auto
Escalation Status	Enum	None, Level1, Level2
Lead Journey

Calls

Emails

Meetings

Notes

Documents

Status updates

👤 4.3 Client Management Module
Features

Master client record (Unity Concept)

Multiple SPOCs

Segmentation

Client-level revenue view

Duplicate detection (PAN/GST)

Client Fields
Entity Information
Field	Type	Rules
Client ID	Auto	CLT-YYYY-XXXX
Company Name	Text	Required
Website	URL	Auto-enrichment supported
PAN	Text	Unique
GSTIN	Text	Unique
Industry	Dropdown	Required
Registered Address	Text	Optional
Communication Address	Text	Optional
SPOC Details
Field	Type	Notes
SPOC ID	Auto
Name	Text
Email	Email
Phone	Phone
Department	Text
Communication Preference	Enum	Phone/Email/WhatsApp
Client Status
Field	Type
Category	Active/Prospective/Dormant/VIP
Total Revenue	Number
Last Interaction	Date
📁 4.4 Project / Matter / Transaction Management
Features

Hierarchical structure: Client → Project → Tasks

Project IDs + Serial number generator

Document segregation at project level

Collaboration workflow

Milestones, deadlines

Project aging

Project Fields
Basic Info
Field	Type
Project ID	Auto
Project Serial No.	Auto sequential
Project Name	Text
Description	Long Text
Client ID	FK
Practice Area	Dropdown
Project Type	Advisory/Transaction/Litigation
Status	New/In Progress/Review/Hold/Completed
Team Assignment
Field	Type
Lead Advocate	FK (User)
Collaborators	Multi-select (User IDs)
Created By	User
Timeline/Planning
Field	Type
Start Date	Date
Expected End Date	Date
Actual End Date	Date
Milestones	List
📌 4.5 Task Management
Features

Create/update tasks

Task dependencies

Aging colors

Collaboration requests

Time logging

Task Fields
Field	Type
Task ID	Auto
Title	Text
Description	Long text
Assigned To	FK
Created By	FK
Priority	High/Medium/Low
Status	New/In Progress/Completed
Due Date	Date
Dependency Task ID	FK
Estimated Effort	Hours
Actual Time Spent	Hours
Attachments	Files
🗓️ 4.6 Smart Meeting Scheduler
Features

Availability checker

Calendar sync (Outlook/Google)

Templates for meeting types

Hearing calendar sync

Auto-reminders

Outcome recording

Fields
Field	Type
Meeting ID	Auto
Meeting Type	Dropdown
Attendees	Multi-select
Conflicts	Boolean
Suggested Slots	Array
Agenda	Text
Outcome Notes	Text
Follow-up Tasks	List
📄 4.7 Document Management
Features

Project-level storage

Version control

Tagging

OCR search

Permissions

Secure logs

Fields
Field	Type
Document ID	Auto
Project ID	FK
File Name	Text
File Type	Enum
Tags	Multi-select
Uploaded By	FK
Version	Auto
Access Level	Enum
Download Logs	Audit table
💰 4.8 Billing & Revenue Module
Features

GST-compliant invoices

Matter-wise billing

Time entries

Expense logging

Manual receipts

Revenue dashboards

Fields
Billing
Field	Type
Invoice ID	INV-YYYY-XXXX
Client ID	FK
Project ID	FK
Invoice Date	Date
Amount	Number
GST	Number
Line Items	Array
Status	Paid/Overdue/Partially Paid
Time Entries

| User | Hours | Description |

Expenses

| Expense Type | Amount | Date |

💼 4.9 Opportunity Management

(Sales CRM-lite)

Features

Track opportunities at client or lead level

Sales Stage Tracking

Auto-conversion to project

Pipeline dashboard

Fields
Field	Type
Opportunity ID	Auto
Client/Lead ID	FK
Expected Value	Number
Stage	Enum
Notes	Long Text
📊 4.10 Reporting & Analytics
Features

Lead reports

Conversion analytics

Revenue by practice area

Team utilization

Custom report builder

Scheduled reports

💬 4.11 Communication Hub
Features

Email sync

WhatsApp API

Call logging

Templates

Bulk send

Opt-out management

🤖 5. AI/LLM Integration
Components

Email drafting

Meeting summaries

Task enhancement

Lead scoring

Document template creation

Court research (public data only)

Safety Rules

Restricted content never sent to AI

PII masking

Consent tracking

Audit logs for each AI call

⚙️ 6. CROSS-CUTTING FEATURES

Custom fields

Automation rules

Notification engine

Duplicate detection engine

Data import/export

Audit logs

🔌 7. INTEGRATIONS

Gmail / Outlook

Google Calendar / Outlook Calendar

WhatsApp Business API

Accounting software (Tally, Zoho Books, QuickBooks)

E-Courts (future)

📱 8. MOBILE FEATURES

Full responsive UI

Offline mode

Push notifications

Voice notes with transcription

Biometric login

🛡️ 9. COMPLIANCE & SECURITY

DPDPA compliant

Consent management

Right to access/correct/delete

Data localization

Backup & Disaster Recovery

IP whitelisting

End-to-end encryption

🗂️ 10. DATA DICTIONARY (ALL FIELDS)
I can generate a full Excel-ready dictionary on request

(columns: Module, Field Name, Type, Validation, Description, Required, Default Values)

📏 11. BUSINESS RULES

(Full BR list available; examples:)

PAN must be unique per client

Lead status must be "Qualified" to convert

Escalation triggers >15 days inactivity

Project documents cannot exist at client level

AI cannot process restricted content
1. INTRODUCTION
This Functional Specification Document provides a detailed description of the Lead Management, Opportunity Management, Matter Conversion, Deal Closure, and Delivery Workflow for a specialized CRM designed for legal firms, compliance teams, financial institutions, and Cubictree product users (CT-MAP, BPR, PDD, EDD).
The CRM manages the entire lifecycle:
Lead Created → Lead Enriched → Owner Assigned → Qualified → Opportunity → Matter → Delivery → Closure
The system follows strict compliance, audit trail management, document versioning, advocate onboarding considerations, and bank-grade SLA rules.
________________________________________
2. SYSTEM MODULES
1.	Lead Management Module
2.	Lead Assignment Engine (Routing)
3.	Lead Qualification Engine
4.	Opportunity (Deal) Module
5.	Account & Contact Module
6.	Matter/Case Module (Legal/Compliance scoped)
7.	Task & Activity Tracking
8.	Document Management Module
9.	Delivery/Assignment Module (internal/external advocates)
10.	Billing & Invoice Module
11.	Reports & Dashboard Module
12.	User Access & Role Matrix (UAM-lite)
13.	Audit Log & Compliance Module
14.	Notification & Communication Engine (Email, WhatsApp, SMS)
________________________________________
3. USER ROLES (LEGAL/CT CUSTOM)
Role	Description	Permissions
Client User (Bank/Corporate)	External user creating assignments/requests	Create assignments, upload docs, view status
Internal User (Cubictree Employee)	Works on assignments, reviews tasks	Create/edit leads, convert, process matters
Advocate / External Partner	Vendor advocate performing tasks	View assigned cases, upload deliverables
CT User (Special Category)	Allocation-only user	Assign advocate, basic view, no downloads
Delivery / Research Team	Works on compliance, due diligence, litigation	Task execution, document upload
Reviewer / QC	Quality verification for reports	Approve, reject, comment
Billing Team	Manages billing events	Generate invoice, validate charges
Admin	Full access	Configuration, master setup
________________________________________
4. COMPLETE STAGE-BY-STAGE FSD
________________________________________
🔵 4.1 Stage 1 – Lead Created → Lead Enrichment
4.1.1 Lead Creation Fields
Lead Basic Info
Field	Type	Mandatory	Validation
Lead Name	Text	Yes	Auto from First+Last
Company Name	Text	Yes	Default “Individual” if empty
Email	Email	No	Email format check
Phone	Number	Yes	10-digit India mobile rule
Lead Source	Dropdown	Yes	Website, Referral, LinkedIn, Bank Client
Campaign	Lookup	No	Auto-linked
System Fields
•	Lead ID (Auto-generated; alphanumeric)
•	Created On
•	Created By
•	Lead Score (AI calculated)
•	Duplicate Flag
________________________________________
4.1.2 Enrichment Fields
Field	Type	Automation
Email Validated	Boolean	Via verification API
Phone Verified	Boolean	Carrier lookup
Company Size	Dropdown	AI from LinkedIn
Industry	Dropdown	Legal/Banking/Real Estate
City	Dropdown	Must match Master City list
State	Dropdown	Auto from City
Notes	Long Text	Added by sales
________________________________________
4.1.3 Stage Workflow Logic
1.	Lead created
2.	Enrichment service runs
3.	AI assigns Lead Score
4.	Duplicate detection engine checks (Phone + Email + PAN)
5.	Move lead to Assignment Stage
________________________________________
🔵 4.2 Stage 2 – Lead Assignment (Routing)
4.2.1 Assignment Fields
Field	Type	Mandatory
Region	Dropdown	Auto from city
City	Dropdown	Yes
Industry	Dropdown	Yes
Priority	Dropdown	Auto: Hot/Warm/Cold
4.2.2 Assignment Rule Engine
Rule 1: Region-based Routing
•	North → Delhi Team
•	West → Mumbai Team
•	South → Chennai/Bangaluru
•	East → Kolkata
Rule 2: Industry Specialist Routing
•	Banking → BFSI Specialist
•	Real Estate → Property Team
•	Legal → Litigation Team
Rule 3: Round-Robin
If multiple specialists exist → assign based on lowest load.
________________________________________
4.2.3 Workflow
1.	Assignment engine checks rules
2.	Owner assigned
3.	Follow-up task auto-created (due in 24 hours)
4.	Notification sent to owner
5.	Move to Qualification Stage
________________________________________
🔵 4.3 Stage 3 – Lead Qualification (Sales Discovery)
4.3.1 Fields
Field	Type	Mandatory
Need / Problem Statement	Text	Yes
Budget Range	Dropdown	No
Decision Maker?	Yes/No	Yes
Timeline	Dropdown	Immediate/1-3 Months
Interest Level	Dropdown	High/Med/Low
Fit Score	Number	Auto
Attachments	File	Optional
________________________________________
4.3.2 AI Qualification
The AI engine:
•	Extracts intent from emails
•	Predicts urgency
•	Recommends next action
•	Updates Fit Score
________________________________________
4.3.3 Workflow
1.	Sales conducts discovery
2.	Updates qualification fields
3.	Lead reaches one of two outcomes:
✔ Qualified → Move to Opportunity
✔ Disqualified → Capture reason
________________________________________
🔵 4.4 Stage 4 – Lead Status Update
4.4.1 Status Values
•	New
•	Open
•	Connected
•	In Progress
•	Qualified
•	Disqualified
4.4.2 Disqualification Reasons
•	Wrong number
•	Not interested
•	Duplicate
•	Budget issue
•	Competitor selected
Mandatory fields when disqualifying:
•	Reason (Dropdown)
•	Notes
________________________________________
🔵 4.5 Stage 5 – Convert to Opportunity (Deal Creation)
4.5.1 Opportunity Fields
Field	Type	Mandatory
Deal Name	Auto	Yes
Deal Value	Number	Yes
Closing Date	Date	Yes
Stage	Dropdown	Discovery/Proposal/Negotiation
________________________________________
4.5.2 Account Fields (Company)
•	Company Name
•	Industry
•	Address
•	City, State
•	GST No. (optional)
4.5.3 Contact Fields
•	Name
•	Phone
•	Email
•	Role (Decision Maker, Influencer)
________________________________________
4.5.4 Workflow
•	Lead → convert → Account + Contact + Opportunity created
•	Owner remains same
•	Tasks auto-created
•	Pipeline stage moves to Discovery
________________________________________
🔵 4.6 Stage 6 – Opportunity Pipeline Movement
6 Pipeline Stages
1.	Discovery
2.	Proposal Preparation
3.	Proposal Sent
4.	Negotiation
5.	Commercial Approval
6.	Won / Lost
________________________________________
6.1 Mandatory Fields by Stage
Stage 1 – Discovery
•	Requirement Notes
•	Meeting Summary
Stage 2 – Proposal Preparation
•	Proposal Amount
•	Proposal Document
Stage 3 – Proposal Sent
•	Mode of sending
•	Date sent
Stage 4 – Negotiation
•	Revised amount
•	Discount (%)
Stage 5 – Commercial Approval
•	Manager approval
•	Finance approval
Stage 6 – Won/Lost
•	Reason
•	Competitor
•	Final Amount
________________________________________
🔵 4.7 Stage 7 – Task & Activity Tracking
Activity Types
•	Call
•	Meeting
•	WhatsApp
•	Email
•	Note
•	Follow-up task
Mandatory Fields
•	Owner
•	Due date
•	Outcome (Call result, Meeting notes)
AI automatically:
•	Summarizes calls
•	Suggests next step
•	Logs email threads
________________________________________
🔵 4.8 Stage 8 – Deal Closure → Delivery Workflow
If WON – Create Matter + Delivery Setup
Matter Fields
Field	Type
Matter Name	Auto: Account + Matter Type
Matter Type	Litigation / Property / Due Diligence
Practice Area	Banking / Real Estate / Compliance
Assigned Team	Lookup
SLA Start Date	Auto
Priority	Low/Med/High
Tasks Generated:
✔ Document collection
✔ Advocate assignment (if external)
✔ Internal QC points
✔ Kick-off meeting
Document Repository Setup:
•	Folder structure auto-created
•	Versioning enabled
•	Access restricted based on role
________________________________________
If LOST
•	Lost reason
•	Competitor name
•	Lost revenue
•	Nurture sequence triggered
________________________________________
5. VALIDATIONS
(Will generate 60–80 line validation matrix if you want.)
________________________________________
6. ROLE ACCESS MATRIX
(Will provide full table if required.)
________________________________________
7. REPORTS & DASHBOARDS
Includes:
•	Lead Funnel
•	Conversion Rate
•	Pipeline Velocity
•	Team Performance
•	TAT & SLA
•	Matter progress
•	QC failures
•	Advocate performance
________________________________________
8. NOTIFICATION & SLA RULES
•	Auto reminders
•	SLA breach alerts
•	Manager escalation
•	Client notification
________________________________________
9. AUDIT TRAIL REQUIREMENTS
•	Every field change logged
•	Time-stamped
•	User ID captured
•	Old value vs new value recorded
