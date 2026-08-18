# ELVA KALA — Elementor Customizations

This directory contains Elementor-related frontend customizations developed for the ELVA KALA website.

The customizations are organized by page or component so that each implementation, supporting code, screenshots, and documentation can be maintained independently.

The work in this directory extends the existing Elementor-based website without replacing Elementor itself.

---

## Directory Structure

### `about-us/`

Custom Elementor implementation for the ELVA KALA About page.

Includes the page structure and visual sections used to present:

- Company introduction
- Business story
- Activity areas
- Services and customer benefits
- FAQ section
- Responsive layouts

---

### `contact-us/`

Custom Elementor implementation for the ELVA KALA Contact page.

Includes:

- Contact information cards
- Store address
- Sales, management, and support contact details
- Working hours
- Online communication channels
- Social networks
- Embedded store map
- Responsive layout adjustments

---

### `footer-columns/`

Customizations related to the ELVA KALA website footer.

This section contains the Elementor structure and styling used for the footer information columns, including:

- Business information
- Customer service links
- Contact details
- Trust and certification elements
- Social media links
- Responsive footer layout

---

### `header-responsive/`

Responsive and layout refinements for the Elementor-based website header.

Includes adjustments for:

- Logo positioning
- Search bar
- Account controls
- Shopping cart
- Phone information
- Header spacing
- Medium-width desktop layouts
- Tablet behavior
- Responsive breakpoints

These adjustments were created to prevent the desktop header from becoming crowded before the mobile breakpoint.

---

### `home-page/`

Custom Elementor sections used on the ELVA KALA homepage.

Includes homepage-specific layout and presentation refinements that follow the ELVA KALA visual system.

Depending on the component, this directory may contain:

- Custom section layouts
- Responsive adjustments
- Visual refinements
- Supporting screenshots

---

### `main-menu/`

Custom main navigation and product category mega menu implementation.

Includes:

- Main navigation bar styling
- Product category trigger
- Multi-level mega menu
- Category sidebar
- Active and hover states
- Multi-column category content
- RTL layout
- Tablet and medium-screen adaptations
- Responsive menu behavior

The implementation depends on the Elementor menu structure already present on the website.

---

### `special-offer-slider-timer-fix/`

Elementor-specific fix for the special-offer slider timer.

This directory contains the code and supporting documentation related to correcting the timer behavior used in the special-offer slider.

The implementation is kept separately because it addresses a specific Elementor component rather than a general page layout.

---

# Design System

The Elementor customizations follow the ELVA KALA frontend visual language.

Primary interface color:

`#034A73`

Common characteristics include:

- RTL layouts
- White content cards
- Light gray backgrounds
- Rounded containers
- Subtle borders and shadows
- Blue headings and controls
- Responsive spacing
- Consistent typography
- Structured visual hierarchy

---

# Responsive Design

The custom Elementor implementations include dedicated adjustments for multiple viewport ranges.

The responsive work covers:

- Large desktop
- Medium-width desktop
- Tablet
- Mobile

Some components use additional breakpoints because the original desktop Elementor layout required adjustments before reaching the standard mobile breakpoint.

This is particularly relevant to:

- Header controls
- Navigation
- Mega menu
- Multi-column sections
- Contact layouts
- Footer columns

---

# Screenshots

Screenshots are stored inside the relevant component directories.

They are used as development documentation and may show:

- Final implemented layouts
- Previous states
- Desktop layouts
- Responsive layouts
- Before/after comparisons
- Specific interface fixes

Keeping screenshots next to their related implementation makes each customization easier to understand independently.

---

# Important Notes

These customizations were created specifically for the Elementor structure used by the ELVA KALA website.

Some implementations depend on existing:

- Elementor containers
- Elementor widgets
- Custom classes
- Element IDs
- Theme-generated markup

Changing the Elementor structure may require corresponding selector or script updates.

Custom code should therefore be reviewed after major Elementor, Elementor Pro, or theme updates.

---

# Repository Organization

This directory contains only Elementor-related customizations.

Other custom website code is organized separately in the repository, including:

- `snippets/` — independent WordPress and WooCommerce custom snippets
- `Plugin-Customizations/` — custom behavior added around third-party plugins
- `performance/` — performance optimization work and related documentation

This separation keeps page-builder customizations independent from backend snippets, plugin-specific extensions, and performance work.
