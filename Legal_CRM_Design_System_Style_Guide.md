# Legal CRM Portal - Design System & Style Guide
## Comprehensive Design Documentation for HTML Development

**Project:** Legal CRM Portal for Indian Law Firms  
**Client:** SNG and Partners  
**Prepared By:** Business Analyst - Cubictree  
**Date:** November 06, 2025  
**Version:** 1.0  
**Purpose:** Complete design system for consistent UI/UX across all modules

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Layout Structure](#layout-structure)
5. [Component Library](#component-library)
6. [Navigation System](#navigation-system)
7. [Module-Specific Components](#module-specific-components)
8. [Responsive Design Guidelines](#responsive-design-guidelines)
9. [CSS Architecture](#css-architecture)
10. [Implementation Guidelines](#implementation-guidelines)
11. [Code Templates](#code-templates)

---

## 1. Design Philosophy

### **Core Principles**
- **Professional & Trustworthy**: Legal firms require a professional, corporate aesthetic
- **Clean & Minimalist**: Reduce cognitive load with clear visual hierarchy
- **Consistent**: Same patterns across all modules for predictable user experience
- **Efficient**: Quick access to critical functions with minimal clicks
- **Responsive**: Mobile-first approach for advocates working on-the-go

### **Visual Style**
- Modern gradient accents on primary elements
- Soft shadows for depth without heaviness
- Rounded corners (8px-12px) for friendly yet professional feel
- Ample whitespace for readability
- Color-coded status indicators for quick scanning

---

## 2. Color Palette

### **Primary Colors**

```css
/* Primary Brand Colors */
--primary-blue: #1e3c72;
--primary-blue-light: #2a5298;
--primary-gradient: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);

/* Secondary Colors */
--secondary-dark: #2c3e50;
--secondary-medium: #34495e;
--secondary-light: #4a5f7f;
```

### **Accent Colors for Modules/Features**

```css
/* Gradient Combinations for Cards/Icons */
--gradient-purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-green: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
--gradient-pink: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-cyan: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-orange: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
--gradient-teal: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
```

### **Status & Alert Colors**

```css
/* Success States */
--success-color: #27ae60;
--success-bg: #d4edda;
--success-light: #e8f5e9;

/* Warning States */
--warning-color: #f39c12;
--warning-bg: #fff3cd;
--warning-light: #fff8e1;

/* Danger/Error States */
--danger-color: #e74c3c;
--danger-bg: #f8d7da;
--danger-light: #ffebee;

/* Info States */
--info-color: #3498db;
--info-bg: #d1ecf1;
--info-light: #e3f2fd;
```

### **Neutral/Base Colors**

```css
/* Text Colors */
--text-primary: #2c3e50;
--text-secondary: #7f8c8d;
--text-muted: #95a5a6;
--text-white: #ffffff;

/* Background Colors */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-dark: #f5f7fa;
--bg-hover: #ecf0f1;

/* Border Colors */
--border-light: #ecf0f1;
--border-medium: #bdc3c7;
--border-dark: #95a5a6;
```

### **Phase Badge Colors**

```css
/* Module Phase Indicators */
--badge-mvp: #27ae60;        /* Green - MVP Phase */
--badge-phase2: #f39c12;     /* Orange - Phase 2 */
--badge-phase3: #9b59b6;     /* Purple - Phase 3 */
--badge-future: #95a5a6;     /* Gray - Future */
```

### **Priority Badge Colors**

```css
/* Task/Lead Priority Indicators */
--priority-high-bg: #ffebee;
--priority-high-text: #e74c3c;

--priority-medium-bg: #fff8e1;
--priority-medium-text: #f39c12;

--priority-low-bg: #e8f5e9;
--priority-low-text: #27ae60;
```

---

## 3. Typography

### **Font Family**

```css
/* Primary Font Stack */
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

/* Fallback for Indian Language Support (if needed in future) */
font-family: 'Segoe UI', 'Noto Sans', 'Arial Unicode MS', sans-serif;
```

### **Font Sizes & Weights**

```css
/* Headings */
--h1-size: 28px;
--h1-weight: 600;

--h2-size: 22px;
--h2-weight: 600;

--h3-size: 18px;
--h3-weight: 600;

--h4-size: 16px;
--h4-weight: 600;

--h5-size: 14px;
--h5-weight: 600;

/* Body Text */
--body-large: 16px;
--body-regular: 14px;
--body-small: 13px;
--body-tiny: 12px;
--body-micro: 11px;

/* Labels & Captions */
--label-size: 13px;
--label-weight: 500;

--caption-size: 11px;
--caption-weight: 400;
```

### **Line Heights**

```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.8;
```

---

## 4. Layout Structure

### **Overall Page Structure**

```
┌─────────────────────────────────────────────────────────┐
│  Top Navigation Bar (Fixed)                             │
│  Height: 75px                                           │
└─────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────────┐
│              │                                          │
│   Sidebar    │   Main Content Area                      │
│   (Fixed)    │   (Scrollable)                          │
│   Width:     │                                          │
│   260px      │   Padding: 30px                          │
│              │   Min-height: calc(100vh - 75px)        │
│              │                                          │
│              │   ┌────────────────────────────────┐    │
│              │   │  Page Header                   │    │
│              │   └────────────────────────────────┘    │
│              │                                          │
│              │   ┌────────────────────────────────┐    │
│              │   │  Content Widgets/Cards         │    │
│              │   │  (Grid Layout)                 │    │
│              │   └────────────────────────────────┘    │
│              │                                          │
│              │   ┌────────────────────────────────┐    │
│              │   │  Footer                        │    │
│              │   └────────────────────────────────┘    │
└──────────────┴──────────────────────────────────────────┘
```

### **Grid System**

```css
/* Stats Cards Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

/* Widget Grid (2 columns on desktop) */
.widget-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

/* Form Grid (2 columns) */
.form-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

/* Form Grid (3 columns) */
.form-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

### **Spacing System**

```css
/* Consistent Spacing Scale */
--space-xs: 5px;
--space-sm: 10px;
--space-md: 15px;
--space-lg: 20px;
--space-xl: 30px;
--space-xxl: 50px;

/* Component Padding */
--padding-card: 25px;
--padding-widget: 25px;
--padding-section: 30px;

/* Margins */
--margin-section: 30px;
--margin-element: 20px;
```

### **Border Radius**

```css
--radius-sm: 6px;    /* Small elements like badges */
--radius-md: 8px;    /* Default for most elements */
--radius-lg: 12px;   /* Cards and larger components */
--radius-xl: 20px;   /* Search boxes, special elements */
--radius-full: 50%;  /* Circular elements (avatars) */
```

### **Shadows**

```css
/* Box Shadows */
--shadow-light: 0 2px 8px rgba(0,0,0,0.08);
--shadow-medium: 0 4px 15px rgba(0,0,0,0.15);
--shadow-heavy: 0 8px 25px rgba(0,0,0,0.2);

/* Usage */
.card { box-shadow: var(--shadow-light); }
.card:hover { box-shadow: var(--shadow-medium); }
.modal { box-shadow: var(--shadow-heavy); }
```

---

## 5. Component Library

### **5.1 Top Navigation Bar**

**Specifications:**
- Height: 75px
- Background: `linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`
- Color: White
- Fixed position at top
- Box shadow: `0 2px 10px rgba(0,0,0,0.1)`
- Z-index: 1000

**Structure:**
```html
<div class="top-nav">
    <div class="logo-section">
        <div class="logo">LC</div>
        <div class="system-title">
            <h1>Legal CRM Portal</h1>
            <p>SNG & Partners - Business Development Platform</p>
        </div>
    </div>
    <div class="user-section">
        <div class="search-box"><!-- Search --></div>
        <div class="notification-icon"><!-- Notifications --></div>
        <div class="user-profile"><!-- User Info --></div>
    </div>
</div>
```

**CSS:**
```css
.top-nav {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
}
```

### **5.2 Sidebar Navigation**

**Specifications:**
- Width: 260px
- Background: #2c3e50
- Color: White (#ecf0f1)
- Fixed position
- Top: 75px (below top nav)
- Scrollable content
- Z-index: 999

**Navigation Item States:**
```css
/* Default State */
.nav-item {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #ecf0f1;
}

/* Hover State */
.nav-item:hover {
    background: #34495e;
    border-left: 4px solid #3498db;
    padding-left: 16px;
}

/* Active State */
.nav-item.active {
    background: #34495e;
    border-left: 4px solid #3498db;
    padding-left: 16px;
    color: #3498db;
}
```

**Section Titles:**
```css
.nav-section-title {
    padding: 10px 20px;
    font-size: 11px;
    text-transform: uppercase;
    color: #95a5a6;
    font-weight: 600;
    letter-spacing: 1px;
}
```

### **5.3 Stat Cards**

**Specifications:**
- Background: White
- Padding: 25px
- Border radius: 12px
- Shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Hover effect: Lift up with increased shadow

**CSS:**
```css
.stat-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
}

/* Icon Gradient Variants */
.stat-icon.blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.stat-icon.green { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
.stat-icon.orange { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.stat-icon.purple { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.stat-icon.red { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.stat-icon.teal { background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); }
```

### **5.4 Widget/Card Component**

**Specifications:**
- Background: White
- Padding: 25px
- Border radius: 12px
- Shadow: `0 2px 8px rgba(0,0,0,0.08)`

**CSS:**
```css
.widget {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #ecf0f1;
}

.widget-title {
    font-size: 18px;
    color: #2c3e50;
    font-weight: 600;
}

.widget-action {
    color: #3498db;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
}

.widget-action:hover {
    text-decoration: underline;
}
```

### **5.5 Buttons**

**Primary Button:**
```css
.btn-primary {
    padding: 12px 24px;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 60, 114, 0.3);
}
```

**Secondary Button:**
```css
.btn-secondary {
    padding: 12px 24px;
    background: white;
    color: #1e3c72;
    border: 2px solid #1e3c72;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: #1e3c72;
    color: white;
}
```

**Gradient Action Buttons (Quick Actions):**
```css
.btn-gradient {
    padding: 20px;
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: transform 0.3s ease;
}

.btn-gradient:hover {
    transform: translateY(-3px);
}

.btn-gradient.purple { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.btn-gradient.green { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
.btn-gradient.pink { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.btn-gradient.cyan { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.btn-gradient.orange { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.btn-gradient.teal { background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); }
```

**Danger Button:**
```css
.btn-danger {
    padding: 12px 24px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-danger:hover {
    background: #c0392b;
}
```

### **5.6 Badges**

**Phase Badges:**
```css
.phase-badge {
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 9px;
    font-weight: 600;
    color: white;
}

.phase-badge.mvp { background: #27ae60; }
.phase-badge.phase2 { background: #f39c12; }
.phase-badge.phase3 { background: #9b59b6; }
.phase-badge.future { background: #95a5a6; }
```

**Priority Badges:**
```css
.priority-badge {
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: 600;
}

.priority-badge.high {
    background: #ffebee;
    color: #e74c3c;
}

.priority-badge.medium {
    background: #fff8e1;
    color: #f39c12;
}

.priority-badge.low {
    background: #e8f5e9;
    color: #27ae60;
}
```

**Status Badges:**
```css
.status-badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
}

.status-badge.active {
    background: #e8f5e9;
    color: #27ae60;
}

.status-badge.pending {
    background: #fff8e1;
    color: #f39c12;
}

.status-badge.completed {
    background: #e3f2fd;
    color: #2196f3;
}

.status-badge.cancelled {
    background: #ffebee;
    color: #e74c3c;
}
```

**Notification Badge:**
```css
.badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4444;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}
```

### **5.7 Form Elements**

**Input Fields:**
```css
.form-input {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #ecf0f1;
    border-radius: 8px;
    font-size: 14px;
    color: #2c3e50;
    transition: border-color 0.3s ease;
}

.form-input:focus {
    outline: none;
    border-color: #3498db;
}

.form-input::placeholder {
    color: #95a5a6;
}
```

**Form Labels:**
```css
.form-label {
    display: block;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #2c3e50;
}

.form-label.required::after {
    content: " *";
    color: #e74c3c;
}
```

**Select Dropdown:**
```css
.form-select {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #ecf0f1;
    border-radius: 8px;
    font-size: 14px;
    color: #2c3e50;
    background: white;
    cursor: pointer;
    transition: border-color 0.3s ease;
}

.form-select:focus {
    outline: none;
    border-color: #3498db;
}
```

**Textarea:**
```css
.form-textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #ecf0f1;
    border-radius: 8px;
    font-size: 14px;
    color: #2c3e50;
    resize: vertical;
    min-height: 100px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: border-color 0.3s ease;
}

.form-textarea:focus {
    outline: none;
    border-color: #3498db;
}
```

**Checkbox:**
```css
.form-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #3498db;
}
```

**Radio Button:**
```css
.form-radio {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #3498db;
}
```

**Form Group:**
```css
.form-group {
    margin-bottom: 20px;
}

.form-group-inline {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}
```

### **5.8 Tables**

**Standard Data Table:**
```css
.data-table {
    width: 100%;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.data-table thead {
    background: #f8f9fa;
}

.data-table th {
    padding: 15px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: #2c3e50;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 2px solid #ecf0f1;
}

.data-table td {
    padding: 15px;
    font-size: 14px;
    color: #2c3e50;
    border-bottom: 1px solid #ecf0f1;
}

.data-table tbody tr:hover {
    background: #f8f9fa;
}

.data-table tbody tr:last-child td {
    border-bottom: none;
}
```

### **5.9 Timeline Component**

**CSS:**
```css
.timeline-item {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ecf0f1;
}

.timeline-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.timeline-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 18px;
}

.timeline-icon.success {
    background: #d4edda;
    color: #27ae60;
}

.timeline-icon.info {
    background: #d1ecf1;
    color: #3498db;
}

.timeline-icon.warning {
    background: #fff3cd;
    color: #f39c12;
}

.timeline-icon.danger {
    background: #f8d7da;
    color: #e74c3c;
}

.timeline-content h4 {
    font-size: 14px;
    color: #2c3e50;
    margin-bottom: 5px;
    font-weight: 600;
}

.timeline-content p {
    font-size: 13px;
    color: #7f8c8d;
    margin-bottom: 3px;
}

.timeline-time {
    font-size: 11px;
    color: #95a5a6;
}
```

### **5.10 Task/List Item Component**

**CSS:**
```css
.task-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 4px solid #3498db;
    transition: all 0.3s ease;
}

.task-item:hover {
    background: #ecf0f1;
}

.task-item.overdue {
    border-left-color: #e74c3c;
    background: #ffebee;
}

.task-item.warning {
    border-left-color: #f39c12;
    background: #fff8e1;
}

.task-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #3498db;
}

.task-details {
    flex: 1;
}

.task-title {
    font-size: 14px;
    color: #2c3e50;
    margin-bottom: 3px;
    font-weight: 500;
}

.task-meta {
    font-size: 12px;
    color: #7f8c8d;
}
```

### **5.11 Meeting Item Component**

**CSS:**
```css
.meeting-item {
    display: flex;
    gap: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 12px;
    transition: all 0.3s ease;
}

.meeting-item:hover {
    background: #ecf0f1;
}

.meeting-time {
    text-align: center;
    min-width: 60px;
}

.meeting-hour {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
}

.meeting-period {
    font-size: 11px;
    color: #7f8c8d;
}

.meeting-details {
    flex: 1;
}

.meeting-details h4 {
    font-size: 14px;
    color: #2c3e50;
    margin-bottom: 5px;
    font-weight: 600;
}

.meeting-details p {
    font-size: 12px;
    color: #7f8c8d;
}

.meeting-status {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    align-self: flex-start;
}

.meeting-status.upcoming {
    background: #e3f2fd;
    color: #2196f3;
}

.meeting-status.ongoing {
    background: #e8f5e9;
    color: #4caf50;
}
```

### **5.12 Modal/Dialog**

**CSS:**
```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    padding: 20px 25px;
    border-bottom: 2px solid #ecf0f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
}

.modal-close {
    background: none;
    border: none;
    font-size: 24px;
    color: #95a5a6;
    cursor: pointer;
    transition: color 0.3s ease;
}

.modal-close:hover {
    color: #e74c3c;
}

.modal-body {
    padding: 25px;
}

.modal-footer {
    padding: 15px 25px;
    border-top: 2px solid #ecf0f1;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
```

### **5.13 Alert/Notification Component**

**CSS:**
```css
.alert {
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.alert-icon {
    font-size: 20px;
    flex-shrink: 0;
}

.alert-content {
    flex: 1;
}

.alert-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
}

.alert-message {
    font-size: 13px;
}

.alert.success {
    background: #d4edda;
    color: #155724;
    border-left: 4px solid #27ae60;
}

.alert.warning {
    background: #fff3cd;
    color: #856404;
    border-left: 4px solid #f39c12;
}

.alert.danger {
    background: #f8d7da;
    color: #721c24;
    border-left: 4px solid #e74c3c;
}

.alert.info {
    background: #d1ecf1;
    color: #0c5460;
    border-left: 4px solid #3498db;
}
```

### **5.14 Search Box**

**CSS:**
```css
.search-box {
    background: rgba(255,255,255,0.2);
    padding: 8px 15px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background 0.3s ease;
}

.search-box:focus-within {
    background: rgba(255,255,255,0.3);
}

.search-box input {
    background: transparent;
    border: none;
    color: white;
    outline: none;
    width: 250px;
    font-size: 14px;
}

.search-box input::placeholder {
    color: rgba(255,255,255,0.7);
}

.search-icon {
    color: rgba(255,255,255,0.9);
    font-size: 16px;
}
```

### **5.15 User Avatar**

**CSS:**
```css
.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    color: white;
    flex-shrink: 0;
}

.user-avatar.green { background: #4CAF50; }
.user-avatar.blue { background: #2196F3; }
.user-avatar.orange { background: #FF9800; }
.user-avatar.purple { background: #9C27B0; }
.user-avatar.red { background: #F44336; }

/* Larger sizes */
.user-avatar.large {
    width: 60px;
    height: 60px;
    font-size: 24px;
}

.user-avatar.small {
    width: 30px;
    height: 30px;
    font-size: 12px;
}
```

---

## 6. Navigation System

### **6.1 Sidebar Module Organization**

**Core Modules (MVP) - Green Badge:**
1. Dashboard (📊)
2. Lead Management (🎯)
3. Client Management (👥)
4. Matter/Project Management (📁)
5. Task Management (✅)
6. Document Management (📄)
7. User & Role Management (👤)
8. Basic Reporting (📈)

**Phase 2 Features - Orange Badge:**
1. Smart Meeting Scheduler (📅)
2. Billing & Revenue (💰)
3. Opportunity Management (💎)
4. Email Integration (📧)
5. Calendar Integration (📆)
6. WhatsApp Integration (📱)
7. Advanced Analytics (📊)

**Phase 3 (AI) - Purple Badge:**
1. AI Email Templates (🤖)
2. AI Meeting Summaries (📝)
3. AI Legal Research Assistant (⚖️)
4. AI Lead Scoring (🎯)
5. Language Translation (🌐)
6. Voice Notes & Transcription (🎤)

**Future Enhancements - Gray Badge:**
1. Client Portal (🌐)
2. Payment Gateway (💳)
3. E-Courts Integration (⚖️)
4. Contract Analysis (AI) (📑)

**System:**
1. Security & Compliance (🔒)
2. Settings (⚙️)
3. Help & Documentation (📚)

### **6.2 Breadcrumb Navigation**

**CSS:**
```css
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    font-size: 13px;
    color: #7f8c8d;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.breadcrumb-item a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
}

.breadcrumb-item a:hover {
    color: #2980b9;
    text-decoration: underline;
}

.breadcrumb-item.active {
    color: #2c3e50;
    font-weight: 600;
}

.breadcrumb-separator {
    color: #bdc3c7;
}
```

**HTML Example:**
```html
<div class="breadcrumb">
    <div class="breadcrumb-item">
        <a href="#">Dashboard</a>
    </div>
    <span class="breadcrumb-separator">›</span>
    <div class="breadcrumb-item">
        <a href="#">Client Management</a>
    </div>
    <span class="breadcrumb-separator">›</span>
    <div class="breadcrumb-item active">
        DLF Limited
    </div>
</div>
```

### **6.3 Tabs Navigation**

**CSS:**
```css
.tabs-container {
    border-bottom: 2px solid #ecf0f1;
    margin-bottom: 30px;
}

.tabs {
    display: flex;
    gap: 0;
}

.tab-item {
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    color: #7f8c8d;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
}

.tab-item:hover {
    color: #3498db;
    background: #f8f9fa;
}

.tab-item.active {
    color: #3498db;
    border-bottom-color: #3498db;
}
```

---

## 7. Module-Specific Components

### **7.1 Lead Management Module**

**Lead Card:**
```css
.lead-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #3498db;
    margin-bottom: 15px;
    transition: all 0.3s ease;
}

.lead-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateX(5px);
}

.lead-card.aging-green { border-left-color: #27ae60; }
.lead-card.aging-yellow { border-left-color: #f39c12; }
.lead-card.aging-orange { border-left-color: #e67e22; }
.lead-card.aging-red { border-left-color: #e74c3c; }
```

**Lead Aging Indicator:**
```css
.aging-indicator {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
}

.aging-indicator.fresh {
    background: #e8f5e9;
    color: #27ae60;
}

.aging-indicator.warm {
    background: #fff8e1;
    color: #f39c12;
}

.aging-indicator.hot {
    background: #fff3e0;
    color: #e67e22;
}

.aging-indicator.cold {
    background: #ffebee;
    color: #e74c3c;
}
```

### **7.2 Client Management Module**

**Client Profile Header:**
```css
.client-profile-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px 12px 0 0;
    display: flex;
    align-items: center;
    gap: 25px;
}

.client-logo {
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    color: #667eea;
}

.client-info h2 {
    font-size: 24px;
    margin-bottom: 5px;
}

.client-info p {
    font-size: 14px;
    opacity: 0.9;
}
```

**Client Stats Grid:**
```css
.client-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
    background: white;
    border-radius: 0 0 12px 12px;
}

.client-stat-item {
    text-align: center;
    padding: 15px;
    border-right: 1px solid #ecf0f1;
}

.client-stat-item:last-child {
    border-right: none;
}

.client-stat-value {
    font-size: 28px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 5px;
}

.client-stat-label {
    font-size: 12px;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
```

### **7.3 Matter/Project Management Module**

**Project Card:**
```css
.project-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-top: 4px solid #3498db;
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.project-card:hover {
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    transform: translateY(-3px);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
}

.project-id {
    font-size: 12px;
    color: #7f8c8d;
    font-weight: 600;
}

.project-title {
    font-size: 18px;
    color: #2c3e50;
    font-weight: 600;
    margin: 5px 0 10px 0;
}

.project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    font-size: 13px;
    color: #7f8c8d;
}

.project-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
}
```

**Project Status Indicator:**
```css
.project-status {
    padding: 5px 12px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
}

.project-status.new {
    background: #e3f2fd;
    color: #2196f3;
}

.project-status.in-progress {
    background: #fff8e1;
    color: #f39c12;
}

.project-status.on-hold {
    background: #fff3e0;
    color: #e67e22;
}

.project-status.completed {
    background: #e8f5e9;
    color: #27ae60;
}

.project-status.archived {
    background: #f5f5f5;
    color: #95a5a6;
}
```

### **7.4 Task Management Module**

**Task Priority Visual:**
```css
.task-priority-bar {
    height: 4px;
    border-radius: 2px;
    margin-bottom: 10px;
}

.task-priority-bar.high {
    background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
}

.task-priority-bar.medium {
    background: linear-gradient(90deg, #f39c12 0%, #e67e22 100%);
}

.task-priority-bar.low {
    background: linear-gradient(90deg, #27ae60 0%, #229954 100%);
}
```

### **7.5 Calendar/Meeting Components**

**Calendar Day Cell:**
```css
.calendar-cell {
    border: 1px solid #ecf0f1;
    padding: 10px;
    min-height: 100px;
    background: white;
    transition: all 0.3s ease;
}

.calendar-cell:hover {
    background: #f8f9fa;
    cursor: pointer;
}

.calendar-cell.today {
    background: #e3f2fd;
    border: 2px solid #3498db;
}

.calendar-cell.has-event {
    background: #fff8e1;
}

.calendar-date {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 5px;
}

.calendar-event-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3498db;
    display: inline-block;
    margin-right: 3px;
}
```

### **7.6 Document Management**

**Document Item:**
```css
.document-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: white;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}

.document-item:hover {
    background: #f8f9fa;
    border-color: #3498db;
}

.document-icon {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background: #f8f9fa;
    border-radius: 8px;
}

.document-icon.pdf { color: #e74c3c; }
.document-icon.doc { color: #2196f3; }
.document-icon.xls { color: #27ae60; }
.document-icon.img { color: #9c27b0; }

.document-info {
    flex: 1;
}

.document-name {
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 3px;
}

.document-meta {
    font-size: 12px;
    color: #7f8c8d;
}
```

### **7.7 Billing & Revenue**

**Invoice Card:**
```css
.invoice-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    margin-bottom: 20px;
}

.invoice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 2px solid #ecf0f1;
    margin-bottom: 20px;
}

.invoice-number {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
}

.invoice-amount {
    font-size: 24px;
    font-weight: 700;
    color: #27ae60;
}

.invoice-status {
    padding: 5px 12px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
}

.invoice-status.paid {
    background: #e8f5e9;
    color: #27ae60;
}

.invoice-status.pending {
    background: #fff8e1;
    color: #f39c12;
}

.invoice-status.overdue {
    background: #ffebee;
    color: #e74c3c;
}
```

---

## 8. Responsive Design Guidelines

### **Breakpoints**

```css
/* Mobile First Approach */

/* Extra Small Devices (phones, less than 576px) */
@media (max-width: 575px) {
    .sidebar { display: none; }
    .main-content { margin-left: 0; }
    .stats-grid { grid-template-columns: 1fr; }
    .widget-grid { grid-template-columns: 1fr; }
    .form-grid-2 { grid-template-columns: 1fr; }
    .form-grid-3 { grid-template-columns: 1fr; }
}

/* Small Devices (tablets, 576px and up) */
@media (min-width: 576px) and (max-width: 767px) {
    .sidebar { width: 70px; }
    .nav-label { display: none; }
    .phase-badge { display: none; }
    .main-content { margin-left: 70px; }
}

/* Medium Devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .widget-grid { grid-template-columns: 1fr; }
}

/* Large Devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199px) {
    .stats-grid { grid-template-columns: repeat(3, 1fr); }
    .widget-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Extra Large Devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    /* Use default desktop layout */
}
```

### **Mobile Sidebar Toggle**

```css
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
    }
    
    .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    .sidebar.active {
        transform: translateX(0);
    }
}
```

---

## 9. CSS Architecture

### **File Organization**

```
css/
├── base/
│   ├── reset.css          /* CSS reset/normalize */
│   ├── variables.css      /* All CSS variables */
│   └── typography.css     /* Font definitions */
├── layout/
│   ├── topnav.css        /* Top navigation bar */
│   ├── sidebar.css       /* Sidebar navigation */
│   ├── main.css          /* Main content area */
│   └── footer.css        /* Footer styles */
├── components/
│   ├── buttons.css       /* All button styles */
│   ├── cards.css         /* Card components */
│   ├── forms.css         /* Form elements */
│   ├── tables.css        /* Table styles */
│   ├── badges.css        /* Badge components */
│   ├── modals.css        /* Modal dialogs */
│   ├── alerts.css        /* Alert/notification components */
│   └── ...               /* Other components */
├── modules/
│   ├── dashboard.css     /* Dashboard specific */
│   ├── leads.css         /* Lead management */
│   ├── clients.css       /* Client management */
│   ├── projects.css      /* Project management */
│   └── ...               /* Other modules */
└── utilities/
    ├── spacing.css       /* Margin/padding utilities */
    ├── text.css          /* Text utilities */
    └── helpers.css       /* Helper classes */
```

### **CSS Variables (Root)**

```css
:root {
    /* Colors */
    --primary-blue: #1e3c72;
    --primary-blue-light: #2a5298;
    --secondary-dark: #2c3e50;
    --secondary-medium: #34495e;
    
    /* Status Colors */
    --success-color: #27ae60;
    --warning-color: #f39c12;
    --danger-color: #e74c3c;
    --info-color: #3498db;
    
    /* Text Colors */
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
    --text-muted: #95a5a6;
    
    /* Background Colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-dark: #f5f7fa;
    
    /* Spacing */
    --space-xs: 5px;
    --space-sm: 10px;
    --space-md: 15px;
    --space-lg: 20px;
    --space-xl: 30px;
    
    /* Border Radius */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 20px;
    
    /* Shadows */
    --shadow-light: 0 2px 8px rgba(0,0,0,0.08);
    --shadow-medium: 0 4px 15px rgba(0,0,0,0.15);
    --shadow-heavy: 0 8px 25px rgba(0,0,0,0.2);
    
    /* Layout */
    --topnav-height: 75px;
    --sidebar-width: 260px;
    
    /* Typography */
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

### **Utility Classes**

```css
/* Margin Utilities */
.m-0 { margin: 0; }
.mt-1 { margin-top: var(--space-sm); }
.mb-1 { margin-bottom: var(--space-sm); }
.mt-2 { margin-top: var(--space-md); }
.mb-2 { margin-bottom: var(--space-md); }
.mt-3 { margin-top: var(--space-lg); }
.mb-3 { margin-bottom: var(--space-lg); }

/* Padding Utilities */
.p-0 { padding: 0; }
.p-1 { padding: var(--space-sm); }
.p-2 { padding: var(--space-md); }
.p-3 { padding: var(--space-lg); }

/* Text Utilities */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.text-bold { font-weight: 600; }
.text-muted { color: var(--text-muted); }
.text-primary { color: var(--primary-blue); }
.text-success { color: var(--success-color); }
.text-warning { color: var(--warning-color); }
.text-danger { color: var(--danger-color); }

/* Display Utilities */
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

/* Flex Utilities */
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}
.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.flex-column {
    display: flex;
    flex-direction: column;
}
.gap-1 { gap: var(--space-sm); }
.gap-2 { gap: var(--space-md); }
.gap-3 { gap: var(--space-lg); }

/* Width Utilities */
.w-100 { width: 100%; }
.w-50 { width: 50%; }
.w-auto { width: auto; }
```

---

## 10. Implementation Guidelines

### **10.1 Naming Conventions**

**BEM Methodology (Block Element Modifier):**

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--highlighted { }
.card--large { }
```

**Component Naming:**
```css
/* Good Examples */
.nav-item
.nav-item--active
.stat-card
.stat-card__icon
.form-input
.form-input--error
.btn-primary
.btn-primary--large

/* Avoid */
.navItem (camelCase)
.NavItem (PascalCase)
.nav_item (snake_case)
```

### **10.2 Code Organization**

**Order of CSS Properties:**
1. Positioning (position, top, right, bottom, left, z-index)
2. Display & Box Model (display, flex, grid, width, height, padding, margin)
3. Typography (font-family, font-size, line-height, color)
4. Visual (background, border, border-radius, box-shadow)
5. Misc (cursor, transition, animation)

**Example:**
```css
.component {
    /* Positioning */
    position: relative;
    z-index: 10;
    
    /* Display & Box Model */
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px;
    margin-bottom: 15px;
    
    /* Typography */
    font-size: 14px;
    color: #2c3e50;
    
    /* Visual */
    background: white;
    border: 1px solid #ecf0f1;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    
    /* Misc */
    cursor: pointer;
    transition: all 0.3s ease;
}
```

### **10.3 Performance Best Practices**

1. **Use CSS Variables**: Easier to maintain and update
2. **Minimize Nesting**: Keep specificity low (max 3 levels)
3. **Avoid !important**: Use proper specificity instead
4. **Optimize Selectors**: Use classes over complex selectors
5. **Group Related Rules**: Keep related CSS together
6. **Use Shorthand**: When appropriate (margin, padding, border)

### **10.4 Browser Compatibility**

**Prefix Handling:**
```css
.element {
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
```

**Target Browsers:**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

### **10.5 Accessibility Guidelines**

**Focus States:**
```css
.button:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}

.button:focus:not(:focus-visible) {
    outline: none;
}

.button:focus-visible {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}
```

**Color Contrast:**
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text (18px+)
- Ensure all interactive elements have visible focus states

**ARIA Support:**
```html
<button class="btn-primary" aria-label="Add new lead">
    ➕ Add Lead
</button>

<div class="alert alert-success" role="alert" aria-live="polite">
    Lead added successfully!
</div>
```

---

## 11. Code Templates

### **11.1 Basic Page Structure Template**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module Name - Legal CRM Portal</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <!-- Top Navigation Bar -->
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
                <span>🔍</span>
                <input type="text" placeholder="Search...">
            </div>
            <div class="notification-icon">
                <span>🔔</span>
                <div class="badge">7</div>
            </div>
            <div class="user-profile">
                <div class="user-avatar">PM</div>
                <div>
                    <div style="font-weight: 600; font-size: 14px;">Prateek Mehta</div>
                    <div style="font-size: 11px; opacity: 0.8;">Senior Advocate</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Sidebar Navigation -->
    <div class="sidebar">
        <!-- Navigation items here -->
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
            <div class="breadcrumb-item">
                <a href="#">Dashboard</a>
            </div>
            <span class="breadcrumb-separator">›</span>
            <div class="breadcrumb-item active">
                Module Name
            </div>
        </div>

        <!-- Page Header -->
        <div class="dashboard-header">
            <h2>Page Title</h2>
            <p>Page description or subtitle</p>
        </div>

        <!-- Page Content -->
        <div class="page-content">
            <!-- Content goes here -->
        </div>

        <!-- Footer -->
        <div class="footer">
            © 2025 Cubictree (A Gaba Projects Private Limited Company)
        </div>
    </div>
</body>
</html>
```

### **11.2 Card Component Template**

```html
<div class="widget">
    <div class="widget-header">
        <h3 class="widget-title">Widget Title</h3>
        <a href="#" class="widget-action">View All →</a>
    </div>
    <div class="widget-body">
        <!-- Widget content here -->
    </div>
</div>
```

### **11.3 Form Template**

```html
<form class="form">
    <div class="form-grid-2">
        <div class="form-group">
            <label class="form-label required">Field Label</label>
            <input type="text" class="form-input" placeholder="Enter value">
        </div>
        <div class="form-group">
            <label class="form-label">Optional Field</label>
            <select class="form-select">
                <option>Select option</option>
                <option>Option 1</option>
                <option>Option 2</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" placeholder="Enter description"></textarea>
    </div>
    <div class="form-actions">
        <button type="submit" class="btn-primary">Save</button>
        <button type="button" class="btn-secondary">Cancel</button>
    </div>
</form>
```

### **11.4 Table Template**

```html
<table class="data-table">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
            <td>
                <button class="btn-secondary btn-sm">View</button>
                <button class="btn-primary btn-sm">Edit</button>
            </td>
        </tr>
    </tbody>
</table>
```

### **11.5 Modal Template**

```html
<div class="modal-overlay">
    <div class="modal-container">
        <div class="modal-header">
            <h3 class="modal-title">Modal Title</h3>
            <button class="modal-close">×</button>
        </div>
        <div class="modal-body">
            <!-- Modal content here -->
        </div>
        <div class="modal-footer">
            <button class="btn-secondary">Cancel</button>
            <button class="btn-primary">Confirm</button>
        </div>
    </div>
</div>
```

---

## 12. Icon System

### **Recommended Approach**

**Option 1: Unicode Emojis (Current Implementation)**
- Pros: No external dependencies, immediate rendering, consistent across platforms
- Cons: Limited customization, may look different on various OS

**Option 2: Font Awesome (Recommended for Production)**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Usage -->
<i class="fas fa-users"></i> <!-- Clients -->
<i class="fas fa-folder"></i> <!-- Projects -->
<i class="fas fa-tasks"></i> <!-- Tasks -->
<i class="fas fa-file-alt"></i> <!-- Documents -->
<i class="fas fa-chart-line"></i> <!-- Analytics -->
<i class="fas fa-calendar"></i> <!-- Calendar -->
<i class="fas fa-envelope"></i> <!-- Email -->
<i class="fas fa-bell"></i> <!-- Notifications -->
```

**Icon Mapping for Modules:**
- Dashboard: `fa-chart-pie`
- Lead Management: `fa-bullseye`
- Client Management: `fa-users`
- Matter/Project: `fa-folder-open`
- Task Management: `fa-check-square`
- Document Management: `fa-file-invoice`
- Meeting Scheduler: `fa-calendar-alt`
- Billing: `fa-rupee-sign`
- Analytics: `fa-chart-bar`

---

## 13. Print Styles

```css
@media print {
    /* Hide navigation and non-essential elements */
    .top-nav,
    .sidebar,
    .widget-action,
    .btn-primary,
    .btn-secondary,
    .footer {
        display: none !important;
    }
    
    /* Adjust main content */
    .main-content {
        margin-left: 0;
        margin-top: 0;
        padding: 20px;
    }
    
    /* Remove shadows and backgrounds */
    .widget,
    .stat-card,
    .data-table {
        box-shadow: none;
        border: 1px solid #000;
    }
    
    /* Ensure proper page breaks */
    .widget,
    .stat-card {
        page-break-inside: avoid;
    }
    
    /* Black and white for better printing */
    body {
        background: white;
        color: black;
    }
}
```

---

## 14. Developer Handoff Checklist

### **Phase 1: Setup**
- [ ] Create project directory structure
- [ ] Set up CSS file organization
- [ ] Define all CSS variables in `:root`
- [ ] Create base HTML template
- [ ] Implement top navigation bar
- [ ] Implement sidebar navigation
- [ ] Test responsive behavior

### **Phase 2: Component Library**
- [ ] Build all button variants
- [ ] Create card/widget components
- [ ] Implement form elements
- [ ] Build table component
- [ ] Create badge components
- [ ] Build modal/dialog component
- [ ] Create alert/notification components
- [ ] Test all components in isolation

### **Phase 3: Module Pages**
- [ ] Dashboard page
- [ ] Lead Management pages
- [ ] Client Management pages
- [ ] Project/Matter pages
- [ ] Task Management pages
- [ ] Document Management pages
- [ ] Meeting Scheduler pages
- [ ] Billing & Revenue pages

### **Phase 4: Testing & Refinement**
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Code review and cleanup
- [ ] Documentation completion

---

## 15. Version Control & Updates

### **Version History**

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | Nov 06, 2025 | Initial design system created | Business Analyst - Cubictree |
| | | | |

### **Upcoming Enhancements**

**Planned Updates:**
1. Dark mode theme support
2. High contrast mode for accessibility
3. Additional color theme options
4. Enhanced animation library
5. Custom icon font integration

---

## 16. Support & Resources

### **Design Files Location**
- Wireframes: `/design/wireframes/`
- Assets: `/design/assets/`
- CSS Files: `/css/`
- Documentation: `/docs/`

### **Contact Information**
- **Project Manager**: [Name]
- **Lead Designer**: [Name]
- **Lead Developer**: [Name]
- **Business Analyst**: Cubictree Team

### **Reference Links**
- Figma Design Files: [URL]
- GitHub Repository: [URL]
- Project Documentation: [URL]
- API Documentation: [URL]

---

## Document Control

| Item | Details |
|------|---------|
| **Status** | Final - Ready for Development |
| **Next Review** | After MVP completion |
| **Stakeholders** | Development Team, Design Team, Product Team |
| **Approval Required** | Lead Developer Sign-off |

---

**© 2025 Cubictree (A Gaba Projects Private Limited Company)**

---

## Appendix A: Quick Reference

### **Most Used Colors**
```
Primary Blue: #1e3c72
Success Green: #27ae60
Warning Orange: #f39c12
Danger Red: #e74c3c
Info Blue: #3498db
Text Primary: #2c3e50
Text Secondary: #7f8c8d
Background: #f5f7fa
```

### **Most Used Spacing**
```
Small: 10px
Medium: 15px
Large: 20px
Extra Large: 30px
```

### **Most Used Components**
- `.btn-primary` - Primary action button
- `.widget` - Card/widget container
- `.stat-card` - Dashboard stat display
- `.form-input` - Text input field
- `.data-table` - Data table
- `.alert` - Alert messages
- `.badge` - Label badges
- `.nav-item` - Sidebar navigation item

---

**END OF DESIGN SYSTEM DOCUMENT**