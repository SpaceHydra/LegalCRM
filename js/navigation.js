// Legal CRM - Unified Navigation System
// Single source of truth for all navigation across the application

const navigationData = {
    coreModules: [
        { name: 'Dashboard', icon: '📊', url: 'dashboard.html', phase: 'mvp' },
        { name: 'Lead Management', icon: '🎯', url: 'lead-management.html', phase: 'mvp' },
        { name: 'Client Management', icon: '👥', url: 'client-management.html', phase: 'mvp' },
        { name: 'Project Management', icon: '📁', url: 'project-management.html', phase: 'mvp' },
        { name: 'Task Management', icon: '✅', url: 'task-management.html', phase: 'mvp' },
        { name: 'Document Management', icon: '📄', url: 'document-management.html', phase: 'mvp' },
        { name: 'User Management', icon: '👤', url: 'user-management.html', phase: 'mvp' },
        { name: 'Reporting', icon: '📈', url: 'reporting.html', phase: 'mvp' }
    ],
    collaborationModules: [
        { name: 'Team Chat', icon: '💬', url: 'team-chat.html', phase: 'NEW' },
        { name: 'Meeting Scheduler', icon: '📅', url: 'calendar.html', phase: 'phase2' }
    ],
    documentModules: [
        { name: 'Document Processing', icon: '📑', url: 'document-processing.html', phase: 'NEW' },
        { name: 'E-Signature', icon: '✍️', url: 'e-signature.html', phase: 'NEW' },
        { name: 'Document Comparison', icon: '🔄', url: 'document-comparison.html', phase: 'NEW' },
        { name: 'Contract Intelligence', icon: '🤖', url: 'contract-intelligence.html', phase: 'NEW' }
    ],
    legalModules: [
        { name: 'Court Calendar', icon: '⚖️', url: 'court-calendar.html', phase: 'NEW' },
        { name: 'Drafting & Contracts', icon: '📝', url: 'drafting-dashboard.html', phase: 'phase2' },
        { name: 'Precedent Library', icon: '📚', url: 'precedent-library.html', phase: 'NEW' },
        { name: 'Conflict Checking', icon: '⚠️', url: 'conflict-checking.html', phase: 'NEW' },
        { name: 'Advocate Management', icon: '👨‍⚖️', url: 'advocates-management.html', phase: 'phase2' },
        { name: 'Billing & Revenue', icon: '💰', url: 'billing.html', phase: 'phase2' }
    ],
    practiceModules: [
        { name: 'Time Tracking', icon: '⏱️', url: 'time-tracking.html', phase: 'NEW' },
        { name: 'Expense Tracking', icon: '💸', url: 'expense-tracking.html', phase: 'NEW' }
    ],
    systemModules: [
        { name: 'Settings', icon: '⚙️', url: 'settings.html' },
        { name: 'Help & Documentation', icon: '📖', url: 'index.html' }
    ]
};

// Track collapsed sections in localStorage
const COLLAPSED_SECTIONS_KEY = 'legalcrm_collapsed_sections';

function getCollapsedSections() {
    try {
        return JSON.parse(localStorage.getItem(COLLAPSED_SECTIONS_KEY) || '[]');
    } catch {
        return [];
    }
}

function toggleSectionCollapse(sectionId) {
    const collapsed = getCollapsedSections();
    const index = collapsed.indexOf(sectionId);

    if (index === -1) {
        collapsed.push(sectionId);
    } else {
        collapsed.splice(index, 1);
    }

    localStorage.setItem(COLLAPSED_SECTIONS_KEY, JSON.stringify(collapsed));
}

function isSectionCollapsed(sectionId) {
    return getCollapsedSections().includes(sectionId);
}

function createTopNavigation() {
    // Get current user from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users[0] || { name: 'User', initials: 'U', role: 'User' };

    return `
        <div class="top-nav">
            <div class="logo-section">
                <div class="logo">LC</div>
                <div class="system-title">
                    <h1>Legal CRM Portal</h1>
                    <p>SNG & Partners</p>
                </div>
            </div>
            <div class="user-section">
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input type="text" id="globalSearch" placeholder="Search everything...">
                </div>
                <div class="notification-icon" onclick="showNotifications()">
                    <span>🔔</span>
                    <div class="notification-badge" id="notificationCount">0</div>
                </div>
                <div class="user-profile" onclick="toggleUserMenu()">
                    <div class="user-avatar">${currentUser.initials}</div>
                    <div class="user-info">
                        <div class="user-name">${currentUser.name}</div>
                        <div class="user-role">${currentUser.role}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createSidebar(activePage = '') {
    const createNavItem = (module, isSubmenu = false) => {
        const isActive = activePage.includes(module.url) || window.location.pathname.includes(module.url) ? 'active' : '';
        const badge = module.phase === 'NEW'
            ? '<span class="phase-badge new">NEW</span>'
            : module.phase === 'phase2'
            ? '<span class="phase-badge phase2">2</span>'
            : '';

        return `
            <a href="${module.url}" class="nav-item ${isActive}" title="${module.name}">
                ${!isSubmenu ? `<span class="nav-icon">${module.icon}</span>` : '<span class="nav-icon submenu-icon">↳</span>'}
                <span class="nav-label">${module.name}</span>
                ${badge}
            </a>
        `;
    };

    const createSection = (title, modules, sectionId) => {
        const collapsed = isSectionCollapsed(sectionId);
        const chevron = collapsed ? '▶' : '▼';

        return `
            <div class="nav-section ${collapsed ? 'collapsed' : ''}">
                <div class="nav-section-title" onclick="toggleNavSection('${sectionId}')">
                    <span class="section-chevron">${chevron}</span>
                    <span>${title}</span>
                    <span class="section-count">${modules.length}</span>
                </div>
                <div class="nav-section-content">
                    ${modules.map(m => createNavItem(m)).join('')}
                </div>
            </div>
        `;
    };

    return `
        <div class="sidebar" id="mainSidebar">
            <div class="sidebar-header">
                <button class="sidebar-collapse-btn" onclick="toggleSidebarCollapse()" title="Collapse sidebar">
                    ◀
                </button>
            </div>

            ${createSection('Core Modules', navigationData.coreModules, 'core')}
            ${createSection('Collaboration', navigationData.collaborationModules, 'collaboration')}
            ${createSection('Documents & AI', navigationData.documentModules, 'documents')}
            ${createSection('Legal Operations', navigationData.legalModules, 'legal')}
            ${createSection('Practice Management', navigationData.practiceModules, 'practice')}
            ${createSection('System', navigationData.systemModules, 'system')}

            <div class="sidebar-footer">
                <div class="sidebar-version">v2.0.0</div>
            </div>
        </div>
    `;
}

function toggleNavSection(sectionId) {
    toggleSectionCollapse(sectionId);
    const section = document.querySelector(`.nav-section .nav-section-title span:contains('${sectionId}')`);
    if (section) {
        const navSection = section.closest('.nav-section');
        navSection.classList.toggle('collapsed');

        const chevron = navSection.querySelector('.section-chevron');
        chevron.textContent = navSection.classList.contains('collapsed') ? '▶' : '▼';
    }

    // Re-render to update state
    reinjectSidebar();
}

function toggleSidebarCollapse() {
    const sidebar = document.getElementById('mainSidebar');
    const body = document.body;

    if (sidebar) {
        sidebar.classList.toggle('collapsed');
        body.classList.toggle('sidebar-collapsed');

        // Save state
        localStorage.setItem('sidebar_collapsed', sidebar.classList.contains('collapsed'));
    }
}

function injectNavigation() {
    // Prevent duplicate injection
    if (document.querySelector('.top-nav') || document.querySelector('.sidebar')) {
        console.log('Navigation already injected, skipping...');
        return;
    }

    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    // Create navigation HTML
    const topNavHTML = createTopNavigation();
    const sidebarHTML = createSidebar(currentPage);

    // Inject at the beginning of body
    const body = document.body;
    body.insertAdjacentHTML('afterbegin', sidebarHTML);
    body.insertAdjacentHTML('afterbegin', topNavHTML);

    // Restore sidebar collapsed state
    const isCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    if (isCollapsed) {
        document.getElementById('mainSidebar')?.classList.add('collapsed');
        document.body.classList.add('sidebar-collapsed');
    }

    // Add mobile menu toggle functionality
    setupMobileMenu();

    // Setup global search
    setupGlobalSearch();

    // Update notification count
    updateNotificationCount();
}

function reinjectSidebar() {
    const existingSidebar = document.querySelector('.sidebar');
    if (existingSidebar) {
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        const newSidebarHTML = createSidebar(currentPage);
        existingSidebar.outerHTML = newSidebarHTML;

        // Restore collapsed state
        const isCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
        if (isCollapsed) {
            document.getElementById('mainSidebar')?.classList.add('collapsed');
        }
    }
}

function setupMobileMenu() {
    // Check if mobile toggle already exists
    if (document.querySelector('.mobile-menu-toggle')) return;

    // Create mobile toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.innerHTML = '☰';
    toggleBtn.setAttribute('aria-label', 'Toggle menu');

    // Insert into top nav
    const logoSection = document.querySelector('.logo-section');
    if (logoSection) {
        logoSection.insertAdjacentElement('beforebegin', toggleBtn);
    }

    // Toggle sidebar on click
    toggleBtn.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebarOverlay') || createOverlay();

        sidebar.classList.toggle('mobile-active');
        overlay.classList.toggle('active');
    });
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'sidebarOverlay';
    overlay.className = 'sidebar-overlay';
    overlay.onclick = () => {
        document.querySelector('.sidebar')?.classList.remove('mobile-active');
        overlay.classList.remove('active');
    };
    document.body.appendChild(overlay);
    return overlay;
}

function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query.length < 2) {
            hideSearchResults();
            return;
        }

        // Search through navigation items
        const allModules = [
            ...navigationData.coreModules,
            ...navigationData.collaborationModules,
            ...navigationData.documentModules,
            ...navigationData.legalModules,
            ...navigationData.practiceModules,
            ...navigationData.systemModules
        ];

        const results = allModules.filter(m =>
            m.name.toLowerCase().includes(query) ||
            m.url.toLowerCase().includes(query)
        );

        showSearchResults(results);
    });
}

function showSearchResults(results) {
    // Implementation for search results dropdown
    console.log('Search results:', results);
}

function hideSearchResults() {
    // Hide search results
}

function updateNotificationCount() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const overdueTasks = tasks.filter(t => {
        if (t.status === 'Completed') return false;
        const dueDate = new Date(t.dueDate);
        return dueDate < new Date();
    });

    const badge = document.getElementById('notificationCount');
    if (badge) {
        badge.textContent = overdueTasks.length;
        badge.style.display = overdueTasks.length > 0 ? 'block' : 'none';
    }
}

function showNotifications() {
    alert('Notifications panel - Coming soon!');
}

function toggleUserMenu() {
    alert('User menu - Coming soon!');
}

// Auto-inject navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavigation);
} else {
    injectNavigation();
}

// Make functions available globally
window.toggleNavSection = toggleNavSection;
window.toggleSidebarCollapse = toggleSidebarCollapse;
window.showNotifications = showNotifications;
window.toggleUserMenu = toggleUserMenu;

// Export for manual use if needed
window.LegalCRM = window.LegalCRM || {};
window.LegalCRM.navigation = {
    inject: injectNavigation,
    data: navigationData,
    reinject: reinjectSidebar
};

console.log('✅ Unified Navigation System loaded');
