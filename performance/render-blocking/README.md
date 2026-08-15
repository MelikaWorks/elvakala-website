# Render-Blocking Resources Optimization

## Overview

This optimization was performed as part of the performance improvement work on the Elvakala WordPress website.

Lighthouse reported a significant number of render-blocking resources, including:

- Theme CSS
- WooCommerce CSS
- Elementor CSS
- Elementor Pro CSS
- jQuery
- jQuery Migrate
- Font Awesome
- Elementor Icons
- Google Fonts

These resources were delaying the initial rendering of the page and negatively affecting FCP and LCP.

---

## Initial Lighthouse Report

Lighthouse initially reported approximately:

- Render-blocking potential savings: **1,580 ms**
- Large number of CSS resources in the critical rendering path
- External Google Fonts request
- Font display delay
- Font Awesome and Elementor icon fonts contributing to font rendering delay

The affected resources included files from:

- `mweb-digiland-pro`
- WooCommerce
- Elementor
- Elementor Pro
- Font Awesome
- Elementor Icons
- Google Fonts

Screenshots:

- `01-render-blocking-before.png`
- `02-render-blocking-assets.png`
- `03-render-blocking-assets-continued.png`

---

## Google Fonts Investigation

Chrome DevTools showed that a Roboto stylesheet was being loaded from:

`fonts.googleapis.com`

The request was identified in the page source as:

`google-Roboto-css`

The stylesheet then loaded Roboto `.woff2` font files from Google's font servers.

This was unnecessary because the website already uses locally hosted fonts for its primary typography.

Screenshots:

- `04-google-font-source.png`
- `05-google-font-network.png`
- `06-google-font-css.png`

---

## Local Font Configuration

The website already contains locally hosted Arad font files with multiple font weights.

The local font declarations use `@font-face` and include:

`font-display: swap`

Available weights include:

- 100 — Thin
- 200 — ExtraLight
- 300 — Light
- 400 — Regular
- 500 — Medium
- 600 — SemiBold
- 700 — Bold
- 800 — ExtraBold
- 900 — Black

Screenshot:

- `07-local-arad-font.png`

Using the local font files avoids unnecessary dependency on external Google Fonts for the site's main typography.

---

## Icon Font Investigation

Lighthouse also reported font-display delays related to icon fonts.

The following fonts were identified through Chrome DevTools:

### Font Awesome Brands

`fa-brands-400.woff2`

Loaded through Elementor's Font Awesome stylesheet.

Screenshot:

- `08-font-awesome-brands-source.png`

### Font Awesome Solid

`fa-solid-900.woff2`

Loaded through Elementor's Font Awesome stylesheet.

Screenshot:

- `09-font-awesome-solid-source.png`

### Elementor Icons

`eicons.woff2`

Loaded through:

`elementor-icons.min.css`

Screenshot:

- `10-elementor-eicons-source.png`

These fonts were investigated separately from the site's primary Arad font because they are required for icons used by Elementor and other interface components.

---

## Font Display

Lighthouse reported significant potential savings from font rendering.

Reported fonts included:

- `fa-brands-400.woff2`
- `fa-solid-900.woff2`
- `eicons.woff2`

The goal of the optimization was to prevent invisible text/icon rendering while font files were loading and reduce the impact of font loading on the critical rendering path.

Related optimization code is maintained separately under:

`snippets/performance/font-display-swap.css`

Screenshot:

- `11-font-display-before.png`

---

## Elementor Performance Settings

Elementor performance-related settings were reviewed during the optimization process.

The configuration included:

- CSS Print Method: External File
- Optimized Image Loading: Enabled
- Optimized Gutenberg Loading: Enabled
- Lazy Load Background Images: Enabled
- Google Fonts Loading: Disabled
- Element Cache: 1 Day

Disabling Elementor's Google Fonts loading helps prevent Elementor from introducing additional external Google Fonts requests.

---

## Result

After the changes, Lighthouse tests confirmed that the site remained functional and the optimization work reduced some of the previously identified font and render-blocking issues.

Because Lighthouse results vary between individual runs, performance scores were not treated as the sole measurement of success.

Tests during this optimization showed Performance scores in approximately the **51–53** range, while:

- Best Practices remained at **100**
- Accessibility remained around **85–86**
- CLS remained low
- Total Blocking Time remained in the few-hundred-millisecond range

The remaining Lighthouse report still showed other performance bottlenecks, including:

- Document request latency
- Remaining render-blocking resources
- Image delivery
- Cache lifetime
- Forced reflow
- Network dependency chains

These issues are handled as separate performance optimization tasks.

Screenshots:

- `12-after-fix-lighthouse.png`
- `13-after-fix-insights.png`

---

## Important Notes

This optimization intentionally avoids directly modifying Elementor, Elementor Pro, WooCommerce, or theme plugin files.

Direct modification of plugin files would be overwritten during future updates.

Custom performance fixes are therefore maintained separately in the repository whenever possible.

---

## Status

**Investigated and partially optimized**

Render-blocking resources have not been completely eliminated.

Remaining CSS and JavaScript resources require separate analysis before defer, delay, removal, or critical-CSS strategies are applied, because aggressive optimization may break Elementor, WooCommerce, menus, sliders, filters, or other interactive components.
