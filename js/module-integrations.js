// Cross-Module Integration Layer
// Handles data flow and interactions between different LegalCRM modules

const ModuleIntegrations = {

    // Integration: Matter -> Team Chat
    createMatterChatThread: function(matterId) {
        const matter = window.dataManager?.getById('projects', matterId);
        if (!matter) {
            console.error('Matter not found:', matterId);
            return null;
        }

        const threads = JSON.parse(localStorage.getItem('chatThreads') || '[]');

        // Check if thread already exists
        const existingThread = threads.find(t => t.matterId === matterId);
        if (existingThread) {
            return existingThread.id;
        }

        // Create new thread
        const newThread = {
            id: 'thread_' + Date.now(),
            name: `Matter: ${matter.serialNumber}`,
            type: 'matter',
            matterId: matterId,
            participants: [],
            lastMessage: 'Matter discussion started',
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
            createdAt: new Date().toISOString()
        };

        threads.push(newThread);
        localStorage.setItem('chatThreads', JSON.stringify(threads));

        return newThread.id;
    },

    // Integration: Document -> E-Signature
    sendDocumentForSignature: function(documentId, documentTitle) {
        // Prepare document for e-signature
        const signatureData = {
            documentId: documentId,
            documentTitle: documentTitle,
            source: 'document-management',
            timestamp: new Date().toISOString()
        };

        // Store in session for retrieval on e-signature page
        sessionStorage.setItem('pendingSignatureDocument', JSON.stringify(signatureData));

        // Redirect to e-signature page
        window.location.href = 'e-signature.html';
    },

    // Integration: Document -> Document Comparison
    compareDocumentVersions: function(doc1Id, doc2Id) {
        // Get documents from document management
        const documents = window.dataManager?.get('documents') || [];
        const doc1 = documents.find(d => d.id === doc1Id);
        const doc2 = documents.find(d => d.id === doc2Id);

        if (!doc1 || !doc2) {
            console.error('Documents not found');
            return;
        }

        // Store comparison data in session
        sessionStorage.setItem('comparisonDocuments', JSON.stringify({
            doc1: doc1Id,
            doc2: doc2Id
        }));

        // Redirect to comparison page
        window.location.href = 'document-comparison.html';
    },

    // Integration: Document Processing -> Contract Intelligence
    extractContractIntelligence: function(processedDocId) {
        const processedDocs = JSON.parse(localStorage.getItem('processedDocuments') || '[]');
        const doc = processedDocs.find(d => d.id === processedDocId);

        if (!doc || doc.classification !== 'contract') {
            return null;
        }

        // Extract contract intelligence from processed document
        const contractData = {
            id: 'ic_' + Date.now(),
            title: doc.documentName,
            type: this.mapDocTypeToContractType(doc.classification),
            parties: doc.extractedData?.parties || [],
            executionDate: doc.extractedData?.executionDate || new Date().toISOString(),
            expiryDate: doc.extractedData?.expiryDate || new Date().toISOString(),
            noticePerion: 60, // Default
            contractValue: doc.extractedData?.monetaryValues?.[0] || 0,
            currency: 'INR',
            autoRenewal: false,
            renewalType: 'manual',
            status: 'active',
            obligations: this.extractObligations(doc.extractedData),
            complianceClauses: this.extractComplianceClauses(doc),
            riskFlags: doc.riskAnalysis?.flags || [],
            extractedBy: 'AI',
            extractedAt: new Date().toISOString(),
            sourceDocumentId: processedDocId
        };

        // Save to intelligent contracts
        const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
        contracts.push(contractData);
        localStorage.setItem('intelligentContracts', JSON.stringify(contracts));

        return contractData.id;
    },

    mapDocTypeToContractType: function(docType) {
        const mapping = {
            'Loan Agreement': 'loan',
            'NDA': 'nda',
            'Service Agreement': 'service',
            'Lease Agreement': 'lease',
            'Partnership Deed': 'partnership',
            'Employment Contract': 'employment'
        };
        return mapping[docType] || 'other';
    },

    extractObligations: function(extractedData) {
        if (!extractedData?.obligations) return [];

        return extractedData.obligations.map((obl, index) => ({
            id: 'obl_' + Date.now() + '_' + index,
            description: obl.description || obl,
            dueDate: obl.dueDate || new Date().toISOString(),
            recurring: obl.recurring || false,
            frequency: obl.frequency || 'one-time',
            status: 'pending',
            party: obl.party || 'Unknown'
        }));
    },

    extractComplianceClauses: function(doc) {
        // Extract compliance information from risk analysis
        const clauses = [];

        if (doc.riskAnalysis?.complianceIssues) {
            doc.riskAnalysis.complianceIssues.forEach(issue => {
                clauses.push({
                    clause: issue.description || issue,
                    compliant: false,
                    issue: 'Identified by AI analysis'
                });
            });
        }

        // Add standard clauses as compliant
        const standardClauses = [
            'Proper execution and signature',
            'Clear identification of parties',
            'Defined terms and definitions'
        ];

        standardClauses.forEach(clause => {
            clauses.push({
                clause: clause,
                compliant: true
            });
        });

        return clauses;
    },

    // Integration: Matter -> E-Signature (for matter documents)
    signMatterDocument: function(matterId, documentName) {
        const matter = window.dataManager?.getById('projects', matterId);
        if (!matter) return;

        const signatureData = {
            documentTitle: `${matter.serialNumber} - ${documentName}`,
            matterId: matterId,
            source: 'matter-management',
            timestamp: new Date().toISOString()
        };

        sessionStorage.setItem('pendingSignatureDocument', JSON.stringify(signatureData));
        window.location.href = 'e-signature.html';
    },

    // Integration: Contract Intelligence -> Drafting (for renewal)
    initiateContractRenewal: function(contractId) {
        const contracts = JSON.parse(localStorage.getItem('intelligentContracts') || '[]');
        const contract = contracts.find(c => c.id === contractId);

        if (!contract) return;

        // Create a draft request for renewal
        const requests = JSON.parse(localStorage.getItem('requests') || '[]');

        const renewalRequest = {
            id: 'REQ-' + Date.now(),
            documentType: 'Renewal - ' + contract.type,
            title: `Renewal: ${contract.title}`,
            requestedBy: 'System',
            linkedTo: 'matter',
            linkedId: contract.matterId || '',
            priority: 'high',
            status: 'new',
            requestDate: new Date().toISOString(),
            deadline: contract.expiryDate,
            slaHours: 48,
            description: `Automated renewal request for expiring contract: ${contract.title}`,
            assignedTo: '',
            sourceContractId: contractId
        };

        requests.push(renewalRequest);
        localStorage.setItem('requests', JSON.stringify(requests));

        return renewalRequest.id;
    },

    // Integration: Billing -> Matter (link invoices to matters)
    linkInvoiceToMatter: function(invoiceId, matterId) {
        const invoices = window.dataManager?.get('invoices') || [];
        const invoice = invoices.find(inv => inv.id === invoiceId);

        if (!invoice) return false;

        invoice.linkedMatterId = matterId;

        // Update in storage
        window.dataManager?.update('invoices', invoiceId, invoice);

        return true;
    },

    // Integration: Task -> Team Chat (discuss task in chat)
    discussTaskInChat: function(taskId) {
        const task = window.dataManager?.getById('tasks', taskId);
        if (!task) return;

        // Create or get project thread
        const projectId = task.projectId;
        if (projectId) {
            const threadId = this.createMatterChatThread(projectId);

            // Add message about task
            const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
            messages.push({
                id: 'msg_' + Date.now(),
                threadId: threadId,
                senderId: 'system',
                senderName: 'System',
                senderInitials: 'SYS',
                message: `Task discussion: ${task.name}\nDue: ${task.dueDate}\nPriority: ${task.priority}`,
                timestamp: new Date().toISOString(),
                attachments: [],
                mentions: []
            });
            localStorage.setItem('chatMessages', JSON.stringify(messages));

            // Redirect to chat
            window.location.href = `team-chat.html?thread=${threadId}`;
        }
    },

    // Integration: E-Signature -> Document Management (save signed document)
    saveSignedDocument: function(signatureRequestId) {
        const requests = JSON.parse(localStorage.getItem('signatureRequests') || '[]');
        const request = requests.find(r => r.id === signatureRequestId);

        if (!request || request.status !== 'completed') return null;

        // Create document record
        const documents = window.dataManager?.get('documents') || [];

        const signedDoc = {
            id: 'doc_' + Date.now(),
            name: request.documentTitle + ' (Signed)',
            type: 'Signed Document',
            category: 'Legal',
            status: 'Final',
            tags: ['signed', 'e-signature'],
            uploadDate: new Date().toISOString(),
            size: '2.5 MB',
            version: '1.0',
            accessLevel: 'Confidential',
            projectId: request.matterId || '',
            uploadedBy: request.createdBy,
            signatureRequestId: signatureRequestId,
            metadata: {
                signedBy: request.signers.map(s => s.name).join(', '),
                signedDate: request.completedAt,
                provider: request.provider
            }
        };

        window.dataManager?.create('documents', signedDoc);

        return signedDoc.id;
    },

    // Integration: Document Comparison -> Drafting (use comparison for template update)
    createTemplateFromComparison: function(comparisonData) {
        if (!comparisonData) return;

        const templates = JSON.parse(localStorage.getItem('templates') || '[]');

        // Create new template version based on comparison
        const newTemplate = {
            id: 'TMPL-' + Date.now(),
            name: comparisonData.doc2.name + ' (Template)',
            documentType: 'Template',
            category: 'Custom',
            version: '1.0',
            status: 'draft',
            jurisdiction: 'India',
            practiceArea: 'General',
            riskLevel: 'medium',
            createdBy: 'System',
            createdDate: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            content: comparisonData.doc2.content,
            variables: [],
            usageCount: 0
        };

        templates.push(newTemplate);
        localStorage.setItem('templates', JSON.stringify(templates));

        return newTemplate.id;
    },

    // Utility: Get all data related to a matter
    getMatterRelatedData: function(matterId) {
        return {
            matter: window.dataManager?.getById('projects', matterId),
            tasks: (window.dataManager?.get('tasks') || []).filter(t => t.projectId === matterId),
            documents: (window.dataManager?.get('documents') || []).filter(d => d.projectId === matterId),
            invoices: (window.dataManager?.get('invoices') || []).filter(i => i.linkedMatterId === matterId),
            chatThreads: JSON.parse(localStorage.getItem('chatThreads') || '[]').filter(t => t.matterId === matterId),
            signatures: JSON.parse(localStorage.getItem('signatureRequests') || '[]').filter(s => s.matterId === matterId),
            contracts: JSON.parse(localStorage.getItem('intelligentContracts') || '[]').filter(c => c.matterId === matterId)
        };
    },

    // Utility: Get activity timeline for a matter
    getMatterTimeline: function(matterId) {
        const activities = window.dataManager?.get('activities') || [];
        return activities.filter(a => a.relatedEntityId === matterId || a.details?.matterId === matterId)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    },

    // Auto-integration: When a matter is created
    onMatterCreated: function(matterId) {
        // Auto-create chat thread
        this.createMatterChatThread(matterId);

        // Log activity
        if (window.dataManager?.logActivity) {
            window.dataManager.logActivity('matter_created', 'projects', matterId, {
                integration: 'auto-chat-created'
            });
        }
    },

    // Auto-integration: When signature is completed
    onSignatureCompleted: function(signatureRequestId) {
        // Auto-save signed document
        const docId = this.saveSignedDocument(signatureRequestId);

        // If linked to matter, add to matter documents
        const request = JSON.parse(localStorage.getItem('signatureRequests') || '[]')
            .find(r => r.id === signatureRequestId);

        if (request && request.matterId && docId) {
            // Update matter with new document reference
            const matter = window.dataManager?.getById('projects', request.matterId);
            if (matter) {
                if (!matter.signedDocuments) matter.signedDocuments = [];
                matter.signedDocuments.push(docId);
                window.dataManager?.update('projects', request.matterId, matter);
            }
        }

        return docId;
    },

    // Auto-integration: When document is processed
    onDocumentProcessed: function(processedDocId) {
        const doc = JSON.parse(localStorage.getItem('processedDocuments') || '[]')
            .find(d => d.id === processedDocId);

        if (!doc) return;

        // If it's a contract, extract intelligence
        if (doc.documentType && doc.documentType.toLowerCase().includes('agreement') ||
            doc.documentType && doc.documentType.toLowerCase().includes('contract') ||
            doc.documentType === 'NDA') {
            const contractId = this.extractContractIntelligence(processedDocId);

            if (contractId) {
                console.log('Contract intelligence extracted:', contractId);
            }
        }
    }
};

// Make available globally
window.ModuleIntegrations = ModuleIntegrations;

// Auto-wire integration hooks if dataManager is available
if (window.dataManager) {
    // Hook into matter creation
    const originalCreateMatter = window.dataManager.create;
    window.dataManager.create = function(entityType, data) {
        const result = originalCreateMatter.call(this, entityType, data);

        if (entityType === 'projects' && result) {
            ModuleIntegrations.onMatterCreated(result.id || result);
        }

        return result;
    };
}

console.log('✅ Module Integrations initialized');
