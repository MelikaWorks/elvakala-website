# ELVA Performance Optimization

This directory contains documentation, test results, implementation references, and optimization assets related to the performance improvement work performed on the Elva Kala website.

Performance work is organized into separate subdirectories based on each optimization task. Each directory documents the investigation, implementation, validation, and Lighthouse results for that specific area.

Executable PHP and CSS snippets are maintained separately under:

`/snippets/performance/`

This keeps production code separate from performance documentation while preserving a clear relationship between each optimization and its implementation.

---

## Current Optimizations

### 1. Digits Homepage Assets Optimization

Directory:

`digits-homepage-assets/`

Documents the optimization of Digits login assets that were unnecessarily loading on the homepage even though the Digits login interface is opened on a separate login view.

The optimization includes:

- Investigation of Digits JavaScript and CSS requests on the homepage
- Identification of Digits login-specific assets and dependencies
- Removal of unnecessary Digits login assets from the homepage only
- Removal of `libphonenumber` and `scrollTo` dependencies from the homepage
- Verification through Chrome DevTools Network filtering
- Validation that the Digits login page still loads its required assets
- Functional testing of the mobile-number login and verification-code flow
- Lighthouse validation after the optimization

The optimization is intentionally limited to the homepage. Login, My Account, Checkout, and other pages that require Digits remain untouched.

Related implementation:

`/snippets/performance/`

---

### 2. Homepage LCP Optimization

Directory:

`homepage-lcp/`

Documents the investigation and optimization of the Largest Contentful Paint (LCP) element on the homepage.

The homepage hero slider (`slider02`) was identified as the primary LCP element. Desktop and mobile layouts use different image resources, requiring responsive preload rules.

The optimization includes:

- Identification of the homepage LCP element
- Lighthouse LCP breakdown analysis
- Investigation of LCP request discovery
- Verification that the LCP image is not lazy-loaded
- Application of `fetchpriority="high"`
- Early preload from the initial HTML document
- Separate preload rules for desktop and mobile hero images
- Network and Lighthouse validation

The responsive preload implementation ensures that the browser can discover and prioritize the correct hero image as early as possible.

Related implementation:

`/snippets/performance/preload-homepage-lcp.php`

---

### 3. Improve Image Delivery

Directory:

`improve-image-delivery/`

Documents the homepage image delivery optimization work.

The goal was to reduce unnecessary image transfer size, improve responsive source selection, and reduce the Lighthouse **Improve image delivery** opportunity without noticeably reducing visual quality.

The optimization includes:

- Responsive `sizes` optimization for homepage category images
- Progressive PNG-to-WebP conversion
- WebP optimization for the mobile deal slider
- Review of other image-heavy homepage sections
- Network validation of actual downloaded image resources
- Desktop and mobile visual validation
- Lighthouse testing throughout the optimization process

The documented Lighthouse **Improve image delivery** opportunity was reduced from approximately:

**3,256 KiB → 109 KiB**

Related implementations:

`/snippets/performance/homepage-category-image-sizes.php`

`/snippets/performance/mobile-deal-slider-webp.php`

---

### 4. CSS Minification

Directory:

`minify-css/`

Documents the CSS minification work performed on the main theme and WooCommerce stylesheets.

The optimization includes:

- Minification of the main theme `style.css`
- Minification of `woocommerce.css`
- Preservation of original CSS files for rollback
- Deployment of minified versions
- Lighthouse validation before and after optimization
- Visual validation across desktop and mobile layouts
- Successful Lighthouse **Minify CSS** audit

The directory contains original source files, minified versions, and screenshots documenting the optimization process.

Related implementation:

`/snippets/performance/load-minified-theme-css.php`

---

### 5. JavaScript Minification

Directory:

`minify-js/`

Documents the JavaScript minification work performed on the main theme JavaScript file.

The optimization includes:

- Preservation of the original `my-script.js`
- Creation of `my-script.min.js`
- Deployment of the minified script
- Functional validation of theme interactions
- Lighthouse validation after deployment
- Successful Lighthouse **Minify JavaScript** audit

The theme JavaScript contains frontend functionality including AJAX interactions, search, pagination, navigation, product features, and other interactive components, so functionality was validated after deployment.

A recorded Lighthouse test after this optimization showed:

- Performance: **71**
- FCP: **2.8 s**
- LCP: **3.4 s**
- TBT: **310 ms**
- CLS: **0**
- Speed Index: **11.7 s**

Related implementation is maintained under:

`/snippets/performance/`

---

### 6. Offscreen Image Optimization

Directory:

`offscreen-images/`

Documents the optimization of selected non-critical images loaded outside the initial viewport.

The optimization includes:

- Native lazy loading for selected footer images
- `decoding="async"`
- `fetchpriority="low"`
- Targeted optimization rather than globally modifying image behavior
- Lighthouse validation before and after optimization
- Visual and functional validation

The Lighthouse **Defer offscreen images** opportunity was reduced from approximately:

**20 KiB → 9 KiB**

Remaining offscreen-image opportunities include resources outside the scope of this targeted optimization, including third-party assets.

Related implementation:

`/snippets/performance/lazy-load-footer-images.php`

---

### 7. Render-Blocking Resources Optimization

Directory:

`render-blocking/`

Documents the investigation and partial optimization of resources affecting the critical rendering path.

The investigation covered:

- Theme CSS
- WooCommerce CSS
- Elementor and Elementor Pro CSS
- jQuery and jQuery Migrate
- Font Awesome
- Elementor Icons
- Google Fonts
- Local font configuration
- Font rendering behavior

The initial Lighthouse report showed approximately:

**1,580 ms potential render-blocking savings**

The optimization also identified an unnecessary external Roboto request from Google Fonts. The site already uses locally hosted Arad fonts, so external Google Fonts loading was disabled where possible.

Elementor performance settings were also reviewed, including optimized image loading, Gutenberg loading, background-image lazy loading, Google Fonts loading, and element caching.

Font Awesome and Elementor icon fonts were investigated separately because they are required by interface components.

Related implementation:

`/snippets/performance/font-display-swap.css`

This task is currently classified as:

**Investigated and partially optimized**

Render-blocking resources have not been completely eliminated because aggressive defer, delay, or removal strategies may break Elementor, WooCommerce, menus, sliders, filters, or other interactive components.

---

### 8. Server Configuration and Browser Cache

Directory:

`server-config/`

Documents server-level performance configuration applied through `.htaccess`.

The current documented optimization focuses on resolving Lighthouse's **Use efficient cache lifetimes** warning by enabling long-term browser caching for static assets.

The configuration includes one-year browser caching for:

- CSS
- JavaScript
- Images
- WebP and AVIF assets
- SVG files
- Fonts
- Other static resources

Cache-Control:

`public, max-age=31536000`

Before the optimization, Lighthouse reported approximately:

**493 KiB potential cache-lifetime savings**

After the browser-cache configuration, the remaining opportunity was reduced to approximately:

**3 KiB**

A recorded Lighthouse result after this optimization showed:

- Performance: **77**
- FCP: **2.8 s**
- LCP: **3.4 s**
- TBT: **300 ms**
- CLS: **0.023**

The Browser Cache configuration is preserved separately as:

`browser-cache.htaccess`

This file contains only the cache configuration introduced during this optimization and is not a complete copy of the production `.htaccess` file.

---

## Final Lighthouse Baseline

The final clean homepage audit was recorded on **2026-09-26** using the canonical homepage URL:

`https://elvakala.com/`

Final recorded Lighthouse results:

- Performance: **72**
- Accessibility: **86**
- Best Practices: **100**
- SEO: **100**
- First Contentful Paint (FCP): **2.7 s**
- Largest Contentful Paint (LCP): **3.2 s**
- Total Blocking Time (TBT): **310 ms**
- Cumulative Layout Shift (CLS): **0.001**
- Speed Index: **15.3 s**

The most important improvement was reducing homepage LCP from approximately **11–19 seconds** in early audits to **3.2 seconds** in the final recorded audit. Layout stability also remained excellent with a CLS of **0.001**.

The final evidence screenshot is stored in this directory as:

`lighthouse-mobile-final-2026-09-26.png`

The remaining performance cost is primarily associated with the production WordPress, WooCommerce, Elementor, slider, and third-party plugin stack. Further aggressive optimization was intentionally avoided because it could compromise storefront functionality and production stability.

---

## Related Code

Executable snippets used by these performance optimizations are stored separately in:

`/snippets/performance/`

Current related files include:

- `preload-homepage-lcp.php`
- `homepage-category-image-sizes.php`
- `mobile-deal-slider-webp.php`
- `load-minified-theme-css.php`
- `lazy-load-footer-images.php`
- `font-display-swap.css`
- Digits homepage asset optimization snippet

This structure separates production implementation from documentation, screenshots, test results, source files, and rollback assets.

---

## Validation Strategy

Performance changes are validated using a combination of:

- Chrome DevTools Network inspection
- Lighthouse audits
- Desktop testing
- Mobile responsive testing
- Elementor layout validation
- WooCommerce functionality testing
- Network request verification
- Visual regression checks
- Functional testing of affected interactive components

Lighthouse scores are not treated as the sole measurement of success because individual runs can vary significantly depending on server response time, network conditions, CPU simulation, cache state, image transfer time, JavaScript execution, and other runtime factors.

Individual optimizations are therefore documented according to the specific resource or behavior they were intended to improve.

---

## Project Structure

```text
performance/
├── lighthouse-mobile-final-2026-09-26.png
├── digits-homepage-assets/
├── homepage-lcp/
├── improve-image-delivery/
├── minify-css/
├── minify-js/
├── offscreen-images/
├── render-blocking/
├── server-config/
└── README.md

snippets/
└── performance/
    ├── preload-homepage-lcp.php
    ├── homepage-category-image-sizes.php
    ├── mobile-deal-slider-webp.php
    ├── load-minified-theme-css.php
    ├── lazy-load-footer-images.php
    ├── font-display-swap.css
    └── ...
```

---

## Status

The documented performance optimization phase is complete and classified as:

**Stable / Final QA Passed**

The final homepage Lighthouse baseline is preserved in the repository together with the implementation notes, rollback assets, and task-specific evidence.

Completed work is documented independently so that each change can be reviewed, tested, maintained, or rolled back without losing the history of the optimization process.

Remaining Lighthouse opportunities are accepted as limitations of the current production stack. Any future optimization should be handled as a separate, controlled task rather than applying aggressive global changes that could compromise the stability of Elementor, WooCommerce, the theme, or other production functionality.
