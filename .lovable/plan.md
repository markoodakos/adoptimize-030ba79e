

# AdOptimize Dashboard — Step 1: Scaffold & Design System

## Overview
Set up the complete design system and build the structural layout shell for the AdOptimize dashboard. No charts, stat cards, or tables yet — just the foundational layout with a working sidebar, top bar, and theme toggle.

---

## Phase 1: Design System Foundation

### 1.1 — Import Inter Font
Add the Google Fonts link for Inter (weights 400, 500, 600, 700) to `index.html`. Update the page title to "AdOptimize".

### 1.2 — Define All Color Tokens in `index.css`
Replace all existing CSS variables with the AdOptimize design system tokens:
- **Brand colors:** teal, lime, offwhite, nearblack
- **Light mode semantics:** background, foreground, sidebar-bg, card, border, primary, accent, etc.
- **Dark mode semantics** (under `.dark` class): inverted palette with teal sidebar, lime as primary
- **Status colors:** success, warning, destructive
- **Spacing & shape tokens:** radius-card (12px), radius-btn (8px), radius-pill (999px)
- **Shadows & transitions**
- Set `font-family: 'Inter', sans-serif` on the root

### 1.3 — Map All Tokens in `tailwind.config.ts`
Extend Tailwind's theme to expose every CSS token as a utility class:
- All color tokens (background, foreground, sidebar-bg, card, border, primary, accent, teal, lime, offwhite, nearblack, success, warning, destructive)
- Border radius variants (card, btn, pill)

---

## Phase 2: Layout Shell

### 2.1 — Create `DashboardLayout.tsx`
A full-viewport flex layout:
- **Left column:** The Sidebar component at fixed 220px width
- **Right column:** Flex column containing the TopBar (sticky) and a scrollable content area
- Content area shows a centered placeholder: *"Dashboard content coming soon"*

### 2.2 — Update Routing
Point the `/` route to `DashboardLayout` instead of the current Index page.

---

## Phase 3: Sidebar Component

### 3.1 — Create `Sidebar.tsx`
A custom sidebar (not using shadcn's SidebarProvider — the spec calls for a fixed, non-collapsible sidebar):

- **Top:** Logo mark (small teal rounded square SVG) + "AdOptimize" wordmark
- **Middle:** 5 navigation items (Overview, Ad Accounts, Campaigns, Analytics, Settings) with Lucide icons. "Overview" is the active item with lime accent styling. Pill-shaped hover states.
- **Bottom:** User block pinned to the bottom — avatar circle with "JD" initials, "John D." name, and "Admin" badge

Styled with design tokens: `bg-sidebar-bg`, `border-border`, 220px wide, full height.

---

## Phase 4: Top Bar Component

### 4.1 — Create `TopBar.tsx`
A sticky horizontal bar with:

- **Left:** Search input with a leading search icon, placeholder "Search anything...", max width 280px
- **Right group (left to right):**
  1. "Support" text link
  2. Notification bell icon
  3. **Theme toggle** (Sun/Moon) — toggles `.dark` class on `<html>`, persists to `localStorage`, reads on mount with no flash
  4. User avatar ("JD") + "John D." + chevron dropdown indicator
  5. **"+ Connect Account"** dark pill button (stays dark in both modes using nearblack/offwhite tokens)

---

## Phase 5: Dark Mode

### 5.1 — Theme Toggle Logic
- Toggle adds/removes `dark` class on `<html>` element
- Persists to `localStorage` key `adoptimize-theme`
- On mount: reads stored preference and applies before first paint (script in `index.html` head)
- Default: light mode
- All theming flows through CSS tokens — no per-component dark overrides

---

## Result
A clean, fully themed dashboard shell with working navigation layout, theme switching, and proper design tokens — ready for stat cards, charts, and the ad accounts table in the next step.

