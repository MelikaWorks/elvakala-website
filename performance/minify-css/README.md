# ELVA CSS Minification

This directory documents the CSS minification process performed on the Elva Kala website as part of the performance optimization project.

The goal of this optimization was to reduce CSS transfer size and resolve the Lighthouse **Minify CSS** audit while preserving the original theme files for rollback.

## Initial Lighthouse Audit

The initial Lighthouse audit reported approximately **22 KiB** of potential CSS savings.

The main files identified were:

- `style.css` — approximately **13.5 KiB** potential savings
- `woocommerce.css` — approximately **8.5 KiB** potential savings

Both files belong to the `mweb-digiland-pro` theme.

## Optimization Process

### 1. Main Theme Stylesheet

The original `style.css` was minified and a minified version was deployed and tested.

After this change, Lighthouse no longer reported the original `style.css` file and the remaining CSS minification opportunity was reduced.

### 2. WooCommerce Stylesheet

The theme's `woocommerce.css` file was then minified and its minified version was deployed.

After both stylesheets were optimized, the Lighthouse **Minify CSS** audit passed successfully.

## Directory Structure

### `source/`

Contains the original non-minified CSS files used as the source and rollback reference.

- `style.css`
- `woocommerce.css`

### `minified/`

Contains the optimized minified versions.

- `style.min.css`
- `woocommerce.min.css`

### `screenshots/`

Contains Lighthouse screenshots documenting the optimization process from the initial warning through successful completion.

The screenshots show:

1. Initial CSS minification opportunity
2. Main theme stylesheet after minification
3. Remaining WooCommerce CSS opportunity
4. Lighthouse performance result during the optimization process
5. Successful **Minify CSS** audit after completion

## Implementation

The minified stylesheets are loaded through a custom WordPress snippet.

The implementation snippet is stored separately at:

`/snippets/performance/load-minified-theme-css.php`

This separation keeps production code independent from performance documentation and test assets.

## Validation

After deployment, the website was checked to ensure that minification did not introduce visible layout or styling problems.

Validation included:

- Desktop layout
- Mobile layout
- Responsive behavior
- Navigation and menus
- Hover states
- Elementor sections and widgets
- Product and WooCommerce components

The original CSS files are preserved in this repository to provide a safe rollback path if required.

## Result

The Lighthouse **Minify CSS** audit passed after both theme stylesheets were optimized.

This optimization reduced unnecessary CSS transfer size without intentionally modifying the visual design or behavior of the website.
