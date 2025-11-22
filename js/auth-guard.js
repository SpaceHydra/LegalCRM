/**
 * Legal CRM Portal - Authentication Guard
 * Protects pages from unauthorized access
 * Include this script in any page that requires authentication
 */

(function() {
    'use strict';

    /**
     * Check if user has a valid session
     */
    function checkAuthentication() {
        const currentUser = localStorage.getItem('currentUser');
        const sessionExpiry = localStorage.getItem('sessionExpiry');

        // If no user or session expiry, redirect to login
        if (!currentUser || !sessionExpiry) {
            redirectToLogin();
            return false;
        }

        // Check if session has expired
        const now = new Date().getTime();
        if (now >= parseInt(sessionExpiry)) {
            clearSession();
            redirectToLogin();
            return false;
        }

        // Session is valid
        return true;
    }

    /**
     * Clear session data
     */
    function clearSession() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionExpiry');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
    }

    /**
     * Redirect to login page
     */
    function redirectToLogin() {
        // Store the current page URL to redirect back after login
        const currentPage = window.location.pathname + window.location.search;
        if (!currentPage.includes('login.html')) {
            localStorage.setItem('redirectAfterLogin', currentPage);
        }

        // Redirect to login
        window.location.href = 'login.html';
    }

    /**
     * Get current user information
     */
    function getCurrentUser() {
        return {
            email: localStorage.getItem('currentUser'),
            name: localStorage.getItem('userName'),
            role: localStorage.getItem('userRole')
        };
    }

    /**
     * Logout function
     */
    function logout() {
        clearSession();
        redirectToLogin();
    }

    /**
     * Update session activity
     */
    function updateActivity() {
        const sessionExpiry = localStorage.getItem('sessionExpiry');
        if (sessionExpiry) {
            localStorage.setItem('lastActivity', new Date().toISOString());
        }
    }

    /**
     * Display user info in navigation
     */
    function displayUserInfo() {
        const user = getCurrentUser();
        const userInfoElements = document.querySelectorAll('.user-name, .current-user-name');
        const userRoleElements = document.querySelectorAll('.user-role, .current-user-role');

        userInfoElements.forEach(el => {
            if (el) el.textContent = user.name || user.email || 'User';
        });

        userRoleElements.forEach(el => {
            if (el) el.textContent = user.role || 'User';
        });
    }

    /**
     * Setup logout buttons
     */
    function setupLogoutButtons() {
        const logoutButtons = document.querySelectorAll('[data-logout], .logout-btn, #logoutBtn');
        logoutButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    logout();
                }
            });
        });
    }

    /**
     * Track user activity to prevent session timeout during active use
     */
    function trackActivity() {
        let activityTimeout;
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

        const resetActivityTimer = () => {
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(updateActivity, 5000); // Update every 5 seconds of activity
        };

        events.forEach(event => {
            document.addEventListener(event, resetActivityTimer, true);
        });
    }

    /**
     * Check session periodically
     */
    function startSessionMonitoring() {
        setInterval(() => {
            if (!checkAuthentication()) {
                clearSession();
                alert('Your session has expired. Please login again.');
                redirectToLogin();
            }
        }, 60000); // Check every minute
    }

    /**
     * Initialize authentication guard
     */
    function initialize() {
        // Check authentication immediately
        if (!checkAuthentication()) {
            return; // Will redirect to login
        }

        // Display user information
        displayUserInfo();

        // Setup logout functionality
        setupLogoutButtons();

        // Track user activity
        trackActivity();

        // Start session monitoring
        startSessionMonitoring();

        // Update activity on page load
        updateActivity();
    }

    // Run authentication check as soon as possible
    if (!checkAuthentication()) {
        // Stop script execution if not authenticated
        throw new Error('Authentication required');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Export auth utilities globally
    window.LegalCRMAuth = window.LegalCRMAuth || {};
    Object.assign(window.LegalCRMAuth, {
        checkAuth: checkAuthentication,
        logout: logout,
        getCurrentUser: getCurrentUser,
        clearSession: clearSession,
        updateActivity: updateActivity
    });

})();
