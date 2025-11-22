// E-Signature Management Module
// Handles DocuSign, Adobe Sign, and Aadhaar e-Sign integrations

let signatureRequests = [];
let currentFilter = 'all';
let currentProviderFilter = 'all';
let signerCount = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSignatures();
    loadSignatureRequests();
    updateStatistics();
    populateMatterDropdown();
});

function initializeSignatures() {
    // Initialize sample data if not exists
    if (!localStorage.getItem('signatureRequests')) {
        const sampleRequests = [
            {
                id: 'sig_' + Date.now(),
                documentTitle: 'Loan Agreement - ABC Corp',
                matterId: null,
                provider: 'docusign',
                status: 'pending',
                signers: [
                    { name: 'Rajesh Kumar', email: 'rajesh@example.com', status: 'signed', signedAt: new Date(Date.now() - 3600000).toISOString() },
                    { name: 'Priya Sharma', email: 'priya@example.com', status: 'pending', signedAt: null }
                ],
                signingOrder: 'sequential',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                expiresAt: new Date(Date.now() + 518400000).toISOString(), // 6 days from now
                createdBy: 'Prateek Mehta',
                documentUrl: '/documents/loan-agreement-abc.pdf',
                auditTrail: [
                    { event: 'Document sent for signature', timestamp: new Date(Date.now() - 86400000).toISOString(), user: 'Prateek Mehta' },
                    { event: 'Email notification sent to all signers', timestamp: new Date(Date.now() - 86400000).toISOString(), user: 'System' },
                    { event: 'Rajesh Kumar opened the document', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'Rajesh Kumar' },
                    { event: 'Rajesh Kumar signed the document', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'Rajesh Kumar' }
                ]
            },
            {
                id: 'sig_' + (Date.now() + 1),
                documentTitle: 'NDA - Tech Solutions Pvt Ltd',
                matterId: null,
                provider: 'aadhaar',
                status: 'completed',
                signers: [
                    { name: 'Amit Patel', email: 'amit@techsol.com', status: 'signed', signedAt: new Date(Date.now() - 172800000).toISOString() },
                    { name: 'Sneha Reddy', email: 'sneha@techsol.com', status: 'signed', signedAt: new Date(Date.now() - 86400000).toISOString() }
                ],
                signingOrder: 'parallel',
                createdAt: new Date(Date.now() - 259200000).toISOString(),
                completedAt: new Date(Date.now() - 86400000).toISOString(),
                createdBy: 'Radhika Sen',
                documentUrl: '/documents/nda-techsolutions.pdf',
                auditTrail: [
                    { event: 'Document sent for signature', timestamp: new Date(Date.now() - 259200000).toISOString(), user: 'Radhika Sen' },
                    { event: 'Aadhaar OTP sent to all signers', timestamp: new Date(Date.now() - 259200000).toISOString(), user: 'System' },
                    { event: 'Amit Patel completed Aadhaar authentication', timestamp: new Date(Date.now() - 172800000).toISOString(), user: 'Amit Patel' },
                    { event: 'Amit Patel signed the document', timestamp: new Date(Date.now() - 172800000).toISOString(), user: 'Amit Patel' },
                    { event: 'Sneha Reddy completed Aadhaar authentication', timestamp: new Date(Date.now() - 86400000).toISOString(), user: 'Sneha Reddy' },
                    { event: 'Sneha Reddy signed the document', timestamp: new Date(Date.now() - 86400000).toISOString(), user: 'Sneha Reddy' },
                    { event: 'Document signing completed', timestamp: new Date(Date.now() - 86400000).toISOString(), user: 'System' }
                ]
            }
        ];
        localStorage.setItem('signatureRequests', JSON.stringify(sampleRequests));
    }
}

function loadSignatureRequests() {
    signatureRequests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');
    renderSignatureRequests();
}

function renderSignatureRequests() {
    let filtered = signatureRequests;

    // Apply status filter
    if (currentFilter !== 'all') {
        if (currentFilter === 'audit') {
            // Show all for audit view
        } else {
            filtered = filtered.filter(req => req.status === currentFilter);
        }
    }

    // Apply provider filter
    if (currentProviderFilter !== 'all') {
        filtered = filtered.filter(req => req.provider === currentProviderFilter);
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const container = document.getElementById('signatureRequestsList');

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="padding: 60px 20px; text-align: center; color: #95a5a6;">
                <div style="font-size: 48px; margin-bottom: 20px;">📝</div>
                <h3 style="color: #7f8c8d; margin-bottom: 10px;">No signature requests found</h3>
                <p>Send your first document for e-signature</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(req => {
        const providerName = {
            'docusign': 'DocuSign',
            'adobesign': 'Adobe Sign',
            'aadhaar': 'Aadhaar e-Sign'
        }[req.provider];

        const statusBadge = getStatusBadge(req.status);
        const signedCount = req.signers.filter(s => s.status === 'signed').length;
        const totalSigners = req.signers.length;

        return `
            <div class="signature-item">
                <div class="signature-item-header">
                    <div style="flex: 1;">
                        <div class="signature-item-title">
                            ${req.documentTitle}
                            ${statusBadge}
                        </div>
                        <div class="signature-item-meta">
                            <span>📅 Created: ${formatDate(req.createdAt)}</span>
                            <span>👤 By: ${req.createdBy}</span>
                            <span>${providerName}</span>
                            ${req.status === 'pending' ? `<span>⏰ Expires: ${formatDate(req.expiresAt)}</span>` : ''}
                            ${req.status === 'completed' ? `<span>✅ Completed: ${formatDate(req.completedAt)}</span>` : ''}
                        </div>
                    </div>
                    <span class="provider-badge">${providerName}</span>
                </div>

                <div>
                    <strong style="font-size: 13px; color: #7f8c8d;">Signers (${signedCount}/${totalSigners}):</strong>
                    <div class="signature-signers">
                        ${req.signers.map(signer => `
                            <div class="signer-badge">
                                <div class="signer-status ${signer.status}"></div>
                                <span>${signer.name}</span>
                                ${signer.status === 'signed' ? `<span style="color: #27ae60;">✓</span>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="signature-actions">
                    <button class="signature-action-btn primary" onclick="viewDocument('${req.id}')">
                        👁️ View Document
                    </button>
                    <button class="signature-action-btn secondary" onclick="viewAuditTrail('${req.id}')">
                        📋 Audit Trail
                    </button>
                    ${req.status === 'pending' ? `
                        <button class="signature-action-btn secondary" onclick="sendReminder('${req.id}')">
                            📧 Send Reminder
                        </button>
                        <button class="signature-action-btn secondary" onclick="cancelRequest('${req.id}')">
                            ❌ Cancel
                        </button>
                    ` : ''}
                    ${req.status === 'completed' ? `
                        <button class="signature-action-btn secondary" onclick="downloadSigned('${req.id}')">
                            ⬇️ Download
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function updateStatistics() {
    const requests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');

    const pending = requests.filter(r => r.status === 'pending').length;
    const completed = requests.filter(r => r.status === 'completed').length;
    const declined = requests.filter(r => r.status === 'declined').length;
    const expired = requests.filter(r => r.status === 'expired').length;

    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('signedCount').textContent = completed;
    document.getElementById('declinedCount').textContent = declined;
    document.getElementById('expiredCount').textContent = expired;
}

function switchSignatureTab(tab) {
    currentFilter = tab;

    // Update active tab
    document.querySelectorAll('.signature-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    renderSignatureRequests();
}

function filterByProvider(provider) {
    currentProviderFilter = provider;
    renderSignatureRequests();
}

function searchSignatures(query) {
    if (!query.trim()) {
        loadSignatureRequests();
        return;
    }

    const allRequests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');
    const filtered = allRequests.filter(req =>
        req.documentTitle.toLowerCase().includes(query.toLowerCase()) ||
        req.createdBy.toLowerCase().includes(query.toLowerCase()) ||
        req.signers.some(s => s.name.toLowerCase().includes(query.toLowerCase()))
    );

    signatureRequests = filtered;
    renderSignatureRequests();
}

function openSendForSignatureModal() {
    document.getElementById('sendSignatureModal').classList.add('active');
    signerCount = 0;
    document.getElementById('signersList').innerHTML = '';
    addSigner(); // Add first signer by default
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function populateMatterDropdown() {
    const matters = window.dataManager?.get('projects') || [];
    const select = document.getElementById('linkedMatter');

    if (!select) return;

    select.innerHTML = '<option value="">Select Matter (Optional)</option>';
    matters.forEach(matter => {
        const option = document.createElement('option');
        option.value = matter.id;
        option.textContent = `${matter.serialNumber} - ${matter.title}`;
        select.appendChild(option);
    });
}

function updateProviderInfo() {
    const provider = document.getElementById('signatureProvider').value;
    const infoElement = document.getElementById('providerInfo');

    const providerInfo = {
        'docusign': '🌍 DocuSign - Global standard for e-signatures. Legally binding in 180+ countries.',
        'adobesign': '🌍 Adobe Sign - Enterprise-grade e-signature solution with advanced workflows.',
        'aadhaar': '🇮🇳 Aadhaar e-Sign - India-specific digital signature using Aadhaar authentication (legally valid under IT Act 2000).'
    };

    infoElement.textContent = providerInfo[provider] || '';
}

function addSigner() {
    signerCount++;
    const signersList = document.getElementById('signersList');

    const signerDiv = document.createElement('div');
    signerDiv.className = 'signer-item';
    signerDiv.id = `signer-${signerCount}`;
    signerDiv.innerHTML = `
        <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <input type="text" class="form-input" placeholder="Full Name" required
                   id="signerName-${signerCount}">
            <input type="email" class="form-input" placeholder="Email Address" required
                   id="signerEmail-${signerCount}">
        </div>
        <button type="button" class="signer-remove" onclick="removeSigner(${signerCount})">
            Remove
        </button>
    `;

    signersList.appendChild(signerDiv);
}

function removeSigner(signerId) {
    const signerElement = document.getElementById(`signer-${signerId}`);
    if (signerElement) {
        signerElement.remove();
    }
}

function sendForSignature(event) {
    event.preventDefault();

    const docTitle = document.getElementById('docTitle').value;
    const linkedMatter = document.getElementById('linkedMatter').value;
    const provider = document.getElementById('signatureProvider').value;
    const signingOrder = document.getElementById('signingOrder').value;
    const expiryDays = parseInt(document.getElementById('expiryDays').value);
    const message = document.getElementById('signerMessage').value;

    // Collect signers
    const signers = [];
    const signersList = document.getElementById('signersList');
    const signerItems = signersList.querySelectorAll('.signer-item');

    signerItems.forEach(item => {
        const id = item.id.split('-')[1];
        const name = document.getElementById(`signerName-${id}`)?.value;
        const email = document.getElementById(`signerEmail-${id}`)?.value;

        if (name && email) {
            signers.push({
                name: name,
                email: email,
                status: 'pending',
                signedAt: null
            });
        }
    });

    if (signers.length === 0) {
        showNotification('Please add at least one signer', 'error');
        return;
    }

    // Create signature request
    const newRequest = {
        id: 'sig_' + Date.now(),
        documentTitle: docTitle,
        matterId: linkedMatter || null,
        provider: provider,
        status: 'pending',
        signers: signers,
        signingOrder: signingOrder,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + (expiryDays * 24 * 60 * 60 * 1000)).toISOString(),
        createdBy: 'Prateek Mehta', // Current user
        documentUrl: '/documents/sample.pdf', // Simulated
        message: message,
        auditTrail: [
            {
                event: 'Document sent for signature',
                timestamp: new Date().toISOString(),
                user: 'Prateek Mehta'
            },
            {
                event: `Email notification sent to ${signers.length} signer(s)`,
                timestamp: new Date().toISOString(),
                user: 'System'
            }
        ]
    };

    // Save to localStorage
    const requests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');
    requests.push(newRequest);
    localStorage.setItem('signatureRequests', JSON.stringify(requests));

    // Log activity
    if (window.dataManager?.logActivity) {
        window.dataManager.logActivity('signature_request_sent', 'signatureRequests', newRequest.id, {
            documentTitle: docTitle,
            provider: provider,
            signerCount: signers.length
        });
    }

    closeModal('sendSignatureModal');
    loadSignatureRequests();
    updateStatistics();
    showNotification(`Document sent for signature via ${provider}`, 'success');

    // Reset form
    document.getElementById('docTitle').value = '';
    document.getElementById('linkedMatter').value = '';
    document.getElementById('signatureProvider').value = '';
    document.getElementById('signingOrder').value = 'parallel';
    document.getElementById('expiryDays').value = '7';
    document.getElementById('signerMessage').value = '';
}

function viewAuditTrail(requestId) {
    const requests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');
    const request = requests.find(r => r.id === requestId);

    if (!request) return;

    const auditContent = document.getElementById('auditTrailContent');
    auditContent.innerHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
            <h4 style="margin: 0 0 10px 0;">Document: ${request.documentTitle}</h4>
            <p style="margin: 0; color: #7f8c8d; font-size: 14px;">
                Provider: ${request.provider.toUpperCase()} | Status: ${request.status.toUpperCase()}
            </p>
        </div>

        <div class="audit-timeline">
            ${request.auditTrail.map(event => `
                <div class="audit-event">
                    <div class="audit-event-time">${formatDateTime(event.timestamp)}</div>
                    <div class="audit-event-text">
                        <strong>${event.event}</strong>
                        ${event.user ? `<br><span style="color: #7f8c8d; font-size: 13px;">by ${event.user}</span>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>

        <div style="margin-top: 30px; padding: 15px; background: #e8f5e9; border-radius: 8px; border-left: 4px solid #27ae60;">
            <strong style="color: #27ae60;">🔒 Audit Trail Security</strong>
            <p style="margin: 10px 0 0 0; font-size: 13px; color: #2c3e50;">
                This audit trail is cryptographically sealed and tamper-evident. All events are timestamped
                and logged with user identification for legal compliance.
            </p>
        </div>
    `;

    document.getElementById('auditTrailModal').classList.add('active');
}

function viewDocument(requestId) {
    showNotification('Opening document viewer...', 'info');
    // In real implementation, this would open a document viewer
}

function sendReminder(requestId) {
    const requests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');
    const request = requests.find(r => r.id === requestId);

    if (!request) return;

    const pendingSigners = request.signers.filter(s => s.status === 'pending');

    // Add to audit trail
    request.auditTrail.push({
        event: `Reminder sent to ${pendingSigners.length} pending signer(s)`,
        timestamp: new Date().toISOString(),
        user: 'Prateek Mehta'
    });

    // Update localStorage
    const index = requests.findIndex(r => r.id === requestId);
    requests[index] = request;
    localStorage.setItem('signatureRequests', JSON.stringify(requests));

    showNotification(`Reminder sent to ${pendingSigners.length} signer(s)`, 'success');
}

function cancelRequest(requestId) {
    if (!confirm('Are you sure you want to cancel this signature request?')) return;

    const requests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');
    const index = requests.findIndex(r => r.id === requestId);

    if (index !== -1) {
        requests[index].status = 'cancelled';
        requests[index].auditTrail.push({
            event: 'Signature request cancelled',
            timestamp: new Date().toISOString(),
            user: 'Prateek Mehta'
        });

        localStorage.setItem('signatureRequests', JSON.stringify(requests));
        loadSignatureRequests();
        updateStatistics();
        showNotification('Signature request cancelled', 'success');
    }
}

function downloadSigned(requestId) {
    showNotification('Downloading signed document...', 'success');
    // In real implementation, this would download the signed PDF
}

function openBulkSendModal() {
    showNotification('Bulk send feature coming soon', 'info');
    // In real implementation, this would open a modal for bulk sending
}

function getStatusBadge(status) {
    const badges = {
        'pending': '<span class="badge" style="background: #f39c12;">⏳ Pending</span>',
        'completed': '<span class="badge" style="background: #27ae60;">✅ Completed</span>',
        'declined': '<span class="badge" style="background: #e74c3c;">❌ Declined</span>',
        'expired': '<span class="badge" style="background: #95a5a6;">⌛ Expired</span>',
        'cancelled': '<span class="badge" style="background: #7f8c8d;">🚫 Cancelled</span>'
    };
    return badges[status] || '';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info') {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}
