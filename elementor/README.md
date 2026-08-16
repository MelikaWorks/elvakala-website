# ELVA KALA — Elementor Mega Menu Styles

This folder contains the custom CSS used to style and refine the Elementor-based navigation and mega menu on the ELVA KALA website.

The implementation focuses on the main desktop and tablet navigation experience, including the product category trigger, category sidebar, multi-column submenu content, responsive behavior, and final header spacing refinements.

---

## Files

### `mega-menu.css`

Main stylesheet for the ELVA KALA Elementor mega menu.

This file controls the structure, appearance, interaction states, responsive behavior, and final visual refinements of the primary navigation area.

---

## Main Navigation

The `.elva-menu-wrap` and `.elva-top-menu` classes define the primary navigation container.

The navigation includes:

- RTL layout
- White background
- Bottom border separation
- Centered navigation content
- Product category trigger button
- Main navigation links
- Hover color transitions
- Controlled spacing and typography

The main navigation links are styled through `.elva-top-menu > a` and use compact typography suitable for the ELVA KALA header.

---

## Product Category Trigger

The product category menu is opened through the `.elva-dk-trigger` element.

The trigger is styled as a dark blue button using the ELVA KALA primary color `#034A73`.

It includes:

- Rounded corners
- Bold text
- Hover state
- Compact header-compatible dimensions
- Responsive sizing for tablet widths

---

## Mega Menu Panel

The dropdown panel is controlled by `.elva-dk-panel`.

On desktop, the panel:

- Opens below the navigation bar
- Uses a wide multi-column layout
- Includes a white background
- Uses a subtle shadow
- Has rounded lower corners
- Remains above surrounding page content using a high `z-index`

The panel becomes visible when hovering over `.elva-dk-menu`.

Tablet layouts additionally support `:focus-within` interaction.

---

## Category Sidebar

The category list inside the mega menu is styled through `.elva-dk-sidebar`.

Each category item:

- Uses bold typography
- Includes a directional arrow
- Supports hover and active states
- Uses the ELVA KALA blue accent
- Displays an active right border
- Keeps category links inheriting the parent item styling

Main selectors include:

- `.elva-dk-sidebar li`
- `.elva-dk-sidebar li.active`
- `.elva-dk-sidebar li:hover`
- `.elva-dk-sidebar li a`

---

## Mega Menu Content Area

The submenu content area is defined by `.elva-dk-content`.

Individual submenu groups are displayed inside `.elva-tab`.

Only the currently active tab is displayed through `.elva-tab.active`.

On desktop, submenu content is arranged into four columns using:

`grid-template-columns: repeat(4, 1fr);`

Each column uses the `.elva-col` structure with styled section headings and links.

---

## Submenu Headings

Mega menu section headings use `.elva-col h4`.

The headings include:

- ELVA KALA blue text
- Bold typography
- Vertical blue accent marker
- Controlled spacing
- Optional secondary text using `<span>`

Linked headings are also supported through `.elva-col > a h4`.

---

## Submenu Links

Submenu links are styled through `.elva-col a`.

They include:

- Neutral default text color
- Compact font sizing
- Increased line-height for readability
- Blue hover state
- Small horizontal movement on hover

This provides lightweight visual feedback without changing the menu structure.

---

## Tablet Layout

For tablet widths between approximately `769px` and `1024px`, the mega menu switches to a more compact layout.

The tablet version includes:

- Reduced navigation spacing
- Smaller typography
- Narrower category trigger
- Mega menu width based on viewport width
- Reduced sidebar width
- Reduced content padding
- Two-column submenu layout

The active submenu grid changes to:

`grid-template-columns: repeat(2, 1fr);`

This prevents the desktop four-column structure from becoming too compressed on tablet-sized displays.

---

## Mobile Adjustments

At widths below `768px`, the stylesheet applies basic mobile fallbacks.

These include:

- Horizontal overflow support for the top navigation
- Viewport-based mega menu width
- Single-column submenu layout

The mega menu panel uses `95vw` to prevent the desktop-sized menu from overflowing smaller screens.

---

## Header Polish

The final section of the stylesheet contains additional header refinements.

These adjustments reduce the vertical and horizontal footprint of the navigation after the initial mega menu styling was completed.

They refine:

- Navigation height
- Link spacing
- Trigger button height
- Font sizes
- Secondary span sizes
- Mid-size screen spacing

The refined desktop navigation uses a `44px` top-menu height together with a more compact category button and navigation typography.

---

## Mid-Size Responsive Refinement

An additional breakpoint is included for widths between `769px` and `1150px`.

This section further reduces:

- Navigation gap
- Button width
- Button height
- Link font size
- Link spacing
- Secondary span font size

This prevents the main navigation from becoming crowded on medium-width desktop and tablet displays.

---

## Key Selectors

The main selectors used by this implementation are:

- `.elva-menu-wrap`
- `.elva-top-menu`
- `.elva-dk-menu`
- `.elva-dk-trigger`
- `.elva-dk-panel`
- `.elva-dk-sidebar`
- `.elva-dk-content`
- `.elva-tab`
- `.elva-col`

These classes must remain consistent with the HTML structure used inside the Elementor header.

---

## Important Notes

This stylesheet depends on the existing Elementor header and mega menu markup used on the ELVA KALA website.

The menu structure is not generated by this CSS file. The CSS styles and controls the presentation of the existing navigation structure.

The desktop mega menu interaction relies primarily on hover behavior.

Changing Elementor containers or the custom `.elva-*` class names may require updating the corresponding CSS selectors.

The responsive rules are intentionally separated into multiple breakpoints because the desktop navigation requires additional spacing adjustments on medium-width screens.

---

## Purpose

The purpose of this customization is to provide a cleaner, more structured and responsive navigation system for ELVA KALA while preserving the existing Elementor-based header structure.

The final implementation includes:

- Custom product category mega menu
- Category sidebar
- Multi-column submenu layout
- Active and hover states
- Responsive tablet layout
- Basic mobile fallback
- Compact and refined header spacing
