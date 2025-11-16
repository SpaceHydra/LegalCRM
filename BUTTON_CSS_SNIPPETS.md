# 🎨 Button System - CSS Code Snippets

## Base Button Styles

```css
/* Base Button */
.btn {
    padding: 11px 24px;
    border-radius: var(--radius-lg);
    font-size: var(--body-regular);
    font-weight: var(--weight-semibold);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.3px;
}

/* Ripple effect for button press */
.btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
    pointer-events: none;
}

.btn:active::before {
    width: 300px;
    height: 300px;
}
```

---

## Primary Button (Blue)

```css
/* PRIMARY BUTTON - Modern Gradient */
.btn-primary {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(30, 60, 114, 0.25);
    position: relative;
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(30, 60, 114, 0.35);
    background: linear-gradient(135deg, #153254 0%, #1f427a 100%);
}

.btn-primary:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(30, 60, 114, 0.25);
}

.btn-primary:focus-visible {
    outline: 2px solid rgba(42, 82, 152, 0.5);
    outline-offset: 2px;
}
```

---

## Secondary Button (Outlined)

```css
/* SECONDARY BUTTON - Outlined Clean */
.btn-secondary {
    background: white;
    color: var(--primary-blue);
    border: 2px solid var(--primary-blue);
    box-shadow: 0 2px 8px rgba(30, 60, 114, 0.1);
    font-weight: var(--weight-semibold);
}

.btn-secondary:hover {
    background: var(--primary-blue);
    color: white;
    box-shadow: 0 6px 16px rgba(30, 60, 114, 0.2);
    transform: translateY(-2px);
}

.btn-secondary:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(30, 60, 114, 0.1);
}

.btn-secondary:focus-visible {
    outline: 2px solid var(--primary-blue);
    outline-offset: 2px;
}
```

---

## Success Button (Green)

```css
/* SUCCESS BUTTON - Green */
.btn-success {
    background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.25);
}

.btn-success:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.35);
    background: linear-gradient(135deg, #1f8449 0%, #1a6d3f 100%);
}

.btn-success:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.25);
}
```

---

## Danger Button (Red)

```css
/* DANGER BUTTON - Red */
.btn-danger {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.25);
}

.btn-danger:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(231, 76, 60, 0.35);
    background: linear-gradient(135deg, #d43e2f 0%, #a83225 100%);
}

.btn-danger:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.25);
}
```

---

## Gradient Buttons (Color-Coded)

```css
/* GRADIENT ACTION BUTTONS */
.btn-gradient {
    padding: 13px 28px;
    border: none;
    color: white;
    border-radius: var(--radius-lg);
    cursor: pointer;
    font-size: var(--body-regular);
    font-weight: var(--weight-semibold);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    position: relative;
    overflow: hidden;
}

.btn-gradient::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

.btn-gradient:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-gradient:hover::after {
    left: 100%;
}

.btn-gradient:active {
    transform: translateY(-2px);
}

/* Color Variants */
.btn-gradient.purple {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-gradient.purple:hover {
    background: linear-gradient(135deg, #5568d3 0%, #693591 100%);
}

.btn-gradient.green {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.btn-gradient.green:hover {
    background: linear-gradient(135deg, #0f8679 0%, #2ed66f 100%);
}

.btn-gradient.pink {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.btn-gradient.pink:hover {
    background: linear-gradient(135deg, #e074de 0%, #f23d50 100%);
}

.btn-gradient.cyan {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.btn-gradient.cyan:hover {
    background: linear-gradient(135deg, #3d9aef 0%, #00d9e9 100%);
}

.btn-gradient.orange {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.btn-gradient.orange:hover {
    background: linear-gradient(135deg, #f85582 0%, #fdd52e 100%);
}

.btn-gradient.teal {
    background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
}

.btn-gradient.teal:hover {
    background: linear-gradient(135deg, #1eb5b6 0%, #290557 100%);
}
```

---

## Icon Button

```css
/* ICON BUTTON - For compact spaces */
.btn-icon {
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}

.btn-icon.btn-primary {
    background: var(--primary-gradient);
    color: white;
    box-shadow: 0 4px 12px rgba(30, 60, 114, 0.2);
}

.btn-icon.btn-primary:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 16px rgba(30, 60, 114, 0.3);
}

.btn-icon.btn-secondary {
    background: white;
    color: var(--primary-blue);
    border: 2px solid var(--primary-blue);
    box-shadow: 0 2px 8px rgba(30, 60, 114, 0.1);
}

.btn-icon.btn-secondary:hover {
    background: var(--primary-blue);
    color: white;
    transform: scale(1.08);
}
```

---

## Size Variants

```css
/* BUTTON SIZES */
.btn-sm {
    padding: 8px 16px;
    font-size: var(--body-small);
    border-radius: var(--radius-md);
}

.btn-lg {
    padding: 15px 32px;
    font-size: var(--body-large);
}

.btn-xl {
    padding: 18px 40px;
    font-size: var(--h5-size);
    border-radius: var(--radius-xl);
}
```

---

## Button States

```css
/* BUTTON STATES */
.btn:disabled,
.btn[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
    background: #bdc3c7;
}

.btn:disabled:hover,
.btn[disabled]:hover {
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.btn:disabled::before,
.btn[disabled]::before {
    display: none;
}

/* LOADING STATE */
.btn.btn-loading {
    color: transparent;
    pointer-events: none;
}

.btn.btn-loading::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
```

---

## Focus States

```css
/* FOCUS STATES - Accessibility */
.btn:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}

.btn:focus:not(:focus-visible) {
    outline: none;
}
```

---

## Additional Variants

```css
/* OUTLINE BUTTON - Subtle & Elegant */
.btn-outline {
    background: transparent;
    border: 2px solid currentColor;
    color: var(--primary-blue);
    box-shadow: none;
}

.btn-outline:hover {
    background: var(--primary-blue);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(30, 60, 114, 0.2);
}

.btn-outline:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(30, 60, 114, 0.1);
}

/* GHOST BUTTON - Minimal */
.btn-ghost {
    background: transparent;
    border: 1px solid rgba(30, 60, 114, 0.3);
    color: var(--primary-blue);
    box-shadow: none;
}

.btn-ghost:hover {
    background: rgba(30, 60, 114, 0.05);
    border-color: var(--primary-blue);
    transform: translateY(-2px);
}

.btn-ghost:active {
    background: rgba(30, 60, 114, 0.1);
    transform: translateY(0);
}

/* TEXT BUTTON - Links Style */
.btn-text {
    background: transparent;
    border: none;
    color: var(--info-color);
    padding: 8px 12px;
    box-shadow: none;
    font-weight: var(--weight-semibold);
}

.btn-text:hover {
    background: rgba(52, 152, 219, 0.1);
    color: #2980b9;
    transform: none;
}

.btn-text:active {
    background: rgba(52, 152, 219, 0.15);
}
```

---

## HTML Usage Examples

```html
<!-- Primary Button -->
<button class="btn btn-primary">Submit</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Cancel</button>

<!-- Success Button -->
<button class="btn btn-success">Save</button>

<!-- Danger Button -->
<button class="btn btn-danger">Delete</button>

<!-- Small Button -->
<button class="btn btn-sm btn-primary">Small</button>

<!-- Large Button -->
<button class="btn btn-lg btn-primary">Large</button>

<!-- Icon Button -->
<button class="btn btn-icon btn-primary" aria-label="Edit">✏️</button>

<!-- Gradient Buttons -->
<button class="btn btn-gradient purple">Lead Action</button>
<button class="btn btn-gradient green">Client Action</button>

<!-- Disabled Button -->
<button class="btn btn-primary" disabled>Disabled</button>

<!-- Loading Button -->
<button class="btn btn-primary btn-loading">Loading...</button>

<!-- Link Button -->
<a href="/page" class="btn btn-primary">Navigate</a>

<!-- Button Group -->
<div style="display: flex; gap: 10px;">
    <button class="btn btn-secondary">Cancel</button>
    <button class="btn btn-primary">Save</button>
</div>

<!-- Icon + Text -->
<button class="btn btn-primary">
    <span>➕</span>
    Add New Lead
</button>
```

---

## CSS Variables Used

```css
/* All CSS variables from css/base/variables.css */
--primary-blue: #1e3c72
--primary-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)
--success-color: #27ae60
--danger-color: #e74c3c
--warning-color: #f39c12
--info-color: #3498db
--radius-lg: 12px
--radius-md: 8px
--body-regular: 14px
--body-small: 13px
--weight-semibold: 600
--shadow-light: 0 2px 8px rgba(0,0,0,0.08)
```

---

## Animation Keyframes

```css
/* Spin animation for loading state */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Shimmer animation (built-in via ::after) */
/* Duration: 0.5s linear */
/* Left position: -100% → 100% */

/* Ripple animation (built-in via ::before) */
/* Duration: 0.6s */
/* Width/Height: 0 → 300px */
```

---

## Integration Notes

1. **Import Location**: All styles in `css/components/buttons.css`
2. **Master File**: Imported via `css/styles.css`
3. **Variables**: Uses CSS custom properties from `css/base/variables.css`
4. **Fallbacks**: Not needed for modern browsers
5. **Prefixes**: No vendor prefixes needed (auto-prefixed by build tool if needed)

---

## Customization Template

```css
/* Create custom button variant */
.btn-custom {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(your-rgb-values, 0.3);
}

.btn-custom:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(your-rgb-values, 0.4);
    background: linear-gradient(135deg, #darker-color-1 0%, #darker-color-2 100%);
}

.btn-custom:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(your-rgb-values, 0.25);
}

.btn-custom:focus-visible {
    outline: 2px solid rgba(your-rgb-values, 0.5);
    outline-offset: 2px;
}
```

---

**All code is production-ready and optimized for performance!** ✨
