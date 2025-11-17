/**
 * Document Processing Module - JavaScript
 * Handles file upload, processing, and results display
 */

// Configuration
const API_BASE_URL = 'http://localhost:3001/api';
const POLL_INTERVAL = 2000; // Check processing status every 2 seconds

// State
let fileQueue = [];
let currentBatchId = null;
let processingPollers = new Map();
let currentDocument = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeUploadArea();
    initializeEventListeners();
    loadPreviousResults();
});

/**
 * Initialize drag & drop upload area
 */
function initializeUploadArea() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when dragging
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('drag-over');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('drag-over');
        }, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        handleFiles(files);
    }, false);

    // Browse button
    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
        fileInput.value = ''; // Reset input
    });
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    // Process all button
    document.getElementById('processAllBtn').addEventListener('click', processAllFiles);

    // Clear queue button
    document.getElementById('clearQueueBtn').addEventListener('click', clearQueue);

    // Select all checkbox
    document.getElementById('selectAllFiles').addEventListener('change', function(e) {
        const checkboxes = document.querySelectorAll('#fileQueueBody input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
    });

    // Apply options button
    document.getElementById('applyOptionsBtn').addEventListener('click', () => {
        showNotification('Processing options updated for all files', 'success');
    });
}

/**
 * Prevent default drag behaviors
 */
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * Handle selected files
 */
async function handleFiles(files) {
    if (files.length === 0) return;

    const filesArray = Array.from(files);

    // Check if there's a ZIP file
    const zipFiles = filesArray.filter(f => f.name.toLowerCase().endsWith('.zip'));

    if (zipFiles.length > 0) {
        // Process ZIP file
        await handleZipUpload(zipFiles[0]);
    } else {
        // Process individual files
        await handleIndividualUploads(filesArray);
    }
}

/**
 * Handle ZIP file upload
 */
async function handleZipUpload(zipFile) {
    try {
        // Validate file size
        const maxSize = 200 * 1024 * 1024; // 200 MB
        if (zipFile.size > maxSize) {
            showNotification('ZIP file exceeds maximum size of 200 MB', 'error');
            return;
        }

        showUploadProgress('Uploading ZIP file...', 0);

        const formData = new FormData();
        formData.append('file', zipFile);

        const response = await fetch(`${API_BASE_URL}/upload/zip`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();

        hideUploadProgress();
        showNotification(`ZIP extracted: ${result.batch.supportedFiles} files ready for processing`, 'success');

        // Add files to queue
        currentBatchId = result.batch.id;
        result.batch.files.forEach(file => {
            addFileToQueue({
                id: file.id,
                fileName: file.fileName,
                fileSize: file.fileSize || 'Unknown',
                fileType: file.fileType,
                status: file.status,
                detectedType: file.detectedType || 'Detecting...',
                progress: 0,
                error: file.error,
                batchId: currentBatchId
            });
        });

        updateQueueStats();
        showFileQueue();

    } catch (error) {
        hideUploadProgress();
        showNotification('Failed to upload ZIP file: ' + error.message, 'error');
        console.error('ZIP upload error:', error);
    }
}

/**
 * Handle individual file uploads
 */
async function handleIndividualUploads(files) {
    for (const file of files) {
        await uploadSingleFile(file);
    }
}

/**
 * Upload single file
 */
async function uploadSingleFile(file) {
    try {
        // Validate file type
        const validTypes = ['pdf', 'docx', 'doc', 'txt'];
        const ext = file.name.split('.').pop().toLowerCase();

        if (!validTypes.includes(ext)) {
            showNotification(`Unsupported file type: ${file.name}`, 'error');
            return;
        }

        // Validate file size
        const maxSize = 50 * 1024 * 1024; // 50 MB
        if (file.size > maxSize) {
            showNotification(`File exceeds maximum size of 50 MB: ${file.name}`, 'error');
            return;
        }

        showUploadProgress(`Uploading ${file.name}...`, 0);

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload/single`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const result = await response.json();

        hideUploadProgress();
        showNotification(`File uploaded: ${file.name}`, 'success');

        // Add to queue
        addFileToQueue({
            id: result.file.id,
            fileName: result.file.fileName,
            fileSize: result.file.fileSize,
            fileType: result.file.fileType,
            filePath: result.file.filePath,
            status: 'Uploaded',
            detectedType: 'Not yet processed',
            progress: 0
        });

        updateQueueStats();
        showFileQueue();

    } catch (error) {
        hideUploadProgress();
        showNotification('Failed to upload file: ' + error.message, 'error');
        console.error('File upload error:', error);
    }
}

/**
 * Add file to queue
 */
function addFileToQueue(file) {
    fileQueue.push(file);
    renderFileQueue();
    enableProcessButton();
}

/**
 * Render file queue table
 */
function renderFileQueue() {
    const tbody = document.getElementById('fileQueueBody');
    tbody.innerHTML = '';

    fileQueue.forEach((file, index) => {
        const row = document.createElement('tr');
        row.id = `file-row-${file.id}`;

        const statusBadge = getStatusBadge(file.status);
        const progressBar = file.progress > 0 ? `
            <div class="progress-mini">
                <div class="progress-bar" style="width: ${file.progress}%"></div>
            </div>
        ` : '-';

        row.innerHTML = `
            <td><input type="checkbox" class="file-checkbox" data-id="${file.id}"></td>
            <td>
                <div class="file-name-cell">
                    <span class="file-icon">${getFileIcon(file.fileType)}</span>
                    <span class="file-name">${file.fileName}</span>
                </div>
            </td>
            <td>${file.fileSize}</td>
            <td><span class="badge badge-info">${file.detectedType || 'Unknown'}</span></td>
            <td>${statusBadge}</td>
            <td>
                ${file.status === 'Processing' ? progressBar : '-'}
                ${file.error ? `<div class="text-danger text-sm">${file.error}</div>` : ''}
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="processSingleFile('${file.id}')"
                    ${file.status !== 'Uploaded' && file.status !== 'Pending' ? 'disabled' : ''}>
                    Process
                </button>
                ${file.status === 'Completed' ? `
                    <button class="btn btn-sm btn-success ml-1" onclick="viewResult('${file.id}')">
                        View
                    </button>
                ` : ''}
            </td>
        `;

        tbody.appendChild(row);
    });
}

/**
 * Process all files
 */
async function processAllFiles() {
    const pendingFiles = fileQueue.filter(f =>
        f.status === 'Uploaded' || f.status === 'Pending'
    );

    if (pendingFiles.length === 0) {
        showNotification('No files to process', 'warning');
        return;
    }

    const options = getProcessingOptions();

    if (currentBatchId) {
        // Process as batch
        await processBatch(currentBatchId, options);
    } else {
        // Process individually
        for (const file of pendingFiles) {
            await processSingleFile(file.id);
        }
    }
}

/**
 * Process single file
 */
async function processSingleFile(fileId) {
    const file = fileQueue.find(f => f.id === fileId);
    if (!file) return;

    try {
        file.status = 'Processing';
        file.progress = 0;
        renderFileQueue();

        const options = getProcessingOptions();

        const response = await fetch(`${API_BASE_URL}/process/document`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileId: file.id,
                file: file,
                options: options
            })
        });

        if (!response.ok) {
            throw new Error('Processing failed');
        }

        const result = await response.json();

        // Start polling for status
        startProcessingPoll(result.processId, fileId);

    } catch (error) {
        file.status = 'Failed';
        file.error = error.message;
        renderFileQueue();
        showNotification(`Failed to process ${file.fileName}: ${error.message}`, 'error');
    }
}

/**
 * Process batch
 */
async function processBatch(batchId, options) {
    try {
        const response = await fetch(`${API_BASE_URL}/process/batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                batchId: batchId,
                options: options
            })
        });

        if (!response.ok) {
            throw new Error('Batch processing failed');
        }

        const result = await response.json();
        showNotification(`Processing ${result.totalProcessing} documents...`, 'info');

        // Start polling for each file
        fileQueue.forEach(file => {
            if (file.processId) {
                startProcessingPoll(file.processId, file.id);
            }
        });

    } catch (error) {
        showNotification('Failed to start batch processing: ' + error.message, 'error');
    }
}

/**
 * Start polling for processing status
 */
function startProcessingPoll(processId, fileId) {
    const poller = setInterval(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/process/status/${processId}`);

            if (!response.ok) {
                throw new Error('Status check failed');
            }

            const result = await response.json();
            const status = result.status;

            // Update file in queue
            const file = fileQueue.find(f => f.id === fileId);
            if (file) {
                file.status = status.status;
                file.progress = status.progress;
                file.currentStep = status.currentStep;

                if (status.status === 'Completed') {
                    file.result = status.result;
                    file.detectedType = status.result?.documentClassification?.primaryType || 'Unknown';
                    clearInterval(poller);
                    processingPollers.delete(processId);
                    showNotification(`✓ Completed: ${file.fileName}`, 'success');

                    // Save to localStorage
                    saveProcessedDocument(status.result);

                } else if (status.status === 'Failed') {
                    file.error = status.error;
                    clearInterval(poller);
                    processingPollers.delete(processId);
                    showNotification(`✗ Failed: ${file.fileName}`, 'error');
                }

                renderFileQueue();
            }

        } catch (error) {
            console.error('Status poll error:', error);
        }
    }, POLL_INTERVAL);

    processingPollers.set(processId, poller);
}

/**
 * Save processed document to localStorage
 */
function saveProcessedDocument(result) {
    try {
        // Get existing processed documents
        let processedDocs = legalCRM.get('processedDocuments') || [];

        // Add new document
        processedDocs.push(result);

        // Save back to localStorage
        legalCRM.set('processedDocuments', processedDocs);

        console.log('Saved to localStorage:', result.id);

    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

/**
 * View processing result
 */
function viewResult(fileId) {
    const file = fileQueue.find(f => f.id === fileId);
    if (!file || !file.result) return;

    currentDocument = file.result;
    showDocumentModal(file.result);
}

/**
 * Show document modal
 */
function showDocumentModal(result) {
    const modal = document.getElementById('documentModal');
    document.getElementById('modalDocumentName').textContent = result.fileName;

    // Activate first tab
    showTab('summary');

    modal.style.display = 'flex';
}

/**
 * Close document modal
 */
function closeDocumentModal() {
    document.getElementById('documentModal').style.display = 'none';
}

/**
 * Show tab content
 */
function showTab(tabName) {
    const result = currentDocument;
    if (!result) return;

    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });

    // Update tab content
    const tabContent = document.getElementById('tabContent');

    switch (tabName) {
        case 'summary':
            tabContent.innerHTML = renderSummaryTab(result);
            break;
        case 'extracted':
            tabContent.innerHTML = renderExtractedDataTab(result);
            break;
        case 'insights':
            tabContent.innerHTML = renderInsightsTab(result);
            break;
        case 'actions':
            tabContent.innerHTML = renderActionsTab(result);
            break;
        case 'crm':
            tabContent.innerHTML = renderCRMTab(result);
            break;
    }
}

// Add tab switching event listeners
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('tab-btn')) {
        showTab(e.target.dataset.tab);
    }
});

/**
 * Render summary tab
 */
function renderSummaryTab(result) {
    const summary = result.summary || {};
    const classification = result.documentClassification || {};

    return `
        <div class="tab-panel">
            <div class="info-section">
                <h4>📋 Document Classification</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Type:</label>
                        <span class="badge badge-primary">${classification.primaryType || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <label>Sub-Type:</label>
                        <span>${classification.subType || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <label>Confidence:</label>
                        <span class="badge ${getConfidenceBadgeClass(classification.confidence)}">${classification.confidence || 'Unknown'}</span>
                    </div>
                    <div class="info-item">
                        <label>Jurisdiction:</label>
                        <span>${classification.jurisdiction || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div class="info-section mt-4">
                <h4>📝 Summary</h4>
                ${summary.verdict ? `<div class="alert alert-info"><strong>Verdict:</strong> ${summary.verdict}</div>` : ''}
                ${summary.shortSummary ? `
                    <ul class="summary-list">
                        ${summary.shortSummary.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                ` : ''}
                ${summary.detailedSummary ? `
                    <div class="detailed-summary">
                        <h5>Detailed Summary:</h5>
                        <p>${summary.detailedSummary}</p>
                    </div>
                ` : ''}
            </div>

            ${summary.keyObligations && summary.keyObligations.length > 0 ? `
                <div class="info-section mt-4">
                    <h4>📜 Key Obligations</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Party</th>
                                <th>Obligation</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${summary.keyObligations.map(ob => `
                                <tr>
                                    <td><strong>${ob.party}</strong></td>
                                    <td>${ob.obligation}</td>
                                    <td>${ob.deadline || 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Render extracted data tab
 */
function renderExtractedDataTab(result) {
    const data = result.extractedData || {};

    return `
        <div class="tab-panel">
            ${data.parties && data.parties.length > 0 ? `
                <div class="info-section">
                    <h4>👥 Parties</h4>
                    ${data.parties.map(party => `
                        <div class="party-card">
                            <h5>${party.name} <span class="badge badge-secondary">${party.role}</span></h5>
                            <div class="info-grid">
                                <div class="info-item">
                                    <label>Type:</label>
                                    <span>${party.type || 'N/A'}</span>
                                </div>
                                ${party.identifiers ? Object.entries(party.identifiers).map(([key, val]) => `
                                    <div class="info-item">
                                        <label>${key.toUpperCase()}:</label>
                                        <span>${val}</span>
                                    </div>
                                `).join('') : ''}
                                ${party.address ? `
                                    <div class="info-item full-width">
                                        <label>Address:</label>
                                        <span>${party.address}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${data.dates ? `
                <div class="info-section mt-4">
                    <h4>📅 Important Dates</h4>
                    <div class="info-grid">
                        ${Object.entries(data.dates).map(([key, val]) => {
                            if (key === 'keyMilestones') return '';
                            return `
                                <div class="info-item">
                                    <label>${formatLabel(key)}:</label>
                                    <span>${formatDate(val)}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}

            ${data.monetaryValues ? `
                <div class="info-section mt-4">
                    <h4>💰 Monetary Values</h4>
                    <div class="info-grid">
                        ${Object.entries(data.monetaryValues).map(([key, val]) => {
                            if (typeof val === 'object') return '';
                            return `
                                <div class="info-item">
                                    <label>${formatLabel(key)}:</label>
                                    <span><strong>${formatCurrency(val)}</strong></span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Render insights tab
 */
function renderInsightsTab(result) {
    const insights = result.insights || {};

    return `
        <div class="tab-panel">
            ${insights.riskFlags && insights.riskFlags.length > 0 ? `
                <div class="info-section">
                    <h4>⚠️ Risk Flags</h4>
                    ${insights.riskFlags.map(risk => `
                        <div class="risk-card risk-${risk.severity.toLowerCase()}">
                            <div class="risk-header">
                                <span class="badge badge-${getSeverityBadgeClass(risk.severity)}">${risk.severity}</span>
                                <strong>${risk.category}</strong>
                            </div>
                            <p>${risk.description}</p>
                            <div class="risk-recommendation">
                                <strong>Recommendation:</strong> ${risk.recommendation}
                            </div>
                            ${risk.affectedClause ? `<div class="text-muted text-sm">Affected: ${risk.affectedClause}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : '<p class="text-muted">No risk flags identified.</p>'}

            ${insights.complianceChecklist && insights.complianceChecklist.length > 0 ? `
                <div class="info-section mt-4">
                    <h4>✓ Compliance Checklist</h4>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Status</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${insights.complianceChecklist.map(item => `
                                <tr>
                                    <td>${item.item}</td>
                                    <td><span class="badge badge-secondary">${item.status}</span></td>
                                    <td><span class="badge badge-${getPriorityBadgeClass(item.priority)}">${item.priority}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : ''}

            ${insights.unusualClauses && insights.unusualClauses.length > 0 ? `
                <div class="info-section mt-4">
                    <h4>🔍 Unusual Clauses</h4>
                    ${insights.unusualClauses.map(clause => `
                        <div class="unusual-clause-card">
                            <h5>${clause.clause}</h5>
                            <p>${clause.description}</p>
                            <div class="alert alert-warning">
                                <strong>Why concerning:</strong> ${clause.reason}
                            </div>
                            <div class="text-primary">
                                <strong>Suggested action:</strong> ${clause.suggestedAction}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${insights.missingElements && insights.missingElements.length > 0 ? `
                <div class="info-section mt-4">
                    <h4>❌ Missing Elements</h4>
                    <ul class="missing-list">
                        ${insights.missingElements.map(el => `<li>${el}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Render actions tab
 */
function renderActionsTab(result) {
    const insights = result.insights || {};
    const actionItems = insights.actionItems || [];

    if (actionItems.length === 0) {
        return '<div class="tab-panel"><p class="text-muted">No action items identified.</p></div>';
    }

    return `
        <div class="tab-panel">
            <div class="info-section">
                <h4>✅ Action Items</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th width="10%">Priority</th>
                            <th width="50%">Action</th>
                            <th width="20%">Assign To</th>
                            <th width="20%">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${actionItems.map((item, idx) => `
                            <tr>
                                <td><span class="badge badge-${getPriorityBadgeClass(item.priority)}">${item.priority}</span></td>
                                <td>${item.action}</td>
                                <td>
                                    <select class="form-control form-control-sm" id="assignee-${idx}">
                                        <option value="">Select user...</option>
                                        ${getUserOptions()}
                                    </select>
                                </td>
                                <td><span class="badge badge-secondary">${item.status}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/**
 * Render CRM tab
 */
function renderCRMTab(result) {
    return `
        <div class="tab-panel">
            <div class="info-section">
                <h4>🔗 Link to CRM</h4>
                <p class="text-muted">Link this processed document to existing records in your CRM</p>

                <div class="row mt-4">
                    <div class="col-md-6">
                        <label class="form-label">Link to Client</label>
                        <select id="linkClient" class="form-control">
                            <option value="">Select client...</option>
                            ${getClientOptions()}
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Link to Matter/Project</label>
                        <select id="linkMatter" class="form-control">
                            <option value="">Select matter...</option>
                            ${getMatterOptions()}
                        </select>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-12">
                        <label class="form-label">Or Create New Matter</label>
                        <div class="input-group">
                            <input type="text" id="newMatterName" class="form-control" placeholder="Enter matter name...">
                            <button class="btn btn-primary" onclick="createNewMatter()">Create Matter</button>
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <label class="form-label">
                        <input type="checkbox" id="attachAsEvidence"> Attach as evidence to linked matter
                    </label>
                </div>

                <div class="mt-4">
                    <h5>Document Tags</h5>
                    <input type="text" id="documentTags" class="form-control" placeholder="Enter tags separated by commas...">
                </div>

                <div class="mt-4">
                    <h5>Notes</h5>
                    <textarea id="crmNotes" class="form-control" rows="3" placeholder="Add any notes about this document..."></textarea>
                </div>
            </div>
        </div>
    `;
}

/**
 * Get processing options
 */
function getProcessingOptions() {
    return {
        outputLanguage: document.getElementById('outputLanguage').value,
        detailLevel: document.getElementById('detailLevel').value,
        insightMode: document.getElementById('insightMode').value
    };
}

/**
 * Helper functions
 */

function getStatusBadge(status) {
    const badges = {
        'Uploaded': '<span class="badge badge-secondary">Uploaded</span>',
        'Pending': '<span class="badge badge-secondary">Pending</span>',
        'Processing': '<span class="badge badge-warning">Processing...</span>',
        'Completed': '<span class="badge badge-success">Completed</span>',
        'Failed': '<span class="badge badge-danger">Failed</span>',
        'Unsupported': '<span class="badge badge-danger">Unsupported</span>'
    };
    return badges[status] || '<span class="badge badge-secondary">Unknown</span>';
}

function getFileIcon(fileType) {
    const icons = {
        'PDF': '📄',
        'DOCX': '📝',
        'DOC': '📝',
        'TXT': '📃',
        'ZIP': '📦'
    };
    return icons[fileType] || '📄';
}

function getConfidenceBadgeClass(confidence) {
    return confidence === 'High' ? 'badge-success' :
           confidence === 'Medium' ? 'badge-warning' :
           'badge-danger';
}

function getSeverityBadgeClass(severity) {
    return severity === 'High' ? 'danger' :
           severity === 'Medium' ? 'warning' :
           'info';
}

function getPriorityBadgeClass(priority) {
    return priority === 'High' ? 'danger' :
           priority === 'Medium' ? 'warning' :
           'info';
}

function formatLabel(key) {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatCurrency(amount) {
    if (typeof amount !== 'number') return amount;
    return '₹' + new Intl.NumberFormat('en-IN').format(amount);
}

function getUserOptions() {
    const users = legalCRM.get('users') || [];
    return users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
}

function getClientOptions() {
    const clients = legalCRM.get('clients') || [];
    return clients.map(c => `<option value="${c.id}">${c.companyName}</option>`).join('');
}

function getMatterOptions() {
    const matters = legalCRM.get('projects') || [];
    return matters.map(m => `<option value="${m.id}">${m.projectName}</option>`).join('');
}

function showUploadProgress(message, percent) {
    const progress = document.getElementById('uploadProgress');
    document.getElementById('uploadStatus').textContent = message;
    document.getElementById('uploadPercent').textContent = percent + '%';
    document.getElementById('uploadProgressBar').style.width = percent + '%';
    progress.style.display = 'block';
}

function hideUploadProgress() {
    document.getElementById('uploadProgress').style.display = 'none';
}

function showFileQueue() {
    document.getElementById('fileQueueCard').style.display = 'block';
}

function updateQueueStats() {
    const total = fileQueue.length;
    const supported = fileQueue.filter(f => f.status !== 'Unsupported').length;
    const unsupported = total - supported;

    document.getElementById('queueStats').textContent =
        `${total} files | ${supported} supported | ${unsupported} unsupported`;
}

function enableProcessButton() {
    const hasUploadedFiles = fileQueue.some(f => f.status === 'Uploaded' || f.status === 'Pending');
    document.getElementById('processAllBtn').disabled = !hasUploadedFiles;
}

function clearQueue() {
    if (!confirm('Clear all files from queue?')) return;

    // Stop all pollers
    processingPollers.forEach(poller => clearInterval(poller));
    processingPollers.clear();

    fileQueue = [];
    currentBatchId = null;
    renderFileQueue();
    updateQueueStats();
    document.getElementById('fileQueueCard').style.display = 'none';
}

function showNotification(message, type) {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}

function loadPreviousResults() {
    // Load previously processed documents from localStorage
    const processedDocs = legalCRM.get('processedDocuments') || [];
    console.log(`Loaded ${processedDocs.length} previously processed documents`);
}

// Modal functions
function downloadJSON() {
    if (!currentDocument) return;

    const dataStr = JSON.stringify(currentDocument, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentDocument.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function copyToClipboard() {
    if (!currentDocument || !currentDocument.summary) return;

    const summary = currentDocument.summary.shortSummary?.join('\n') || '';
    navigator.clipboard.writeText(summary).then(() => {
        showNotification('Summary copied to clipboard', 'success');
    });
}

function saveToCRM() {
    if (!currentDocument) return;

    const clientId = document.getElementById('linkClient')?.value;
    const matterId = document.getElementById('linkMatter')?.value;
    const tags = document.getElementById('documentTags')?.value;
    const notes = document.getElementById('crmNotes')?.value;
    const attachAsEvidence = document.getElementById('attachAsEvidence')?.checked;

    // Update document with CRM links
    currentDocument.crmLinks = {
        linkedToClientId: clientId,
        linkedToMatterId: matterId,
        attachedAsEvidence: attachAsEvidence
    };

    if (tags) {
        currentDocument.tags = tags.split(',').map(t => t.trim());
    }

    if (notes) {
        currentDocument.userEdits = currentDocument.userEdits || {};
        currentDocument.userEdits.notes = notes;
    }

    // Save to localStorage
    let processedDocs = legalCRM.get('processedDocuments') || [];
    const index = processedDocs.findIndex(d => d.id === currentDocument.id);

    if (index >= 0) {
        processedDocs[index] = currentDocument;
    } else {
        processedDocs.push(currentDocument);
    }

    legalCRM.set('processedDocuments', processedDocs);

    showNotification('Document saved to CRM successfully', 'success');
    closeDocumentModal();
}

function createNewMatter() {
    const matterName = document.getElementById('newMatterName')?.value;

    if (!matterName) {
        showNotification('Please enter a matter name', 'warning');
        return;
    }

    const newMatter = {
        id: legalCRM.generateId('projects', 'PROJ'),
        projectName: matterName,
        status: 'Active',
        createdDate: new Date().toISOString(),
        createdFrom: 'Document Processing',
        linkedDocumentId: currentDocument?.id
    };

    legalCRM.create('projects', newMatter);
    showNotification(`Matter created: ${matterName}`, 'success');

    // Reload matter options
    const matterSelect = document.getElementById('linkMatter');
    if (matterSelect) {
        matterSelect.innerHTML = '<option value="">Select matter...</option>' + getMatterOptions();
        matterSelect.value = newMatter.id;
    }
}
