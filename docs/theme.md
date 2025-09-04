# Biz365 Admin Panel Theme

## Overview

This document defines the design system and theme for the Biz365 Admin Panel, extracted from the `biz365-landingpage` repository to ensure visual consistency across the platform.

## Color Palette

### Primary Brand Colors

```css
/* Gold Theme - Primary Brand Colors */
--gold-50: #fffdf2;
--gold-100: #fef9e3;
--gold-200: #fef2c7;
--gold-300: #fde68a;
--gold-400: #fcd34d;
--gold-500: #f59e0b;  /* Primary Gold */
--gold-600: #d97706;  /* Accent Gold */
--gold-700: #b45309;
--gold-800: #92400e;
--gold-900: #78350f;

/* Brand Semantic Colors */
--brand-primary: #f59e0b;    /* Gold 500 */
--brand-secondary: #1f2937;  /* Gray 800 */
--brand-accent: #d97706;     /* Gold 600 */
```

### Neutral Colors

```css
/* Gray Scale */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-300: #d1d5db;
--gray-400: #9ca3af;
--gray-500: #6b7280;
--gray-600: #4b5563;
--gray-700: #374151;
--gray-800: #1f2937;
--gray-900: #111827;
```

### Semantic Colors

```css
/* Status Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Background Colors */
--background: #ffffff;
--background-secondary: #f9fafb;
--background-tertiary: #f3f4f6;

/* Text Colors */
--text-primary: #111827;
--text-secondary: #6b7280;
--text-tertiary: #9ca3af;
--text-inverse: #ffffff;
```

## Typography

### Font Families

```css
/* Primary Font Stack */
--font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";

/* Custom Font Variables (from landing page) */
--font-inter-regular: var(--muskymore-biz365-ai-inter-regular-font-family);
--font-inter-medium: var(--orbai-template-framer-website-inter-medium-font-family);
--font-heading-1: var(--orbai-template-framer-website-semantic-heading-1-font-family);
--font-heading-2: var(--orbai-template-framer-website-semantic-heading-2-font-family);
--font-heading-4: var(--orbai-template-framer-website-semantic-heading-4-font-family);
--font-link: var(--orbai-template-framer-website-semantic-link-font-family);
```

### Font Sizes

```css
/* Typography Scale */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */
```

### Font Weights

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights

```css
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

## Spacing System

### Spacing Scale

```css
/* Spacing Scale (based on 0.25rem = 4px) */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Layout Spacing

```css
/* Container Spacing */
--container-padding: 2rem;
--section-padding: 4rem;
--card-padding: 1.5rem;

/* Component Spacing */
--button-padding-x: 1rem;
--button-padding-y: 0.5rem;
--input-padding-x: 0.75rem;
--input-padding-y: 0.5rem;
```

## Border Radius

```css
/* Border Radius Scale */
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;
```

## Shadows

```css
/* Shadow Scale */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

## Animations

### Keyframes

```css
/* Fade Animations */
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fade-up {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes scale-in {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

/* Hover Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.9; }
}

/* Loading Animations */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
```

### Animation Classes

```css
/* Animation Utilities */
.animate-fade-in { animation: fade-in 0.6s ease-out; }
.animate-fade-up { animation: fade-up 0.8s ease-out; }
.animate-slide-in { animation: slide-in 0.6s ease-out; }
.animate-scale-in { animation: scale-in 0.5s ease-out; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
.animate-pulse-subtle { animation: pulse-subtle 3s ease-in-out infinite; }
.animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
.animate-bounce-in { animation: bounce-in 0.8s ease-out; }
```

## Component Styles

### Buttons

```css
/* Primary Button */
.btn-primary {
  background-color: var(--brand-primary);
  color: var(--text-inverse);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--gold-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Secondary Button */
.btn-secondary {
  background-color: transparent;
  color: var(--brand-primary);
  border: 2px solid var(--brand-primary);
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background-color: var(--brand-primary);
  color: var(--text-inverse);
}
```

### Cards

```css
/* Card Base */
.card {
  background-color: var(--background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--card-padding);
  border: 1px solid var(--gray-200);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Card Header */
.card-header {
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: var(--space-4);
}

/* Card Title */
.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin: 0;
}
```

### Forms

```css
/* Input Fields */
.input {
  width: 100%;
  padding: var(--input-padding-y) var(--input-padding-x);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

/* Labels */
.label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
}
```

### Navigation

```css
/* Sidebar Navigation */
.sidebar {
  width: 280px;
  background-color: var(--background);
  border-right: 1px solid var(--gray-200);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40;
}

/* Navigation Items */
.nav-item {
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  margin: var(--space-1) var(--space-2);
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: var(--background-secondary);
  color: var(--text-primary);
}

.nav-item.active {
  background-color: var(--gold-50);
  color: var(--brand-primary);
  font-weight: var(--font-medium);
}
```

## Layout System

### Grid System

```css
/* Container */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

/* Grid Layouts */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-6); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }

/* Responsive Grid */
@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
```

### Flexbox Utilities

```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: var(--space-2); }
.gap-4 { gap: var(--space-4); }
.gap-6 { gap: var(--space-6); }
```

## Responsive Design

### Breakpoints

```css
/* Mobile First Breakpoints */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X large devices */
```

### Responsive Utilities

```css
/* Hide/Show Utilities */
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }

@media (min-width: 768px) {
  .md\:block { display: block; }
  .md\:hidden { display: none; }
}

@media (min-width: 1024px) {
  .lg\:block { display: block; }
  .lg\:hidden { display: none; }
}
```

## Dark Mode Support

```css
/* Dark Mode Variables */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #111827;
    --background-secondary: #1f2937;
    --background-tertiary: #374151;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --text-tertiary: #9ca3af;
    --border: #374151;
  }
}

/* Dark Mode Classes */
.dark {
  --background: #111827;
  --background-secondary: #1f2937;
  --background-tertiary: #374151;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --border: #374151;
}
```

## Usage Guidelines

### Color Usage

1. **Primary Gold (#f59e0b)**: Use for primary actions, highlights, and brand elements
2. **Secondary Gray (#1f2937)**: Use for text, borders, and secondary elements
3. **Accent Gold (#d97706)**: Use for hover states and emphasis
4. **Neutral Grays**: Use for backgrounds, borders, and subtle elements

### Typography Guidelines

1. **Headings**: Use Inter font family with appropriate weights
2. **Body Text**: Use system font stack for optimal performance
3. **Line Height**: Maintain 1.5 for body text, 1.25 for headings
4. **Font Sizes**: Follow the established scale for consistency

### Spacing Guidelines

1. **Consistent Spacing**: Use the 4px base unit for all spacing
2. **Component Padding**: Use 1.5rem (24px) for card padding
3. **Section Spacing**: Use 4rem (64px) between major sections
4. **Element Spacing**: Use 1rem (16px) between related elements

### Animation Guidelines

1. **Subtle Animations**: Use 0.2s duration for micro-interactions
2. **Page Transitions**: Use 0.6s duration for page-level animations
3. **Hover Effects**: Use transform and shadow changes
4. **Loading States**: Use shimmer or pulse animations

## Implementation Notes

- All CSS variables should be defined in the root scope
- Use Tailwind CSS classes where possible for consistency
- Custom components should follow the established patterns
- Maintain accessibility standards (WCAG 2.1 AA)
- Test on multiple devices and screen sizes
- Ensure proper contrast ratios for all text elements
