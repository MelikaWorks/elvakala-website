# ELVA Render-Blocking Resource Optimization

This directory documents the investigation and optimization work related to Lighthouse **Render blocking requests** on the Elva Kala homepage.

The goal of this task was to identify CSS, JavaScript, and font resources that delay the initial render and reduce their impact without breaking Elementor, theme functionality, or frontend styling.

## Initial Lighthouse Audit

The Lighthouse audit reported approximately:

**1,160 ms estimated savings**

from render-blocking resources.

The reported resources included:

- jQuery
- jQuery Migrate
- Elementor frontend styles
- Elementor widget styles
- Swiper styles
- Font Awesome styles
- Theme stylesheets
- WooCommerce styles
- Other plugin and theme CSS assets

## Investigation

The render-blocking list was reviewed resource by resource instead of globally deferring or removing assets.

This was necessary because several of the listed files are required by Elementor, WooCommerce, the theme, and interactive frontend components.

Aggressive defer or removal could break:

- Navigation
- Sliders
- Product components
- Elementor widgets
- WooCommerce layouts
- Icons
- Responsive behavior

## Elementor Performance Settings

Elementor performance settings were reviewed and kept enabled where appropriate.

The recorded configuration is documented in:

`04-elementor-performance-settings.png`

This includes Elementor's external CSS loading and other frontend performance-related settings.

## Font Rendering Optimization

During this investigation, three icon font definitions were identified as contributing to rendering delays:

- Font Awesome 5 Brands
- Font Awesome 5 Free
- Elementor eicons

The original definitions either used `font-display: block` or did not define `font-display`.

A custom override was added using:

`font-display: swap`

Implementation:

`/snippets/performance/font-display-swap.css`

After this change, the Lighthouse **Font display** issue disappeared from the performance insights.

## Screenshots

### `01-render-blocking-overview.png`

Shows the Lighthouse **Render blocking requests** audit and the estimated saving of approximately **1,160 ms**.

### `02-render-blocking-assets-part-1.png`

Shows the first section of the blocking asset list, including JavaScript and CSS resources.

### `03-render-blocking-assets-part-2.png`

Shows the remaining render-blocking theme, Elementor, WooCommerce, and plugin assets.

### `04-elementor-performance-settings.png`

Documents the Elementor performance settings used during this optimization phase.

## Result

The render-blocking investigation identified which resources are safe to optimize and which are required for frontend functionality.

Font-related render blocking was improved through a targeted `font-display: swap` override.

The broader **Render blocking requests** audit was not fully eliminated because several remaining assets are required by the active theme, Elementor, WooCommerce, and plugins.

No aggressive global defer strategy was applied in order to avoid frontend regressions.

## Validation

After changes, the following were checked:

- Elementor widgets
- Navigation and menus
- Icons
- Sliders
- WooCommerce components
- Mobile layout
- Desktop layout
- Responsive behavior

## Related Code

The related optimization code is stored at:

`/snippets/performance/font-display-swap.css`

This keeps executable optimization code separate from Lighthouse documentation and screenshots.
