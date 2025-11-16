// Legal CRM - Common JavaScript Functions

// Format currency in Indian Rupees
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Calculate days between dates
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// Get status badge class
function getStatusBadgeClass(status) {
    const statusMap = {
        'New': 'status-new',
        'In Progress': 'status-in-progress',
        'Qualified': 'status-qualified',
        'Won': 'status-won',
        'Lost': 'status-lost',
        'Active': 'status-qualified',
        'Completed': 'status-won',
        'Review': 'status-in-progress',
        'Hold': 'status-lost',
        'Paid': 'status-won',
        'Overdue': 'status-lost',
        'Partially Paid': 'status-in-progress'
    };
    return statusMap[status] || 'status-new';
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Update notification count in header
function updateNotificationCount() {
    const activities = legalCRM.get('activities');
    const today = new Date().toISOString().split('T')[0];
    const todayActivities = activities.filter(a => a.timestamp.startsWith(today));

    const badge = document.getElementById('notificationCount');
    if (badge) {
        badge.textContent = todayActivities.length;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateNotificationCount();
});

// Export functions for use in other scripts
window.legalCRMCommon = {
    formatCurrency,
    formatDate,
    daysBetween,
    getStatusBadgeClass,
    showNotification,
    updateNotificationCount
};
