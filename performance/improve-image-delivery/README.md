# ELVA Improve Image Delivery

This directory documents the image delivery optimization work performed on the Elva Kala homepage as part of the performance optimization project.

The goal of this task was to reduce image transfer size, improve responsive image selection, and lower the Lighthouse **Improve image delivery** opportunity without noticeably reducing visual quality.

## Initial Lighthouse Audit

The initial Lighthouse audit reported approximately:

**3,256 KiB estimated savings**

The main issues identified were:

- PNG images served where WebP could be used
- Images significantly larger than their rendered dimensions
- Inefficient responsive image selection
- Homepage category images loading unnecessarily large sources
- Large images used in the mobile deal slider and other homepage sections

## Optimization Process

### 1. Responsive Category Image Sizing

The homepage category images already had `srcset`, but their default `sizes` attribute caused browsers to select image files larger than necessary.

A custom WordPress snippet was added to provide more accurate responsive `sizes` values for selected homepage category images.

Implementation:

`/snippets/performance/homepage-category-image-sizes.php`

This allows the browser to select a more appropriate source from the existing WordPress `srcset` based on viewport width.

### 2. Category Image WebP Conversion

Large PNG category images were progressively replaced with WebP versions.

This significantly reduced transfer size while preserving acceptable visual quality.

The optimization was applied selectively rather than globally so each image could be visually checked after conversion.

### 3. Mobile Deal Slider WebP Optimization

Images rendered by the homepage mobile deal slider were optimized separately.

A custom snippet converts eligible JPG and PNG files used by the widget to WebP and serves the WebP version when available.

Implementation:

`/snippets/performance/mobile-deal-slider-webp.php`

The snippet is limited to the homepage and the targeted deal-slider widget.

### 4. Additional Homepage Image Optimization

Other image-heavy homepage sections were reviewed and converted to WebP where appropriate.

Network and Lighthouse tests were repeatedly used to verify which image file was actually downloaded after each change.

## Screenshots

### `01-before-image-delivery.png`

Shows the initial Lighthouse **Improve image delivery** opportunity:

**3,256 KiB estimated savings**

### `02-category-images-responsive-sizing.png`

Documents the responsive image sizing work for the homepage category images.

### `03-after-mobile-slider-webp.png`

Shows the Lighthouse result after optimizing the mobile slider images with WebP.

### `04-deal-slider-webp-network.png`

Documents Network panel validation of the optimized image requests used by the deal-slider section.

### `05-after-image-optimization.png`

Shows the later Lighthouse result after the main image optimization work.

The remaining **Improve image delivery** opportunity was reduced to approximately:

**109 KiB**

### `06-final-lighthouse-score.png`

Documents the Lighthouse performance state after this optimization phase.

## Result

The documented Lighthouse **Improve image delivery** opportunity was reduced from approximately:

**3,256 KiB → 109 KiB**

This represents a major reduction in unnecessary image transfer size.

The remaining opportunity is primarily related to image dimensions or assets that were intentionally left unchanged because further optimization required additional testing or could affect image quality.

## Validation

During the optimization process, the following were checked:

- Desktop layout
- Mobile layout
- Responsive image behavior
- Category image quality
- Image source selection at different viewport widths
- Homepage sliders
- WebP loading in the Network panel
- Elementor layout stability

Image optimization was performed conservatively to avoid sacrificing visible image quality simply to satisfy Lighthouse.

## Related Code

The custom code related to this optimization is stored separately in:

`/snippets/performance/`

Relevant files:

- `homepage-category-image-sizes.php`
- `mobile-deal-slider-webp.php`

Keeping executable code separate from performance documentation makes the optimization easier to maintain, test, and roll back.

## Rollback

The responsive image and mobile slider optimizations can be rolled back by disabling their corresponding WordPress snippets.

Original image assets should be preserved wherever possible so image changes can also be reversed independently.
