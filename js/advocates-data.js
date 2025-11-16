// Legal CRM - Advocates Data
// Sample data for empaneled advocates

const advocatesData = {
    advocates: [
        {
            id: 'ADV-001',
            name: 'Adv. Rajesh Kumar',
            email: 'rajesh.kumar@legalpro.in',
            phone: '+91-98765-43210',
            barCouncilNo: 'D/1234/2008',
            enrollmentYear: '2008',
            experienceYears: 16,
            city: 'Delhi',
            state: 'Delhi',
            location: 'Delhi',
            specialization: ['Corporate Law', 'Mergers & Acquisitions', 'Contract Law'],
            qualifications: ['B.A. LL.B (Hons)', 'LL.M - Corporate Law', 'Diploma in Taxation'],
            courtsOfPractice: ['Supreme Court of India', 'Delhi High Court', 'District Courts Delhi'],
            hourlyRate: 8000,
            retainerRate: 150000,
            availabilityStatus: 'Available',
            panNumber: 'ABCDE1234F',
            rating: 4.8,
            casesHandled: 156,
            successRate: 92,
            languagesKnown: ['English', 'Hindi', 'Punjabi'],
            assignedCases: ['CASE-001', 'CASE-045'],
            activeAssignments: 2,
            totalEarnings: 4500000,
            empaneledDate: '2020-01-15',
            status: 'Active',
            notes: 'Specialized in M&A deals. Excellent track record with corporate clients.',
            documents: ['PAN Card', 'Bar Council Certificate', 'Identity Proof'],
            bankAccountDetails: {
                accountName: 'Rajesh Kumar',
                accountNumber: '1234567890',
                ifscCode: 'HDFC0001234',
                bankName: 'HDFC Bank',
                branch: 'Connaught Place, Delhi'
            },
            gstNumber: '07ABCDE1234F1Z5'
        },
        {
            id: 'ADV-002',
            name: 'Adv. Priya Sharma',
            email: 'priya.sharma@lawfirm.in',
            phone: '+91-98234-56789',
            barCouncilNo: 'M/5678/2012',
            enrollmentYear: '2012',
            experienceYears: 12,
            city: 'Mumbai',
            state: 'Maharashtra',
            location: 'Mumbai',
            specialization: ['Banking Law', 'Financial Services', 'Debt Recovery'],
            qualifications: ['B.Com LL.B', 'LL.M - Banking Law'],
            courtsOfPractice: ['Bombay High Court', 'DRT Mumbai', 'NCLT Mumbai'],
            hourlyRate: 7500,
            retainerRate: 125000,
            availabilityStatus: 'Busy',
            panNumber: 'BCDEF2345G',
            rating: 4.6,
            casesHandled: 98,
            successRate: 88,
            languagesKnown: ['English', 'Hindi', 'Marathi'],
            assignedCases: ['CASE-023', 'CASE-056', 'CASE-078'],
            activeAssignments: 3,
            totalEarnings: 3200000,
            empaneledDate: '2020-03-22',
            status: 'Active',
            notes: 'Expert in banking litigation and SARFAESI matters. Currently handling 3 active cases.',
            documents: ['PAN Card', 'Bar Council Certificate', 'Address Proof'],
            bankAccountDetails: {
                accountName: 'Priya Sharma',
                accountNumber: '9876543210',
                ifscCode: 'ICIC0001234',
                bankName: 'ICICI Bank',
                branch: 'Nariman Point, Mumbai'
            },
            gstNumber: '27BCDEF2345G1Z8'
        },
        {
            id: 'ADV-003',
            name: 'Adv. Arun Mehta',
            email: 'arun.mehta@supremelaw.in',
            phone: '+91-99876-54321',
            barCouncilNo: 'D/2345/2005',
            enrollmentYear: '2005',
            experienceYears: 19,
            city: 'Delhi',
            state: 'Delhi',
            location: 'Delhi',
            specialization: ['Constitutional Law', 'Public Interest Litigation', 'Writ Petitions'],
            qualifications: ['B.A. LL.B', 'LL.M - Constitutional Law', 'Ph.D. - Human Rights'],
            courtsOfPractice: ['Supreme Court of India', 'Delhi High Court'],
            hourlyRate: 12000,
            retainerRate: 250000,
            availabilityStatus: 'Available',
            panNumber: 'CDEFG3456H',
            rating: 4.9,
            casesHandled: 215,
            successRate: 94,
            languagesKnown: ['English', 'Hindi', 'Urdu'],
            assignedCases: ['CASE-012'],
            activeAssignments: 1,
            totalEarnings: 6800000,
            empaneledDate: '2019-11-10',
            status: 'Active',
            notes: 'Senior advocate with Supreme Court practice. Handles high-profile constitutional matters.',
            documents: ['PAN Card', 'Bar Council Certificate', 'Senior Advocate Designation'],
            bankAccountDetails: {
                accountName: 'Arun Mehta',
                accountNumber: '5432167890',
                ifscCode: 'SBIN0001234',
                bankName: 'State Bank of India',
                branch: 'Parliament Street, Delhi'
            },
            gstNumber: '07CDEFG3456H1Z2'
        },
        {
            id: 'ADV-004',
            name: 'Adv. Sneha Patel',
            email: 'sneha.patel@iprlaw.in',
            phone: '+91-98111-22334',
            barCouncilNo: 'B/3456/2014',
            enrollmentYear: '2014',
            experienceYears: 10,
            city: 'Bengaluru',
            state: 'Karnataka',
            location: 'Bengaluru',
            specialization: ['Intellectual Property', 'Trademark Law', 'Patent Law', 'Technology Law'],
            qualifications: ['B.Tech (CSE)', 'LL.B', 'LL.M - IPR'],
            courtsOfPractice: ['Karnataka High Court', 'IPAB Chennai', 'Commercial Courts'],
            hourlyRate: 9000,
            retainerRate: 180000,
            availabilityStatus: 'Available',
            panNumber: 'DEFGH4567I',
            rating: 4.7,
            casesHandled: 78,
            successRate: 91,
            languagesKnown: ['English', 'Hindi', 'Kannada', 'Gujarati'],
            assignedCases: [],
            activeAssignments: 0,
            totalEarnings: 2100000,
            empaneledDate: '2021-05-18',
            status: 'Active',
            notes: 'Tech-savvy lawyer specializing in IP rights for startups and tech companies.',
            documents: ['PAN Card', 'Bar Council Certificate', 'Engineering Degree'],
            bankAccountDetails: {
                accountName: 'Sneha Patel',
                accountNumber: '6789054321',
                ifscCode: 'HDFC0002345',
                bankName: 'HDFC Bank',
                branch: 'Koramangala, Bengaluru'
            },
            gstNumber: '29DEFGH4567I1Z4'
        },
        {
            id: 'ADV-005',
            name: 'Adv. Vikram Singh',
            email: 'vikram.singh@crimlaw.in',
            phone: '+91-97654-32109',
            barCouncilNo: 'N/4567/2010',
            enrollmentYear: '2010',
            experienceYears: 14,
            city: 'Noida',
            state: 'Uttar Pradesh',
            location: 'Noida',
            specialization: ['Criminal Law', 'White Collar Crime', 'Economic Offences'],
            qualifications: ['B.A. LL.B', 'LL.M - Criminal Law', 'Diploma in Criminology'],
            courtsOfPractice: ['Supreme Court of India', 'Allahabad High Court', 'CBI Courts'],
            hourlyRate: 10000,
            retainerRate: 200000,
            availabilityStatus: 'Busy',
            panNumber: 'EFGHI5678J',
            rating: 4.5,
            casesHandled: 142,
            successRate: 85,
            languagesKnown: ['English', 'Hindi'],
            assignedCases: ['CASE-089', 'CASE-091'],
            activeAssignments: 2,
            totalEarnings: 4200000,
            empaneledDate: '2020-07-25',
            status: 'Active',
            notes: 'Expert in white-collar crime defense. Former prosecutor with CBI.',
            documents: ['PAN Card', 'Bar Council Certificate', 'CBI Service Record'],
            bankAccountDetails: {
                accountName: 'Vikram Singh',
                accountNumber: '3456789012',
                ifscCode: 'ICIC0002345',
                bankName: 'ICICI Bank',
                branch: 'Sector 18, Noida'
            },
            gstNumber: '09EFGHI5678J1Z7'
        },
        {
            id: 'ADV-006',
            name: 'Adv. Anjali Desai',
            email: 'anjali.desai@familylaw.in',
            phone: '+91-98765-11223',
            barCouncilNo: 'M/5678/2015',
            enrollmentYear: '2015',
            experienceYears: 9,
            city: 'Mumbai',
            state: 'Maharashtra',
            location: 'Mumbai',
            specialization: ['Family Law', 'Matrimonial Law', 'Child Custody'],
            qualifications: ['B.A. LL.B', 'LL.M - Family Law', 'Mediation Certificate'],
            courtsOfPractice: ['Bombay High Court', 'Family Courts Mumbai'],
            hourlyRate: 6500,
            retainerRate: 110000,
            availabilityStatus: 'On Leave',
            panNumber: 'FGHIJ6789K',
            rating: 4.4,
            casesHandled: 64,
            successRate: 89,
            languagesKnown: ['English', 'Hindi', 'Marathi', 'Gujarati'],
            assignedCases: [],
            activeAssignments: 0,
            totalEarnings: 1800000,
            empaneledDate: '2021-09-12',
            status: 'Active',
            notes: 'Currently on maternity leave until Dec 2025. Expert in mediation and amicable settlements.',
            documents: ['PAN Card', 'Bar Council Certificate', 'Mediation Certificate'],
            bankAccountDetails: {
                accountName: 'Anjali Desai',
                accountNumber: '7890123456',
                ifscCode: 'SBIN0002345',
                bankName: 'State Bank of India',
                branch: 'Bandra West, Mumbai'
            },
            gstNumber: '27FGHIJ6789K1Z9'
        },
        {
            id: 'ADV-007',
            name: 'Adv. Rahul Kapoor',
            email: 'rahul.kapoor@realestate.in',
            phone: '+91-99123-45678',
            barCouncilNo: 'J/6789/2011',
            enrollmentYear: '2011',
            experienceYears: 13,
            city: 'Jaipur',
            state: 'Rajasthan',
            location: 'Jaipur',
            specialization: ['Real Estate Law', 'Property Disputes', 'RERA Compliance'],
            qualifications: ['B.Com LL.B', 'LL.M - Property Law'],
            courtsOfPractice: ['Rajasthan High Court', 'RERA Rajasthan', 'Civil Courts'],
            hourlyRate: 7000,
            retainerRate: 120000,
            availabilityStatus: 'Available',
            panNumber: 'GHIJK7890L',
            rating: 4.6,
            casesHandled: 89,
            successRate: 87,
            languagesKnown: ['English', 'Hindi', 'Rajasthani'],
            assignedCases: ['CASE-034'],
            activeAssignments: 1,
            totalEarnings: 2600000,
            empaneledDate: '2020-12-05',
            status: 'Active',
            notes: 'Specialist in RERA matters and real estate transactions. Strong network in Rajasthan.',
            documents: ['PAN Card', 'Bar Council Certificate', 'RERA Certification'],
            bankAccountDetails: {
                accountName: 'Rahul Kapoor',
                accountNumber: '8901234567',
                ifscCode: 'HDFC0003456',
                bankName: 'HDFC Bank',
                branch: 'MI Road, Jaipur'
            },
            gstNumber: '08GHIJK7890L1Z3'
        },
        {
            id: 'ADV-008',
            name: 'Adv. Meera Iyer',
            email: 'meera.iyer@taxlaw.in',
            phone: '+91-98000-11222',
            barCouncilNo: 'B/7890/2013',
            enrollmentYear: '2013',
            experienceYears: 11,
            city: 'Bengaluru',
            state: 'Karnataka',
            location: 'Bengaluru',
            specialization: ['Tax Law', 'GST', 'Income Tax', 'Transfer Pricing'],
            qualifications: ['B.Com', 'CA', 'LL.B', 'LL.M - Tax Law'],
            courtsOfPractice: ['Karnataka High Court', 'ITAT Bengaluru', 'GST Tribunal'],
            hourlyRate: 8500,
            retainerRate: 160000,
            availabilityStatus: 'Available',
            panNumber: 'HIJKL8901M',
            rating: 4.8,
            casesHandled: 112,
            successRate: 93,
            languagesKnown: ['English', 'Hindi', 'Tamil', 'Kannada'],
            assignedCases: ['CASE-067', 'CASE-082'],
            activeAssignments: 2,
            totalEarnings: 3800000,
            empaneledDate: '2021-02-28',
            status: 'Active',
            notes: 'Dual qualified as CA and Advocate. Expert in complex tax litigation.',
            documents: ['PAN Card', 'Bar Council Certificate', 'CA Certificate'],
            bankAccountDetails: {
                accountName: 'Meera Iyer',
                accountNumber: '9012345678',
                ifscCode: 'ICIC0003456',
                bankName: 'ICICI Bank',
                branch: 'Indiranagar, Bengaluru'
            },
            gstNumber: '29HIJKL8901M1Z6'
        }
    ],

    // Summary statistics
    summary: {
        totalAdvocates: 8,
        availableAdvocates: 5,
        busyAdvocates: 2,
        onLeave: 1,
        avgRating: 4.7,
        totalCasesHandled: 954,
        avgSuccessRate: 90,
        totalActiveAssignments: 13
    },

    // Practice areas summary
    practiceAreas: [
        { name: 'Corporate Law', count: 3 },
        { name: 'Banking Law', count: 2 },
        { name: 'Criminal Law', count: 1 },
        { name: 'Family Law', count: 1 },
        { name: 'Real Estate', count: 1 },
        { name: 'Intellectual Property', count: 1 },
        { name: 'Tax Law', count: 1 },
        { name: 'Constitutional Law', count: 1 }
    ]
};

// Helper functions
const advocatesStore = {
    getAll: function() {
        return advocatesData.advocates;
    },

    getById: function(id) {
        return advocatesData.advocates.find(adv => adv.id === id);
    },

    getByStatus: function(status) {
        return advocatesData.advocates.filter(adv => adv.availabilityStatus === status);
    },

    getBySpecialization: function(specialization) {
        return advocatesData.advocates.filter(adv =>
            adv.specialization.some(spec => spec.toLowerCase().includes(specialization.toLowerCase()))
        );
    },

    getByLocation: function(city) {
        return advocatesData.advocates.filter(adv => adv.city === city);
    },

    getSummary: function() {
        return advocatesData.summary;
    },

    getPracticeAreas: function() {
        return advocatesData.practiceAreas;
    },

    search: function(query) {
        const lowerQuery = query.toLowerCase();
        return advocatesData.advocates.filter(adv =>
            adv.name.toLowerCase().includes(lowerQuery) ||
            adv.email.toLowerCase().includes(lowerQuery) ||
            adv.specialization.some(spec => spec.toLowerCase().includes(lowerQuery))
        );
    }
};

// Make data available globally
window.advocatesData = advocatesData;
window.advocatesStore = advocatesStore;
