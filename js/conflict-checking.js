// Conflict Checking Module
// Identifies potential conflicts of interest

let opposingParties = [];
let relatedEntities = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCheckHistory();
});

// ===== ADD ENTITIES =====

function addOpposingParty() {
    const input = document.getElementById('opposingPartyInput');
    const name = input.value.trim();

    if (name && !opposingParties.includes(name)) {
        opposingParties.push(name);
        updateOpposingPartiesList();
        input.value = '';
    }
}

function removeOpposingParty(index) {
    opposingParties.splice(index, 1);
    updateOpposingPartiesList();
}

function updateOpposingPartiesList() {
    const container = document.getElementById('opposingPartiesList');
    container.innerHTML = opposingParties.map((party, index) => `
        <span class="entity-tag">
            ${escapeHtml(party)}
            <span class="entity-remove" onclick="removeOpposingParty(${index})">×</span>
        </span>
    `).join('');
}

function addRelatedEntity() {
    const input = document.getElementById('relatedEntityInput');
    const name = input.value.trim();

    if (name && !relatedEntities.includes(name)) {
        relatedEntities.push(name);
        updateRelatedEntitiesList();
        input.value = '';
    }
}

function removeRelatedEntity(index) {
    relatedEntities.splice(index, 1);
    updateRelatedEntitiesList();
}

function updateRelatedEntitiesList() {
    const container = document.getElementById('relatedEntitiesList');
    container.innerHTML = relatedEntities.map((entity, index) => `
        <span class="entity-tag">
            ${escapeHtml(entity)}
            <span class="entity-remove" onclick="removeRelatedEntity(${index})">×</span>
        </span>
    `).join('');
}

// ===== CONFLICT CHECK =====

function runConflictCheck(event) {
    event.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const matterType = document.getElementById('matterType').value;

    // Get existing data
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    const matters = JSON.parse(localStorage.getItem('matters') || '[]');
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');

    // Run conflict analysis
    const conflicts = [];
    const warnings = [];

    // Check 1: Is this client already in the system?
    const existingClient = clients.find(c =>
        c.name.toLowerCase() === clientName.toLowerCase()
    );

    if (existingClient) {
        warnings.push({
            type: 'Existing Client',
            message: `${clientName} is already a client in the system.`,
            details: `Client ID: ${existingClient.id}`,
            matter: null
        });
    }

    // Check 2: Is this client an opposing party in any active matter?
    matters.forEach(matter => {
        if (matter.opposingParty &&
            matter.opposingParty.toLowerCase() === clientName.toLowerCase() &&
            matter.status !== 'Closed') {
            conflicts.push({
                type: 'Direct Conflict',
                message: `${clientName} is listed as an opposing party in an active matter.`,
                details: `This creates a direct conflict of interest.`,
                matter: matter
            });
        }
    });

    // Check 3: Are any opposing parties current clients?
    opposingParties.forEach(party => {
        const isClient = clients.find(c =>
            c.name.toLowerCase() === party.toLowerCase()
        );

        if (isClient) {
            conflicts.push({
                type: 'Adverse Interest',
                message: `Opposing party "${party}" is an existing client.`,
                details: `Representing a client against another client creates a conflict.`,
                matter: null
            });
        }

        // Check if opposing party is in any active matter we represent
        matters.forEach(matter => {
            const matterClient = clients.find(c => c.id === matter.clientId);
            if (matterClient && matterClient.name.toLowerCase() === party.toLowerCase()) {
                conflicts.push({
                    type: 'Client Adverse to Client',
                    message: `Opposing party "${party}" is our client in another matter.`,
                    details: `Cannot represent clients with adverse interests.`,
                    matter: matter
                });
            }
        });
    });

    // Check 4: Related entities check
    relatedEntities.forEach(entity => {
        const isClient = clients.find(c =>
            c.name.toLowerCase().includes(entity.toLowerCase()) ||
            entity.toLowerCase().includes(c.name.toLowerCase())
        );

        if (isClient) {
            warnings.push({
                type: 'Related Entity Warning',
                message: `Related entity "${entity}" may be connected to existing client "${isClient.name}".`,
                details: `Review for potential conflicts or confidentiality issues.`,
                matter: null
            });
        }
    });

    // Check 5: Similar matter type for same client
    if (existingClient) {
        const similarMatters = matters.filter(m =>
            m.clientId === existingClient.id &&
            m.type === matterType &&
            m.status !== 'Closed'
        );

        if (similarMatters.length > 0) {
            warnings.push({
                type: 'Duplicate Matter',
                message: `Client already has ${similarMatters.length} active ${matterType} matter(s).`,
                details: `Verify this is a new matter and not a duplicate.`,
                matter: similarMatters[0]
            });
        }
    }

    // Determine overall result
    let resultType = 'clear';
    let resultMessage = 'No Conflicts Detected';
    let resultIcon = '✅';

    if (conflicts.length > 0) {
        resultType = 'conflict';
        resultMessage = `${conflicts.length} Conflict(s) Detected`;
        resultIcon = '❌';
    } else if (warnings.length > 0) {
        resultType = 'warning';
        resultMessage = `${warnings.length} Warning(s) - Review Required`;
        resultIcon = '⚠️';
    }

    // Display results
    displayResults(resultType, resultMessage, resultIcon, conflicts, warnings, clientName);

    // Save to history
    saveToHistory({
        id: 'check_' + Date.now(),
        clientName: clientName,
        matterType: matterType,
        opposingParties: [...opposingParties],
        relatedEntities: [...relatedEntities],
        resultType: resultType,
        conflictsCount: conflicts.length,
        warningsCount: warnings.length,
        conflicts: conflicts,
        warnings: warnings,
        timestamp: new Date().toISOString(),
        checkedBy: 'Current User'
    });

    // Reset form
    opposingParties = [];
    relatedEntities = [];
    updateOpposingPartiesList();
    updateRelatedEntitiesList();
}

function displayResults(resultType, resultMessage, resultIcon, conflicts, warnings, clientName) {
    const container = document.getElementById('resultsContainer');

    let recommendationsHTML = '';
    if (resultType === 'conflict') {
        recommendationsHTML = `
            <div class="recommendation-section">
                <div class="recommendation-title">⚠️ Recommended Actions:</div>
                <ul class="recommendation-list">
                    <li>Do NOT proceed with engagement without conflict waiver</li>
                    <li>Consult with conflicts committee or senior partner</li>
                    <li>Consider whether conflict can be waived by all parties</li>
                    <li>Document all conflict analysis and decisions</li>
                    <li>If proceeding, obtain written informed consent from all affected clients</li>
                </ul>
            </div>
        `;
    } else if (resultType === 'warning') {
        recommendationsHTML = `
            <div class="recommendation-section">
                <div class="recommendation-title">📋 Recommended Actions:</div>
                <ul class="recommendation-list">
                    <li>Review warnings carefully before proceeding</li>
                    <li>Verify all related parties and relationships</li>
                    <li>Consider implementing ethical walls if necessary</li>
                    <li>Document your conflict analysis</li>
                    <li>Proceed with caution and ongoing monitoring</li>
                </ul>
            </div>
        `;
    } else {
        recommendationsHTML = `
            <div class="recommendation-section">
                <div class="recommendation-title">✅ Next Steps:</div>
                <ul class="recommendation-list">
                    <li>No conflicts detected - safe to proceed</li>
                    <li>Create client record and engagement letter</li>
                    <li>Continue to monitor for conflicts throughout representation</li>
                    <li>Keep conflict check documentation on file</li>
                </ul>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="results-section">
            <div class="result-header">
                <div class="result-icon ${resultType}">
                    ${resultIcon}
                </div>
                <div>
                    <div class="result-title ${resultType}">${resultMessage}</div>
                    <div style="color: #6b7280; margin-top: 5px;">
                        Conflict check for: ${escapeHtml(clientName)}
                    </div>
                </div>
            </div>

            ${conflicts.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #991b1b; margin-bottom: 15px;">🚨 Conflicts Detected</h3>
                    <div class="conflicts-list">
                        ${conflicts.map(conflict => `
                            <div class="conflict-item">
                                <div class="conflict-type">${conflict.type}</div>
                                <div class="conflict-details">
                                    ${escapeHtml(conflict.message)}<br>
                                    ${escapeHtml(conflict.details)}
                                </div>
                                ${conflict.matter ? `
                                    <div class="conflict-matter">
                                        <strong>Related Matter:</strong> ${escapeHtml(conflict.matter.serialNumber)} - ${escapeHtml(conflict.matter.title)}
                                        <br><strong>Status:</strong> ${conflict.matter.status}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${warnings.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #92400e; margin-bottom: 15px;">⚠️ Warnings</h3>
                    <div class="conflicts-list">
                        ${warnings.map(warning => `
                            <div class="warning-item">
                                <div class="conflict-type">${warning.type}</div>
                                <div class="conflict-details">
                                    ${escapeHtml(warning.message)}<br>
                                    ${escapeHtml(warning.details)}
                                </div>
                                ${warning.matter ? `
                                    <div class="conflict-matter">
                                        <strong>Related Matter:</strong> ${escapeHtml(warning.matter.serialNumber)} - ${escapeHtml(warning.matter.title)}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${conflicts.length === 0 && warnings.length === 0 ? `
                <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <div style="color: #065f46; font-weight: 500; margin-bottom: 10px;">
                        ✅ All Clear
                    </div>
                    <div style="color: #6b7280;">
                        No conflicts or warnings detected. This matter can proceed subject to standard engagement procedures.
                    </div>
                </div>
            ` : ''}

            ${recommendationsHTML}

            <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #9ca3af; font-size: 13px;">
                <strong>Note:</strong> This automated conflict check is a preliminary screening tool.
                Always conduct thorough due diligence and consult your conflicts committee for complex situations.
            </div>
        </div>
    `;

    // Switch to results tab
    switchTab('results');
}

// ===== HISTORY =====

function saveToHistory(check) {
    const history = JSON.parse(localStorage.getItem('conflictCheckHistory') || '[]');
    history.unshift(check);
    localStorage.setItem('conflictCheckHistory', JSON.stringify(history));

    loadCheckHistory();
}

function loadCheckHistory() {
    const history = JSON.parse(localStorage.getItem('conflictCheckHistory') || '[]');
    const container = document.getElementById('checkHistory');

    if (history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📜</div>
                <h3>No conflict checks in history</h3>
                <p>Your conflict check history will appear here</p>
            </div>
        `;
        return;
    }

    container.innerHTML = history.map(check => `
        <div class="history-item" onclick="viewHistoryCheck('${check.id}')">
            <div class="history-date">
                <div style="font-size: 12px; color: #9ca3af;">${formatDate(check.timestamp)}</div>
                <div style="font-size: 11px; color: #9ca3af; margin-top: 5px;">${formatTime(check.timestamp)}</div>
            </div>
            <div class="history-details">
                <div class="history-client">${escapeHtml(check.clientName)}</div>
                <div class="history-entities">
                    ${check.matterType ? `Type: ${escapeHtml(check.matterType)}` : ''}
                    ${check.opposingParties.length > 0 ? ` • ${check.opposingParties.length} opposing partie(s)` : ''}
                    ${check.relatedEntities.length > 0 ? ` • ${check.relatedEntities.length} related entit(ies)` : ''}
                </div>
                <div style="font-size: 12px; color: #9ca3af; margin-top: 5px;">
                    ${check.conflictsCount} conflict(s) • ${check.warningsCount} warning(s)
                </div>
            </div>
            <div class="history-result ${check.resultType}">
                ${check.resultType === 'clear' ? '✅ Clear' : check.resultType === 'warning' ? '⚠️ Warning' : '❌ Conflict'}
            </div>
        </div>
    `).join('');
}

function viewHistoryCheck(id) {
    const history = JSON.parse(localStorage.getItem('conflictCheckHistory') || '[]');
    const check = history.find(h => h.id === id);

    if (!check) return;

    let resultType = check.resultType;
    let resultMessage = check.resultType === 'clear' ? 'No Conflicts Detected' :
                       check.resultType === 'warning' ? `${check.warningsCount} Warning(s)` :
                       `${check.conflictsCount} Conflict(s)`;
    let resultIcon = check.resultType === 'clear' ? '✅' :
                    check.resultType === 'warning' ? '⚠️' : '❌';

    displayResults(resultType, resultMessage, resultIcon, check.conflicts, check.warnings, check.clientName);
}

// ===== TAB SWITCHING =====

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tabName === 'results') {
        document.getElementById('resultsTab').classList.add('active');
    } else if (tabName === 'history') {
        document.getElementById('historyTab').classList.add('active');
        loadCheckHistory();
    }
}

// ===== UTILITY FUNCTIONS =====

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('✅ Conflict Checking module loaded');
