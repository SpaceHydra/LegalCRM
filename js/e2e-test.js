// E2E Test Workflow Script
// Simulates complete lifecycle from lead to matter completion

let testData = {
    leadId: null,
    clientId: null,
    matterId: null,
    taskIds: [],
    completedSteps: 0
};

// Track completed steps
let completedSteps = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});

// ===== STEP 1: CREATE LEAD =====
function executeStep1() {
    const lead = {
        id: 'LEAD-TEST-' + Date.now(),
        name: 'Rajesh Kumar',
        company: 'TechVision Pvt Ltd',
        email: 'rajesh.kumar@techvision.in',
        phone: '+91-9876543210',
        source: 'Referral',
        referralBy: 'CA Amit Sharma',
        practiceArea: 'Corporate Law',
        status: 'New',
        score: 45,
        notes: 'Interested in incorporation and compliance services for new startup',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        agingDays: 0
    };

    // Save to localStorage
    const leads = legalCRM.get('leads');
    leads.unshift(lead);
    legalCRM.set('leads', leads);

    // Store test data
    testData.leadId = lead.id;

    // Update UI
    document.getElementById('leadName').textContent = lead.name;
    document.getElementById('leadCompany').textContent = lead.company;
    document.getElementById('leadId').textContent = lead.id;
    document.getElementById('leadScore').textContent = lead.score;

    // Show data and mark complete
    document.getElementById('step1Data').style.display = 'block';
    markStepComplete(1);

    // Enable next step
    document.getElementById('step2Btn').disabled = false;
    document.getElementById('step2ViewBtn').disabled = false;

    console.log('✅ Step 1 Complete: Lead Created', lead);
}

// ===== STEP 2: FOLLOW-UP =====
function executeStep2() {
    const leads = legalCRM.get('leads');
    const lead = leads.find(l => l.id === testData.leadId);

    if (!lead) {
        alert('Lead not found!');
        return;
    }

    // Update lead with follow-up notes
    const followUpNote = '\n\n--- Follow-up on ' + new Date().toLocaleString() + ' ---\n' +
        'Had initial call with Rajesh. Very interested in comprehensive legal services.\n' +
        'Requirements:\n' +
        '- Company incorporation\n' +
        '- Shareholders agreement\n' +
        '- Employment contracts\n' +
        '- IP protection\n\n' +
        'Lead seems highly qualified. Increasing score to 85.';

    lead.notes += followUpNote;
    lead.score = 85;
    lead.status = 'Qualified';
    lead.updatedAt = new Date().toISOString();

    legalCRM.set('leads', leads);

    // Update UI
    document.getElementById('updatedScore').textContent = '85 (Hot Lead)';
    document.getElementById('step2Data').style.display = 'block';
    markStepComplete(2);

    // Enable next step
    document.getElementById('step3Btn').disabled = false;

    console.log('✅ Step 2 Complete: Follow-up Added', lead);
}

// ===== STEP 3: SCHEDULE MEETING =====
function executeStep3() {
    const meeting = {
        id: 'MTG-' + Date.now(),
        title: 'Initial Consultation - TechVision Pvt Ltd',
        type: 'Client Consultation',
        date: getNextBusinessDay(),
        time: '11:00 AM',
        duration: '60 minutes',
        attendees: ['Rajesh Kumar', 'Prateek Mehta (Senior Advocate)'],
        location: 'Office / Video Call',
        agenda: 'Discuss incorporation requirements, legal structure, compliance needs',
        status: 'Scheduled',
        createdAt: new Date().toISOString()
    };

    // Save meeting
    const meetings = JSON.parse(localStorage.getItem('meetings') || '[]');
    meetings.unshift(meeting);
    localStorage.setItem('meetings', JSON.stringify(meetings));

    // Update UI
    document.getElementById('meetingDate').textContent = meeting.date + ' at ' + meeting.time;
    document.getElementById('step3Data').style.display = 'block';
    markStepComplete(3);

    // Enable next step
    document.getElementById('step4Btn').disabled = false;

    console.log('✅ Step 3 Complete: Meeting Scheduled', meeting);
}

// ===== STEP 4: CONVERT TO CLIENT =====
function executeStep4() {
    const leads = legalCRM.get('leads');
    const lead = leads.find(l => l.id === testData.leadId);

    if (!lead) {
        alert('Lead not found!');
        return;
    }

    // Create client from lead
    const client = {
        id: 'CLI-' + Date.now(),
        name: lead.company,
        companyName: lead.company,
        industry: 'Technology',
        website: 'https://techvision.in',
        pan: 'AAACT1234E',
        gstin: '27AAACT1234E1Z5',
        category: 'Corporate',
        registeredAddress: '123, Tech Park, Whitefield, Bangalore, Karnataka - 560066',
        communicationAddress: '123, Tech Park, Whitefield, Bangalore, Karnataka - 560066',
        spoc: [{
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            designation: 'Founder & CEO'
        }],
        onboardingDate: new Date().toISOString(),
        relationshipManager: 'Prateek Mehta',
        status: 'Active',
        totalRevenue: 0,
        lastInteraction: new Date().toISOString(),
        createdAt: new Date().toISOString()
    };

    // Save client
    const clients = legalCRM.get('clients');
    clients.unshift(client);
    legalCRM.set('clients', clients);

    // Update lead status
    lead.status = 'Won';
    lead.updatedAt = new Date().toISOString();
    legalCRM.set('leads', leads);

    // Store test data
    testData.clientId = client.id;

    // Update UI
    document.getElementById('clientId').textContent = client.id;
    document.getElementById('clientName').textContent = client.name;
    document.getElementById('step4Data').style.display = 'block';
    markStepComplete(4);

    // Enable next step
    document.getElementById('step5Btn').disabled = false;

    console.log('✅ Step 4 Complete: Client Created', client);
}

// ===== STEP 5: CREATE MATTER =====
function executeStep5() {
    const matter = {
        id: 'MAT-' + Date.now(),
        serialNumber: 'MAT/' + new Date().getFullYear() + '/E2E/001',
        title: 'TechVision Incorporation & Compliance',
        clientId: testData.clientId,
        type: 'Corporate',
        practiceArea: 'Corporate Law',
        description: 'Complete incorporation services including company formation, shareholders agreement, employment contracts, and IP protection',
        leadAdvocate: 'Prateek Mehta',
        collaborators: ['Radhika Sen', 'Anjali Verma'],
        status: 'Active',
        priority: 'High',
        startDate: new Date().toISOString().split('T')[0],
        expectedEndDate: getDateAfterDays(30),
        billingType: 'Fixed Fee',
        estimatedValue: 250000,
        hourlyRate: 5000,
        retainerAmount: 100000,
        court: 'N/A (Corporate Matter)',
        caseNumber: 'N/A',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Save matter
    const matters = legalCRM.get('matters');
    matters.unshift(matter);
    legalCRM.set('matters', matters);

    // Store test data
    testData.matterId = matter.id;

    // Update UI
    document.getElementById('matterId').textContent = matter.serialNumber;
    document.getElementById('matterTitle').textContent = matter.title;
    document.getElementById('step5Data').style.display = 'block';
    markStepComplete(5);

    // Enable next step
    document.getElementById('step6Btn').disabled = false;
    document.getElementById('step6ViewBtn').disabled = false;

    console.log('✅ Step 5 Complete: Matter Created', matter);
}

// ===== STEP 6: ASSIGN SENIOR ADVOCATE =====
function executeStep6() {
    const matters = legalCRM.get('matters');
    const matter = matters.find(m => m.id === testData.matterId);

    if (!matter) {
        alert('Matter not found!');
        return;
    }

    // Already assigned in creation, just confirm
    matter.leadAdvocate = 'Prateek Mehta (Senior Advocate)';
    matter.collaborators = ['Radhika Sen (Advocate)', 'Anjali Verma (Junior Advocate)', 'Karan Malhotra (Paralegal)'];
    matter.updatedAt = new Date().toISOString();

    legalCRM.set('matters', matters);

    // Update UI
    document.getElementById('seniorAdvocate').textContent = matter.leadAdvocate;
    document.getElementById('step6Data').style.display = 'block';
    markStepComplete(6);

    // Enable next step
    document.getElementById('step7Btn').disabled = false;

    console.log('✅ Step 6 Complete: Senior Advocate Assigned', matter);
}

// ===== STEP 7: CREATE TASKS =====
function executeStep7() {
    const tasks = [
        {
            id: 'TSK-' + Date.now() + '-1',
            title: 'Draft Incorporation Documents',
            description: 'Prepare Memorandum of Association, Articles of Association, and other incorporation documents',
            matterId: testData.matterId,
            assignedTo: 'Radhika Sen',
            priority: 'High',
            status: 'In Progress',
            dueDate: getDateAfterDays(5),
            createdAt: new Date().toISOString()
        },
        {
            id: 'TSK-' + Date.now() + '-2',
            title: 'Prepare Shareholders Agreement',
            description: 'Draft comprehensive shareholders agreement with vesting and exit clauses',
            matterId: testData.matterId,
            assignedTo: 'Radhika Sen',
            priority: 'High',
            status: 'Pending',
            dueDate: getDateAfterDays(7),
            createdAt: new Date().toISOString()
        },
        {
            id: 'TSK-' + Date.now() + '-3',
            title: 'Draft Employment Contracts',
            description: 'Create standard employment agreements for founders and key employees',
            matterId: testData.matterId,
            assignedTo: 'Anjali Verma',
            priority: 'Medium',
            status: 'Pending',
            dueDate: getDateAfterDays(10),
            createdAt: new Date().toISOString()
        },
        {
            id: 'TSK-' + Date.now() + '-4',
            title: 'Trademark Search & Application',
            description: 'Conduct trademark search and file application for company name and logo',
            matterId: testData.matterId,
            assignedTo: 'Karan Malhotra',
            priority: 'Medium',
            status: 'Pending',
            dueDate: getDateAfterDays(15),
            createdAt: new Date().toISOString()
        },
        {
            id: 'TSK-' + Date.now() + '-5',
            title: 'File ROC Documents',
            description: 'Submit all incorporation documents to Registrar of Companies',
            matterId: testData.matterId,
            assignedTo: 'Karan Malhotra',
            priority: 'High',
            status: 'Pending',
            dueDate: getDateAfterDays(8),
            createdAt: new Date().toISOString()
        }
    ];

    // Save tasks
    const existingTasks = legalCRM.get('tasks');
    tasks.forEach(task => existingTasks.unshift(task));
    legalCRM.set('tasks', existingTasks);

    // Store task IDs
    testData.taskIds = tasks.map(t => t.id);

    // Update UI
    document.getElementById('taskCount').textContent = tasks.length;
    document.getElementById('step7Data').style.display = 'block';
    markStepComplete(7);

    // Enable next step
    document.getElementById('step8Btn').disabled = false;

    console.log('✅ Step 7 Complete: Tasks Created', tasks);
}

// ===== STEP 8: COMPLETE TASKS =====
function executeStep8() {
    const tasks = legalCRM.get('tasks');

    // Mark all test tasks as completed
    testData.taskIds.forEach(taskId => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = 'Completed';
            task.completedAt = new Date().toISOString();
        }
    });

    legalCRM.set('tasks', tasks);

    // Update UI
    document.getElementById('completedCount').textContent = testData.taskIds.length;
    document.getElementById('step8Data').style.display = 'block';
    markStepComplete(8);

    // Enable next step
    document.getElementById('step9Btn').disabled = false;
    document.getElementById('step9ViewBtn').disabled = false;

    console.log('✅ Step 8 Complete: All Tasks Completed');
}

// ===== STEP 9: CLOSE MATTER =====
function executeStep9() {
    const matters = legalCRM.get('matters');
    const matter = matters.find(m => m.id === testData.matterId);

    if (!matter) {
        alert('Matter not found!');
        return;
    }

    // Close matter
    matter.status = 'Closed';
    matter.closedDate = new Date().toISOString();
    matter.outcome = 'Successfully Completed';
    matter.notes = 'All incorporation and compliance documents completed. Client onboarded successfully.';
    matter.updatedAt = new Date().toISOString();

    legalCRM.set('matters', matters);

    // Update UI
    document.getElementById('step9Data').style.display = 'block';
    markStepComplete(9);

    // Show summary
    document.getElementById('testSummary').style.display = 'block';

    console.log('✅ Step 9 Complete: Matter Closed Successfully!');
    console.log('🎉 E2E TEST COMPLETED SUCCESSFULLY!');
}

// ===== HELPER FUNCTIONS =====

function markStepComplete(stepNum) {
    const step = document.getElementById('step' + stepNum);
    step.classList.add('completed');

    // Update button
    const executeBtn = document.getElementById('step' + stepNum + 'Btn') ||
                      step.querySelector('.btn-execute');
    if (executeBtn) {
        executeBtn.classList.remove('btn-execute');
        executeBtn.classList.add('btn-completed');
        executeBtn.innerHTML = '✅ Completed';
        executeBtn.disabled = true;
    }

    // Track completion
    if (!completedSteps.includes(stepNum)) {
        completedSteps.push(stepNum);
    }

    updateProgress();
}

function updateProgress() {
    const totalSteps = 9;
    const completed = completedSteps.length;
    const percentage = Math.round((completed / totalSteps) * 100);

    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent =
        `${completed} of ${totalSteps} steps completed (${percentage}%)`;
}

function getNextBusinessDay() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    // Skip weekend
    if (date.getDay() === 0) date.setDate(date.getDate() + 1); // Sunday
    if (date.getDay() === 6) date.setDate(date.getDate() + 2); // Saturday

    return date.toISOString().split('T')[0];
}

function getDateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

function viewLeadDetail() {
    if (testData.leadId) {
        window.location.href = 'lead-detail.html?id=' + testData.leadId;
    }
}

function viewMatterDetail() {
    if (testData.matterId) {
        window.location.href = 'matter-detail.html?id=' + testData.matterId;
    }
}

console.log('✅ E2E Test Script Loaded');
console.log('Ready to test complete workflow: Lead → Client → Matter → Completion');
