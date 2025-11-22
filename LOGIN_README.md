# Legal CRM Portal - Login System

## Overview

The Legal CRM Portal now includes a complete authentication system with a professional login page, session management, and access control.

## Features

### ✓ Login Page (`login.html`)
- Modern, responsive design with animated gradient background
- Professional UI matching the Legal CRM design system
- Form validation and error handling
- "Remember Me" functionality
- Session management with automatic expiry
- Demo credentials hint for easy testing

### ✓ Authentication System
- Session-based authentication using localStorage
- Automatic session expiry (24 hours default, 30 days with "Remember Me")
- Secure session validation
- Activity tracking to maintain active sessions

### ✓ Access Control
- Authentication guard for protected pages
- Automatic redirect to login for unauthenticated users
- Session monitoring and automatic logout on expiry
- User information display in navigation

## Demo Credentials

For testing purposes, use any of these demo accounts:

| Username | Password | Role |
|----------|----------|------|
| demo | demo | Demo User |
| admin | admin123 | Administrator |
| lawyer | lawyer123 | Lawyer |
| paralegal | paralegal123 | Paralegal |

## Usage

### Accessing the Application

1. Open `index.html` in your browser
2. You will be automatically redirected to `login.html`
3. Enter demo credentials (username: `demo`, password: `demo`)
4. Click "Sign In" to access the dashboard

### Session Management

- **Default Session**: 24 hours
- **Remember Me**: 30 days
- Sessions automatically expire and redirect to login
- User activity is tracked to maintain active sessions

### Logout

To logout from the application:
- Look for logout buttons in the navigation (if implemented)
- Or simply clear localStorage in browser console: `localStorage.clear()`

## File Structure

```
LegalCRM/
├── login.html                 # Login page
├── index.html                 # Entry point (redirects to login or dashboard)
├── js/
│   ├── login.js              # Login page logic
│   └── auth-guard.js         # Authentication guard for protected pages
└── LOGIN_README.md           # This file
```

## Implementation Details

### Login Flow

1. User visits `index.html`
2. Script checks for existing valid session
3. If logged in → redirect to `dashboard.html`
4. If not logged in → redirect to `login.html`
5. User enters credentials
6. System validates against demo users
7. On success → store session and redirect to dashboard
8. On failure → show error message

### Session Storage

The following data is stored in localStorage:
- `currentUser`: User's email address
- `userName`: User's display name
- `userRole`: User's role
- `sessionExpiry`: Timestamp when session expires
- `loginTime`: When user logged in
- `rememberMe`: Whether "Remember Me" was checked
- `savedUsername`: Saved username (if Remember Me is enabled)

### Protecting Pages

To protect any page from unauthorized access, include the auth guard script:

```html
<script src="js/auth-guard.js"></script>
```

This script will:
- Check for valid authentication
- Redirect to login if not authenticated
- Monitor session expiry
- Setup logout functionality
- Display user information

## Customization

### Adding New Users

Edit `js/login.js` and add users to the `DEMO_USERS` array:

```javascript
const DEMO_USERS = [
    {
        username: 'newuser',
        email: 'newuser@legalcrm.com',
        password: 'password123',
        role: 'Role Name',
        name: 'Display Name'
    }
];
```

### Changing Session Duration

Edit `js/login.js` and modify the session duration:

```javascript
// Default: 24 hours
const sessionDuration = rememberMe
    ? 30 * 24 * 60 * 60 * 1000  // 30 days
    : 24 * 60 * 60 * 1000;       // 1 day
```

### Styling

The login page uses the existing Legal CRM design system:
- CSS variables from `css/base/variables.css`
- Form components from `css/components/forms.css`
- Custom styles embedded in `login.html`

## Security Notes

⚠️ **Important**: This is a demo/prototype authentication system suitable for development and testing only.

For production use, implement:
- Backend authentication API
- Secure password hashing (bcrypt, etc.)
- HTTPS/TLS encryption
- CSRF protection
- Rate limiting for login attempts
- Two-factor authentication (optional)
- Secure session tokens (JWT, etc.)
- Password reset functionality
- Account lockout after failed attempts

## Browser Compatibility

- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Can't login
- Check that JavaScript is enabled
- Verify credentials match demo accounts
- Clear browser cache and localStorage
- Check browser console for errors

### Session expires too quickly
- Check system clock is correct
- Verify sessionExpiry value in localStorage
- Enable "Remember Me" for longer sessions

### Redirect loop
- Clear localStorage: `localStorage.clear()`
- Check for JavaScript errors in console
- Ensure all files are properly loaded

## Future Enhancements

Potential improvements for production:
- [ ] Backend API integration
- [ ] Password reset via email
- [ ] Two-factor authentication
- [ ] OAuth/SSO integration
- [ ] Brute force protection
- [ ] Session management dashboard
- [ ] Login history and audit logs
- [ ] Multi-device session management

## Support

For issues or questions:
- Check browser console for errors
- Review this documentation
- Contact the development team

---

**Created**: November 2025
**Version**: 1.0.0
**Status**: Development/Demo
