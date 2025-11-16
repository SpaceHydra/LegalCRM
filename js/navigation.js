// Legal CRM - Shared Navigation Component
// This script dynamically injects the top navigation and sidebar into pages

const navigationData = {
    coreModules: [
        { name: 'Dashboard', icon: '📊', url: 'dashboard.html', phase: 'mvp' },
        { name: 'Lead Management', icon: '🎯', url: 'lead-management.html', phase: 'mvp' },
        { name: 'Client Management', icon: '👥', url: 'client-management.html', phase: 'mvp' },
        { name: 'Project Management', icon: '📁', url: 'project-management.html', phase: 'mvp' },
        { name: 'Task Management', icon: '✅', url: 'task-management.html', phase: 'mvp' },
        { name: 'Document Management', icon: '📄', url: 'document-management.html', phase: 'mvp' },
        { name: 'User Management', icon: '👤', url: 'user-management.html', phase: 'mvp' },
        { name: 'Basic Reporting', icon: '📈', url: 'reporting.html', phase: 'mvp' }
    ],
    phase2Modules: [
        { name: 'Meeting Scheduler', icon: '📅', url: 'calendar.html', phase: 'phase2' },
        { name: 'Billing & Revenue', icon: '💰', url: 'billing.html', phase: 'phase2' },
        { name: 'Drafting & Contracts', icon: '📝', url: 'drafting-dashboard.html', phase: 'phase2', submenu: [
            { name: 'Draft Requests', url: 'drafting-requests.html' },
            { name: 'Templates', url: 'drafting-templates.html' },
            { name: 'Clause Library', url: 'drafting-clauses.html' },
            { name: 'Execution & Renewals', url: 'drafting-execution.html' }
        ]},
        { name: 'Advocate Management', icon: '⚖️', url: 'advocates-management.html', phase: 'phase2' }
    ],
    systemModules: [
        { name: 'Settings', icon: '⚙️', url: 'settings.html' },
        { name: 'Help & Docs', icon: '📚', url: 'index.html' }
    ]
};

function createTopNavigation() {
    return `
        <div class="top-nav">
            <div class="logo-section">
                <div class="logo">LC</div>
                <div class="system-title">
                    <h1>Legal CRM Portal</h1>
                    <p>SNG & Partners - Business Development Platform</p>
                </div>
            </div>
            <div class="user-section">
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input type="text" placeholder="Search...">
                </div>
                <div class="notification-icon">
                    <span>🔔</span>
                    <div class="notification-badge">7</div>
                </div>
                <div class="user-profile">
                    <div class="user-avatar">PM</div>
                    <div class="user-info">
                        <div class="user-name">Prateek Mehta</div>
                        <div class="user-role">Senior Advocate</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createSidebar(activePage = '') {
    const createNavItem = (module, isSubmenu = false) => {
        const isActive = activePage.includes(module.url) ? 'active' : '';
        const badge = module.phase ? `<span class="phase-badge ${module.phase}">${module.phase.toUpperCase()}</span>` : '';
        const indent = isSubmenu ? 'style="padding-left: 50px;"' : '';

        return `
            <a href="${module.url}" class="nav-item ${isActive}" ${indent}>
                ${!isSubmenu ? `<span class="nav-icon">${module.icon}</span>` : ''}
                <span class="nav-label">${module.name}</span>
                ${badge}
            </a>
        `;
    };

    const coreHTML = navigationData.coreModules.map(m => createNavItem(m)).join('');

    let phase2HTML = '';
    navigationData.phase2Modules.forEach(m => {
        phase2HTML += createNavItem(m);
        if (m.submenu && (activePage.includes('drafting') || activePage.includes(m.url))) {
            m.submenu.forEach(sub => {
                phase2HTML += createNavItem({ ...sub, icon: '↳' }, true);
            });
        }
    });

    const systemHTML = navigationData.systemModules.map(m => createNavItem(m)).join('');

    return `
        <div class="sidebar">
            <div class="nav-section">
                <div class="nav-section-title">Core Modules</div>
                ${coreHTML}
            </div>
            <div class="nav-section">
                <div class="nav-section-title">Phase 2 Features</div>
                ${phase2HTML}
            </div>
            <div class="nav-section">
                <div class="nav-section-title">System</div>
                ${systemHTML}
            </div>
        </div>
    `;
}

function injectNavigation() {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Create navigation HTML
    const topNavHTML = createTopNavigation();
    const sidebarHTML = createSidebar(currentPage);

    // Inject at the beginning of body
    const body = document.body;
    body.insertAdjacentHTML('afterbegin', sidebarHTML);
    body.insertAdjacentHTML('afterbegin', topNavHTML);

    // Add mobile menu toggle functionality
    setupMobileMenu();
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
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !toggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Auto-inject navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavigation);
} else {
    injectNavigation();
}

// Export for manual use if needed
window.LegalCRM = window.LegalCRM || {};
window.LegalCRM.navigation = {
    inject: injectNavigation,
    data: navigationData
};
