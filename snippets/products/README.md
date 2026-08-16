# ELVA KALA — Product Customizations

Custom WooCommerce product-related code for the ELVA KALA website.

This directory contains custom code used for the product archive, product filtering, and single product pages. These customizations were added separately from the original WordPress theme files so they can be maintained without directly modifying the theme.

---

## Files

### `product-filter-drawer.php`

Custom product filter drawer for WooCommerce product category/archive pages.

The original product filter area was redesigned as a drawer-based interface to provide a cleaner product archive layout and a better filtering experience on both desktop and mobile.

#### Features

- Adds a dedicated **Product Filter** button to the archive toolbar.
- Opens product filters inside an off-canvas drawer.
- Displays relevant product categories inside the drawer.
- Includes navigation to all products of the current category.
- Includes the product price filter.
- Provides a close button and background overlay.
- Keeps the existing sorting and in-stock controls available in the archive toolbar.
- Includes responsive behavior for desktop and mobile screens.

#### Screenshots

- `product-filter-v4-desktop-1.png` — Product filter button on desktop.
- `product-filter-v4-desktop-2.png` — Open product filter drawer on desktop.
- `product-filter-v4-mobile-1.jpg` — Product archive and filter button on mobile.
- `product-filter-v4-mobile-2.jpg` — Open product filter drawer on mobile.

---

### `shop-archive-fix.css`

CSS fixes for WooCommerce product archive and category pages.

This stylesheet was created to correct the archive layout produced by the existing theme.

#### Problem

The original archive layout reserved a large unused area beside the product list, which reduced the usable width of the product grid.

#### Fix

The custom CSS removes the unwanted empty layout area and allows the product archive content and product grid to use the available page width correctly.

#### Screenshots

- `shop-archive-fix-v2-before.jpg` — Product archive before the layout fix.
- `shop-archive-fix-v2-after.png` — Product archive after the layout fix.

---

### `single-product.css`

Custom CSS for WooCommerce single product pages.

This stylesheet contains the visual and layout corrections made to the existing single-product template without editing the original theme files.

The changes are used to improve the structure and presentation of the main product area and the sections below it.

#### Areas affected

- Main single-product layout.
- Product information and purchase area.
- Product action controls.
- Description section.
- Customer reviews section.
- Related products.
- Recently viewed products.
- Spacing and alignment between product-page sections.

#### Screenshots

- `single-product-v2-before-1.png` — Single product page before the custom layout fixes.
- `single-product-v2-after-1.png` — Single product page after the fixes.
- `single-product-v2-after-2.png` — Additional view of the corrected product page and lower sections.

---

## Directory Structure

```text
products/
├── README.md
│
├── product-filter-drawer.php
├── product-filter-v4-desktop-1.png
├── product-filter-v4-desktop-2.png
├── product-filter-v4-mobile-1.jpg
├── product-filter-v4-mobile-2.jpg
│
├── shop-archive-fix.css
├── shop-archive-fix-v2-before.jpg
├── shop-archive-fix-v2-after.png
│
├── single-product.css
├── single-product-v2-before-1.png
├── single-product-v2-after-1.png
└── single-product-v2-after-2.png
