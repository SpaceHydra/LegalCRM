

## 1. Purpose of the Drafting Module

* Central place to **request, draft, review, approve, and store**:

  * Legal notices, replies
  * Contracts (NDA, loan agreement, sanction letters, engagement letters, POA, retainer, service agreements, etc.)
  * Policies/manuals (POSH, HR policy, SOPs)
* Integrated with:

  * **Lead / Opportunity / Matter / Account**
  * **Document repository**
  * **Advocate / external counsel / client workflows**

---

## 2. Key Features & Functionalities

### 2.1 Template Library (Master)

* Maintain **standard templates**:

  * NDA – Bank generic, NDA – Vendor specific
  * Loan agreement (HL, LAP, CC), Retainer, Engagement letter, POSH policy, etc.
* Features:

  * Version-controlled templates (v1, v2…)
  * Tagging: **document type, practice area, bank/client, risk level, jurisdiction**
  * Merge fields/variables (e.g. `{{Borrower_Name}}`, `{{Loan_Amount}}`, `{{Rate_of_Interest}}`)
  * Status: Draft / Active / Deprecated

---

### 2.2 Clause Library

* Re-usable **clause bank** with:

  * Clause categories: Indemnity, Limitation of liability, Termination, Confidentiality, Jurisdiction, Arbitration, Covenants, Events of default, etc.
  * Multiple **variants** per clause: Bank-friendly / Neutral / Counterparty-friendly.
* Features:

  * Jurisdiction tags: India, specific states (Maharashtra, Delhi, Karnataka, etc.)
  * Risk label: High risk / Medium / Low
  * “Preferred” vs “Fallback” clauses
  * Search & insert into draft

---

### 2.3 Drafting Workspace

* Rich text editor for:

  * Creating draft from a **template**
  * Starting **blank document**
  * **AI-assisted drafting** (optional): suggest clauses, summaries, etc.
* Functionality:

  * Automatic merge of CRM data:

    * Parties, addresses, PAN/CIN, loan amounts, property details, matter details
  * Track changes + comments
  * Compare 2 versions (clean vs markup)

---

### 2.4 Draft Request & Allocation

* Any internal user can raise **Drafting Request**:

  * Linked to **Lead / Opportunity / Matter / Account / Client user**
* Features:

  * Assign drafter (internal legal / external counsel)
  * Priority + due date (SLA)
  * Attach supporting docs (emails, term sheet, sanction letter, policy notes)
  * Status tracking: New → In Draft → Under Review → Approved → Shared → Executed

---

### 2.5 Review & Approval Workflow

* Multi-level approvals:

  * Drafter → Reviewer → Legal Head / Partner → Client / Bank signatory
* Features:

  * Comment threads per clause/section
  * Approve / Send back / Reject
  * Approval log (who approved what, when)

---

### 2.6 Execution, E-sign & Storage

* After approval:

  * Generate **final PDF** (clean)
  * Option to send for **e-sign** (e.g. SignDesk/Adobe/etc. – future integration)
  * Capture execution details (who signed, when, location)
* Storage:

  * Save final executed copy in **Matter / Account / Contract Repository**
  * Tag with metadata for search & renewal tracking

---

### 2.7 Alerts, Renewals & Obligations

* For contracts with expiry/renewal:

  * Track **start date, expiry date, notice period, auto-renewal flag**
  * Alerts:

    * “T-90/T-60/T-30 days before expiry”
  * Obligations:

    * Payment milestones
    * Performance obligations
    * Reporting obligations

---

## 3. Main Objects & Field Sets

I’ll break this down into key entities:

1. **Draft Request**
2. **Draft Document (Instance)**
3. **Template Master**
4. **Clause Library**
5. **Party Details (for contracts)**
6. **Execution & Validity**

---

### 3.1 Draft Request – Fields

Used when someone asks “Please draft X for this case/client”.

**Basic Info**

| Field            | Type         | Mandatory | Notes                                                                           |
| ---------------- | ------------ | --------- | ------------------------------------------------------------------------------- |
| Draft Request ID | Auto ID      | Yes       | DR-YYYY-XXXX                                                                    |
| Request Title    | Text         | Yes       | “NDA with ABC Developers for CT-MAP”                                            |
| Document Type    | Dropdown     | Yes       | NDA, Loan Agreement, Retainer, Policy, Notice, Reply, Agreement Amendment, etc. |
| Linked To        | Lookup       | Yes       | Lead / Opportunity / Matter / Account / Contact                                 |
| Requesting User  | Lookup(User) | Yes       | Who raised the request                                                          |
| Request Date     | DateTime     | Yes       | Auto                                                                            |

**Details**

| Field                 | Type            | Mandatory                                                                 |
| --------------------- | --------------- | ------------------------------------------------------------------------- |
| Purpose / Description | Long Text       | Yes                                                                       |
| Bank / Client         | Lookup(Account) | Yes for bank-side                                                         |
| Practice Area         | Dropdown        | Yes (Banking, Real Estate, Corporate, Litigation, POSH, Compliance, etc.) |
| Priority              | Dropdown        | Yes (High / Normal / Low)                                                 |
| Due Date              | Date            | Yes                                                                       |
| SLA (Hours)           | Number          | Optional                                                                  |

**Assignment**

| Field                           | Type                                                               |
| ------------------------------- | ------------------------------------------------------------------ |
| Drafter                         | Lookup(User or External)                                           |
| Reviewer                        | Lookup(User)                                                       |
| Approver (Legal Head / Partner) | Lookup(User)                                                       |
| Status                          | Dropdown: New, In Draft, Under Review, Approved, Closed, Cancelled |

**Attachments**

* Term sheets
* Sanction letters
* Emails (screenshots or PDFs)
* Regulatory references, SOP docs

---

### 3.2 Draft Document – Fields

Every actual document being drafted (one request can have multiple drafts/versions).

**Basic**

| Field             | Type             | Mandatory                                                              |
| ----------------- | ---------------- | ---------------------------------------------------------------------- |
| Draft Document ID | Auto ID          | Yes                                                                    |
| Draft Request ID  | Lookup           | Yes                                                                    |
| Document Type     | Dropdown         | Yes                                                                    |
| Template Used     | Lookup(Template) | No (if blank draft)                                                    |
| Version No.       | Text/Number      | Yes (v1, v2, etc.)                                                     |
| Status            | Dropdown         | Yes (In Draft, Sent for Review, Approved, Rejected, Superseded, Final) |

**Core Contract Metadata**

This is crucial for search & risk tracking later:

| Field                 | Type          | Mandatory          | Notes                                         |
| --------------------- | ------------- | ------------------ | --------------------------------------------- |
| Document Title        | Text          | Yes                | “Master Service Agreement – HDFC – Cubictree” |
| Governing Law         | Dropdown      | Yes                | “Laws of India”, state-specific if needed     |
| Jurisdiction (Courts) | Text/Dropdown | Yes                | e.g. “Courts at Mumbai”                       |
| Arbitration Clause?   | Yes/No        | Yes                |                                               |
| Arbitration Seat      | Text          | Conditional if Yes |                                               |
| Stamp Duty State      | Dropdown      | Yes                | e.g. Maharashtra, Delhi, etc.                 |
| Stamp Duty Payable By | Dropdown      | Yes                | Bank / Vendor / Shared                        |
| Contract Type         | Dropdown      | Yes                | One-time, Ongoing, Retainer, Framework        |

**Commercial Terms**

| Field                | Type     |                                       |
| -------------------- | -------- | ------------------------------------- |
| Contract Value (INR) | Number   |                                       |
| Payment Terms        | Text     | e.g. “30 days from invoice”           |
| Billing Frequency    | Dropdown | Monthly / Quarterly / Milestone-based |
| Penalty / LD terms   | Text     |                                       |

**Tenure & Renewal**

| Field                         | Type          | Notes                 |
| ----------------------------- | ------------- | --------------------- |
| Effective Date                | Date          | Start of contract     |
| Expiry Date                   | Date          | If applicable         |
| Auto-renewal                  | Yes/No        |                       |
| Renewal Cycle                 | Dropdown      | 1 year / 2 years etc. |
| Notice Period for Termination | Number + Unit | e.g. 90 days          |

**Risk & Compliance Tags (optional but very powerful)**

| Field                       | Type          |                            |
| --------------------------- | ------------- | -------------------------- |
| Risk Level                  | Dropdown      | Low / Medium / High        |
| Data Privacy Impact         | Dropdown      | Yes/No – if personal data  |
| Confidentiality Clause Type | Dropdown      | Standard / Strict / Custom |
| Liability Cap               | Text/Number   | e.g. “12 months’ fees”     |
| Indemnity Scope             | Text/Dropdown |                            |

---

### 3.3 Template Master – Fields

**Basic Template Info**

| Field                 | Type            | Mandatory   |
| --------------------- | --------------- | ----------- |
| Template ID           | Auto ID         | Yes         |
| Template Name         | Text            | Yes         |
| Document Type         | Dropdown        | Yes         |
| Practice Area         | Dropdown        | Yes         |
| Client/Bank Specific? | Dropdown        | Yes/No      |
| Client/Bank Name      | Lookup(Account) | Conditional |

**Template Content**

| Field                     | Type             |                                                       |
| ------------------------- | ---------------- | ----------------------------------------------------- |
| Template Body (Rich Text) | Long Text (HTML) |                                                       |
| Variables / Placeholders  | Multi-select     | e.g. Party Name, Address, Loan Amount, Property, etc. |
| Version                   | Number/Text      | e.g. 1.0, 2.0                                         |
| Status                    | Dropdown         | Draft, Active, Deprecated                             |

**Tags**

* Jurisdiction tags
* Risk label
* Internal usage notes

---

### 3.4 Clause Library – Fields

**Clause Master**

| Field         | Type     | Mandatory                                                       |
| ------------- | -------- | --------------------------------------------------------------- |
| Clause ID     | Auto ID  | Yes                                                             |
| Clause Title  | Text     | Yes                                                             |
| Category      | Dropdown | Indemnity, Termination, Confidentiality, IP, Jurisdiction, etc. |
| Variant Type  | Dropdown | Bank-friendly / Neutral / Counterparty-friendly                 |
| Jurisdiction  | Dropdown | India, State-specific                                           |
| Practice Area | Dropdown | Banking / Real Estate / Corporate / POSH / etc.                 |

**Content**

| Field          | Type             |                     |
| -------------- | ---------------- | ------------------- |
| Clause Text    | Long Text (HTML) |                     |
| Risk Level     | Dropdown         | High / Medium / Low |
| Internal Notes | Long Text        | Usage guidance      |

---

### 3.5 Party Details – Fields

A block reusable across documents.

**Party Info**

| Field              | Type            | Notes                                                              |
| ------------------ | --------------- | ------------------------------------------------------------------ |
| Party Type         | Dropdown        | Bank / Vendor / Borrower / Guarantor / Service Provider / Employee |
| Party Name         | Text            |                                                                    |
| Entity Type        | Dropdown        | Individual / Company / LLP / Partnership                           |
| Registered Address | Long Text       |                                                                    |
| City / State / PIN | Text / Dropdown |                                                                    |
| Country            | Dropdown        |                                                                    |
| PAN / CIN / GST    | Text            | as applicable                                                      |

---

### 3.6 Execution & Validity – Fields

After signing, you capture:

| Field                       | Type     | Notes                     |
| --------------------------- | -------- | ------------------------- |
| Signing Date (Bank)         | Date     |                           |
| Signing Date (Counterparty) | Date     |                           |
| Signed At (City/Place)      | Text     |                           |
| Mode of Signing             | Dropdown | Wet-ink / E-sign / Hybrid |
| E-sign Provider             | Text     | If integrated later       |
| Final Executed Copy         | File     | PDF upload                |

---

## 4. Core Workflows

### 4.1 Request → Draft → Review → Approve

1. **Draft Request created** (linked to matter/opportunity).
2. System suggests **Template + Clauses** based on:

   * Document type
   * Client/bank
   * Practice area
3. Drafter:

   * Selects template
   * Populates variables from CRM/matter
   * Inserts/changing clauses from Clause Library
4. Reviewer reviews:

   * Edits / comments
   * Approves / sends back
5. Approver (Legal Head/Partner) gives final approval.
6. Final version locked → sent to **client/advocate** or for **execution**.

---

### 4.2 From Execution → Monitoring

1. Final executed copy uploaded.
2. All **key terms & dates stored** in metadata.
3. System creates:

   * Renewal reminders
   * Termination notice reminders
   * Obligation tasks (e.g. “Share MIS every quarter”, “Price review annually”).

---

## 5. Bonus: AI-Driven Enhancements (Optional but Powerful)

You can define them as **Phase-2 / Future Enhancements**:

* AI to:

  * Suggest best template based on matter/lead
  * Highlight risky clauses compared to org standard
  * Summarize contract into a one-page brief for business team
  * Extract key fields from uploaded third-party draft (doc/PDF)

