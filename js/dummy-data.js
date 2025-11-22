// Dummy Data Initialization Script
// Creates comprehensive dummy users and data for LegalCRM

const DummyDataInitializer = {

    // Comprehensive user database with skills and departments
    users: [
        {
            id: 'USR001',
            name: 'Prateek Mehta',
            email: 'prateek.mehta@sngpartners.com',
            role: 'Senior Advocate',
            department: 'Litigation',
            initials: 'PM',
            phone: '+91 98765 43210',
            designation: 'Managing Partner',
            specialization: ['Corporate Law', 'Litigation', 'Real Estate'],
            experience: 15,
            status: 'Active',
            joinDate: '2010-01-15',
            avatar: null,
            workload: 0, // Will be calculated
            permissions: ['all']
        },
        {
            id: 'USR002',
            name: 'Radhika Sen',
            email: 'radhika.sen@sngpartners.com',
            role: 'Advocate',
            department: 'Corporate',
            initials: 'RS',
            phone: '+91 98765 43211',
            designation: 'Senior Associate',
            specialization: ['Corporate Advisory', 'M&A', 'Compliance'],
            experience: 8,
            status: 'Active',
            joinDate: '2016-03-20',
            avatar: null,
            workload: 0,
            permissions: ['leads', 'clients', 'matters', 'documents']
        },
        {
            id: 'USR003',
            name: 'Amit Kumar',
            email: 'amit.kumar@sngpartners.com',
            role: 'Associate',
            department: 'Real Estate',
            initials: 'AK',
            phone: '+91 98765 43212',
            designation: 'Associate',
            specialization: ['Real Estate', 'Property Law', 'Documentation'],
            experience: 5,
            status: 'Active',
            joinDate: '2019-06-10',
            avatar: null,
            workload: 0,
            permissions: ['matters', 'tasks', 'documents']
        },
        {
            id: 'USR004',
            name: 'Sneha Sharma',
            email: 'sneha.sharma@sngpartners.com',
            role: 'Junior Associate',
            department: 'Litigation',
            initials: 'SS',
            phone: '+91 98765 43213',
            designation: 'Junior Associate',
            specialization: ['Litigation Support', 'Research', 'Drafting'],
            experience: 2,
            status: 'Active',
            joinDate: '2022-01-05',
            avatar: null,
            workload: 0,
            permissions: ['tasks', 'documents']
        },
        {
            id: 'USR005',
            name: 'Vikram Desai',
            email: 'vikram.desai@sngpartners.com',
            role: 'Advocate',
            department: 'Corporate',
            initials: 'VD',
            phone: '+91 98765 43214',
            designation: 'Associate',
            specialization: ['Contract Drafting', 'Corporate Governance', 'POSH'],
            experience: 6,
            status: 'Active',
            joinDate: '2018-08-15',
            avatar: null,
            workload: 0,
            permissions: ['leads', 'clients', 'matters', 'documents']
        },
        {
            id: 'USR006',
            name: 'Anjali Patel',
            email: 'anjali.patel@sngpartners.com',
            role: 'Senior Advocate',
            department: 'Real Estate',
            initials: 'AP',
            phone: '+91 98765 43215',
            designation: 'Partner',
            specialization: ['Real Estate Transactions', 'Title Due Diligence', 'RERA'],
            experience: 12,
            status: 'Active',
            joinDate: '2012-04-01',
            avatar: null,
            workload: 0,
            permissions: ['all']
        },
        {
            id: 'USR007',
            name: 'Rohit Malhotra',
            email: 'rohit.malhotra@sngpartners.com',
            role: 'Associate',
            department: 'Litigation',
            initials: 'RM',
            phone: '+91 98765 43216',
            designation: 'Associate',
            specialization: ['Civil Litigation', 'Commercial Disputes', 'Arbitration'],
            experience: 4,
            status: 'Active',
            joinDate: '2020-02-10',
            avatar: null,
            workload: 0,
            permissions: ['matters', 'tasks', 'documents']
        },
        {
            id: 'USR008',
            name: 'Kavita Nair',
            email: 'kavita.nair@sngpartners.com',
            role: 'Junior Associate',
            department: 'Corporate',
            initials: 'KN',
            phone: '+91 98765 43217',
            designation: 'Junior Associate',
            specialization: ['Legal Research', 'Documentation', 'Compliance'],
            experience: 1,
            status: 'Active',
            joinDate: '2023-07-01',
            avatar: null,
            workload: 0,
            permissions: ['tasks', 'documents']
        }
    ],

    // Dummy leads database
    leads: [
        {
            id: 'LEAD-2024-001',
            companyName: 'TechVision Solutions Pvt Ltd',
            contactPerson: 'Rajesh Gupta',
            email: 'rajesh@techvision.com',
            phone: '+91 98234 56789',
            source: 'Website',
            practiceArea: 'Corporate Advisory',
            potentialValue: 500000,
            leadScore: 85,
            status: 'Hot',
            assignedTo: 'USR002', // Radhika Sen
            createdDate: '2024-11-01',
            lastContactDate: '2024-11-20',
            nextFollowUpDate: '2024-11-25',
            notes: 'Interested in corporate compliance services. Follow up on POSH implementation.',
            industry: 'Technology',
            escalationStatus: 'Normal'
        },
        {
            id: 'LEAD-2024-002',
            companyName: 'Sunrise Real Estate Developers',
            contactPerson: 'Meera Khanna',
            email: 'meera@sunriserealty.com',
            phone: '+91 98765 12345',
            source: 'Referral',
            practiceArea: 'Real Estate',
            potentialValue: 1200000,
            leadScore: 92,
            status: 'Hot',
            assignedTo: 'USR006', // Anjali Patel
            createdDate: '2024-10-28',
            lastContactDate: '2024-11-21',
            nextFollowUpDate: '2024-11-23',
            notes: 'Large residential project in Gurgaon. Need title verification and RERA compliance.',
            industry: 'Real Estate',
            escalationStatus: 'High'
        },
        {
            id: 'LEAD-2024-003',
            companyName: 'Global Logistics India',
            contactPerson: 'Sandeep Rao',
            email: 'sandeep@globallogistics.in',
            phone: '+91 99876 54321',
            source: 'Phone',
            practiceArea: 'Litigation',
            potentialValue: 300000,
            leadScore: 65,
            status: 'Warm',
            assignedTo: 'USR001', // Prateek Mehta
            createdDate: '2024-11-10',
            lastContactDate: '2024-11-18',
            nextFollowUpDate: '2024-11-27',
            notes: 'Facing commercial dispute with vendor. Exploring arbitration options.',
            industry: 'Logistics',
            escalationStatus: 'Normal'
        },
        {
            id: 'LEAD-2024-004',
            companyName: 'FinServe Capital',
            contactPerson: 'Priya Deshmukh',
            email: 'priya@finserve.com',
            phone: '+91 98123 45678',
            source: 'Website',
            practiceArea: 'Corporate Advisory',
            potentialValue: 800000,
            leadScore: 78,
            status: 'Warm',
            assignedTo: 'USR005', // Vikram Desai
            createdDate: '2024-11-05',
            lastContactDate: '2024-11-19',
            nextFollowUpDate: '2024-11-26',
            notes: 'New NBFC looking for ongoing legal retainer. Interested in loan documentation services.',
            industry: 'Financial Services',
            escalationStatus: 'Normal'
        },
        {
            id: 'LEAD-2024-005',
            companyName: 'Heritage Hospitals Group',
            contactPerson: 'Dr. Anil Verma',
            email: 'anil@heritagehospitals.com',
            phone: '+91 97654 32109',
            source: 'Referral',
            practiceArea: 'Corporate Advisory',
            potentialValue: 600000,
            leadScore: 70,
            status: 'Warm',
            assignedTo: 'USR002', // Radhika Sen
            createdDate: '2024-11-12',
            lastContactDate: '2024-11-20',
            nextFollowUpDate: '2024-11-28',
            notes: 'Expansion plans - need employment contracts, POSH policy, and regulatory compliance.',
            industry: 'Healthcare',
            escalationStatus: 'Normal'
        },
        {
            id: 'LEAD-2024-006',
            companyName: 'SmartCity Infrastructure',
            contactPerson: 'Karan Singh',
            email: 'karan@smartcity.in',
            phone: '+91 96543 21098',
            source: 'Phone',
            practiceArea: 'Real Estate',
            potentialValue: 400000,
            leadScore: 55,
            status: 'Cold',
            assignedTo: 'USR003', // Amit Kumar
            createdDate: '2024-11-15',
            lastContactDate: '2024-11-15',
            nextFollowUpDate: '2024-12-01',
            notes: 'Initial inquiry for property documentation. Price-sensitive.',
            industry: 'Infrastructure',
            escalationStatus: 'Low'
        }
    ],

    // Dummy clients database
    clients: [
        {
            id: 'CLT-2024-001',
            companyName: 'ABC Manufacturing Ltd',
            contactPerson: 'Ramesh Agarwal',
            email: 'ramesh@abcmfg.com',
            phone: '+91 98765 00001',
            pan: 'AABCA1234C',
            gstin: '07AABCA1234C1Z5',
            category: 'VIP',
            industry: 'Manufacturing',
            relationshipManager: 'USR001', // Prateek Mehta
            onboardingDate: '2023-01-15',
            registeredAddress: '123, Industrial Area, Phase-I, Gurgaon, Haryana - 122001',
            communicationAddress: '123, Industrial Area, Phase-I, Gurgaon, Haryana - 122001',
            totalRevenue: 2500000,
            activeMatters: 3,
            status: 'Active'
        },
        {
            id: 'CLT-2024-002',
            companyName: 'XYZ Bank Limited',
            contactPerson: 'Sanjay Kumar',
            email: 'sanjay@xyzbank.com',
            phone: '+91 98765 00002',
            pan: 'AABCX5678D',
            gstin: '07AABCX5678D1Z5',
            category: 'VIP',
            industry: 'Banking',
            relationshipManager: 'USR006', // Anjali Patel
            onboardingDate: '2022-06-10',
            registeredAddress: '456, Financial District, Mumbai, Maharashtra - 400001',
            communicationAddress: '456, Financial District, Mumbai, Maharashtra - 400001',
            totalRevenue: 5200000,
            activeMatters: 5,
            status: 'Active'
        },
        {
            id: 'CLT-2024-003',
            companyName: 'Green Energy Solutions Pvt Ltd',
            contactPerson: 'Neha Sharma',
            email: 'neha@greenenergy.com',
            phone: '+91 98765 00003',
            pan: 'AABCG9012E',
            gstin: '29AABCG9012E1Z5',
            category: 'Active',
            industry: 'Energy',
            relationshipManager: 'USR002', // Radhika Sen
            onboardingDate: '2023-08-20',
            registeredAddress: '789, Tech Park, Whitefield, Bangalore, Karnataka - 560066',
            communicationAddress: '789, Tech Park, Whitefield, Bangalore, Karnataka - 560066',
            totalRevenue: 1800000,
            activeMatters: 2,
            status: 'Active'
        },
        {
            id: 'CLT-2024-004',
            companyName: 'Metro Retail Chain',
            contactPerson: 'Ashok Reddy',
            email: 'ashok@metroretail.com',
            phone: '+91 98765 00004',
            pan: 'AABCM3456F',
            gstin: '36AABCM3456F1Z5',
            category: 'Active',
            industry: 'Retail',
            relationshipManager: 'USR005', // Vikram Desai
            onboardingDate: '2023-11-05',
            registeredAddress: '321, Commercial Complex, Secunderabad, Telangana - 500003',
            communicationAddress: '321, Commercial Complex, Secunderabad, Telangana - 500003',
            totalRevenue: 950000,
            activeMatters: 1,
            status: 'Active'
        },
        {
            id: 'CLT-2024-005',
            companyName: 'Pinnacle Constructions',
            contactPerson: 'Vijay Malhotra',
            email: 'vijay@pinnacleconstruct.com',
            phone: '+91 98765 00005',
            pan: 'AABCP7890G',
            gstin: '27AABCP7890G1Z5',
            category: 'Active',
            industry: 'Construction',
            relationshipManager: 'USR006', // Anjali Patel
            onboardingDate: '2024-02-14',
            registeredAddress: '555, Builder Colony, Pune, Maharashtra - 411001',
            communicationAddress: '555, Builder Colony, Pune, Maharashtra - 411001',
            totalRevenue: 1350000,
            activeMatters: 2,
            status: 'Active'
        },
        {
            id: 'CLT-2024-006',
            companyName: 'Digital Marketing Pro',
            contactPerson: 'Pooja Kapoor',
            email: 'pooja@digitalmarketingpro.com',
            phone: '+91 98765 00006',
            pan: 'AABCD2345H',
            gstin: '07AABCD2345H1Z5',
            category: 'Inactive',
            industry: 'Marketing',
            relationshipManager: 'USR005', // Vikram Desai
            onboardingDate: '2022-09-30',
            registeredAddress: '888, Cyber City, Gurgaon, Haryana - 122002',
            communicationAddress: '888, Cyber City, Gurgaon, Haryana - 122002',
            totalRevenue: 450000,
            activeMatters: 0,
            status: 'Inactive'
        }
    ],

    // Dummy matters/projects database
    matters: [
        {
            id: 'MTR-2024-001',
            serialNumber: 'LoanAgree_2024_001',
            title: 'Loan Agreement - ABC Manufacturing',
            clientId: 'CLT-2024-001',
            clientName: 'ABC Manufacturing Ltd',
            type: 'Advisory',
            subType: 'Loan Agreement',
            practiceArea: 'Banking & Finance',
            leadAdvocate: 'USR001', // Prateek Mehta
            collaborators: ['USR003', 'USR004'], // Amit Kumar, Sneha Sharma
            status: 'In Execution',
            startDate: '2024-10-01',
            deadline: '2024-12-15',
            expectedValue: 350000,
            billedAmount: 150000,
            slaCompliance: 85,
            riskFlag: 'Medium',
            description: 'Term loan agreement for Rs. 50 Crores with XYZ Bank',
            milestones: [
                { name: 'Initial Draft', status: 'Completed', dueDate: '2024-10-15' },
                { name: 'Client Review', status: 'Completed', dueDate: '2024-10-30' },
                { name: 'Bank Review', status: 'In Progress', dueDate: '2024-11-25' },
                { name: 'Final Execution', status: 'Pending', dueDate: '2024-12-15' }
            ]
        },
        {
            id: 'MTR-2024-002',
            serialNumber: 'Litigation_2024_002',
            title: 'Commercial Dispute - Metro Retail',
            clientId: 'CLT-2024-004',
            clientName: 'Metro Retail Chain',
            type: 'Litigation',
            subType: 'Commercial Dispute',
            practiceArea: 'Litigation',
            leadAdvocate: 'USR001', // Prateek Mehta
            collaborators: ['USR007'], // Rohit Malhotra
            status: 'In Execution',
            startDate: '2024-09-15',
            deadline: '2025-03-31',
            expectedValue: 500000,
            billedAmount: 200000,
            slaCompliance: 90,
            riskFlag: 'Low',
            description: 'Vendor payment dispute - Rs. 2.5 Crores claim',
            milestones: [
                { name: 'Plaint Filing', status: 'Completed', dueDate: '2024-10-01' },
                { name: 'Written Statement', status: 'Completed', dueDate: '2024-11-15' },
                { name: 'Evidence Affidavit', status: 'In Progress', dueDate: '2024-12-30' },
                { name: 'Arguments', status: 'Pending', dueDate: '2025-02-28' }
            ]
        },
        {
            id: 'MTR-2024-003',
            serialNumber: 'POSH_2024_003',
            title: 'POSH Policy Implementation - Green Energy',
            clientId: 'CLT-2024-003',
            clientName: 'Green Energy Solutions Pvt Ltd',
            type: 'Advisory',
            subType: 'POSH Investigation',
            practiceArea: 'Employment Law',
            leadAdvocate: 'USR002', // Radhika Sen
            collaborators: ['USR005'], // Vikram Desai
            status: 'In Execution',
            startDate: '2024-11-01',
            deadline: '2024-12-31',
            expectedValue: 250000,
            billedAmount: 100000,
            slaCompliance: 92,
            riskFlag: 'Low',
            description: 'Complete POSH policy drafting and ICC setup',
            milestones: [
                { name: 'Gap Analysis', status: 'Completed', dueDate: '2024-11-10' },
                { name: 'Policy Drafting', status: 'Completed', dueDate: '2024-11-20' },
                { name: 'ICC Constitution', status: 'In Progress', dueDate: '2024-12-05' },
                { name: 'Training Program', status: 'Pending', dueDate: '2024-12-31' }
            ]
        },
        {
            id: 'MTR-2024-004',
            serialNumber: 'RealEstate_2024_004',
            title: 'Property Due Diligence - Pinnacle Phase II',
            clientId: 'CLT-2024-005',
            clientName: 'Pinnacle Constructions',
            type: 'Transaction',
            subType: 'Due Diligence',
            practiceArea: 'Real Estate',
            leadAdvocate: 'USR006', // Anjali Patel
            collaborators: ['USR003'], // Amit Kumar
            status: 'In Execution',
            startDate: '2024-10-20',
            deadline: '2024-12-20',
            expectedValue: 600000,
            billedAmount: 250000,
            slaCompliance: 78,
            riskFlag: 'High',
            description: 'Title verification for 50-acre land parcel in Noida',
            milestones: [
                { name: 'Document Collection', status: 'Completed', dueDate: '2024-11-01' },
                { name: 'Title Search', status: 'In Progress', dueDate: '2024-11-25' },
                { name: 'Encumbrance Check', status: 'Pending', dueDate: '2024-12-05' },
                { name: 'Final Report', status: 'Pending', dueDate: '2024-12-20' }
            ]
        },
        {
            id: 'MTR-2024-005',
            serialNumber: 'Corporate_2024_005',
            title: 'Corporate Restructuring - XYZ Bank',
            clientId: 'CLT-2024-002',
            clientName: 'XYZ Bank Limited',
            type: 'Advisory',
            subType: 'Corporate Restructuring',
            practiceArea: 'Corporate',
            leadAdvocate: 'USR006', // Anjali Patel
            collaborators: ['USR002', 'USR005'], // Radhika Sen, Vikram Desai
            status: 'In Execution',
            startDate: '2024-09-01',
            deadline: '2025-01-31',
            expectedValue: 1200000,
            billedAmount: 500000,
            slaCompliance: 88,
            riskFlag: 'Medium',
            description: 'Merger of subsidiary with parent company',
            milestones: [
                { name: 'Scheme Drafting', status: 'Completed', dueDate: '2024-10-15' },
                { name: 'Board Approval', status: 'Completed', dueDate: '2024-11-01' },
                { name: 'NCLT Filing', status: 'In Progress', dueDate: '2024-12-01' },
                { name: 'Final Order', status: 'Pending', dueDate: '2025-01-31' }
            ]
        },
        {
            id: 'MTR-2024-006',
            serialNumber: 'Contract_2024_006',
            title: 'Service Agreement Review - ABC Manufacturing',
            clientId: 'CLT-2024-001',
            clientName: 'ABC Manufacturing Ltd',
            type: 'Advisory',
            subType: 'Contract Review',
            practiceArea: 'Corporate',
            leadAdvocate: 'USR005', // Vikram Desai
            collaborators: ['USR008'], // Kavita Nair
            status: 'New',
            startDate: '2024-11-20',
            deadline: '2024-12-10',
            expectedValue: 150000,
            billedAmount: 0,
            slaCompliance: 100,
            riskFlag: 'Low',
            description: 'Review vendor service agreements - 5 contracts',
            milestones: [
                { name: 'Document Receipt', status: 'Completed', dueDate: '2024-11-20' },
                { name: 'Legal Review', status: 'In Progress', dueDate: '2024-11-30' },
                { name: 'Report Preparation', status: 'Pending', dueDate: '2024-12-05' },
                { name: 'Client Presentation', status: 'Pending', dueDate: '2024-12-10' }
            ]
        },
        {
            id: 'MTR-2024-007',
            serialNumber: 'RealEstate_2024_007',
            title: 'RERA Compliance - XYZ Bank',
            clientId: 'CLT-2024-002',
            clientName: 'XYZ Bank Limited',
            type: 'Advisory',
            subType: 'Regulatory Compliance',
            practiceArea: 'Real Estate',
            leadAdvocate: 'USR006', // Anjali Patel
            collaborators: ['USR003'], // Amit Kumar
            status: 'Completed',
            startDate: '2024-08-01',
            deadline: '2024-10-31',
            expectedValue: 400000,
            billedAmount: 400000,
            slaCompliance: 95,
            riskFlag: 'Low',
            description: 'RERA registration for housing finance projects',
            milestones: [
                { name: 'Documentation', status: 'Completed', dueDate: '2024-08-20' },
                { name: 'RERA Application', status: 'Completed', dueDate: '2024-09-15' },
                { name: 'Registration Certificate', status: 'Completed', dueDate: '2024-10-20' },
                { name: 'Compliance Report', status: 'Completed', dueDate: '2024-10-31' }
            ]
        }
    ],

    // Dummy tasks database
    tasks: [
        // Tasks for MTR-2024-001 (Loan Agreement)
        {
            id: 'TSK-2024-001',
            name: 'Review bank comments on loan agreement',
            description: 'Incorporate comments from XYZ Bank legal team on draft loan agreement',
            projectId: 'MTR-2024-001',
            projectName: 'Loan Agreement - ABC Manufacturing',
            assignedTo: 'USR003', // Amit Kumar
            createdBy: 'USR001',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2024-11-25',
            estimatedHours: 6,
            actualHours: 3,
            type: 'Review',
            tags: ['loan', 'banking', 'urgent'],
            dependencies: [],
            completionPercentage: 50
        },
        {
            id: 'TSK-2024-002',
            name: 'Draft security documentation checklist',
            description: 'Prepare comprehensive checklist for mortgage and security documents',
            projectId: 'MTR-2024-001',
            projectName: 'Loan Agreement - ABC Manufacturing',
            assignedTo: 'USR004', // Sneha Sharma
            createdBy: 'USR001',
            priority: 'Medium',
            status: 'Pending',
            dueDate: '2024-11-28',
            estimatedHours: 4,
            actualHours: 0,
            type: 'Drafting',
            tags: ['security', 'checklist'],
            dependencies: ['TSK-2024-001'],
            completionPercentage: 0
        },
        // Tasks for MTR-2024-002 (Litigation)
        {
            id: 'TSK-2024-003',
            name: 'Prepare evidence affidavit',
            description: 'Draft evidence affidavit with supporting documents for commercial dispute',
            projectId: 'MTR-2024-002',
            projectName: 'Commercial Dispute - Metro Retail',
            assignedTo: 'USR007', // Rohit Malhotra
            createdBy: 'USR001',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2024-12-15',
            estimatedHours: 12,
            actualHours: 5,
            type: 'Drafting',
            tags: ['litigation', 'evidence'],
            dependencies: [],
            completionPercentage: 40
        },
        {
            id: 'TSK-2024-004',
            name: 'Compile documentary evidence',
            description: 'Organize and index all invoices, emails, and contracts',
            projectId: 'MTR-2024-002',
            projectName: 'Commercial Dispute - Metro Retail',
            assignedTo: 'USR004', // Sneha Sharma
            createdBy: 'USR007',
            priority: 'Medium',
            status: 'Completed',
            dueDate: '2024-11-20',
            estimatedHours: 8,
            actualHours: 9,
            type: 'Data Compilation',
            tags: ['litigation', 'documents'],
            dependencies: [],
            completionPercentage: 100
        },
        // Tasks for MTR-2024-003 (POSH)
        {
            id: 'TSK-2024-005',
            name: 'Draft ICC constitution document',
            description: 'Prepare Internal Complaints Committee constitution as per POSH Act',
            projectId: 'MTR-2024-003',
            projectName: 'POSH Policy Implementation - Green Energy',
            assignedTo: 'USR005', // Vikram Desai
            createdBy: 'USR002',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2024-12-05',
            estimatedHours: 5,
            actualHours: 2,
            type: 'Drafting',
            tags: ['posh', 'compliance'],
            dependencies: [],
            completionPercentage: 60
        },
        {
            id: 'TSK-2024-006',
            name: 'Prepare training material',
            description: 'Create PowerPoint presentation for POSH awareness training',
            projectId: 'MTR-2024-003',
            projectName: 'POSH Policy Implementation - Green Energy',
            assignedTo: 'USR008', // Kavita Nair
            createdBy: 'USR002',
            priority: 'Medium',
            status: 'Pending',
            dueDate: '2024-12-15',
            estimatedHours: 6,
            actualHours: 0,
            type: 'Drafting',
            tags: ['posh', 'training'],
            dependencies: ['TSK-2024-005'],
            completionPercentage: 0
        },
        // Tasks for MTR-2024-004 (Real Estate)
        {
            id: 'TSK-2024-007',
            name: 'Conduct title search at sub-registrar office',
            description: 'Search property records for last 30 years at Noida Sub-Registrar',
            projectId: 'MTR-2024-004',
            projectName: 'Property Due Diligence - Pinnacle Phase II',
            assignedTo: 'USR003', // Amit Kumar
            createdBy: 'USR006',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2024-11-25',
            estimatedHours: 16,
            actualHours: 12,
            type: 'Research',
            tags: ['real-estate', 'title-search', 'urgent'],
            dependencies: [],
            completionPercentage: 75
        },
        {
            id: 'TSK-2024-008',
            name: 'Obtain encumbrance certificate',
            description: 'Apply for and collect EC for all survey numbers',
            projectId: 'MTR-2024-004',
            projectName: 'Property Due Diligence - Pinnacle Phase II',
            assignedTo: 'USR003', // Amit Kumar
            createdBy: 'USR006',
            priority: 'High',
            status: 'Pending',
            dueDate: '2024-12-05',
            estimatedHours: 8,
            actualHours: 0,
            type: 'Data Compilation',
            tags: ['real-estate', 'ec'],
            dependencies: ['TSK-2024-007'],
            completionPercentage: 0
        },
        {
            id: 'TSK-2024-009',
            name: 'Prepare due diligence report',
            description: 'Comprehensive title report with risk assessment and recommendations',
            projectId: 'MTR-2024-004',
            projectName: 'Property Due Diligence - Pinnacle Phase II',
            assignedTo: 'USR006', // Anjali Patel
            createdBy: 'USR006',
            priority: 'High',
            status: 'Pending',
            dueDate: '2024-12-20',
            estimatedHours: 10,
            actualHours: 0,
            type: 'Analysis',
            tags: ['real-estate', 'report'],
            dependencies: ['TSK-2024-008'],
            completionPercentage: 0
        },
        // Tasks for MTR-2024-005 (Corporate Restructuring)
        {
            id: 'TSK-2024-010',
            name: 'Draft NCLT petition',
            description: 'Prepare NCLT petition for scheme of amalgamation',
            projectId: 'MTR-2024-005',
            projectName: 'Corporate Restructuring - XYZ Bank',
            assignedTo: 'USR002', // Radhika Sen
            createdBy: 'USR006',
            priority: 'High',
            status: 'In Progress',
            dueDate: '2024-11-30',
            estimatedHours: 20,
            actualHours: 15,
            type: 'Drafting',
            tags: ['corporate', 'nclt', 'merger'],
            dependencies: [],
            completionPercentage: 80
        },
        {
            id: 'TSK-2024-011',
            name: 'Coordinate with auditors',
            description: 'Obtain valuation reports and financial statements from auditors',
            projectId: 'MTR-2024-005',
            projectName: 'Corporate Restructuring - XYZ Bank',
            assignedTo: 'USR005', // Vikram Desai
            createdBy: 'USR006',
            priority: 'Medium',
            status: 'In Progress',
            dueDate: '2024-11-28',
            estimatedHours: 4,
            actualHours: 2,
            type: 'Data Compilation',
            tags: ['corporate', 'valuation'],
            dependencies: [],
            completionPercentage: 50
        },
        // Tasks for MTR-2024-006 (Contract Review)
        {
            id: 'TSK-2024-012',
            name: 'Review vendor service agreements',
            description: 'Legal review of 5 vendor service contracts',
            projectId: 'MTR-2024-006',
            projectName: 'Service Agreement Review - ABC Manufacturing',
            assignedTo: 'USR005', // Vikram Desai
            createdBy: 'USR001',
            priority: 'Medium',
            status: 'In Progress',
            dueDate: '2024-11-30',
            estimatedHours: 10,
            actualHours: 4,
            type: 'Review',
            tags: ['contracts', 'review'],
            dependencies: [],
            completionPercentage: 40
        },
        {
            id: 'TSK-2024-013',
            name: 'Research legal precedents',
            description: 'Research case law on vendor service agreement disputes',
            projectId: 'MTR-2024-006',
            projectName: 'Service Agreement Review - ABC Manufacturing',
            assignedTo: 'USR008', // Kavita Nair
            createdBy: 'USR005',
            priority: 'Low',
            status: 'Pending',
            dueDate: '2024-11-27',
            estimatedHours: 6,
            actualHours: 0,
            type: 'Research',
            tags: ['research', 'contracts'],
            dependencies: [],
            completionPercentage: 0
        },
        // Additional standalone tasks
        {
            id: 'TSK-2024-014',
            name: 'Update master contract template',
            description: 'Revise standard NDA template with recent legal changes',
            projectId: null,
            projectName: 'General Administration',
            assignedTo: 'USR005', // Vikram Desai
            createdBy: 'USR001',
            priority: 'Low',
            status: 'Pending',
            dueDate: '2024-12-30',
            estimatedHours: 3,
            actualHours: 0,
            type: 'Drafting',
            tags: ['template', 'nda'],
            dependencies: [],
            completionPercentage: 0
        },
        {
            id: 'TSK-2024-015',
            name: 'Attend client meeting - ABC Manufacturing',
            description: 'Quarterly business review meeting with client',
            projectId: 'MTR-2024-001',
            projectName: 'Loan Agreement - ABC Manufacturing',
            assignedTo: 'USR001', // Prateek Mehta
            createdBy: 'USR001',
            priority: 'High',
            status: 'Pending',
            dueDate: '2024-11-24',
            estimatedHours: 2,
            actualHours: 0,
            type: 'Review',
            tags: ['meeting', 'client'],
            dependencies: [],
            completionPercentage: 0
        }
    ],

    // Initialize all dummy data
    initialize: function() {
        console.log('🔄 Initializing dummy data...');

        // Save users
        localStorage.setItem('users', JSON.stringify(this.users));
        console.log(`✅ Created ${this.users.length} users`);

        // Save leads
        localStorage.setItem('leads', JSON.stringify(this.leads));
        console.log(`✅ Created ${this.leads.length} leads`);

        // Save clients
        localStorage.setItem('clients', JSON.stringify(this.clients));
        console.log(`✅ Created ${this.clients.length} clients`);

        // Save matters/projects
        localStorage.setItem('projects', JSON.stringify(this.matters));
        console.log(`✅ Created ${this.matters.length} matters`);

        // Save tasks
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        console.log(`✅ Created ${this.tasks.length} tasks`);

        // Calculate and update user workloads
        this.calculateWorkloads();

        console.log('✅ Dummy data initialization complete!');
        return true;
    },

    // Calculate workload for each user
    calculateWorkloads: function() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const leads = JSON.parse(localStorage.getItem('leads') || '[]');
        const matters = JSON.parse(localStorage.getItem('projects') || '[]');
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        users.forEach(user => {
            // Count assignments
            const assignedLeads = leads.filter(l => l.assignedTo === user.id).length;
            const rmClients = JSON.parse(localStorage.getItem('clients') || '[]')
                .filter(c => c.relationshipManager === user.id).length;
            const leadMatters = matters.filter(m => m.leadAdvocate === user.id).length;
            const collaboratingMatters = matters.filter(m =>
                m.collaborators && m.collaborators.includes(user.id)
            ).length;
            const assignedTasks = tasks.filter(t => t.assignedTo === user.id && t.status !== 'Completed').length;

            // Calculate workload score (weighted)
            user.workload = (assignedLeads * 5) +
                           (rmClients * 10) +
                           (leadMatters * 20) +
                           (collaboratingMatters * 10) +
                           (assignedTasks * 3);

            // Store detailed breakdown
            user.workloadBreakdown = {
                leads: assignedLeads,
                clients: rmClients,
                leadsMatters: leadMatters,
                collaborations: collaboratingMatters,
                tasks: assignedTasks,
                score: user.workload
            };
        });

        // Save updated users
        localStorage.setItem('users', JSON.stringify(users));
        console.log('✅ Workloads calculated for all users');
    },

    // Get workload summary
    getWorkloadSummary: function() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.map(u => ({
            name: u.name,
            role: u.role,
            workload: u.workload,
            breakdown: u.workloadBreakdown
        })).sort((a, b) => b.workload - a.workload);
    },

    // Reset all data (for testing)
    reset: function() {
        const keys = ['users', 'leads', 'clients', 'projects', 'tasks'];
        keys.forEach(key => localStorage.removeItem(key));
        console.log('🗑️  All dummy data cleared');
    }
};

// Make available globally
window.DummyDataInitializer = DummyDataInitializer;

// Auto-initialize if data doesn't exist
if (typeof window !== 'undefined' && !localStorage.getItem('users')) {
    console.log('📋 No existing user data found. Initializing dummy data...');
    DummyDataInitializer.initialize();
}
