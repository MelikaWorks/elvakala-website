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

## Related Code

PHP and CSS snippets used to implement performance optimizations are stored separately in:

`/snippets/performance/`

The minified theme CSS and JavaScript assets are loaded through:

`/snippets/performance/load-minified-theme.php`

This keeps executable code separate from performance documentation and test assets while preserving a clear link between the implementation and its related optimization records.
