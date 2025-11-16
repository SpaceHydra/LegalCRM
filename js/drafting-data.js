const DRAFTING_STORAGE_KEYS = {
    requests: 'legalCRM.drafting.requests',
    workspaceDrafts: 'legalCRM.drafting.workspaceDrafts'
};

const draftingData = {
    summary: {
        activeDrafts: 14,
        pendingApprovals: 6,
        templates: 48,
        renewals: 9
    },
    requests: [
        {
            id: 'DR-2025-0101',
            title: 'NDA with ABC Developers',
            type: 'NDA',
            practiceArea: 'Corporate',
            priority: 'High',
            status: 'In Draft',
            linkedTo: 'Lead LD-1084',
            requester: 'Harish Kumar',
            assignee: 'Meera Patel',
            dueDate: '2025-11-22',
            lastUpdated: '2025-11-16',
            bank: 'HDFC Bank',
            description: 'Draft NDA for confidential pricing discussion with ABC Developers.',
            attachments: 3,
            slaHours: 48
        },
        {
            id: 'DR-2025-0098',
            title: 'Loan Agreement - Sunrise Buildcon',
            type: 'Loan Agreement',
            practiceArea: 'Banking',
            priority: 'High',
            status: 'Under Review',
            linkedTo: 'Matter MAT-204',
            requester: 'Anjali Singh',
            assignee: 'Rahul Verma',
            dueDate: '2025-11-19',
            lastUpdated: '2025-11-15',
            bank: 'Axis Bank',
            description: 'HL agreement for Sunrise Buildcon NBFC program.',
            attachments: 5,
            slaHours: 72
        },
        {
            id: 'DR-2025-0090',
            title: 'Vendor Agreement - IT Managed Services',
            type: 'Service Agreement',
            practiceArea: 'IT/Procurement',
            priority: 'Normal',
            status: 'Approved',
            linkedTo: 'Account TCS',
            requester: 'Prateek Mehta',
            assignee: 'External Counsel',
            dueDate: '2025-11-12',
            lastUpdated: '2025-11-14',
            bank: 'SNG Partners',
            description: 'Update SLA appendix and SOC2 clause.',
            attachments: 2,
            slaHours: 96
        },
        {
            id: 'DR-2025-0084',
            title: 'POSH Policy Refresh - Pan India',
            type: 'Policy',
            practiceArea: 'Compliance',
            priority: 'Low',
            status: 'New',
            linkedTo: 'Matter CMP-112',
            requester: 'Operations Team',
            assignee: 'Meera Patel',
            dueDate: '2025-12-05',
            lastUpdated: '2025-11-10',
            bank: 'SNG Partners',
            description: 'Update for 2026 regulatory changes.',
            attachments: 1,
            slaHours: 120
        }
    ],
    templates: [
        {
            id: 'TMP-001',
            name: 'Bank NDA - Generic',
            type: 'NDA',
            practiceArea: 'Banking',
            version: 'v2.1',
            status: 'Active',
            jurisdiction: 'India',
            clientSpecific: 'No',
            updatedBy: 'Harish Kumar',
            updatedOn: '2025-11-10',
            riskLabel: 'Low',
            tags: ['NDA', 'Bank', 'Standard'],
            variables: ['{{Bank_Name}}', '{{Counterparty}}', '{{Effective_Date}}'],
            notes: 'Use for all bank vendor onboarding.'
        },
        {
            id: 'TMP-014',
            name: 'Loan Agreement - HL LAP',
            type: 'Loan Agreement',
            practiceArea: 'Banking',
            version: 'v4.3',
            status: 'Active',
            jurisdiction: 'India',
            clientSpecific: 'Yes',
            clientName: 'Axis Bank',
            updatedBy: 'Rahul Verma',
            updatedOn: '2025-11-14',
            riskLabel: 'Medium',
            tags: ['Loan', 'Retail Assets'],
            variables: ['{{Borrower_Name}}', '{{Loan_Amount}}', '{{ROI}}', '{{Property_Address}}'],
            notes: 'Includes revised pre-payment clause.'
        },
        {
            id: 'TMP-022',
            name: 'Retainer Agreement - Corporate',
            type: 'Retainer',
            practiceArea: 'Corporate',
            version: 'v1.8',
            status: 'Draft',
            jurisdiction: 'India',
            clientSpecific: 'No',
            updatedBy: 'External Counsel',
            updatedOn: '2025-11-08',
            riskLabel: 'Medium',
            tags: ['Retainer', 'Corporate'],
            variables: ['{{Client_Name}}', '{{Engagement_Term}}', '{{Retainer_Fee}}'],
            notes: 'Pending approval from Partner.'
        }
    ],
    clauses: [
        {
            id: 'CL-010',
            title: 'Indemnity - Bank Preferred',
            category: 'Indemnity',
            variant: 'Preferred',
            jurisdiction: 'India',
            practiceArea: 'Banking',
            riskLevel: 'Low',
            updatedOn: '2025-11-09',
            summary: 'Comprehensive indemnity for borrower defaults covering costs and damages.',
            clauseText: 'Borrower shall indemnify and keep indemnified the Bank from and against all losses...'
        },
        {
            id: 'CL-024',
            title: 'Limitation of Liability - Neutral',
            category: 'Limitation of Liability',
            variant: 'Neutral',
            jurisdiction: 'India',
            practiceArea: 'Technology',
            riskLevel: 'Medium',
            updatedOn: '2025-11-12',
            summary: 'Caps liability to 12 months fees excluding indemnity obligations.',
            clauseText: 'Except with respect to indemnity obligations, gross negligence... liability shall not exceed...'
        },
        {
            id: 'CL-031',
            title: 'Termination - Counterparty Friendly',
            category: 'Termination',
            variant: 'Fallback',
            jurisdiction: 'Delhi',
            practiceArea: 'Corporate',
            riskLevel: 'High',
            updatedOn: '2025-11-04',
            summary: 'Allows 15 day cure period and termination for convenience with 30 day notice.',
            clauseText: 'Either Party may terminate this Agreement by providing 30 days prior written notice...'
        }
    ],
    obligations: [
        {
            id: 'OB-2001',
            document: 'Facility Agreement - Sunrise Buildcon',
            party: 'Axis Bank',
            startDate: '2024-12-01',
            expiryDate: '2026-11-30',
            noticePeriod: '90 days',
            renewalType: 'Auto-renew',
            nextTrigger: '2026-08-31',
            obligation: 'Quarterly compliance certificates',
            owner: 'Rahul Verma',
            status: 'Upcoming'
        },
        {
            id: 'OB-1989',
            document: 'MSA - IT Managed Services',
            party: 'Verma Construction',
            startDate: '2023-05-15',
            expiryDate: '2025-05-14',
            noticePeriod: '60 days',
            renewalType: 'Manual',
            nextTrigger: '2025-03-15',
            obligation: 'Annual price review & SOC2 report',
            owner: 'Anjali Singh',
            status: 'Critical'
        },
        {
            id: 'OB-1975',
            document: 'POSH Policy',
            party: 'SNG Partners',
            startDate: '2025-01-01',
            expiryDate: '2025-12-31',
            noticePeriod: '30 days',
            renewalType: 'Manual',
            nextTrigger: '2025-11-30',
            obligation: 'Refresher training for all staff',
            owner: 'Operations Team',
            status: 'Upcoming'
        }
    ],
    workspaceTips: [
        'Pre-tag important clauses with Preferred/Fallback labels before drafting.',
        'Use merge fields to auto-populate party details and property schedules.',
        'Always attach sanction letters and approvals to the draft request for audit trail.'
    ]
};

const draftingStore = {
    getStoredRequests() {
        const raw = localStorage.getItem(DRAFTING_STORAGE_KEYS.requests);
        if (!raw) {
            return [];
        }
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    },
    saveRequest(request) {
        const requests = draftingStore.getStoredRequests();
        requests.unshift(request);
        localStorage.setItem(DRAFTING_STORAGE_KEYS.requests, JSON.stringify(requests));
    },
    getCombinedRequests() {
        return [...draftingStore.getStoredRequests(), ...draftingData.requests];
    }
};

function formatDraftingStatus(status) {
    const map = {
        'New': 'badge badge-neutral',
        'In Draft': 'badge badge-primary',
        'Under Review': 'badge badge-warning',
        'Approved': 'badge badge-success',
        'Shared': 'badge badge-info',
        'Executed': 'badge badge-success'
    };
    return map[status] || 'badge';
}
