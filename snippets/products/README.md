# ELVA KALA — Product Customizations

Custom code used for WooCommerce product archives, product filtering, and single product pages on the ELVA KALA website.

These customizations were created to improve the existing theme behavior and layout without directly editing the theme files.

---

## Product Filter Drawer

**File:** `product-filter-drawer.php`

Custom product filtering interface used on WooCommerce product archive pages.

### What it does

- Adds a "Product Filter" button to the product archive toolbar.
- Opens the filters inside an off-canvas drawer.
- Displays the current category's child categories inside the drawer.
- Provides navigation back to all products of the current category.
- Includes the available price filter.
- Preserves the existing product sorting and availability controls outside the drawer.
- Provides a close button and page overlay.
- Supports desktop and mobile layouts.
- Uses a wider mobile drawer layout for easier interaction on small screens.

### Used on

WooCommerce product archive pages, including product category pages.

### Screenshots

- `product-filter-v4-desktop-1.png` — Filter button in the desktop product archive.
- `product-filter-v4-desktop-2.png` — Open filter drawer on desktop.
- `product-filter-v4-mobile-1.jpg` — Product archive and filter button on mobile.
- `product-filter-v4-mobile-2.jpg` — Open filter drawer on mobile.

---

## Shop Archive Layout Fix

**File:** `shop-archive-fix.php`

Fixes layout problems in WooCommerce product archive pages caused by the original theme layout.

### What it does

- Corrects the product archive content width and positioning.
- Fixes excessive empty space beside the product grid.
- Allows the product grid to use the available archive width correctly.
- Keeps the archive toolbar aligned with the product grid.
- Produces a more compact and consistent archive layout.

### Used on

WooCommerce shop and product archive/category pages.

### Before

The original archive layout left a large unused area beside the products and compressed the product grid into part of the available page width.

### After

The archive content uses the available width correctly and the product cards are distributed across the product area.

### Screenshots

- `shop-archive-fix-v2-before.jpg` — Archive layout before the fix.
- `shop-archive-fix-v2-after.png` — Archive layout after the fix.

---

## Single Product Page

**File:** `single-product-style.css`

Custom styling and layout fixes for WooCommerce single product pages.

### What it does

- Improves the layout of the main product information area.
- Corrects spacing and alignment around product content.
- Fixes the layout around purchase actions and secondary product actions.
- Improves the presentation of the product description and review sections.
- Keeps related products and recently viewed products aligned with the rest of the page.
- Removes or corrects unwanted layout behavior inherited from the theme.
- Provides a cleaner and more consistent single-product layout.

### Used on

WooCommerce single product pages.

### Before

The original theme layout could create incorrect positioning and large empty areas around product actions and page content.

### After

The product information, purchase controls, tabs, reviews, related products, and recently viewed products remain inside the intended content layout.

### Screenshots

- `single-product-v2-before-1.png` — Single product page before the layout fix.
- `single-product-v2-after-1.png` — Single product page after the fix.
- `single-product-v2-after-2.png` — Additional view of the corrected single product layout.

---

## Important

These files are custom fixes for the current ELVA KALA WordPress/WooCommerce setup.

They should remain separate from the original theme and plugin files so theme or plugin updates do not overwrite the customizations.

Before removing or changing any of these files, check the related WooCommerce archive and single product pages on both desktop and mobile.
