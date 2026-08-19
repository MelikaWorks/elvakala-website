# ELVA Performance Optimization

This directory contains documentation, test results, and optimization assets related to the performance improvements of the Elva Kala website.

Performance work is organized into separate subdirectories based on each optimization task.

## Current Optimizations

### CSS Minification

Directory:

`minify-css/`

Contains the files and Lighthouse test results related to minifying the main theme and WooCommerce stylesheets.

The optimization includes:

* Minification of the main theme `style.css`
* Minification of `woocommerce.css`
* Lighthouse validation before and after optimization
* Original and minified CSS files for comparison and rollback
* Screenshots documenting the optimization process
* Successful Lighthouse **Minify CSS** audit

### JavaScript Minification

Directory:

`minify-js/`

Contains the files and Lighthouse test results related to minifying the main theme JavaScript file.

The optimization includes:

* Minification of the main theme `my-script.js`
* Deployment of `my-script.min.js`
* Lighthouse validation after JavaScript minification
* Original and minified JavaScript files for comparison and rollback
* Screenshots documenting the optimization result
* Successful Lighthouse **Minify JavaScript** audit

### Offscreen Image Optimization

Directory:

`offscreen-images/`

Contains the documentation and Lighthouse results related to optimizing selected non-critical images loaded outside the initial viewport.

The optimization includes:

* Native lazy loading for selected footer images
* Asynchronous image decoding with `decoding="async"`
* Low fetch priority with `fetchpriority="low"`
* Targeted optimization without globally modifying image loading
* Lighthouse validation before and after optimization
* Screenshots documenting the optimization result
* Reduction of the **Defer offscreen images** opportunity from approximately **20 KiB to 9 KiB**

The remaining offscreen-image opportunity includes resources outside the scope of this targeted optimization, including third-party assets.


### Digits Homepage Assets Optimization

Directory:

`digits-homepage-assets/`

Contains the documentation and verification results related to removing unnecessary Digits authentication assets from the homepage.

The optimization includes:

* Removal of Digits login-specific JavaScript from the homepage
* Removal of `scrollTo` and `libphonenumber` dependencies from the homepage
* Removal of the Digits login stylesheet from the homepage
* Homepage-only targeting to prevent changes to authentication pages
* Chrome DevTools Network verification confirming the targeted assets are no longer loaded on the homepage
* Lighthouse validation after optimization
* Verification that required Digits JavaScript and CSS assets still load on the authentication page
* Successful SMS OTP delivery and authentication testing
* Reduction of the Lighthouse unused CSS opportunity from approximately **142 KiB to 127 KiB**

The optimization is intentionally limited to the homepage. Digits authentication functionality remains fully available on the login and account pages.


## Related Code

PHP and CSS snippets used to implement performance optimizations are stored separately in:

`/snippets/performance/`

### Minified Theme Assets

The minified theme CSS, WooCommerce CSS, and JavaScript assets are loaded through:

`/snippets/performance/load-minified-theme.php`

### Offscreen Images

Selected non-critical footer images are optimized through:

`/snippets/performance/lazy-load-footer-images.php`

This keeps executable code separate from performance documentation and test assets while preserving a clear link between each optimization and its implementation.
