# ELVA KALA — Elementor Customizations

This folder contains custom Elementor-related implementations and visual customizations used across the ELVA KALA website.

The files in this directory document custom layouts, styling, responsive behavior, and interface improvements created on top of the existing Elementor-based website.

The customizations cover several major frontend areas rather than a single component, including the website header, main navigation and mega menu, About page, Contact page, and other Elementor-built sections.

Screenshots stored alongside the implementation files are included as visual documentation of the final layouts and, where applicable, previous states used during development.

---

## Scope

The Elementor customizations in this folder cover the following areas:

- Main website header
- Desktop header layout refinements
- Responsive header behavior
- Main navigation
- Product category mega menu
- About ELVA KALA page
- Contact ELVA KALA page
- Elementor-built homepage sections
- Responsive layout adjustments
- Visual consistency with the ELVA KALA design system

The primary interface color used throughout these customizations is:

`#034A73`

---

# Header Customization

The ELVA KALA header was customized to improve the layout of the logo, search area, navigation links, user account controls, shopping cart, phone information, and category navigation.

The final layout was designed to provide a cleaner and more compact desktop header while preserving the existing Elementor structure.

The header customization includes:

- Logo positioning
- Search field alignment
- Login/account button styling
- Shopping cart placement
- Phone icon and contact information
- Main navigation alignment
- Product categories button
- Responsive spacing adjustments
- Desktop and medium-screen layout refinements

During development, different arrangements of the account, cart, and contact controls were tested before reaching the final layout.

The screenshots in this folder document the resulting header structure and responsive behavior.

---

# Main Navigation

The main Elementor navigation uses a custom RTL layout designed for the Persian ELVA KALA storefront.

The navigation includes:

- Product categories entry point
- Discounts link
- Articles link
- About page link
- Contact page link
- RTL alignment
- Compact typography
- Controlled spacing between navigation items
- Responsive adjustments for medium screen widths

The navigation is integrated directly into the custom header and visually follows the ELVA KALA blue-and-white interface.

---

# Product Category Mega Menu

A custom multi-level mega menu is used for browsing the ELVA KALA product catalog.

The implementation uses the following main structures:

- `.elva-menu-wrap`
- `.elva-top-menu`
- `.elva-dk-menu`
- `.elva-dk-trigger`
- `.elva-dk-panel`
- `.elva-dk-sidebar`
- `.elva-dk-content`
- `.elva-tab`
- `.elva-col`

The category trigger uses the ELVA KALA primary blue color and opens the full category navigation panel.

---

## Mega Menu Sidebar

The left/right category navigation area uses `.elva-dk-sidebar`.

It provides:

- Main product category navigation
- Active category states
- Hover states
- Directional indicators
- Visual highlighting using the ELVA KALA blue color
- Direct links for supported category entries

The sidebar allows users to move between major product groups while keeping the detailed submenu visible in the main panel.

---

## Mega Menu Content

The detailed category content is displayed through `.elva-tab` containers.

Only the active category tab is displayed.

On large desktop screens the submenu uses a four-column grid:

`grid-template-columns: repeat(4, 1fr);`

The columns contain grouped product links and section headings.

This structure is used to expose deeper product categories without forcing users through multiple separate pages.

---

## Mega Menu Interaction

On desktop, the panel is primarily displayed through hover interaction.

The menu also includes active states and transitions for category navigation.

For tablet-sized layouts, `:focus-within` support is also included to improve interaction behavior.

---

# Responsive Mega Menu

The mega menu contains dedicated responsive rules for different viewport sizes.

For tablet-sized screens, the menu is reduced from four columns to two:

`grid-template-columns: repeat(2, 1fr);`

Additional tablet adjustments include:

- Reduced menu width
- Reduced sidebar width
- Smaller navigation typography
- Smaller category trigger
- Reduced content padding
- Reduced gaps between navigation items

At smaller widths, the submenu falls back to a single-column structure.

The menu panel also uses viewport-relative sizing to prevent horizontal overflow.

---

# Header Polish

Additional responsive refinements were applied after the initial navigation implementation.

These adjustments reduce unnecessary header height and improve spacing on medium-width screens.

They include:

- Reduced navigation height
- Smaller category button
- Reduced navigation gaps
- Smaller link typography
- Reduced secondary text size
- Better fit between approximately `769px` and `1150px`

These rules were added specifically to prevent the desktop header from becoming crowded before reaching the mobile breakpoint.

---

# About ELVA KALA Page

The About page was created as a custom Elementor-based presentation of the ELVA KALA business.

The final page includes several structured content sections.

---

## Hero Section

The About page begins with a large visual introduction containing:

- ELVA KALA branding
- "About ELVA" heading
- Introductory text
- Call-to-action button
- Large storefront/business image
- Curved visual composition matching the ELVA KALA brand colors

---

## Our Story

The "Our Story" section presents the company's background and business history.

The layout combines:

- Company/store imagery
- Long-form descriptive content
- RTL typography
- Clear section hierarchy

The design keeps the imagery and text visually balanced on large screens.

---

## Business Areas

The About page also includes a visual overview of ELVA KALA product and service areas.

The displayed categories include areas such as:

- Faucets
- Kitchen products
- Sanitary products
- Cooling systems
- Heating systems
- Pool equipment

Each category is represented visually to make the company's activity areas easier to understand.

---

## Services and Benefits

The page contains a dedicated section explaining ELVA KALA customer services and purchase benefits.

The layout uses separate service cards with icons and explanatory text.

Examples represented in the layout include:

- Fast shipping
- Professional consultation
- Warranty and after-sales services
- Return policy

---

## Frequently Asked Questions

A dedicated FAQ section is included on the About page.

The questions use an accordion-style layout so that answers can be expanded individually without displaying all content at once.

The FAQ area follows the same visual language as the rest of the page.

---

# Contact ELVA KALA Page

The Contact page was redesigned as a structured Elementor-based contact interface instead of relying on a simple text block.

The final page contains several contact methods and business information blocks.

---

## Contact Information Cards

The upper section contains individual cards for important contact channels.

The layout includes information such as:

- Main store address
- Store phone number
- Sales department phone
- Management contact
- Support contact

Each card uses:

- A dedicated icon
- Contact title
- Contact detail
- Supporting description
- Call or map action where appropriate

---

## Working Hours

A dedicated section displays ELVA KALA working hours.

This information is visually separated from the other contact channels to make it easy to locate.

---

## Online Contact

The page includes online communication information and social/contact channels.

The layout includes dedicated sections for:

- Online response/contact
- Email
- Social networks

Social icons are presented in a compact visual group consistent with the main ELVA KALA branding.

---

## Store Map

The Contact page includes an embedded Google Maps section showing the ELVA KALA store location.

The map occupies the full content width below the contact information sections and provides a direct visual reference for the physical store address.

---

# Elementor Homepage Sections

Some custom Elementor work documented in this folder is also used on the ELVA KALA homepage.

These sections follow the same design language used throughout the redesigned pages:

- ELVA KALA blue interface elements
- White cards and content containers
- Rounded corners
- RTL typography
- Responsive layouts
- Consistent spacing
- Clear section hierarchy

The screenshots stored in this folder document the implemented Elementor layouts and their final appearance.

---

# Visual Design System

The Elementor customizations intentionally use a consistent visual system throughout the website.

Primary interface color:

`#034A73`

Common design characteristics include:

- White content backgrounds
- Light gray page backgrounds
- Rounded content containers
- Subtle borders
- Soft shadows
- Blue headings and controls
- RTL content alignment
- Responsive layouts
- Consistent spacing between sections

This allows custom Elementor sections to visually match the rest of the ELVA KALA storefront.

---

# Responsive Design

The custom Elementor implementations were tested and adjusted across different viewport sizes.

Responsive work includes:

- Desktop layouts
- Medium-width desktop layouts
- Tablet layouts
- Mobile layouts

Several components contain dedicated breakpoints because the original desktop layout required additional adjustments before reaching standard mobile widths.

This is particularly important for:

- Header controls
- Main navigation
- Mega menu
- Multi-column content
- Contact cards
- Long-form content sections

---

# Screenshots

The image files stored in this folder are development documentation for the Elementor customizations.

Depending on the component, they show:

- Final implemented layouts
- Desktop appearance
- Responsive layouts
- Header layout changes
- Mega menu appearance
- About page implementation
- Contact page implementation
- Other Elementor section results

These screenshots are intended to make the repository understandable without requiring immediate access to the live WordPress installation.

---

# Important Notes

These customizations were created specifically for the Elementor structure used by the ELVA KALA website.

Some styles depend on existing Elementor containers, widgets, and custom CSS classes.

Changing Elementor structure or class names may require corresponding selector updates.

The mega menu CSS does not generate the underlying menu content by itself. It styles and controls the presentation of the menu structure already present in the Elementor implementation.

The responsive rules should be preserved when modifying the header or navigation because several breakpoints were added specifically to prevent layout problems on medium-width screens.

---

# Purpose

The purpose of these Elementor customizations is to replace or refine generic theme layouts with interfaces specifically designed for ELVA KALA.

The implementation provides:

- A custom ELVA KALA header
- Refined navigation
- Product category mega menu
- Responsive desktop and tablet behavior
- Custom About page
- Custom Contact page
- Consistent Elementor section styling
- Improved visual hierarchy
- Better presentation of business and contact information
- A unified frontend design across major website sections

Together, these files document the custom Elementor frontend work developed for the ELVA KALA website.
