// Expense Tracking Module
// Handles expense submission, approval workflow, and reporting

let uploadedReceipts = [];

// Category icon mapping
const categoryIcons = {
    'travel': '🚕',
    'meals': '🍽️',
    'accommodation': '🏨',
    'communication': '📞',
    'documentation': '📄',
    'court-fees': '⚖️',
    'training': '🎓',
    'business': '💼',
    'supplies': '🔧',
    'research': '📚',
    'other': '📦'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadMattersToDropdown();
    loadExpenses();
    updateStats();

    // Set default date to today
    document.getElementById('expenseDate').valueAsDate = new Date();
});

// ===== FORM HANDLING =====

function loadMattersToDropdown() {
    const matters = JSON.parse(localStorage.getItem('matters') || '[]');
    const select = document.getElementById('expenseMatter');

    matters.forEach(matter => {
        const option = document.createElement('option');
        option.value = matter.id;
        option.textContent = `${matter.serialNumber} - ${matter.title}`;
        select.appendChild(option);
    });
}

function handleReceiptUpload(event) {
    const files = Array.from(event.target.files);
    const preview = document.getElementById('receiptPreview');

    files.forEach(file => {
        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert(`File ${file.name} is too large. Max size is 5MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedReceipts.push({
                name: file.name,
                data: e.target.result,
                type: file.type
            });

            updateReceiptPreview();
        };
        reader.readAsDataURL(file);
    });
}

function updateReceiptPreview() {
    const preview = document.getElementById('receiptPreview');
    preview.innerHTML = uploadedReceipts.map((receipt, index) => `
        <div class="receipt-item">
            ${receipt.type.startsWith('image/')
                ? `<img src="${receipt.data}" alt="${receipt.name}">`
                : `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6;">📄</div>`
            }
            <button class="receipt-remove" onclick="removeReceipt(${index})">×</button>
        </div>
    `).join('');
}

function removeReceipt(index) {
    uploadedReceipts.splice(index, 1);
    updateReceiptPreview();
}

function updateCategoryIcon() {
    // Could update UI with category icon if needed
}

function submitExpense(event) {
    event.preventDefault();

    const date = document.getElementById('expenseDate').value;
    const category = document.getElementById('expenseCategory').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const matterId = document.getElementById('expenseMatter').value;
    const matterText = document.getElementById('expenseMatter').selectedOptions[0].textContent;
    const description = document.getElementById('expenseDescription').value;
    const reimbursable = document.getElementById('expenseReimbursable').checked;

    // Get current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users[0] || { id: 'USR001', name: 'Current User' };

    const expense = {
        id: 'exp_' + Date.now(),
        date: date,
        category: category,
        categoryIcon: categoryIcons[category] || '📦',
        amount: amount,
        matterId: matterId || null,
        matter: matterId ? matterText : 'Not linked',
        description: description,
        reimbursable: reimbursable,
        receipts: [...uploadedReceipts],
        status: 'pending', // pending, approved, rejected, reimbursed
        submittedBy: currentUser.id,
        submittedByName: currentUser.name,
        submittedAt: new Date().toISOString(),
        approvedBy: null,
        approvedAt: null,
        approvalNotes: null
    };

    // Save expense
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    expenses.unshift(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Reset form
    event.target.reset();
    uploadedReceipts = [];
    updateReceiptPreview();
    document.getElementById('expenseDate').valueAsDate = new Date();

    // Reload and switch tab
    loadExpenses();
    updateStats();
    switchTab('list');

    alert('Expense submitted successfully!');
}

// ===== EXPENSE LIST =====

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const container = document.getElementById('expenseList');

    // Get current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users[0] || { id: 'USR001' };

    // Filter to current user's expenses
    const myExpenses = expenses.filter(e => e.submittedBy === currentUser.id);

    if (myExpenses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💸</div>
                <h3>No expenses yet</h3>
                <p>Click "Add Expense" to submit your first expense</p>
            </div>
        `;
        return;
    }

    // Apply filters
    const filtered = filterExpensesData(myExpenses);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No expenses match your filters</h3>
                <p>Try adjusting your filter criteria</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(expense => `
        <div class="expense-item">
            <div class="expense-icon" style="background: ${getStatusColor(expense.status)}22;">
                ${expense.categoryIcon}
            </div>
            <div class="expense-details">
                <div class="expense-category">${getCategoryName(expense.category)}</div>
                <div class="expense-description">${escapeHtml(expense.description)}</div>
                <div class="expense-meta">
                    <span>📅 ${formatDate(expense.date)}</span>
                    ${expense.matter !== 'Not linked' ? `<span>📁 ${escapeHtml(expense.matter)}</span>` : ''}
                    ${expense.receipts.length > 0 ? `<span>📎 ${expense.receipts.length} receipt(s)</span>` : ''}
                </div>
            </div>
            <div class="expense-amount">
                ₹${expense.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}
            </div>
            <div class="expense-actions">
                <span class="status-badge ${expense.status}">${getStatusLabel(expense.status)}</span>
                ${expense.reimbursable ? '<span class="reimbursable-badge">Reimbursable</span>' : ''}
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewExpense('${expense.id}')" title="View">👁️</button>
                    ${expense.status === 'pending' ? `<button class="btn-icon" onclick="deleteExpense('${expense.id}')" title="Delete">🗑️</button>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Load pending approvals
    loadPendingApprovals();
}

function filterExpensesData(expenses) {
    const period = document.getElementById('filterPeriod').value;
    const category = document.getElementById('filterCategory').value;
    const status = document.getElementById('filterStatus').value;

    let filtered = [...expenses];

    // Filter by period
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (period === 'today') {
        filtered = filtered.filter(e => {
            const expenseDate = new Date(e.date);
            return expenseDate >= today;
        });
    } else if (period === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(e => new Date(e.date) >= weekAgo);
    } else if (period === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(e => new Date(e.date) >= monthStart);
    }

    // Filter by category
    if (category !== 'all') {
        filtered = filtered.filter(e => e.category === category);
    }

    // Filter by status
    if (status !== 'all') {
        filtered = filtered.filter(e => e.status === status);
    }

    return filtered;
}

function filterExpenses() {
    loadExpenses();
    updateStats();
}

function deleteExpense(id) {
    if (!confirm('Delete this expense?')) return;

    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const filtered = expenses.filter(e => e.id !== id);
    localStorage.setItem('expenses', JSON.stringify(filtered));

    loadExpenses();
    updateStats();
}

function viewExpense(id) {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const expense = expenses.find(e => e.id === id);

    if (!expense) return;

    let receiptHTML = '';
    if (expense.receipts && expense.receipts.length > 0) {
        receiptHTML = expense.receipts.map(r =>
            r.type.startsWith('image/')
                ? `<img src="${r.data}" style="max-width: 200px; margin: 5px; border: 1px solid #ccc;">`
                : `<div>📄 ${r.name}</div>`
        ).join('');
    }

    const details = `
Expense Details:
━━━━━━━━━━━━━━━━━━━━━━
Category: ${getCategoryName(expense.category)}
Amount: ₹${expense.amount.toLocaleString('en-IN')}
Date: ${formatDate(expense.date)}
Matter: ${expense.matter}
Status: ${getStatusLabel(expense.status)}
Reimbursable: ${expense.reimbursable ? 'Yes' : 'No'}

Description:
${expense.description}

Submitted by: ${expense.submittedByName}
Submitted on: ${new Date(expense.submittedAt).toLocaleString()}

${expense.approvedBy ? `Approved by: ${expense.approvedBy}\nApproved on: ${new Date(expense.approvedAt).toLocaleString()}` : ''}
${expense.approvalNotes ? `\nNotes: ${expense.approvalNotes}` : ''}
    `;

    alert(details);

    // If there are images, show them
    if (receiptHTML && expense.receipts.some(r => r.type.startsWith('image/'))) {
        const popup = window.open('', 'Receipts', 'width=800,height=600');
        popup.document.write(`
            <html>
            <head><title>Expense Receipts</title></head>
            <body style="font-family: Arial; padding: 20px;">
                <h2>Receipts for Expense: ${expense.id}</h2>
                ${receiptHTML}
            </body>
            </html>
        `);
    }
}

// ===== APPROVAL WORKFLOW =====

function loadPendingApprovals() {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const pending = expenses.filter(e => e.status === 'pending');

    const container = document.getElementById('pendingApprovals');

    if (pending.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">✅</div>
                <h3>No pending approvals</h3>
                <p>All expenses have been reviewed</p>
            </div>
        `;
        return;
    }

    container.innerHTML = pending.map(expense => `
        <div class="approval-item">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <div style="font-weight: 600; font-size: 16px; margin-bottom: 10px;">
                        ${expense.categoryIcon} ${getCategoryName(expense.category)} - ₹${expense.amount.toLocaleString('en-IN')}
                    </div>
                    <div style="color: #6b7280; margin-bottom: 10px;">
                        ${escapeHtml(expense.description)}
                    </div>
                    <div style="font-size: 12px; color: #9ca3af;">
                        <div>Submitted by: ${expense.submittedByName}</div>
                        <div>Date: ${formatDate(expense.date)}</div>
                        ${expense.matter !== 'Not linked' ? `<div>Matter: ${escapeHtml(expense.matter)}</div>` : ''}
                        ${expense.receipts.length > 0 ? `<div>📎 ${expense.receipts.length} receipt(s) attached</div>` : ''}
                    </div>
                </div>
                <div>
                    ${expense.reimbursable ? '<span class="reimbursable-badge">Reimbursable</span>' : ''}
                </div>
            </div>
            <div class="approval-actions">
                <button class="btn-approve" onclick="approveExpense('${expense.id}')">✓ Approve</button>
                <button class="btn-reject" onclick="rejectExpense('${expense.id}')">✗ Reject</button>
                <button class="btn-icon" onclick="viewExpense('${expense.id}')">👁️ View Details</button>
            </div>
        </div>
    `).join('');
}

function approveExpense(id) {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const expense = expenses.find(e => e.id === id);

    if (!expense) return;

    const notes = prompt('Approval notes (optional):');

    // Get current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users[0] || { name: 'Approver' };

    expense.status = 'approved';
    expense.approvedBy = currentUser.name;
    expense.approvedAt = new Date().toISOString();
    expense.approvalNotes = notes;

    localStorage.setItem('expenses', JSON.stringify(expenses));

    loadExpenses();
    updateStats();

    alert('Expense approved!');
}

function rejectExpense(id) {
    const reason = prompt('Rejection reason:');
    if (!reason) return;

    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const expense = expenses.find(e => e.id === id);

    if (!expense) return;

    // Get current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users[0] || { name: 'Approver' };

    expense.status = 'rejected';
    expense.approvedBy = currentUser.name;
    expense.approvedAt = new Date().toISOString();
    expense.approvalNotes = reason;

    localStorage.setItem('expenses', JSON.stringify(expenses));

    loadExpenses();
    updateStats();

    alert('Expense rejected!');
}

// ===== STATISTICS =====

function updateStats() {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

    // Get current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users[0] || { id: 'USR001' };

    // Filter to current user's expenses for this month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const myExpenses = expenses.filter(e =>
        e.submittedBy === currentUser.id &&
        new Date(e.date) >= monthStart
    );

    // Calculate stats
    const pending = myExpenses.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.amount, 0);
    const approved = myExpenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);
    const reimbursable = myExpenses.filter(e => e.reimbursable && e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);
    const total = myExpenses.reduce((sum, e) => sum + e.amount, 0);

    // Update UI
    document.getElementById('statPending').textContent = '₹' + pending.toLocaleString('en-IN');
    document.getElementById('statApproved').textContent = '₹' + approved.toLocaleString('en-IN');
    document.getElementById('statReimbursable').textContent = '₹' + reimbursable.toLocaleString('en-IN');
    document.getElementById('statTotal').textContent = '₹' + total.toLocaleString('en-IN');
}

// ===== EXPORT FUNCTIONS =====

function exportExpensesToCSV() {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users[0] || { id: 'USR001' };

    const myExpenses = expenses.filter(e => e.submittedBy === currentUser.id);
    const filtered = filterExpensesData(myExpenses);

    if (filtered.length === 0) {
        alert('No expenses to export!');
        return;
    }

    // Create CSV
    const headers = ['Date', 'Category', 'Description', 'Amount', 'Matter', 'Reimbursable', 'Status'];
    const rows = filtered.map(e => [
        e.date,
        getCategoryName(e.category),
        e.description,
        e.amount,
        e.matter,
        e.reimbursable ? 'Yes' : 'No',
        getStatusLabel(e.status)
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

function generateExpenseReport() {
    alert('Detailed expense report - Coming soon!');
}

// ===== TAB SWITCHING =====

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tabName === 'add') {
        document.getElementById('addTab').classList.add('active');
    } else if (tabName === 'list') {
        document.getElementById('listTab').classList.add('active');
        loadExpenses();
        updateStats();
    } else if (tabName === 'approval') {
        document.getElementById('approvalTab').classList.add('active');
        loadPendingApprovals();
    } else if (tabName === 'reports') {
        document.getElementById('reportsTab').classList.add('active');
    }
}

// ===== UTILITY FUNCTIONS =====

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getCategoryName(category) {
    const names = {
        'travel': 'Travel',
        'meals': 'Meals & Entertainment',
        'accommodation': 'Accommodation',
        'communication': 'Communication',
        'documentation': 'Documentation & Printing',
        'court-fees': 'Court Fees',
        'training': 'Training & Development',
        'business': 'Business Development',
        'supplies': 'Office Supplies',
        'research': 'Legal Research',
        'other': 'Other'
    };
    return names[category] || category;
}

function getStatusLabel(status) {
    const labels = {
        'pending': '⏳ Pending',
        'approved': '✅ Approved',
        'rejected': '❌ Rejected',
        'reimbursed': '💰 Reimbursed'
    };
    return labels[status] || status;
}

function getStatusColor(status) {
    const colors = {
        'pending': '#f59e0b',
        'approved': '#10b981',
        'rejected': '#ef4444',
        'reimbursed': '#3b82f6'
    };
    return colors[status] || '#6b7280';
}

console.log('✅ Expense Tracking module loaded');
