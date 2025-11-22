// Contract Intelligence Module
// AI-powered obligation extraction, renewal tracking, and compliance analysis

let currentTab = 'obligations';
let intelligentContracts = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeIntelligentContracts();
    loadDashboardMetrics();
    loadTabContent();
});

function initializeIntelligentContracts() {
    // Initialize sample intelligent contracts if not exists
    if (!localStorage.getItem('intelligentContracts')) {
        const now = new Date();
        const sampleContracts = [
            {
                id: 'ic_' + Date.now(),
                title: 'Loan Agreement - ABC Corporation',
                type: 'loan',
                parties: ['ABC Corporation', 'XYZ Bank Limited'],
                executionDate: new Date('2024-01-15').toISOString(),
                expiryDate: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days from now
                noticePerion: 90,
                contractValue: 1500000,
                currency: 'INR',
                autoRenewal: false,
                renewalType: 'manual',
                status: 'active',
                obligations: [
                    {
                        id: 'obl_1',
                        description: 'Monthly EMI payment of Rs. 65,000',
                        dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                        recurring: true,
                        frequency: 'monthly',
                        status: 'pending',
                        party: 'ABC Corporation'
                    },
                    {
                        id: 'obl_2',
                        description: 'Provide quarterly financial statements',
                        dueDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                        recurring: true,
                        frequency: 'quarterly',
                        status: 'pending',
                        party: 'ABC Corporation'
                    },
                    {
                        id: 'obl_3',
                        description: 'Maintain insurance on collateral property',
                        dueDate: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(),
                        recurring: false,
                        status: 'pending',
                        party: 'ABC Corporation'
                    }
                ],
                complianceClauses: [
                    { clause: 'Interest rate cap at 12% per annum', compliant: true },
                    { clause: 'Proper security documentation', compliant: true },
                    { clause: 'KYC compliance', compliant: true },
                    { clause: 'Stamp duty payment', compliant: false, issue: 'Pending verification' }
                ],
                riskFlags: ['Expiring soon'],
                extractedBy: 'AI',
                extractedAt: new Date().toISOString()
            },
            {
                id: 'ic_' + (Date.now() + 1),
                title: 'Service Agreement - Tech Solutions Pvt Ltd',
                type: 'service',
                parties: ['SNG & Partners', 'Tech Solutions Pvt Ltd'],
                executionDate: new Date('2023-06-01').toISOString(),
                expiryDate: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 180 days
                noticePerion: 60,
                contractValue: 2400000,
                currency: 'INR',
                autoRenewal: true,
                renewalType: 'auto',
                status: 'active',
                obligations: [
                    {
                        id: 'obl_4',
                        description: 'Monthly retainer invoice submission',
                        dueDate: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000).toISOString(),
                        recurring: true,
                        frequency: 'monthly',
                        status: 'pending',
                        party: 'SNG & Partners'
                    },
                    {
                        id: 'obl_5',
                        description: 'Quarterly compliance report',
                        dueDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
                        recurring: true,
                        frequency: 'quarterly',
                        status: 'pending',
                        party: 'SNG & Partners'
                    }
                ],
                complianceClauses: [
                    { clause: 'Service level agreement (SLA) requirements', compliant: true },
                    { clause: 'Confidentiality obligations', compliant: true },
                    { clause: 'Intellectual property rights', compliant: true }
                ],
                riskFlags: [],
                extractedBy: 'AI',
                extractedAt: new Date().toISOString()
            },
            {
                id: 'ic_' + (Date.now() + 2),
                title: 'NDA - Confidential Project Alpha',
                type: 'nda',
                parties: ['SNG & Partners', 'Startup Innovations Inc'],
                executionDate: new Date('2023-11-01').toISOString(),
                expiryDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days
                noticePerion: 30,
                contractValue: 0,
                currency: 'INR',
                autoRenewal: false,
                renewalType: 'one-time',
                status: 'active',
                obligations: [
                    {
                        id: 'obl_6',
                        description: 'Maintain confidentiality of disclosed information',
                        dueDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
                        recurring: false,
                        status: 'pending',
                        party: 'Both Parties'
                    },
                    {
                        id: 'obl_7',
                        description: 'Return all confidential materials upon termination',
                        dueDate: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
                        recurring: false,
                        status: 'pending',
                        party: 'Both Parties'
                    }
                ],
                complianceClauses: [
                    { clause: 'Definition of confidential information', compliant: true },
                    { clause: 'Permitted disclosures clause', compliant: true },
                    { clause: 'Return of materials provision', compliant: true }
                ],
                riskFlags: ['Expiring soon'],
                extractedBy: 'AI',
                extractedAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('intelligentContracts', JSON.stringify(sampleContracts));
    }

    intelligentContracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
}

function loadDashboardMetrics() {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
    const now = new Date();

    // Total contracts
    document.getElementById('totalContractsValue').textContent = contracts.length;

    // Total obligations
    let totalObligations = 0;
    contracts.forEach(contract => {
        totalObligations += contract.obligations.filter(o => o.status === 'pending').length;
    });
    document.getElementById('totalObligations').textContent = totalObligations;

    // Total contract value
    const totalValue = contracts.reduce((sum, c) => sum + (c.contractValue || 0), 0);
    document.getElementById('totalContractValue').textContent = formatCurrency(totalValue);

    // Compliance score (average of compliant clauses)
    let totalClauses = 0;
    let compliantClauses = 0;
    contracts.forEach(contract => {
        contract.complianceClauses.forEach(clause => {
            totalClauses++;
            if (clause.compliant) compliantClauses++;
        });
    });
    const complianceScore = totalClauses > 0 ? Math.round((compliantClauses / totalClauses) * 100) : 0;
    document.getElementById('complianceScore').textContent = complianceScore + '%';

    // Renewal alerts
    let critical = 0, warning = 0, info = 0, autoRenew = 0;

    contracts.forEach(contract => {
        const expiryDate = new Date(contract.expiryDate);
        const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

        if (contract.autoRenewal) {
            autoRenew++;
        }

        if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
            critical++;
        } else if (daysUntilExpiry <= 60 && daysUntilExpiry > 30) {
            warning++;
        } else if (daysUntilExpiry <= 90 && daysUntilExpiry > 60) {
            info++;
        }
    });

    document.getElementById('criticalAlerts').textContent = critical;
    document.getElementById('warningAlerts').textContent = warning;
    document.getElementById('infoAlerts').textContent = info;
    document.getElementById('autoRenewals').textContent = autoRenew;
}

function switchIntelligenceTab(tab) {
    currentTab = tab;

    // Update active tab
    document.querySelectorAll('.intelligence-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    loadTabContent();
}

function loadTabContent() {
    const content = document.getElementById('intelligenceContent');

    switch (currentTab) {
        case 'obligations':
            renderObligationsView(content);
            break;
        case 'renewals':
            renderRenewalsView(content);
            break;
        case 'compliance':
            renderComplianceView(content);
            break;
        case 'value':
            renderValueAnalysisView(content);
            break;
    }
}

function renderObligationsView(container) {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
    const now = new Date();

    let allObligations = [];
    contracts.forEach(contract => {
        contract.obligations.forEach(obl => {
            allObligations.push({
                ...obl,
                contractTitle: contract.title,
                contractId: contract.id
            });
        });
    });

    // Sort by due date
    allObligations.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    container.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <h3 style="margin-bottom: 20px;">📋 Contract Obligations</h3>

            ${allObligations.length === 0 ? `
                <div style="text-align: center; padding: 40px; color: #95a5a6;">
                    <div style="font-size: 48px; margin-bottom: 15px;">📋</div>
                    <p>No obligations found</p>
                </div>
            ` : allObligations.map(obl => {
                const dueDate = new Date(obl.dueDate);
                const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
                const isOverdue = daysUntilDue < 0;
                const isUrgent = daysUntilDue <= 7 && daysUntilDue >= 0;

                return `
                    <div class="obligation-item">
                        <div class="obligation-text">
                            <strong>${obl.description}</strong><br>
                            <small style="color: #7f8c8d;">
                                Contract: ${obl.contractTitle} |
                                Party: ${obl.party} |
                                Due: ${formatDate(obl.dueDate)}
                                ${obl.recurring ? '(Recurring - ' + obl.frequency + ')' : ''}
                            </small>
                        </div>
                        <div>
                            ${isOverdue ?
                                '<span class="obligation-status overdue">Overdue</span>' :
                                isUrgent ?
                                '<span class="obligation-status pending">Due Soon</span>' :
                                '<span class="obligation-status pending">Pending</span>'
                            }
                            <button class="btn btn-secondary" style="margin-left: 10px; padding: 6px 12px; font-size: 12px;"
                                    onclick="markObligationComplete('${obl.contractId}', '${obl.id}')">
                                ✓ Mark Complete
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderRenewalsView(container) {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
    const now = new Date();

    // Filter and sort by expiry date
    const activeContracts = contracts.filter(c => c.status === 'active');
    activeContracts.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

    container.innerHTML = `
        <div>
            ${activeContracts.map(contract => {
                const expiryDate = new Date(contract.expiryDate);
                const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

                let cardClass = 'active';
                if (daysUntilExpiry <= 0) cardClass = 'expired';
                else if (daysUntilExpiry <= 30) cardClass = 'expiring';
                else if (contract.autoRenewal) cardClass = 'renewal';

                const noticeDate = new Date(expiryDate.getTime() - (contract.noticePerion * 24 * 60 * 60 * 1000));
                const daysUntilNotice = Math.ceil((noticeDate - now) / (1000 * 60 * 60 * 24));

                return `
                    <div class="contract-card ${cardClass}">
                        <div class="contract-header">
                            <div>
                                <div class="contract-title">${contract.title}</div>
                                <div class="contract-meta">
                                    <span class="contract-meta-item">
                                        📅 Expires: ${formatDate(contract.expiryDate)}
                                        ${daysUntilExpiry > 0 ? `(${daysUntilExpiry} days)` : '(Expired)'}
                                    </span>
                                    <span class="contract-meta-item">
                                        🔔 Notice Period: ${contract.noticePerion} days
                                    </span>
                                    <span class="contract-meta-item">
                                        ${contract.autoRenewal ? '♻️ Auto-Renewal' : '📝 Manual Renewal'}
                                    </span>
                                </div>
                            </div>
                            <div>
                                ${daysUntilExpiry <= 30 && daysUntilExpiry > 0 ?
                                    '<span class="badge" style="background: #e74c3c;">🔴 Critical</span>' :
                                    daysUntilExpiry <= 60 ?
                                    '<span class="badge" style="background: #f39c12;">🟡 Warning</span>' :
                                    daysUntilExpiry <= 90 ?
                                    '<span class="badge" style="background: #3498db;">🔵 Info</span>' :
                                    '<span class="badge" style="background: #27ae60;">✅ Active</span>'
                                }
                            </div>
                        </div>

                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                                <div>
                                    <strong>Execution Date:</strong><br>
                                    ${formatDate(contract.executionDate)}
                                </div>
                                <div>
                                    <strong>Notice Deadline:</strong><br>
                                    ${formatDate(noticeDate)}
                                    ${daysUntilNotice > 0 && daysUntilNotice <= 30 ?
                                        '<br><span style="color: #e74c3c; font-weight: 600;">⚠️ Notice due soon!</span>' : ''
                                    }
                                </div>
                                <div>
                                    <strong>Parties:</strong><br>
                                    ${contract.parties.join(', ')}
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="btn btn-primary" onclick="initiateRenewal('${contract.id}')">
                                ♻️ Initiate Renewal
                            </button>
                            <button class="btn btn-secondary" onclick="sendRenewalReminder('${contract.id}')">
                                📧 Send Reminder
                            </button>
                            <button class="btn btn-secondary" onclick="viewContractDetails('${contract.id}')">
                                👁️ View Details
                            </button>
                            ${!contract.autoRenewal ? `
                                <button class="btn btn-secondary" onclick="enableAutoRenewal('${contract.id}')">
                                    🔄 Enable Auto-Renewal
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderComplianceView(container) {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');

    container.innerHTML = `
        <div>
            ${contracts.map(contract => {
                const totalClauses = contract.complianceClauses.length;
                const compliantClauses = contract.complianceClauses.filter(c => c.compliant).length;
                const complianceRate = Math.round((compliantClauses / totalClauses) * 100);

                return `
                    <div class="contract-card ${complianceRate === 100 ? 'active' : 'expiring'}">
                        <div class="contract-header">
                            <div>
                                <div class="contract-title">${contract.title}</div>
                                <div class="contract-meta">
                                    <span class="contract-meta-item">
                                        Compliance Rate: ${complianceRate}% (${compliantClauses}/${totalClauses} clauses)
                                    </span>
                                </div>
                            </div>
                            ${complianceRate === 100 ?
                                '<span class="badge" style="background: #27ae60;">✅ Fully Compliant</span>' :
                                '<span class="badge" style="background: #f39c12;">⚠️ Issues Found</span>'
                            }
                        </div>

                        <div class="compliance-checker">
                            ${contract.complianceClauses.map(clause => `
                                <div class="compliance-item">
                                    <div class="compliance-icon">
                                        ${clause.compliant ? '✅' : '❌'}
                                    </div>
                                    <div class="compliance-content">
                                        <div class="compliance-title">${clause.clause}</div>
                                        ${clause.issue ?
                                            `<div class="compliance-description" style="color: #e74c3c;">
                                                ⚠️ ${clause.issue}
                                            </div>` :
                                            clause.compliant ?
                                            '<div class="compliance-description" style="color: #27ae60;">Compliant</div>' :
                                            '<div class="compliance-description" style="color: #e74c3c;">Non-compliant</div>'
                                        }
                                    </div>
                                    ${!clause.compliant ? `
                                        <button class="btn btn-secondary" style="padding: 8px 16px; font-size: 13px;"
                                                onclick="resolveComplianceIssue('${contract.id}', '${clause.clause}')">
                                            Resolve
                                        </button>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderValueAnalysisView(container) {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');

    // Calculate metrics
    const totalValue = contracts.reduce((sum, c) => sum + (c.contractValue || 0), 0);
    const activeValue = contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + (c.contractValue || 0), 0);
    const avgValue = contracts.length > 0 ? totalValue / contracts.length : 0;

    // Group by type
    const valueByType = {};
    contracts.forEach(contract => {
        if (!valueByType[contract.type]) {
            valueByType[contract.type] = 0;
        }
        valueByType[contract.type] += contract.contractValue || 0;
    });

    container.innerHTML = `
        <div class="value-analysis">
            <div class="value-card">
                <div class="value-card-header">
                    <div class="value-card-title">Total Contract Value</div>
                    <span style="font-size: 32px;">💰</span>
                </div>
                <div class="value-amount">${formatCurrency(totalValue)}</div>
                <div class="value-details">Across ${contracts.length} contracts</div>
            </div>

            <div class="value-card">
                <div class="value-card-header">
                    <div class="value-card-title">Active Contract Value</div>
                    <span style="font-size: 32px;">✅</span>
                </div>
                <div class="value-amount">${formatCurrency(activeValue)}</div>
                <div class="value-details">Currently in force</div>
            </div>

            <div class="value-card">
                <div class="value-card-header">
                    <div class="value-card-title">Average Contract Value</div>
                    <span style="font-size: 32px;">📊</span>
                </div>
                <div class="value-amount">${formatCurrency(avgValue)}</div>
                <div class="value-details">Per contract</div>
            </div>
        </div>

        <div class="contract-card">
            <h3 style="margin-bottom: 20px;">💼 Value by Contract Type</h3>
            ${Object.keys(valueByType).map(type => {
                const percentage = Math.round((valueByType[type] / totalValue) * 100);
                return `
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <strong style="text-transform: capitalize;">${type}</strong>
                            <span>${formatCurrency(valueByType[type])} (${percentage}%)</span>
                        </div>
                        <div style="background: #e9ecef; height: 20px; border-radius: 10px; overflow: hidden;">
                            <div style="background: linear-gradient(135deg, #667eea, #764ba2); height: 100%; width: ${percentage}%; transition: width 0.3s ease;"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function analyzeNewContract() {
    showNotification('Opening AI contract analyzer...', 'info');
    // In real implementation, this would integrate with the document processing module
    window.location.href = 'document-processing.html';
}

function initiateRenewal(contractId) {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
    const contract = contracts.find(c => c.id === contractId);

    if (!contract) return;

    if (confirm(`Initiate renewal process for "${contract.title}"?`)) {
        showNotification('Renewal process initiated. Notification sent to all parties.', 'success');

        // In real implementation, this would:
        // 1. Generate renewal documents
        // 2. Send notifications
        // 3. Create tasks for review and signature
        // 4. Update contract status
    }
}

function sendRenewalReminder(contractId) {
    showNotification('Renewal reminder sent to all parties', 'success');
}

function enableAutoRenewal(contractId) {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
    const index = contracts.findIndex(c => c.id === contractId);

    if (index !== -1) {
        contracts[index].autoRenewal = true;
        contracts[index].renewalType = 'auto';
        localStorage.setItem('intelligentContracts', JSON.stringify(contracts));

        loadDashboardMetrics();
        loadTabContent();
        showNotification('Auto-renewal enabled', 'success');
    }
}

function viewContractDetails(contractId) {
    showNotification('Opening contract details...', 'info');
    // In real implementation, open detailed contract view
}

function markObligationComplete(contractId, obligationId) {
    const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
    const contractIndex = contracts.findIndex(c => c.id === contractId);

    if (contractIndex !== -1) {
        const oblIndex = contracts[contractIndex].obligations.findIndex(o => o.id === obligationId);
        if (oblIndex !== -1) {
            contracts[contractIndex].obligations[oblIndex].status = 'completed';
            localStorage.setItem('intelligentContracts', JSON.stringify(contracts));

            loadDashboardMetrics();
            loadTabContent();
            showNotification('Obligation marked as complete', 'success');
        }
    }
}

function resolveComplianceIssue(contractId, clause) {
    if (confirm(`Mark compliance issue as resolved for: "${clause}"?`)) {
        const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
        const contractIndex = contracts.findIndex(c => c.id === contractId);

        if (contractIndex !== -1) {
            const clauseIndex = contracts[contractIndex].complianceClauses.findIndex(c => c.clause === clause);
            if (clauseIndex !== -1) {
                contracts[contractIndex].complianceClauses[clauseIndex].compliant = true;
                delete contracts[contractIndex].complianceClauses[clauseIndex].issue;
                localStorage.setItem('intelligentContracts', JSON.stringify(contracts));

                loadDashboardMetrics();
                loadTabContent();
                showNotification('Compliance issue resolved', 'success');
            }
        }
    }
}

function applyFilters() {
    // In real implementation, filter contracts based on selected filters
    loadTabContent();
}

function exportAnalytics() {
    showNotification('Exporting contract analytics report...', 'success');
    // In real implementation, generate and download analytics report
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}
