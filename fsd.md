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

Build India’s most advanced, AI-powered Legal CRM Platform, covering end-to-end workflow from Lead → Client → Mandate → Tasks → Billing → Completion.

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

Lead status must be “Qualified” to convert

Escalation triggers >15 days inactivity

Project documents cannot exist at client level

AI cannot process restricted content