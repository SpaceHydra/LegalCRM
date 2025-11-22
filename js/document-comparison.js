// Document Comparison Tool
// Side-by-side comparison with diff visualization and track changes

let currentViewMode = 'side-by-side';
let comparisonData = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDocumentList();
    initializeSampleDocuments();
});

function initializeSampleDocuments() {
    // Initialize sample documents if not exists
    if (!localStorage.getItem('comparisonDocuments')) {
        const sampleDocs = [
            {
                id: 'doc1_v1',
                name: 'Loan Agreement - ABC Corp (v1.0)',
                version: '1.0',
                baseDocId: 'doc1',
                content: `LOAN AGREEMENT

This Loan Agreement ("Agreement") is entered into on January 15, 2024

BETWEEN:
ABC Corporation, a company incorporated under the Companies Act, 2013
("Borrower")

AND:
XYZ Bank Limited, a banking company
("Lender")

WHEREAS:
1. The Borrower has requested a loan of Rs. 10,00,000 (Rupees Ten Lakhs Only)
2. The Lender has agreed to provide such loan on the terms and conditions set forth herein

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein:

1. LOAN AMOUNT
   The Lender agrees to lend to the Borrower a sum of Rs. 10,00,000

2. INTEREST RATE
   The loan shall bear interest at 12% per annum

3. REPAYMENT TERMS
   The Borrower shall repay the loan in 24 equal monthly installments

4. SECURITY
   The loan shall be secured by a mortgage on the property located at Delhi

5. DEFAULT
   In case of default, the Lender may demand immediate repayment of the entire outstanding amount

6. GOVERNING LAW
   This Agreement shall be governed by the laws of India

IN WITNESS WHEREOF, the parties have executed this Agreement.`
            },
            {
                id: 'doc1_v2',
                name: 'Loan Agreement - ABC Corp (v2.0)',
                version: '2.0',
                baseDocId: 'doc1',
                content: `LOAN AGREEMENT

This Loan Agreement ("Agreement") is entered into on January 15, 2024

BETWEEN:
ABC Corporation Private Limited, a company incorporated under the Companies Act, 2013
("Borrower")

AND:
XYZ Bank Limited, a scheduled commercial banking company
("Lender")

RECITALS:
A. The Borrower has requested a loan of Rs. 15,00,000 (Rupees Fifteen Lakhs Only)
B. The Lender has agreed to provide such loan on the terms and conditions set forth herein
C. The Borrower has agreed to provide adequate security for the loan

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein:

1. LOAN AMOUNT AND DISBURSEMENT
   1.1 The Lender agrees to lend to the Borrower a sum of Rs. 15,00,000
   1.2 The loan shall be disbursed in two tranches as per the agreed schedule

2. INTEREST RATE
   The loan shall bear interest at 10.5% per annum, calculated on a reducing balance basis

3. REPAYMENT TERMS
   The Borrower shall repay the loan in 36 equal monthly installments commencing from March 1, 2024

4. SECURITY AND COLLATERAL
   4.1 The loan shall be secured by a first charge mortgage on the property located at New Delhi
   4.2 Personal guarantee of the Directors shall be provided

5. EVENTS OF DEFAULT
   5.1 In case of default, the Lender may demand immediate repayment of the entire outstanding amount
   5.2 The Borrower shall pay a penalty of 2% per month on overdue amounts

6. REPRESENTATIONS AND WARRANTIES
   The Borrower represents that all information provided is true and accurate

7. GOVERNING LAW AND JURISDICTION
   7.1 This Agreement shall be governed by the laws of India
   7.2 Courts at New Delhi shall have exclusive jurisdiction

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first written above.`
            }
        ];
        localStorage.setItem('comparisonDocuments', JSON.stringify(sampleDocs));
    }
}

function loadDocumentList() {
    const documents = JSON.parse(localStorage.getItem('comparisonDocuments') || '[]');
    const originalSelect = document.getElementById('originalDoc');
    const compareSelect = document.getElementById('compareDoc');

    if (!originalSelect || !compareSelect) return;

    // Group documents by base ID
    const grouped = {};
    documents.forEach(doc => {
        if (!grouped[doc.baseDocId]) {
            grouped[doc.baseDocId] = [];
        }
        grouped[doc.baseDocId].push(doc);
    });

    // Populate dropdowns
    [originalSelect, compareSelect].forEach(select => {
        select.innerHTML = '<option value="">Select Document...</option>';

        Object.keys(grouped).forEach(baseId => {
            const group = document.createElement('optgroup');
            group.label = baseId.toUpperCase();

            grouped[baseId].forEach(doc => {
                const option = document.createElement('option');
                option.value = doc.id;
                option.textContent = doc.name;
                group.appendChild(option);
            });

            select.appendChild(group);
        });
    });
}

function loadComparison() {
    const originalId = document.getElementById('originalDoc').value;
    const compareId = document.getElementById('compareDoc').value;

    if (!originalId || !compareId) {
        showEmptyState();
        return;
    }

    if (originalId === compareId) {
        showNotification('Please select different document versions', 'warning');
        showEmptyState();
        return;
    }

    const documents = JSON.parse(localStorage.getItem('comparisonDocuments') || '[]');
    const originalDoc = documents.find(d => d.id === originalId);
    const compareDoc = documents.find(d => d.id === compareId);

    if (!originalDoc || !compareDoc) {
        showEmptyState();
        return;
    }

    // Perform diff
    comparisonData = performDiff(originalDoc, compareDoc);
    renderComparison(comparisonData);
    updateChangeSummary(comparisonData);
}

function performDiff(doc1, doc2) {
    const ignoreWhitespace = document.getElementById('ignoreWhitespace')?.checked || false;
    const caseInsensitive = document.getElementById('caseInsensitive')?.checked || false;

    let lines1 = doc1.content.split('\n');
    let lines2 = doc2.content.split('\n');

    if (ignoreWhitespace) {
        lines1 = lines1.map(l => l.trim());
        lines2 = lines2.map(l => l.trim());
    }

    if (caseInsensitive) {
        lines1 = lines1.map(l => l.toLowerCase());
        lines2 = lines2.map(l => l.toLowerCase());
    }

    // Simple line-by-line diff algorithm
    const diff = computeLineDiff(lines1, lines2);

    return {
        doc1: doc1,
        doc2: doc2,
        originalLines: doc1.content.split('\n'),
        compareLines: doc2.content.split('\n'),
        diff: diff
    };
}

function computeLineDiff(lines1, lines2) {
    const result = [];
    const maxLen = Math.max(lines1.length, lines2.length);

    let i = 0, j = 0;

    while (i < lines1.length || j < lines2.length) {
        if (i >= lines1.length) {
            // Only lines2 has content - added
            result.push({
                type: 'added',
                line1: null,
                line2: j,
                content1: '',
                content2: lines2[j]
            });
            j++;
        } else if (j >= lines2.length) {
            // Only lines1 has content - removed
            result.push({
                type: 'removed',
                line1: i,
                line2: null,
                content1: lines1[i],
                content2: ''
            });
            i++;
        } else if (lines1[i] === lines2[j]) {
            // Lines are identical
            result.push({
                type: 'unchanged',
                line1: i,
                line2: j,
                content1: lines1[i],
                content2: lines2[j]
            });
            i++;
            j++;
        } else {
            // Lines differ - check if it's a modification or add/remove
            const lookahead = 3;
            let foundMatch = false;

            // Look ahead in lines2 to see if this line was removed
            for (let k = 1; k <= lookahead && j + k < lines2.length; k++) {
                if (lines1[i] === lines2[j + k]) {
                    // Found match - lines between were added
                    for (let add = 0; add < k; add++) {
                        result.push({
                            type: 'added',
                            line1: null,
                            line2: j + add,
                            content1: '',
                            content2: lines2[j + add]
                        });
                    }
                    j += k;
                    foundMatch = true;
                    break;
                }
            }

            if (!foundMatch) {
                // Look ahead in lines1 to see if this line was added
                for (let k = 1; k <= lookahead && i + k < lines1.length; k++) {
                    if (lines1[i + k] === lines2[j]) {
                        // Found match - lines between were removed
                        for (let rem = 0; rem < k; rem++) {
                            result.push({
                                type: 'removed',
                                line1: i + rem,
                                line2: null,
                                content1: lines1[i + rem],
                                content2: ''
                            });
                        }
                        i += k;
                        foundMatch = true;
                        break;
                    }
                }
            }

            if (!foundMatch) {
                // No match found - treat as modification
                result.push({
                    type: 'modified',
                    line1: i,
                    line2: j,
                    content1: lines1[i],
                    content2: lines2[j]
                });
                i++;
                j++;
            }
        }
    }

    return result;
}

function renderComparison(data) {
    const container = document.getElementById('comparisonContainer');
    const showLineNumbers = document.getElementById('showLineNumbers')?.checked !== false;

    if (currentViewMode === 'side-by-side') {
        container.innerHTML = `
            <div class="comparison-header">
                <div class="comparison-header-item">
                    <div class="comparison-header-title">${data.doc1.name}</div>
                    <div class="comparison-header-meta">Version ${data.doc1.version}</div>
                </div>
                <div class="comparison-header-item">
                    <div class="comparison-header-title">${data.doc2.name}</div>
                    <div class="comparison-header-meta">Version ${data.doc2.version}</div>
                </div>
            </div>
            <div class="comparison-body">
                <div class="comparison-pane">${renderPane('left', data, showLineNumbers)}</div>
                <div class="comparison-pane">${renderPane('right', data, showLineNumbers)}</div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="comparison-header" style="grid-template-columns: 1fr;">
                <div class="comparison-header-item">
                    <div class="comparison-header-title">Unified Diff View</div>
                    <div class="comparison-header-meta">
                        ${data.doc1.name} → ${data.doc2.name}
                    </div>
                </div>
            </div>
            <div class="comparison-body" style="grid-template-columns: 1fr;">
                <div class="comparison-pane">${renderUnifiedPane(data, showLineNumbers)}</div>
            </div>
        `;
    }
}

function renderPane(side, data, showLineNumbers) {
    let html = '';
    let lineNum = 0;

    data.diff.forEach(item => {
        const isLeft = side === 'left';
        const content = isLeft ? item.content1 : item.content2;
        const shouldShow = isLeft ? item.line1 !== null : item.line2 !== null;

        if (shouldShow) {
            lineNum++;
            const lineNumberHtml = showLineNumbers ? `<span class="line-number">${lineNum}</span>` : '';

            let className = 'diff-unchanged';
            if (item.type === 'added' && !isLeft) className = 'diff-added';
            if (item.type === 'removed' && isLeft) className = 'diff-removed';
            if (item.type === 'modified') className = 'diff-modified';

            html += `<div class="diff-line ${className}">${lineNumberHtml}${escapeHtml(content)}</div>\n`;
        } else if (item.type === 'added' && isLeft) {
            // Show blank line on left for added content on right
            lineNum++;
            const lineNumberHtml = showLineNumbers ? `<span class="line-number">${lineNum}</span>` : '';
            html += `<div class="diff-line" style="opacity: 0.3;">${lineNumberHtml}</div>\n`;
        } else if (item.type === 'removed' && !isLeft) {
            // Show blank line on right for removed content on left
            lineNum++;
            const lineNumberHtml = showLineNumbers ? `<span class="line-number">${lineNum}</span>` : '';
            html += `<div class="diff-line" style="opacity: 0.3;">${lineNumberHtml}</div>\n`;
        }
    });

    return html;
}

function renderUnifiedPane(data, showLineNumbers) {
    let html = '';
    let lineNum = 0;

    data.diff.forEach(item => {
        lineNum++;
        const lineNumberHtml = showLineNumbers ? `<span class="line-number">${lineNum}</span>` : '';

        if (item.type === 'unchanged') {
            html += `<div class="diff-line diff-unchanged">${lineNumberHtml}${escapeHtml(item.content1)}</div>\n`;
        } else if (item.type === 'added') {
            html += `<div class="diff-line diff-added">${lineNumberHtml}+ ${escapeHtml(item.content2)}</div>\n`;
        } else if (item.type === 'removed') {
            html += `<div class="diff-line diff-removed">${lineNumberHtml}- ${escapeHtml(item.content1)}</div>\n`;
        } else if (item.type === 'modified') {
            html += `<div class="diff-line diff-removed">${lineNumberHtml}- ${escapeHtml(item.content1)}</div>\n`;
            lineNum++;
            const lineNumberHtml2 = showLineNumbers ? `<span class="line-number">${lineNum}</span>` : '';
            html += `<div class="diff-line diff-added">${lineNumberHtml2}+ ${escapeHtml(item.content2)}</div>\n`;
        }
    });

    return html;
}

function updateChangeSummary(data) {
    const summary = document.getElementById('changeSummary');
    if (!summary) return;

    let added = 0, removed = 0, modified = 0;

    data.diff.forEach(item => {
        if (item.type === 'added') added++;
        else if (item.type === 'removed') removed++;
        else if (item.type === 'modified') modified++;
    });

    const totalLines = data.diff.length;
    const changedLines = added + removed + modified;
    const changePercent = totalLines > 0 ? Math.round((changedLines / totalLines) * 100) : 0;

    document.getElementById('addedCount').textContent = added;
    document.getElementById('removedCount').textContent = removed;
    document.getElementById('modifiedCount').textContent = modified;
    document.getElementById('changePercent').textContent = changePercent + '%';

    summary.style.display = 'block';
}

function showEmptyState() {
    const container = document.getElementById('comparisonContainer');
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">📄📄</div>
            <h3>Select Documents to Compare</h3>
            <p>Choose two document versions from the dropdowns above to see a detailed comparison</p>
        </div>
    `;

    const summary = document.getElementById('changeSummary');
    if (summary) summary.style.display = 'none';
}

function setViewMode(mode) {
    currentViewMode = mode;

    // Update button states
    document.querySelectorAll('.view-toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (comparisonData) {
        renderComparison(comparisonData);
    }
}

function toggleLineNumbers() {
    if (comparisonData) {
        renderComparison(comparisonData);
    }
}

function newComparison() {
    document.getElementById('originalDoc').value = '';
    document.getElementById('compareDoc').value = '';
    comparisonData = null;
    showEmptyState();
}

function exportComparison() {
    if (!comparisonData) {
        showNotification('Please perform a comparison first', 'warning');
        return;
    }

    const options = [
        '1. Export as PDF',
        '2. Export to Word (with Track Changes)',
        '3. Export as HTML',
        '4. Share via Email'
    ];

    const choice = prompt('Select export option:\n' + options.join('\n'));

    if (choice === '1') {
        exportDiffReport();
    } else if (choice === '2') {
        exportToWord();
    } else if (choice === '3') {
        exportAsHTML();
    } else if (choice === '4') {
        shareComparison();
    }
}

function exportDiffReport() {
    showNotification('Generating PDF comparison report...', 'success');
    // In real implementation, generate PDF with diff highlighting
}

function exportToWord() {
    showNotification('Exporting to Word with Track Changes...', 'success');
    // In real implementation, export as .docx with track changes enabled
}

function exportAsHTML() {
    if (!comparisonData) return;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Document Comparison Report</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { background: #667eea; color: white; padding: 20px; margin-bottom: 20px; }
        .diff-added { background: #e8f5e9; border-left: 4px solid #27ae60; padding: 5px; }
        .diff-removed { background: #ffebee; border-left: 4px solid #e74c3c; padding: 5px; text-decoration: line-through; }
        .diff-modified { background: #fff3e0; border-left: 4px solid #f39c12; padding: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Document Comparison Report</h1>
        <p>${comparisonData.doc1.name} vs ${comparisonData.doc2.name}</p>
    </div>
    ${renderUnifiedPane(comparisonData, false)}
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document-comparison.html';
    a.click();

    showNotification('HTML report downloaded', 'success');
}

function shareComparison() {
    if (!comparisonData) return;

    const subject = `Document Comparison: ${comparisonData.doc1.name} vs ${comparisonData.doc2.name}`;
    const body = `Please find the document comparison report attached.`;

    showNotification('Opening email client...', 'info');
    // In real implementation, integrate with email service
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}
