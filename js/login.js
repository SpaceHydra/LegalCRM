/**
 * Legal CRM Portal - Login Page JavaScript
 * Handles user authentication and session management
 */

// Demo user credentials (in production, this would be handled by backend API)
const DEMO_USERS = [
    {
        username: 'admin',
        email: 'admin@legalcrm.com',
        password: 'admin123',
        role: 'Administrator',
        name: 'Admin User'
    },
    {
        username: 'lawyer',
        email: 'lawyer@legalcrm.com',
        password: 'lawyer123',
        role: 'Lawyer',
        name: 'John Lawyer'
    },
    {
        username: 'paralegal',
        email: 'paralegal@legalcrm.com',
        password: 'paralegal123',
        role: 'Paralegal',
        name: 'Sarah Assistant'
    },
    {
        username: 'demo',
        email: 'demo@legalcrm.com',
        password: 'demo',
        role: 'Demo User',
        name: 'Demo User'
    }
];

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const loginButton = document.getElementById('loginButton');
const errorMessage = document.getElementById('errorMessage');

// Check if user is already logged in
function checkExistingSession() {
    const currentUser = localStorage.getItem('currentUser');
    const sessionExpiry = localStorage.getItem('sessionExpiry');

    if (currentUser && sessionExpiry) {
        const now = new Date().getTime();
        if (now < parseInt(sessionExpiry)) {
            // Session is still valid, redirect to dashboard
            window.location.href = 'dashboard.html';
            return true;
        } else {
            // Session expired, clear storage
            clearSession();
        }
    }
    return false;
}

// Clear session data
function clearSession() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionExpiry');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');

    // Hide error after 5 seconds
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('show');
}

// Validate credentials
function validateCredentials(usernameOrEmail, password) {
    const user = DEMO_USERS.find(u =>
        (u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
         u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
        u.password === password
    );

    return user;
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        loginButton.disabled = true;
        loginButton.innerHTML = '<span class="spinner"></span>Signing in...';
        loginButton.classList.add('loading');
    } else {
        loginButton.disabled = false;
        loginButton.innerHTML = 'Sign In';
        loginButton.classList.remove('loading');
    }
}

// Handle form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    hideError();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;

    // Validation
    if (!username) {
        showError('Please enter your email or username');
        usernameInput.focus();
        return;
    }

    if (!password) {
        showError('Please enter your password');
        passwordInput.focus();
        return;
    }

    // Set loading state
    setLoading(true);

    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validate credentials
    const user = validateCredentials(username, password);

    if (user) {
        // Successful login
        const sessionDuration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days or 1 day
        const sessionExpiry = new Date().getTime() + sessionDuration;

        // Store user session
        localStorage.setItem('currentUser', user.email);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('sessionExpiry', sessionExpiry.toString());
        localStorage.setItem('loginTime', new Date().toISOString());

        // Store remember me preference
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedUsername', username);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedUsername');
        }

        // Success feedback
        loginButton.innerHTML = '✓ Success! Redirecting...';
        loginButton.style.background = 'var(--gradient-green)';

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);

    } else {
        // Failed login
        setLoading(false);
        showError('Invalid email/username or password. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();

        // Shake the form
        loginForm.style.animation = 'none';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 10);
    }
});

// Auto-fill username if "Remember Me" was checked previously
function loadRememberedCredentials() {
    const rememberMe = localStorage.getItem('rememberMe');
    const savedUsername = localStorage.getItem('savedUsername');

    if (rememberMe === 'true' && savedUsername) {
        usernameInput.value = savedUsername;
        rememberMeCheckbox.checked = true;
        passwordInput.focus();
    } else {
        usernameInput.focus();
    }
}

// Handle "Forgot Password" link
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Password reset functionality would be implemented here.\n\nFor demo purposes, use these credentials:\n\nUsername: demo\nPassword: demo\n\nor\n\nUsername: admin\nPassword: admin123');
});

// Handle "Contact Administrator" link
document.querySelector('.signup-link a').addEventListener('click', function(e) {
    e.preventDefault();
    alert('In a production environment, this would open a contact form or provide administrator contact information.\n\nFor demo purposes, use these test accounts:\n\n1. Username: admin | Password: admin123\n2. Username: lawyer | Password: lawyer123\n3. Username: demo | Password: demo');
});

// Show password hint on input
let hintTimeout;
usernameInput.addEventListener('focus', function() {
    clearTimeout(hintTimeout);
    hintTimeout = setTimeout(() => {
        if (!usernameInput.value && !localStorage.getItem('hintShown')) {
            const hint = document.createElement('div');
            hint.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--info-color);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                font-size: 13px;
                max-width: 280px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            hint.innerHTML = `
                <strong>Demo Credentials:</strong><br>
                Username: <strong>demo</strong><br>
                Password: <strong>demo</strong>
                <button onclick="this.parentElement.remove()" style="
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 5px;
                ">×</button>
            `;
            document.body.appendChild(hint);
            localStorage.setItem('hintShown', 'true');

            // Auto-remove hint after 10 seconds
            setTimeout(() => {
                if (hint.parentElement) {
                    hint.remove();
                }
            }, 10000);
        }
    }, 2000);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for existing session
    if (!checkExistingSession()) {
        // Load remembered credentials if available
        loadRememberedCredentials();
    }

    // Add enter key support for all inputs
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    });
});

// Session management - check for session expiry periodically
setInterval(() => {
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    if (sessionExpiry) {
        const now = new Date().getTime();
        if (now >= parseInt(sessionExpiry)) {
            clearSession();
        }
    }
}, 60000); // Check every minute

// Export for use in other pages
window.LegalCRMAuth = {
    checkSession: checkExistingSession,
    clearSession: clearSession,
    getCurrentUser: () => localStorage.getItem('currentUser'),
    getUserName: () => localStorage.getItem('userName'),
    getUserRole: () => localStorage.getItem('userRole')
};
