# Design System
> This is a starter template. Fill in your values, remove unused sections.
> Compatible with HITL.Work for FE — the Planner will parse this automatically.

---

## Meta

**Design System Name:**
**Version:**
**Last Updated:**
**Author / Source:**

---

## Color Palette

### Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `color-primary` | `#000000` | Main brand color, CTA buttons |
| `color-primary-hover` | `#000000` | Hover state of primary |
| `color-secondary` | `#000000` | Secondary actions, accents |
| `color-accent` | `#000000` | Highlights, badges, tags |

### Neutral Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `color-background` | `#FFFFFF` | Page background |
| `color-surface` | `#F5F5F5` | Card / panel background |
| `color-border` | `#E0E0E0` | Borders, dividers |
| `color-text-primary` | `#111111` | Body text, headings |
| `color-text-secondary` | `#666666` | Subtitles, captions |
| `color-text-disabled` | `#AAAAAA` | Disabled state text |

### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `color-success` | `#22C55E` | Success states, confirmations |
| `color-warning` | `#F59E0B` | Warnings, alerts |
| `color-error` | `#EF4444` | Errors, destructive actions |
| `color-info` | `#3B82F6` | Informational states |

---

## Typography

### Font Families
| Role | Family | Fallback |
|------|--------|----------|
| Display / Heading | `` | `sans-serif` |
| Body | `` | `sans-serif` |
| Mono / Code | `` | `monospace` |

### Type Scale
| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `text-xs` | 12px | 16px | 400 | Captions, labels |
| `text-sm` | 14px | 20px | 400 | Secondary body, helper text |
| `text-base` | 16px | 24px | 400 | Primary body text |
| `text-lg` | 18px | 28px | 500 | Lead text, subheadings |
| `text-xl` | 20px | 28px | 600 | Section titles |
| `text-2xl` | 24px | 32px | 700 | Page section headers |
| `text-3xl` | 30px | 36px | 700 | Hero subheadings |
| `text-4xl` | 36px | 40px | 800 | Hero headings |

---

## Spacing

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro gaps |
| `space-2` | 8px | Tight internal spacing |
| `space-3` | 12px | Compact spacing |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Medium spacing |
| `space-6` | 24px | Section padding |
| `space-8` | 32px | Large spacing |
| `space-10` | 40px | Extra large |
| `space-12` | 48px | Section gaps |
| `space-16` | 64px | Page sections |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Inputs, tags |
| `radius-md` | 8px | Cards, buttons |
| `radius-lg` | 12px | Modals, panels |
| `radius-xl` | 16px | Large cards |
| `radius-full` | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.12)` | Floating elements |

---

## Component Specs

### Button

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `color-primary` | white | none | `color-primary-hover` |
| Secondary | transparent | `color-primary` | `color-primary` | light tint |
| Ghost | transparent | `color-text-primary` | `color-border` | `color-surface` |
| Destructive | `color-error` | white | none | darker red |

**Sizes:** sm (h-8, px-3, text-sm) / md (h-10, px-4, text-base) / lg (h-12, px-6, text-lg)

**States:** default / hover / active / disabled / loading

---

### Input / Form Fields

- Height: 40px (md), 32px (sm), 48px (lg)
- Border: 1px solid `color-border`
- Border radius: `radius-sm`
- Focus: border `color-primary`, ring 2px
- Error: border `color-error`
- Placeholder: `color-text-disabled`

---

### Card

- Background: `color-surface`
- Border: 1px solid `color-border`
- Border radius: `radius-md`
- Padding: `space-6`
- Shadow: `shadow-md`

---

### Modal

- Backdrop: `rgba(0,0,0,0.5)`
- Background: `color-background`
- Border radius: `radius-lg`
- Max width: 480px (sm) / 640px (md) / 768px (lg)
- Padding: `space-6`
- Shadow: `shadow-xl`

---

### Badge / Tag

- Border radius: `radius-full`
- Padding: `space-1` vertical / `space-3` horizontal
- Font size: `text-xs`
- Variants: default, success, warning, error, info

---

## Motion / Animation

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `transition-fast` | 100ms | ease-out | Hover states |
| `transition-base` | 200ms | ease-in-out | Show/hide, expand |
| `transition-slow` | 300ms | ease-in-out | Modals, drawers |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | 0 | Default |
| `z-dropdown` | 100 | Dropdowns, tooltips |
| `z-sticky` | 200 | Sticky headers |
| `z-modal` | 300 | Modals, overlays |
| `z-toast` | 400 | Notifications |

---

## Accessibility Notes

- Minimum contrast ratio: **4.5:1** for text, **3:1** for large text and UI components
- All interactive elements must have visible focus states
- All images must have meaningful `alt` text
- Form fields must have associated `label` elements
- Color alone must not convey meaning (pair with icon or text)
