// Legal CRM - Shared Data Layer with localStorage
// All CRUD operations and data management

class LegalCRMData {
    constructor() {
        this.initializeData();
    }

    // Initialize data structure
    initializeData() {
        if (!localStorage.getItem('legalCRM_initialized')) {
            this.resetToDefaultData();
            localStorage.setItem('legalCRM_initialized', 'true');
        }
    }

    // Reset to default Indian dummy data
    resetToDefaultData() {
        const defaultData = {
            leads: [
                {
                    id: 'LD-2025-0001',
                    name: 'Rajesh Kumar',
                    company: 'Kumar Enterprises',
                    email: 'rajesh@kumarenterprises.com',
                    phone: '+91-98765-43210',
                    source: 'Referral',
                    referralBy: 'Amit Sharma',
                    practiceArea: 'Real Estate Advisory',
                    status: 'New',
                    score: 75,
                    agingDays: 18,
                    lastActivity: '2025-10-22',
                    createdDate: '2025-10-20',
                    escalationStatus: 'Level1',
                    notes: 'Interested in property transaction advisory'
                },
                {
                    id: 'LD-2025-0002',
                    name: 'Priya Sharma',
                    company: 'Sharma Builders',
                    email: 'priya@sharmabuilders.in',
                    phone: '+91-98123-45678',
                    source: 'Website',
                    referralBy: '',
                    practiceArea: 'Contract Drafting',
                    status: 'In Progress',
                    score: 65,
                    agingDays: 12,
                    lastActivity: '2025-10-29',
                    createdDate: '2025-10-25',
                    escalationStatus: 'None',
                    notes: 'Requires contract review for upcoming projects'
                },
                {
                    id: 'LD-2025-0003',
                    name: 'Vikram Agarwal',
                    company: 'Agarwal & Sons',
                    email: 'vikram@agarwalsons.com',
                    phone: '+91-99876-54321',
                    source: 'Cold Call',
                    referralBy: '',
                    practiceArea: 'Litigation Support',
                    status: 'Qualified',
                    score: 80,
                    agingDays: 6,
                    lastActivity: '2025-11-03',
                    createdDate: '2025-11-01',
                    escalationStatus: 'None',
                    notes: 'High potential client, ready to sign retainer'
                },
                {
                    id: 'LD-2025-0004',
                    name: 'Meera Reddy',
                    company: 'Reddy Consultants',
                    email: 'meera@reddyconsultants.in',
                    phone: '+91-97654-32109',
                    source: 'LinkedIn',
                    referralBy: '',
                    practiceArea: 'Corporate Law',
                    status: 'New',
                    score: 55,
                    agingDays: 3,
                    lastActivity: '2025-11-03',
                    createdDate: '2025-11-03',
                    escalationStatus: 'None',
                    notes: 'Initial consultation scheduled'
                },
                {
                    id: 'LD-2025-0005',
                    name: 'Sanjay Gupta',
                    company: 'Gupta Industries Ltd',
                    email: 'sanjay@guptaindustries.com',
                    phone: '+91-98888-11111',
                    source: 'Referral',
                    referralBy: 'Arjun Malhotra',
                    practiceArea: 'Mergers & Acquisitions',
                    status: 'New',
                    score: 85,
                    agingDays: 0,
                    lastActivity: '2025-11-16',
                    createdDate: '2025-11-16',
                    escalationStatus: 'None',
                    notes: 'High-value M&A opportunity, referred by DLF contact'
                },
                {
                    id: 'LD-2025-0006',
                    name: 'Anita Desai',
                    company: 'Desai Pharmaceuticals',
                    email: 'anita@desaipharma.in',
                    phone: '+91-99999-22222',
                    source: 'Website',
                    referralBy: '',
                    practiceArea: 'Intellectual Property',
                    status: 'New',
                    score: 70,
                    agingDays: 0,
                    lastActivity: '2025-11-16',
                    createdDate: '2025-11-16',
                    escalationStatus: 'None',
                    notes: 'Patent filing and IP protection needed'
                },
                {
                    id: 'LD-2025-0007',
                    name: 'Rohit Malhotra',
                    company: 'Malhotra Exports Pvt Ltd',
                    email: 'rohit@malhotraexports.com',
                    phone: '+91-97777-33333',
                    source: 'LinkedIn',
                    referralBy: '',
                    practiceArea: 'International Trade Law',
                    status: 'New',
                    score: 65,
                    agingDays: 0,
                    lastActivity: '2025-11-16',
                    createdDate: '2025-11-16',
                    escalationStatus: 'None',
                    notes: 'Export compliance and trade regulation advisory required'
                }
            ],
            clients: [
                {
                    id: 'CLT-2024-0067',
                    companyName: 'DLF Limited',
                    website: 'https://www.dlf.in',
                    pan: 'AACDL1234F',
                    gstin: '07AACDL1234F1Z5',
                    industry: 'Real Estate',
                    registeredAddress: 'DLF Gateway Tower, New Delhi - 110001',
                    communicationAddress: 'DLF Gateway Tower, New Delhi - 110001',
                    category: 'VIP',
                    totalRevenue: 8500000,
                    lastInteraction: '2025-11-05',
                    createdDate: '2024-03-15',
                    spocs: [
                        {
                            id: 'SPOC-001',
                            name: 'Arjun Malhotra',
                            email: 'arjun.malhotra@dlf.in',
                            phone: '+91-98100-12345',
                            department: 'Legal',
                            communicationPreference: 'Email'
                        }
                    ]
                },
                {
                    id: 'CLT-2024-0089',
                    companyName: 'Tech Mahindra',
                    website: 'https://www.techmahindra.com',
                    pan: 'AACTM5678G',
                    gstin: '27AACTM5678G1ZA',
                    industry: 'IT Services',
                    registeredAddress: 'Shivaji Nagar, Pune - 411005',
                    communicationAddress: 'Shivaji Nagar, Pune - 411005',
                    category: 'Active',
                    totalRevenue: 4200000,
                    lastInteraction: '2025-11-06',
                    createdDate: '2024-06-20',
                    spocs: [
                        {
                            id: 'SPOC-002',
                            name: 'Kavita Deshmukh',
                            email: 'kavita.d@techmahindra.com',
                            phone: '+91-98765-11111',
                            department: 'Procurement',
                            communicationPreference: 'Phone'
                        }
                    ]
                },
                {
                    id: 'CLT-2025-0012',
                    companyName: 'Verma Construction',
                    website: 'https://www.vermaconstruction.in',
                    pan: 'AACVC9012H',
                    gstin: '09AACVC9012H1ZX',
                    industry: 'Construction',
                    registeredAddress: 'Sector 62, Noida - 201301',
                    communicationAddress: 'Sector 62, Noida - 201301',
                    category: 'Active',
                    totalRevenue: 1800000,
                    lastInteraction: '2025-11-06',
                    createdDate: '2025-01-10',
                    spocs: [
                        {
                            id: 'SPOC-003',
                            name: 'Suresh Verma',
                            email: 'suresh@vermaconstruction.in',
                            phone: '+91-99111-22333',
                            department: 'Operations',
                            communicationPreference: 'WhatsApp'
                        }
                    ]
                },
                {
                    id: 'CLT-2024-0045',
                    companyName: 'Infosys Limited',
                    website: 'https://www.infosys.com',
                    pan: 'AACIN3456J',
                    gstin: '29AACIN3456J1ZB',
                    industry: 'IT Services',
                    registeredAddress: 'Electronics City, Bangalore - 560100',
                    communicationAddress: 'Electronics City, Bangalore - 560100',
                    category: 'VIP',
                    totalRevenue: 12000000,
                    lastInteraction: '2025-11-04',
                    createdDate: '2024-02-01',
                    spocs: [
                        {
                            id: 'SPOC-004',
                            name: 'Lakshmi Narayan',
                            email: 'lakshmi.n@infosys.com',
                            phone: '+91-98450-67890',
                            department: 'Legal & Compliance',
                            communicationPreference: 'Email'
                        }
                    ]
                },
                {
                    id: 'CLT-2024-0078',
                    companyName: 'TCS - Tata Consultancy Services',
                    website: 'https://www.tcs.com',
                    pan: 'AACTC7890K',
                    gstin: '27AACTC7890K1ZC',
                    industry: 'IT Services',
                    registeredAddress: 'TCS House, Mumbai - 400001',
                    communicationAddress: 'TCS House, Mumbai - 400001',
                    category: 'Active',
                    totalRevenue: 5600000,
                    lastInteraction: '2025-11-06',
                    createdDate: '2024-05-12',
                    spocs: [
                        {
                            id: 'SPOC-005',
                            name: 'Ramesh Iyer',
                            email: 'ramesh.iyer@tcs.com',
                            phone: '+91-98200-55555',
                            department: 'Contracts',
                            communicationPreference: 'Email'
                        }
                    ]
                }
            ],
            projects: [
                {
                    id: 'PROJ-2025-0189',
                    serialNo: 189,
                    name: 'Infosys Merger Advisory',
                    description: 'Legal advisory for merger and acquisition transaction',
                    clientId: 'CLT-2024-0045',
                    clientName: 'Infosys Limited',
                    practiceArea: 'Corporate Law',
                    projectType: 'Advisory',
                    status: 'In Progress',
                    leadAdvocate: 'Prateek Mehta',
                    collaborators: ['Harish Kumar', 'Meera Patel'],
                    startDate: '2025-09-01',
                    expectedEndDate: '2025-12-15',
                    actualEndDate: '',
                    createdBy: 'Prateek Mehta',
                    createdDate: '2025-08-28',
                    milestones: [
                        { name: 'Initial Due Diligence', status: 'Completed', date: '2025-09-15' },
                        { name: 'Draft Legal Opinion', status: 'In Progress', date: '2025-11-05' },
                        { name: 'Final Approval', status: 'Pending', date: '2025-12-10' }
                    ]
                },
                {
                    id: 'PROJ-2025-0201',
                    serialNo: 201,
                    name: 'TCS Contract Review',
                    description: 'Review and approve contract amendments for enterprise agreement',
                    clientId: 'CLT-2024-0078',
                    clientName: 'TCS - Tata Consultancy Services',
                    practiceArea: 'Contract Law',
                    projectType: 'Advisory',
                    status: 'In Progress',
                    leadAdvocate: 'Prateek Mehta',
                    collaborators: ['Anjali Singh'],
                    startDate: '2025-10-20',
                    expectedEndDate: '2025-11-15',
                    actualEndDate: '',
                    createdBy: 'Prateek Mehta',
                    createdDate: '2025-10-18',
                    milestones: [
                        { name: 'Review Draft', status: 'Completed', date: '2025-10-25' },
                        { name: 'Client Feedback', status: 'In Progress', date: '2025-11-06' }
                    ]
                },
                {
                    id: 'PROJ-2025-0156',
                    serialNo: 156,
                    name: 'Verma Property Dispute',
                    description: 'Property dispute resolution and litigation support',
                    clientId: 'CLT-2025-0012',
                    clientName: 'Verma Construction',
                    practiceArea: 'Real Estate',
                    projectType: 'Litigation',
                    status: 'In Progress',
                    leadAdvocate: 'Harish Kumar',
                    collaborators: ['Prateek Mehta'],
                    startDate: '2025-08-10',
                    expectedEndDate: '2025-12-31',
                    actualEndDate: '',
                    createdBy: 'Harish Kumar',
                    createdDate: '2025-08-05',
                    milestones: [
                        { name: 'File Court Petition', status: 'Completed', date: '2025-08-20' },
                        { name: 'First Hearing', status: 'Completed', date: '2025-09-15' },
                        { name: 'Evidence Submission', status: 'In Progress', date: '2025-11-10' }
                    ]
                },
                {
                    id: 'PROJ-2025-0234',
                    serialNo: 234,
                    name: 'DLF Commercial Agreement',
                    description: 'Draft and negotiate commercial lease agreements',
                    clientId: 'CLT-2024-0067',
                    clientName: 'DLF Limited',
                    practiceArea: 'Real Estate',
                    projectType: 'Transaction',
                    status: 'Review',
                    leadAdvocate: 'Meera Patel',
                    collaborators: ['Prateek Mehta', 'Harish Kumar'],
                    startDate: '2025-10-01',
                    expectedEndDate: '2025-11-30',
                    actualEndDate: '',
                    createdBy: 'Meera Patel',
                    createdDate: '2025-09-28',
                    milestones: [
                        { name: 'Draft Agreement', status: 'Completed', date: '2025-10-15' },
                        { name: 'Client Review', status: 'Completed', date: '2025-10-28' },
                        { name: 'Final Execution', status: 'Pending', date: '2025-11-25' }
                    ]
                }
            ],
            tasks: [
                {
                    id: 'TASK-2025-0341',
                    title: 'Complete legal opinion draft for Infosys merger case',
                    description: 'Finalize the comprehensive legal opinion document covering all merger aspects',
                    projectId: 'PROJ-2025-0189',
                    projectName: 'Infosys Merger Advisory',
                    assignedTo: 'Prateek Mehta',
                    createdBy: 'Prateek Mehta',
                    priority: 'High',
                    status: 'In Progress',
                    dueDate: '2025-11-04',
                    createdDate: '2025-10-28',
                    estimatedEffort: 16,
                    actualTimeSpent: 12,
                    dependencyTaskId: '',
                    tags: ['Legal Opinion', 'Merger', 'Priority']
                },
                {
                    id: 'TASK-2025-0342',
                    title: 'Review and approve contract amendments - TCS',
                    description: 'Review the latest contract amendments and provide approval',
                    projectId: 'PROJ-2025-0201',
                    projectName: 'TCS Contract Review',
                    assignedTo: 'Prateek Mehta',
                    createdBy: 'Prateek Mehta',
                    priority: 'High',
                    status: 'New',
                    dueDate: '2025-11-06',
                    createdDate: '2025-11-01',
                    estimatedEffort: 8,
                    actualTimeSpent: 0,
                    dependencyTaskId: '',
                    tags: ['Contract', 'Review', 'Urgent']
                },
                {
                    id: 'TASK-2025-0343',
                    title: 'Follow up with Verma Construction on property documents',
                    description: 'Call client to collect pending property documents for court submission',
                    projectId: 'PROJ-2025-0156',
                    projectName: 'Verma Property Dispute',
                    assignedTo: 'Harish Kumar',
                    createdBy: 'Harish Kumar',
                    priority: 'Medium',
                    status: 'New',
                    dueDate: '2025-11-08',
                    createdDate: '2025-11-02',
                    estimatedEffort: 2,
                    actualTimeSpent: 0,
                    dependencyTaskId: '',
                    tags: ['Follow-up', 'Documents']
                },
                {
                    id: 'TASK-2025-0344',
                    title: 'Prepare client meeting agenda for DLF quarterly review',
                    description: 'Create comprehensive agenda for quarterly review meeting',
                    projectId: 'PROJ-2025-0234',
                    projectName: 'DLF Commercial Agreement',
                    assignedTo: 'Meera Patel',
                    createdBy: 'Meera Patel',
                    priority: 'Medium',
                    status: 'New',
                    dueDate: '2025-11-10',
                    createdDate: '2025-11-03',
                    estimatedEffort: 4,
                    actualTimeSpent: 0,
                    dependencyTaskId: '',
                    tags: ['Meeting', 'Client']
                },
                {
                    id: 'TASK-2025-0345',
                    title: 'Update matter status in CRM for closed cases',
                    description: 'Update all closed cases from October in the CRM system',
                    projectId: '',
                    projectName: 'Multiple Projects',
                    assignedTo: 'Anjali Singh',
                    createdBy: 'Prateek Mehta',
                    priority: 'Low',
                    status: 'New',
                    dueDate: '2025-11-12',
                    createdDate: '2025-11-04',
                    estimatedEffort: 3,
                    actualTimeSpent: 0,
                    dependencyTaskId: '',
                    tags: ['Admin', 'CRM Update']
                }
            ],
            documents: [
                {
                    id: 'DOC-2025-0521',
                    fileName: 'Property_Deed_Final.pdf',
                    fileType: 'PDF',
                    fileSize: '2.4 MB',
                    projectId: 'PROJ-2025-0234',
                    projectName: 'DLF Commercial Agreement',
                    tags: ['Property', 'Deed', 'Final'],
                    uploadedBy: 'Meera Patel',
                    uploadedDate: '2025-11-06',
                    version: 3,
                    accessLevel: 'Team',
                    description: 'Final property deed for DLF commercial lease'
                },
                {
                    id: 'DOC-2025-0489',
                    fileName: 'Merger_Agreement_Draft_v2.docx',
                    fileType: 'DOCX',
                    fileSize: '1.8 MB',
                    projectId: 'PROJ-2025-0189',
                    projectName: 'Infosys Merger Advisory',
                    tags: ['Merger', 'Agreement', 'Draft'],
                    uploadedBy: 'Prateek Mehta',
                    uploadedDate: '2025-10-28',
                    version: 2,
                    accessLevel: 'Restricted',
                    description: 'Second draft of merger agreement'
                },
                {
                    id: 'DOC-2025-0512',
                    fileName: 'Court_Filing_Verma_Case.pdf',
                    fileType: 'PDF',
                    fileSize: '3.1 MB',
                    projectId: 'PROJ-2025-0156',
                    projectName: 'Verma Property Dispute',
                    tags: ['Court', 'Filing', 'Litigation'],
                    uploadedBy: 'Harish Kumar',
                    uploadedDate: '2025-11-01',
                    version: 1,
                    accessLevel: 'Team',
                    description: 'Court filing documents for property dispute case'
                }
            ],
            invoices: [
                {
                    id: 'INV-2025-0456',
                    invoiceDate: '2025-10-15',
                    clientId: 'CLT-2024-0067',
                    clientName: 'DLF Limited',
                    projectId: 'PROJ-2025-0234',
                    projectName: 'DLF Commercial Agreement',
                    amount: 250000,
                    gst: 45000,
                    totalAmount: 295000,
                    status: 'Paid',
                    paymentDate: '2025-11-05',
                    lineItems: [
                        { description: 'Legal Advisory - October 2025', hours: 40, rate: 5000, amount: 200000 },
                        { description: 'Document Drafting', hours: 10, rate: 5000, amount: 50000 }
                    ],
                    dueDate: '2025-11-14'
                },
                {
                    id: 'INV-2025-0478',
                    invoiceDate: '2025-10-25',
                    clientId: 'CLT-2024-0045',
                    clientName: 'Infosys Limited',
                    projectId: 'PROJ-2025-0189',
                    projectName: 'Infosys Merger Advisory',
                    amount: 500000,
                    gst: 90000,
                    totalAmount: 590000,
                    status: 'Partially Paid',
                    paymentDate: '',
                    lineItems: [
                        { description: 'Merger Advisory Services', hours: 80, rate: 6000, amount: 480000 },
                        { description: 'Due Diligence Review', hours: 4, rate: 5000, amount: 20000 }
                    ],
                    dueDate: '2025-11-24'
                },
                {
                    id: 'INV-2025-0489',
                    invoiceDate: '2025-11-01',
                    clientId: 'CLT-2024-0078',
                    clientName: 'TCS - Tata Consultancy Services',
                    projectId: 'PROJ-2025-0201',
                    projectName: 'TCS Contract Review',
                    amount: 150000,
                    gst: 27000,
                    totalAmount: 177000,
                    status: 'Overdue',
                    paymentDate: '',
                    lineItems: [
                        { description: 'Contract Review Services', hours: 30, rate: 5000, amount: 150000 }
                    ],
                    dueDate: '2025-11-01'
                }
            ],
            meetings: [
                {
                    id: 'MTG-2025-0234',
                    title: 'Client Consultation - Verma Construction',
                    meetingType: 'Client Meeting',
                    clientId: 'CLT-2025-0012',
                    projectId: 'PROJ-2025-0156',
                    date: '2025-11-16',
                    startTime: '11:00',
                    endTime: '12:00',
                    location: 'Conference Room A',
                    attendees: ['Prateek Mehta', 'Harish Kumar', 'Suresh Verma'],
                    agenda: 'Discuss property dispute strategy and next steps',
                    status: 'Upcoming',
                    createdBy: 'Harish Kumar',
                    notes: '',
                    followUpTasks: []
                },
                {
                    id: 'MTG-2025-0235',
                    title: 'Case Review - DLF Limited',
                    meetingType: 'Internal Review',
                    clientId: 'CLT-2024-0067',
                    projectId: 'PROJ-2025-0234',
                    date: '2025-11-16',
                    startTime: '14:30',
                    endTime: '15:30',
                    location: 'Internal',
                    attendees: ['Prateek Mehta', 'Harish Kumar', 'Meera Patel'],
                    agenda: 'Review progress on DLF commercial agreement',
                    status: 'Upcoming',
                    createdBy: 'Prateek Mehta',
                    notes: '',
                    followUpTasks: []
                },
                {
                    id: 'MTG-2025-0236',
                    title: 'Contract Negotiation - Tech Mahindra',
                    meetingType: 'Client Meeting',
                    clientId: 'CLT-2024-0089',
                    projectId: '',
                    date: '2025-11-16',
                    startTime: '16:00',
                    endTime: '17:00',
                    location: 'Virtual - Zoom',
                    attendees: ['Prateek Mehta', 'Kavita Deshmukh'],
                    agenda: 'Negotiate terms for new retainer agreement',
                    status: 'Upcoming',
                    createdBy: 'Prateek Mehta',
                    notes: '',
                    followUpTasks: []
                },
                {
                    id: 'MTG-2025-0237',
                    title: 'Quarterly Business Review - Infosys',
                    meetingType: 'Client Meeting',
                    clientId: 'CLT-2024-0045',
                    projectId: 'PROJ-2025-0189',
                    date: '2025-11-16',
                    startTime: '10:00',
                    endTime: '11:00',
                    location: 'Virtual - Google Meet',
                    attendees: ['Prateek Mehta', 'Meera Patel', 'Lakshmi Narayan'],
                    agenda: 'Review merger progress and discuss upcoming milestones',
                    status: 'Upcoming',
                    createdBy: 'Prateek Mehta',
                    notes: '',
                    followUpTasks: []
                },
                {
                    id: 'MTG-2025-0238',
                    title: 'Team Standup - Litigation Department',
                    meetingType: 'Internal Review',
                    clientId: '',
                    projectId: '',
                    date: '2025-11-16',
                    startTime: '09:00',
                    endTime: '09:30',
                    location: 'Internal - Conference Room B',
                    attendees: ['Prateek Mehta', 'Harish Kumar', 'Rahul Verma'],
                    agenda: 'Daily standup to discuss ongoing litigation cases',
                    status: 'Upcoming',
                    createdBy: 'Prateek Mehta',
                    notes: '',
                    followUpTasks: []
                }
            ],
            users: [
                {
                    id: 'USR-001',
                    name: 'Prateek Mehta',
                    email: 'prateek.mehta@sngpartners.in',
                    phone: '+91-98100-99999',
                    role: 'Senior Advocate',
                    department: 'Litigation',
                    designation: 'Senior Partner',
                    status: 'Active',
                    joinDate: '2020-01-15',
                    permissions: ['All Access']
                },
                {
                    id: 'USR-002',
                    name: 'Harish Kumar',
                    email: 'harish.kumar@sngpartners.in',
                    phone: '+91-98200-88888',
                    role: 'Advocate',
                    department: 'Real Estate',
                    designation: 'Partner',
                    status: 'Active',
                    joinDate: '2021-03-20',
                    permissions: ['Lead Management', 'Client Management', 'Matter Management', 'Task Management']
                },
                {
                    id: 'USR-003',
                    name: 'Meera Patel',
                    email: 'meera.patel@sngpartners.in',
                    phone: '+91-98300-77777',
                    role: 'Advocate',
                    department: 'Corporate',
                    designation: 'Associate Partner',
                    status: 'Active',
                    joinDate: '2021-07-10',
                    permissions: ['Lead Management', 'Client Management', 'Matter Management', 'Task Management', 'Document Management']
                },
                {
                    id: 'USR-004',
                    name: 'Anjali Singh',
                    email: 'anjali.singh@sngpartners.in',
                    phone: '+91-98400-66666',
                    role: 'Associate',
                    department: 'Corporate',
                    designation: 'Senior Associate',
                    status: 'Active',
                    joinDate: '2022-02-01',
                    permissions: ['Task Management', 'Document Management', 'Basic Reporting']
                },
                {
                    id: 'USR-005',
                    name: 'Rahul Verma',
                    email: 'rahul.verma@sngpartners.in',
                    phone: '+91-98500-55555',
                    role: 'Junior Associate',
                    department: 'Litigation',
                    designation: 'Associate',
                    status: 'Active',
                    joinDate: '2023-06-15',
                    permissions: ['Task Management', 'Document Management']
                }
            ],
            advocates: [
                {
                    id: 'ADV-2025-0001',
                    name: 'Advocate Ramesh Krishnan',
                    email: 'ramesh.krishnan@advocate.in',
                    phone: '+91-98111-44444',
                    barCouncilNo: 'D/1234/2008',
                    enrollmentYear: '2008',
                    specialization: ['Criminal Law', 'Consumer Protection'],
                    courtsOfPractice: ['Supreme Court of India', 'Delhi High Court', 'District Courts - Delhi'],
                    location: 'New Delhi',
                    city: 'Delhi',
                    state: 'Delhi',
                    experienceYears: 17,
                    qualifications: ['B.A. LL.B (Hons)', 'LL.M - Criminal Law'],
                    languagesKnown: ['English', 'Hindi', 'Tamil'],
                    availabilityStatus: 'Available',
                    rating: 4.8,
                    casesHandled: 245,
                    successRate: 87,
                    hourlyRate: 8000,
                    retainerRate: 150000,
                    bankAccountDetails: {
                        accountName: 'Ramesh Krishnan',
                        accountNumber: '1234567890',
                        ifscCode: 'HDFC0001234',
                        bankName: 'HDFC Bank',
                        branch: 'Connaught Place'
                    },
                    panNumber: 'ABCPK1234E',
                    gstNumber: '07ABCPK1234E1Z5',
                    documents: ['Bar Council Certificate', 'PAN Card', 'Address Proof', 'Bank Details'],
                    assignedCases: ['PROJ-2025-0156'],
                    activeAssignments: 3,
                    totalEarnings: 850000,
                    empaneledDate: '2024-01-15',
                    status: 'Active',
                    notes: 'Excellent track record in consumer protection cases. Preferred advocate for property disputes.'
                },
                {
                    id: 'ADV-2025-0002',
                    name: 'Advocate Sunita Iyer',
                    email: 'sunita.iyer@lawfirm.in',
                    phone: '+91-98222-55555',
                    barCouncilNo: 'MH/5678/2012',
                    enrollmentYear: '2012',
                    specialization: ['Corporate Law', 'Intellectual Property', 'Contract Law'],
                    courtsOfPractice: ['Bombay High Court', 'City Civil Courts - Mumbai', 'NCLT Mumbai'],
                    location: 'Mumbai',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    experienceYears: 13,
                    qualifications: ['B.Com, LL.B', 'LL.M - Corporate Law', 'Diploma in IPR'],
                    languagesKnown: ['English', 'Hindi', 'Marathi'],
                    availabilityStatus: 'Available',
                    rating: 4.9,
                    casesHandled: 189,
                    successRate: 92,
                    hourlyRate: 10000,
                    retainerRate: 200000,
                    bankAccountDetails: {
                        accountName: 'Sunita Iyer',
                        accountNumber: '9876543210',
                        ifscCode: 'ICIC0001234',
                        bankName: 'ICICI Bank',
                        branch: 'Nariman Point'
                    },
                    panNumber: 'DEFSI5678F',
                    gstNumber: '27DEFSI5678F1ZA',
                    documents: ['Bar Council Certificate', 'PAN Card', 'GST Certificate', 'Bank Details'],
                    assignedCases: ['PROJ-2025-0189', 'PROJ-2025-0201'],
                    activeAssignments: 5,
                    totalEarnings: 1250000,
                    empaneledDate: '2024-02-20',
                    status: 'Active',
                    notes: 'Specialist in M&A and IP law. Very responsive and detail-oriented.'
                },
                {
                    id: 'ADV-2025-0003',
                    name: 'Advocate Arjun Rao',
                    email: 'arjun.rao@legalservices.in',
                    phone: '+91-98333-66666',
                    barCouncilNo: 'KA/9101/2015',
                    enrollmentYear: '2015',
                    specialization: ['Banking Law', 'Debt Recovery', 'NCLT Matters'],
                    courtsOfPractice: ['Karnataka High Court', 'NCLT Bengaluru', 'DRT Bengaluru'],
                    location: 'Bengaluru',
                    city: 'Bengaluru',
                    state: 'Karnataka',
                    experienceYears: 10,
                    qualifications: ['B.B.A, LL.B', 'LL.M - Banking & Finance Law'],
                    languagesKnown: ['English', 'Hindi', 'Kannada'],
                    availabilityStatus: 'Busy',
                    rating: 4.7,
                    casesHandled: 156,
                    successRate: 89,
                    hourlyRate: 7500,
                    retainerRate: 180000,
                    bankAccountDetails: {
                        accountName: 'Arjun Rao',
                        accountNumber: '5555666677',
                        ifscCode: 'SBIN0001234',
                        bankName: 'State Bank of India',
                        branch: 'MG Road'
                    },
                    panNumber: 'GHIAR9101G',
                    gstNumber: '29GHIAR9101G1ZB',
                    documents: ['Bar Council Certificate', 'PAN Card', 'GST Certificate'],
                    assignedCases: [],
                    activeAssignments: 7,
                    totalEarnings: 680000,
                    empaneledDate: '2024-06-10',
                    status: 'Active',
                    notes: 'Expert in banking and insolvency matters. Currently handling multiple DRT cases.'
                },
                {
                    id: 'ADV-2025-0004',
                    name: 'Advocate Kavita Sharma',
                    email: 'kavita.sharma@advocate.in',
                    phone: '+91-98444-77777',
                    barCouncilNo: 'UP/2345/2018',
                    enrollmentYear: '2018',
                    specialization: ['Family Law', 'Women Rights', 'Matrimonial Disputes'],
                    courtsOfPractice: ['Allahabad High Court', 'Family Courts - Noida', 'District Courts - Noida'],
                    location: 'Noida',
                    city: 'Noida',
                    state: 'Uttar Pradesh',
                    experienceYears: 7,
                    qualifications: ['B.A. LL.B', 'Diploma in Human Rights'],
                    languagesKnown: ['English', 'Hindi'],
                    availabilityStatus: 'Available',
                    rating: 4.6,
                    casesHandled: 98,
                    successRate: 85,
                    hourlyRate: 6000,
                    retainerRate: 120000,
                    bankAccountDetails: {
                        accountName: 'Kavita Sharma',
                        accountNumber: '1122334455',
                        ifscCode: 'AXIS0001234',
                        bankName: 'Axis Bank',
                        branch: 'Sector 18'
                    },
                    panNumber: 'JKLKS2345H',
                    gstNumber: '09JKLKS2345H1ZX',
                    documents: ['Bar Council Certificate', 'PAN Card', 'Bank Details'],
                    assignedCases: [],
                    activeAssignments: 2,
                    totalEarnings: 320000,
                    empaneledDate: '2024-08-25',
                    status: 'Active',
                    notes: 'Compassionate and effective in family law matters.'
                },
                {
                    id: 'ADV-2025-0005',
                    name: 'Advocate Vikram Malhotra',
                    email: 'vikram.malhotra@lawchambers.in',
                    phone: '+91-98555-88888',
                    barCouncilNo: 'RJ/6789/2010',
                    enrollmentYear: '2010',
                    specialization: ['Real Estate Law', 'Property Disputes', 'Land Acquisition'],
                    courtsOfPractice: ['Rajasthan High Court', 'Civil Courts - Jaipur'],
                    location: 'Jaipur',
                    city: 'Jaipur',
                    state: 'Rajasthan',
                    experienceYears: 15,
                    qualifications: ['B.Sc, LL.B', 'LL.M - Property Law'],
                    languagesKnown: ['English', 'Hindi', 'Rajasthani'],
                    availabilityStatus: 'On Leave',
                    rating: 4.5,
                    casesHandled: 203,
                    successRate: 84,
                    hourlyRate: 7000,
                    retainerRate: 160000,
                    bankAccountDetails: {
                        accountName: 'Vikram Malhotra',
                        accountNumber: '9988776655',
                        ifscCode: 'HDFC0005678',
                        bankName: 'HDFC Bank',
                        branch: 'MI Road'
                    },
                    panNumber: 'MNOVM6789I',
                    gstNumber: '08MNOVM6789I1ZY',
                    documents: ['Bar Council Certificate', 'PAN Card', 'GST Certificate', 'Bank Details'],
                    assignedCases: ['PROJ-2025-0234'],
                    activeAssignments: 4,
                    totalEarnings: 920000,
                    empaneledDate: '2023-11-05',
                    status: 'Active',
                    notes: 'On medical leave until end of month. Excellent in property law.'
                }
            ],
            activities: [
                {
                    id: 'ACT-2025-1234',
                    type: 'lead_conversion',
                    title: 'Lead Converted to Client',
                    description: 'Ramesh Industries accepted proposal and converted to active client',
                    timestamp: '2025-11-06T09:30:00',
                    user: 'Prateek Mehta',
                    relatedId: 'CLT-2025-0013'
                },
                {
                    id: 'ACT-2025-1235',
                    type: 'document_upload',
                    title: 'Document Uploaded',
                    description: 'Meera Patel uploaded "Property_Deed_Final.pdf" to PROJ-2025-0234',
                    timestamp: '2025-11-06T07:15:00',
                    user: 'Meera Patel',
                    relatedId: 'DOC-2025-0521'
                },
                {
                    id: 'ACT-2025-1236',
                    type: 'task_overdue',
                    title: 'Task Overdue',
                    description: '"Submit court filings" is now 2 days overdue for Sharma vs State case',
                    timestamp: '2025-11-06T06:00:00',
                    user: 'System',
                    relatedId: 'TASK-2025-0341'
                },
                {
                    id: 'ACT-2025-1237',
                    type: 'payment_received',
                    title: 'Payment Received',
                    description: '₹2,50,000 received from DLF Limited for Invoice #INV-2025-0456',
                    timestamp: '2025-11-05T14:30:00',
                    user: 'System',
                    relatedId: 'INV-2025-0456'
                }
            ],
            // Section B: Matter Management Data
            matters: [
                {
                    id: 'MAT-2025-0001',
                    matterName: 'HDFC Bank - Litigation & BPR Implementation',
                    linkedOpportunityId: '',
                    clientId: 'CLT-2024-0067',
                    clientName: 'DLF Limited',
                    practiceArea: 'Banking',
                    matterType: 'BPR',
                    region: 'North',
                    city: 'Mumbai',
                    slaStartDate: '2025-10-01',
                    targetEndDate: '2025-12-31',
                    priority: 'High',
                    internalMatterOwner: 'Vikram Sharma',
                    description: 'Complete BPR implementation and litigation support for HDFC Bank portfolio',
                    currentStage: 'Implementation',
                    status: 'In Execution',
                    riskFlags: ['Tight deadline'],
                    createdBy: 'Prateek Mehta',
                    createdDate: '2025-09-28',
                    lastUpdatedBy: 'Vikram Sharma',
                    lastUpdatedDate: '2025-11-15'
                },
                {
                    id: 'MAT-2025-0002',
                    matterName: 'SBI - Title Search Report Project',
                    linkedOpportunityId: '',
                    clientId: 'CLT-2024-0089',
                    clientName: 'Tech Mahindra',
                    practiceArea: 'Banking',
                    matterType: 'TSR',
                    region: 'South',
                    city: 'Bangalore',
                    slaStartDate: '2025-11-01',
                    targetEndDate: '2025-11-30',
                    priority: 'Normal',
                    internalMatterOwner: 'Meera Patel',
                    description: 'Title Search Report generation for SBI property portfolio',
                    currentStage: 'Data Collection',
                    status: 'In Execution',
                    riskFlags: [],
                    createdBy: 'Meera Patel',
                    createdDate: '2025-10-25',
                    lastUpdatedBy: 'Meera Patel',
                    lastUpdatedDate: '2025-11-14'
                },
                {
                    id: 'MAT-2025-0003',
                    matterName: 'POSH Investigation - TCS Complaint',
                    linkedOpportunityId: '',
                    clientId: 'CLT-2024-0078',
                    clientName: 'TCS - Tata Consultancy Services',
                    practiceArea: 'POSH',
                    matterType: 'POSH Investigation',
                    region: 'West',
                    city: 'Mumbai',
                    slaStartDate: '2025-11-10',
                    targetEndDate: '2025-12-10',
                    priority: 'High',
                    internalMatterOwner: 'Harish Kumar',
                    description: 'Internal POSH complaint investigation and report preparation',
                    currentStage: 'Review',
                    status: 'At Risk',
                    riskFlags: ['Missing documents', 'Sensitive matter'],
                    createdBy: 'Harish Kumar',
                    createdDate: '2025-11-08',
                    lastUpdatedBy: 'Harish Kumar',
                    lastUpdatedDate: '2025-11-16'
                }
            ],
            matterTasks: [
                {
                    id: 'MTASK-2025-0001',
                    matterId: 'MAT-2025-0001',
                    taskTitle: 'Draft BPR Report for HDFC Portfolio - Zone 1',
                    taskType: 'Drafting',
                    createdBy: 'Vikram Sharma',
                    owner: 'Advocate Rajesh Kumar',
                    assignee: 'Advocate Priya Desai',
                    assigneeRole: 'Junior',
                    dueDate: '2025-11-20',
                    status: 'In Progress',
                    percentComplete: 60,
                    priority: 'High',
                    instructions: 'Complete BPR report for 15 properties in Mumbai Zone 1. Follow standard BPR template.',
                    dependsOn: [],
                    blockedBy: [],
                    isCritical: true,
                    createdDate: '2025-11-05',
                    lastUpdatedDate: '2025-11-16'
                },
                {
                    id: 'MTASK-2025-0002',
                    matterId: 'MAT-2025-0001',
                    taskTitle: 'Review and QC - Zone 1 BPR Reports',
                    taskType: 'Review',
                    createdBy: 'Vikram Sharma',
                    owner: 'Advocate Rajesh Kumar',
                    assignee: 'Advocate Rajesh Kumar',
                    assigneeRole: 'Primary',
                    dueDate: '2025-11-25',
                    status: 'Open',
                    percentComplete: 0,
                    priority: 'High',
                    instructions: 'QC review of all BPR reports prepared by juniors',
                    dependsOn: ['MTASK-2025-0001'],
                    blockedBy: [],
                    isCritical: true,
                    createdDate: '2025-11-05',
                    lastUpdatedDate: '2025-11-05'
                },
                {
                    id: 'MTASK-2025-0003',
                    matterId: 'MAT-2025-0002',
                    taskTitle: 'Collect property documents from SBI branch',
                    taskType: 'Data Compilation',
                    createdBy: 'Meera Patel',
                    owner: 'Advocate Ananya Iyer',
                    assignee: 'Internal Operations',
                    assigneeRole: 'Internal',
                    dueDate: '2025-11-18',
                    status: 'In Progress',
                    percentComplete: 75,
                    priority: 'Normal',
                    instructions: 'Coordinate with SBI Bangalore branch to collect all property title documents',
                    dependsOn: [],
                    blockedBy: [],
                    isCritical: false,
                    createdDate: '2025-11-02',
                    lastUpdatedDate: '2025-11-15'
                },
                {
                    id: 'MTASK-2025-0004',
                    matterId: 'MAT-2025-0003',
                    taskTitle: 'Conduct witness interviews',
                    taskType: 'Analysis',
                    createdBy: 'Harish Kumar',
                    owner: 'Advocate Kavita Sharma',
                    assignee: 'Advocate Kavita Sharma',
                    assigneeRole: 'Primary',
                    dueDate: '2025-11-22',
                    status: 'On Hold',
                    percentComplete: 25,
                    priority: 'High',
                    instructions: 'Interview all relevant witnesses as per POSH guidelines',
                    dependsOn: [],
                    blockedBy: [],
                    isCritical: true,
                    createdDate: '2025-11-12',
                    lastUpdatedDate: '2025-11-16'
                }
            ],
            matterDocuments: [
                {
                    id: 'MDOC-2025-0001',
                    matterId: 'MAT-2025-0001',
                    folderPath: '/01. Client Inputs',
                    fileName: 'HDFC_Property_List_Zone1.xlsx',
                    fileType: 'Client Input',
                    versionNo: 'v1',
                    uploadedBy: 'Vikram Sharma',
                    uploadedOn: '2025-10-05T10:30:00',
                    notes: 'Initial property list from HDFC Bank',
                    isFinalDeliverable: false,
                    linkedQCItemId: ''
                },
                {
                    id: 'MDOC-2025-0002',
                    matterId: 'MAT-2025-0001',
                    folderPath: '/02. Drafts',
                    fileName: 'BPR_Zone1_Property_001_Draft.pdf',
                    fileType: 'BPR Draft',
                    versionNo: 'v2',
                    uploadedBy: 'Advocate Priya Desai',
                    uploadedOn: '2025-11-15T16:45:00',
                    notes: 'Second draft after incorporating feedback',
                    isFinalDeliverable: false,
                    linkedQCItemId: ''
                },
                {
                    id: 'MDOC-2025-0003',
                    matterId: 'MAT-2025-0002',
                    folderPath: '/01. Client Inputs',
                    fileName: 'SBI_Title_Documents_Batch1.zip',
                    fileType: 'Client Input',
                    versionNo: 'v1',
                    uploadedBy: 'Internal Operations',
                    uploadedOn: '2025-11-10T09:00:00',
                    notes: 'First batch of title documents from SBI',
                    isFinalDeliverable: false,
                    linkedQCItemId: ''
                },
                {
                    id: 'MDOC-2025-0004',
                    matterId: 'MAT-2025-0003',
                    folderPath: '/04. Internal Notes',
                    fileName: 'Investigation_Notes_Confidential.docx',
                    fileType: 'Internal Note',
                    versionNo: 'v1',
                    uploadedBy: 'Advocate Kavita Sharma',
                    uploadedOn: '2025-11-14T14:20:00',
                    notes: 'Confidential investigation notes - restricted access',
                    isFinalDeliverable: false,
                    linkedQCItemId: ''
                }
            ],
            advocateAssignments: [
                {
                    id: 'ASGN-2025-0001',
                    matterId: 'MAT-2025-0001',
                    primaryAdvocate: 'Advocate Rajesh Kumar',
                    supportingAdvocates: ['Advocate Priya Desai', 'Advocate Suresh Menon'],
                    panel: 'Mumbai Panel - Banking Litigation',
                    zone: 'North',
                    branchCluster: 'Mumbai Metro Cluster',
                    assignmentStartDate: '2025-10-01',
                    assignmentEndDate: '',
                    status: 'Active'
                },
                {
                    id: 'ASGN-2025-0002',
                    matterId: 'MAT-2025-0002',
                    primaryAdvocate: 'Advocate Ananya Iyer',
                    supportingAdvocates: ['Advocate Vikram Malhotra'],
                    panel: 'Bangalore Panel - Title Search',
                    zone: 'South',
                    branchCluster: 'Karnataka Regional Cluster',
                    assignmentStartDate: '2025-11-01',
                    assignmentEndDate: '',
                    status: 'Active'
                },
                {
                    id: 'ASGN-2025-0003',
                    matterId: 'MAT-2025-0003',
                    primaryAdvocate: 'Advocate Kavita Sharma',
                    supportingAdvocates: [],
                    panel: 'POSH Investigation Panel',
                    zone: 'West',
                    branchCluster: '',
                    assignmentStartDate: '2025-11-10',
                    assignmentEndDate: '',
                    status: 'Active'
                }
            ],
            qcItems: [
                {
                    id: 'QC-2025-0001',
                    matterId: 'MAT-2025-0001',
                    documentId: 'MDOC-2025-0002',
                    deliverableName: 'BPR_Zone1_Property_001_Final.pdf',
                    deliverableType: 'BPR Report',
                    submittedBy: 'Advocate Rajesh Kumar',
                    submittedOn: '2025-11-16T10:00:00',
                    reviewer: 'Vikram Sharma',
                    qcChecklist: 'Standard BPR QC Checklist',
                    reviewerComments: '',
                    qcStatus: 'Pending',
                    qcDecisionDate: ''
                },
                {
                    id: 'QC-2025-0002',
                    matterId: 'MAT-2025-0001',
                    documentId: 'MDOC-2025-0005',
                    deliverableName: 'BPR_Zone1_Property_002_Final.pdf',
                    deliverableType: 'BPR Report',
                    submittedBy: 'Advocate Rajesh Kumar',
                    submittedOn: '2025-11-14T15:30:00',
                    reviewer: 'Vikram Sharma',
                    qcChecklist: 'Standard BPR QC Checklist',
                    reviewerComments: 'Minor formatting issues. Please update section 3.2 with latest encumbrance details.',
                    qcStatus: 'Changes Required',
                    qcDecisionDate: '2025-11-15T11:00:00'
                }
            ]
        };

        // Save to localStorage
        Object.keys(defaultData).forEach(key => {
            localStorage.setItem(`legalCRM_${key}`, JSON.stringify(defaultData[key]));
        });
    }

    // Generic getter
    get(entity) {
        const data = localStorage.getItem(`legalCRM_${entity}`);
        return data ? JSON.parse(data) : [];
    }

    // Generic setter
    set(entity, data) {
        localStorage.setItem(`legalCRM_${entity}`, JSON.stringify(data));
    }

    // CREATE operations
    create(entity, item) {
        const items = this.get(entity);
        items.push(item);
        this.set(entity, items);

        // Add activity log
        this.logActivity({
            type: `${entity}_created`,
            title: `New ${entity.slice(0, -1)} Created`,
            description: `${item.name || item.title || item.companyName || item.id} was created`,
            timestamp: new Date().toISOString(),
            user: 'Current User',
            relatedId: item.id
        });

        return item;
    }

    // READ operations
    getById(entity, id) {
        const items = this.get(entity);
        return items.find(item => item.id === id);
    }

    // UPDATE operations
    update(entity, id, updatedItem) {
        const items = this.get(entity);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem };
            this.set(entity, items);

            // Add activity log
            this.logActivity({
                type: `${entity}_updated`,
                title: `${entity.slice(0, -1)} Updated`,
                description: `${updatedItem.name || updatedItem.title || updatedItem.companyName || id} was updated`,
                timestamp: new Date().toISOString(),
                user: 'Current User',
                relatedId: id
            });

            return items[index];
        }
        return null;
    }

    // DELETE operations
    delete(entity, id) {
        const items = this.get(entity);
        const filteredItems = items.filter(item => item.id !== id);
        this.set(entity, filteredItems);

        // Add activity log
        this.logActivity({
            type: `${entity}_deleted`,
            title: `${entity.slice(0, -1)} Deleted`,
            description: `Item ${id} was deleted`,
            timestamp: new Date().toISOString(),
            user: 'Current User',
            relatedId: id
        });

        return true;
    }

    // Activity logging
    logActivity(activity) {
        const activities = this.get('activities');
        activity.id = `ACT-${new Date().getTime()}`;
        activities.unshift(activity); // Add to beginning
        // Keep only last 100 activities
        if (activities.length > 100) {
            activities.pop();
        }
        this.set('activities', activities);
    }

    // Generate next ID
    generateId(entity, prefix) {
        const items = this.get(entity);
        const year = new Date().getFullYear();
        let maxNum = 0;

        items.forEach(item => {
            if (item.id && item.id.startsWith(prefix)) {
                const num = parseInt(item.id.split('-').pop());
                if (num > maxNum) maxNum = num;
            }
        });

        const nextNum = String(maxNum + 1).padStart(4, '0');
        return `${prefix}-${year}-${nextNum}`;
    }

    // Dashboard calculations
    getDashboardStats() {
        const leads = this.get('leads');
        const clients = this.get('clients');
        const projects = this.get('projects');
        const tasks = this.get('tasks');
        const meetings = this.get('meetings');
        const invoices = this.get('invoices');

        // Calculate stats
        const activeLeads = leads.filter(l => l.status !== 'Won' && l.status !== 'Lost').length;
        const totalClients = clients.length;
        const ongoingProjects = projects.filter(p => p.status === 'In Progress').length;

        // Tasks due today
        const today = new Date().toISOString().split('T')[0];
        const tasksDueToday = tasks.filter(t => t.dueDate === today).length;
        const overdueTasks = tasks.filter(t => t.dueDate < today && t.status !== 'Completed').length;

        // Meetings today
        const meetingsToday = meetings.filter(m => m.date === today).length;

        // Revenue this month
        const currentMonth = new Date().toISOString().substring(0, 7);
        const monthlyRevenue = invoices
            .filter(inv => inv.invoiceDate.startsWith(currentMonth))
            .reduce((sum, inv) => sum + inv.amount, 0);

        return {
            activeLeads,
            totalClients,
            ongoingProjects,
            tasksDueToday,
            overdueTasks,
            meetingsToday,
            monthlyRevenue
        };
    }

    // Convert lead to client
    convertLeadToClient(leadId) {
        const lead = this.getById('leads', leadId);
        if (!lead) return null;

        const clients = this.get('clients');
        const newClientId = this.generateId('clients', 'CLT');

        const newClient = {
            id: newClientId,
            companyName: lead.company,
            website: '',
            pan: '',
            gstin: '',
            industry: lead.practiceArea,
            registeredAddress: '',
            communicationAddress: '',
            category: 'Active',
            totalRevenue: 0,
            lastInteraction: new Date().toISOString().split('T')[0],
            createdDate: new Date().toISOString().split('T')[0],
            spocs: [{
                id: 'SPOC-' + Date.now(),
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                department: 'Primary Contact',
                communicationPreference: 'Email'
            }]
        };

        // Update lead status
        this.update('leads', leadId, { status: 'Won' });

        // Create client
        this.create('clients', newClient);

        // Log activity
        this.logActivity({
            type: 'lead_conversion',
            title: 'Lead Converted to Client',
            description: `${lead.company} converted from lead to client`,
            timestamp: new Date().toISOString(),
            user: 'Current User',
            relatedId: newClientId
        });

        return newClient;
    }

    // Section B: Matter Management Helper Methods

    // Get Matter Statistics for Delivery Dashboard
    getMatterStats() {
        const matters = this.get('matters');
        const matterTasks = this.get('matterTasks');
        const qcItems = this.get('qcItems');
        const today = new Date().toISOString().split('T')[0];

        // Active Matters
        const activeMatters = matters.filter(m =>
            m.status === 'In Execution' || m.status === 'At Risk'
        ).length;

        // Matters at Risk
        const atRiskMatters = matters.filter(m => m.status === 'At Risk').length;

        // SLA Compliance
        const mattersWithinSLA = matters.filter(m => {
            if (!m.targetEndDate || m.status === 'Completed') return true;
            return m.targetEndDate >= today;
        }).length;
        const slaCompliancePercent = matters.length > 0
            ? Math.round((mattersWithinSLA / matters.length) * 100)
            : 100;

        // Open Tasks
        const openTasks = matterTasks.filter(t =>
            t.status !== 'Completed' && t.status !== 'Cancelled'
        ).length;

        // Delayed Tasks
        const delayedTasks = matterTasks.filter(t =>
            t.status !== 'Completed' && t.dueDate < today
        ).length;

        // Pending QC Items
        const pendingQC = qcItems.filter(q => q.qcStatus === 'Pending').length;

        return {
            activeMatters,
            atRiskMatters,
            slaCompliancePercent,
            openTasks,
            delayedTasks,
            pendingQC,
            totalMatters: matters.length
        };
    }

    // Get Advocate Workload for Matter Tasks
    getAdvocateWorkload() {
        const matterTasks = this.get('matterTasks');
        const advocates = this.get('advocates');
        const advocateAssignments = this.get('advocateAssignments');
        const today = new Date().toISOString().split('T')[0];

        const workloadMap = {};

        // Initialize workload for all active advocates
        advocateAssignments.forEach(assignment => {
            if (assignment.status === 'Active') {
                if (!workloadMap[assignment.primaryAdvocate]) {
                    workloadMap[assignment.primaryAdvocate] = {
                        name: assignment.primaryAdvocate,
                        activeMatters: 0,
                        openTasks: 0,
                        delayedTasks: 0,
                        completedTasks: 0
                    };
                }
                workloadMap[assignment.primaryAdvocate].activeMatters++;

                assignment.supportingAdvocates.forEach(junior => {
                    if (!workloadMap[junior]) {
                        workloadMap[junior] = {
                            name: junior,
                            activeMatters: 0,
                            openTasks: 0,
                            delayedTasks: 0,
                            completedTasks: 0
                        };
                    }
                });
            }
        });

        // Calculate task workload
        matterTasks.forEach(task => {
            const assignee = task.assignee;
            if (!workloadMap[assignee]) {
                workloadMap[assignee] = {
                    name: assignee,
                    activeMatters: 0,
                    openTasks: 0,
                    delayedTasks: 0,
                    completedTasks: 0
                };
            }

            if (task.status === 'Completed') {
                workloadMap[assignee].completedTasks++;
            } else {
                workloadMap[assignee].openTasks++;
                if (task.dueDate < today) {
                    workloadMap[assignee].delayedTasks++;
                }
            }
        });

        return Object.values(workloadMap);
    }

    // Get Matter by Practice Area
    getMattersByPracticeArea() {
        const matters = this.get('matters');
        const practiceAreaMap = {};

        matters.forEach(matter => {
            const area = matter.practiceArea;
            if (!practiceAreaMap[area]) {
                practiceAreaMap[area] = {
                    practiceArea: area,
                    count: 0,
                    inExecution: 0,
                    atRisk: 0,
                    completed: 0
                };
            }
            practiceAreaMap[area].count++;
            if (matter.status === 'In Execution') practiceAreaMap[area].inExecution++;
            if (matter.status === 'At Risk') practiceAreaMap[area].atRisk++;
            if (matter.status === 'Completed') practiceAreaMap[area].completed++;
        });

        return Object.values(practiceAreaMap);
    }

    // Get Tasks for a specific Matter
    getMatterTasks(matterId) {
        const matterTasks = this.get('matterTasks');
        return matterTasks.filter(task => task.matterId === matterId);
    }

    // Get Documents for a specific Matter
    getMatterDocuments(matterId) {
        const matterDocuments = this.get('matterDocuments');
        return matterDocuments.filter(doc => doc.matterId === matterId);
    }

    // Get Advocate Assignment for a specific Matter
    getMatterAdvocates(matterId) {
        const advocateAssignments = this.get('advocateAssignments');
        return advocateAssignments.find(assignment => assignment.matterId === matterId);
    }

    // Get QC Items for a specific Matter
    getMatterQCItems(matterId) {
        const qcItems = this.get('qcItems');
        return qcItems.filter(item => item.matterId === matterId);
    }

    // Auto-create default folder structure for a Matter
    createDefaultFolders(matterId) {
        const folders = [
            { path: '/01. Client Inputs', description: 'Client provided documents and data' },
            { path: '/02. Drafts', description: 'Work in progress drafts' },
            { path: '/03. Final Deliverables', description: 'Approved final deliverables' },
            { path: '/04. Internal Notes', description: 'Internal team notes and discussions' }
        ];

        // Store folder structure in localStorage for this matter
        const matterFolders = this.get('matterFolders') || [];
        folders.forEach(folder => {
            matterFolders.push({
                id: `FOLDER-${matterId}-${Date.now()}`,
                matterId: matterId,
                path: folder.path,
                description: folder.description,
                createdDate: new Date().toISOString()
            });
        });
        this.set('matterFolders', matterFolders);

        return folders;
    }

    // Convert Project/Opportunity to Matter
    convertToMatter(entityType, entityId) {
        let sourceEntity;
        if (entityType === 'project') {
            sourceEntity = this.getById('projects', entityId);
        } else if (entityType === 'opportunity') {
            sourceEntity = this.getById('opportunities', entityId);
        }

        if (!sourceEntity) return null;

        const matterId = this.generateId('matters', 'MAT');
        const newMatter = {
            id: matterId,
            matterName: sourceEntity.name || sourceEntity.title,
            linkedOpportunityId: entityType === 'opportunity' ? entityId : '',
            clientId: sourceEntity.clientId || '',
            clientName: sourceEntity.clientName || '',
            practiceArea: sourceEntity.practiceArea || 'General',
            matterType: 'Implementation',
            region: sourceEntity.region || '',
            city: sourceEntity.city || '',
            slaStartDate: new Date().toISOString().split('T')[0],
            targetEndDate: sourceEntity.expectedEndDate || '',
            priority: sourceEntity.priority || 'Normal',
            internalMatterOwner: sourceEntity.leadAdvocate || sourceEntity.owner || '',
            description: sourceEntity.description || '',
            currentStage: 'Drafting',
            status: 'New',
            riskFlags: [],
            createdBy: 'Current User',
            createdDate: new Date().toISOString().split('T')[0],
            lastUpdatedBy: 'Current User',
            lastUpdatedDate: new Date().toISOString().split('T')[0]
        };

        this.create('matters', newMatter);
        this.createDefaultFolders(matterId);

        return newMatter;
    }

    // Task Dependencies and Completion Validation

    // Check if matter can be marked as completed
    canCompleteMatter(matterId) {
        const tasks = this.getMatterTasks(matterId);
        const incompleteTasks = tasks.filter(t =>
            t.status !== 'Completed' && t.status !== 'Cancelled'
        );

        if (incompleteTasks.length > 0) {
            return {
                canComplete: false,
                incompleteTasks: incompleteTasks,
                message: `Cannot complete matter. ${incompleteTasks.length} task(s) are still pending.`
            };
        }

        // Check if all critical tasks are completed
        const criticalTasks = tasks.filter(t => t.isCritical);
        const incompleteCritical = criticalTasks.filter(t => t.status !== 'Completed');

        if (incompleteCritical.length > 0) {
            return {
                canComplete: false,
                incompleteTasks: incompleteCritical,
                message: `Cannot complete matter. ${incompleteCritical.length} critical task(s) are still pending.`
            };
        }

        return {
            canComplete: true,
            incompleteTasks: [],
            message: 'All tasks completed. Matter can be closed.'
        };
    }

    // Get matter task completion progress
    getMatterTaskProgress(matterId) {
        const tasks = this.getMatterTasks(matterId);

        if (tasks.length === 0) {
            return {
                totalTasks: 0,
                completedTasks: 0,
                percentComplete: 100,
                criticalPending: 0,
                delayedTasks: 0
            };
        }

        const today = new Date().toISOString().split('T')[0];
        const completed = tasks.filter(t => t.status === 'Completed').length;
        const criticalTasks = tasks.filter(t => t.isCritical);
        const criticalPending = criticalTasks.filter(t => t.status !== 'Completed').length;
        const delayedTasks = tasks.filter(t =>
            t.status !== 'Completed' && t.dueDate < today
        ).length;

        return {
            totalTasks: tasks.length,
            completedTasks: completed,
            percentComplete: Math.round((completed / tasks.length) * 100),
            criticalPending: criticalPending,
            delayedTasks: delayedTasks
        };
    }

    // Check if task dependencies are met
    checkTaskDependencies(taskId) {
        const task = this.getById('matterTasks', taskId);
        if (!task || !task.dependsOn || task.dependsOn.length === 0) {
            return { canStart: true, blockedBy: [] };
        }

        const blockedBy = [];
        task.dependsOn.forEach(depTaskId => {
            const depTask = this.getById('matterTasks', depTaskId);
            if (depTask && depTask.status !== 'Completed') {
                blockedBy.push({
                    id: depTask.id,
                    title: depTask.taskTitle,
                    status: depTask.status
                });
            }
        });

        return {
            canStart: blockedBy.length === 0,
            blockedBy: blockedBy
        };
    }

    // Auto-update matter risk status based on tasks
    autoUpdateMatterRisk(matterId) {
        const matter = this.getById('matters', matterId);
        if (!matter) return;

        const progress = this.getMatterTaskProgress(matterId);
        const newRiskFlags = [...matter.riskFlags];

        // Add risk flag if critical tasks are delayed
        if (progress.delayedTasks > 0) {
            if (!newRiskFlags.includes('Delayed tasks')) {
                newRiskFlags.push('Delayed tasks');
            }
        } else {
            const index = newRiskFlags.indexOf('Delayed tasks');
            if (index > -1) newRiskFlags.splice(index, 1);
        }

        // Update matter status if tasks are significantly delayed
        let newStatus = matter.status;
        if (progress.delayedTasks > 0 && progress.criticalPending > 0) {
            if (matter.status !== 'At Risk' && matter.status !== 'Completed') {
                newStatus = 'At Risk';
            }
        }

        // Update if changes detected
        if (JSON.stringify(newRiskFlags) !== JSON.stringify(matter.riskFlags) || newStatus !== matter.status) {
            this.update('matters', matterId, {
                riskFlags: newRiskFlags,
                status: newStatus,
                lastUpdatedDate: new Date().toISOString().split('T')[0]
            });
        }
    }

    // Get tasks filtered by user role
    getTasksForUser(matterId, userName, userRole) {
        const tasks = this.getMatterTasks(matterId);

        if (userRole === 'Junior') {
            // Juniors see only tasks assigned to them
            return tasks.filter(t => t.assignee === userName);
        } else if (userRole === 'Primary') {
            // Primary advocates see tasks they own or are assigned to
            return tasks.filter(t => t.owner === userName || t.assignee === userName);
        } else {
            // Internal/Managers see all tasks
            return tasks;
        }
    }

    // Get blocked tasks (tasks waiting for dependencies)
    getBlockedTasks(matterId) {
        const tasks = this.getMatterTasks(matterId);
        return tasks.filter(task => {
            const depCheck = this.checkTaskDependencies(task.id);
            return !depCheck.canStart;
        });
    }
}

// Initialize global data instance
const legalCRM = new LegalCRMData();
