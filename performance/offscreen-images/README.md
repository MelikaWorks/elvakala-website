# ELVA Offscreen Image Optimization

This directory documents the optimization of non-critical offscreen images on the Elva Kala website.

The goal was to reduce unnecessary image loading during the initial page render by applying native lazy loading to selected images that appear outside the initial viewport.

## Initial Lighthouse Audit

The initial Lighthouse **Defer offscreen images** audit reported approximately **20 KiB** of estimated savings.

The report identified several offscreen images, including footer assets and third-party resources.

## Optimization

Two non-critical WordPress images controlled by the Elva Kala website were selected for optimization:

- Attachment ID `28556` — Elvakala footer logo
- Attachment ID `28558` — National standard logo

The following attributes are applied to these images:

- `loading="lazy"`
- `decoding="async"`
- `fetchpriority="low"`

Existing conflicting loading, decoding, and fetch priority attributes are removed before the optimized attributes are applied.

The optimization is intentionally limited to selected known offscreen images rather than globally modifying image loading across the website.

## Implementation

The optimization is implemented through the WordPress snippet:

`/snippets/performance/lazy-load-footer-images.php`

This allows the optimization to be enabled, modified, or rolled back without changing the original theme or image files.

## Lighthouse Results

### Before Optimization

Screenshot:

`01-before-offscreen-image-optimization.png`

Lighthouse reported approximately:

**20 KiB estimated savings**

### After Optimization

Screenshot:

`02-after-offscreen-image-optimization.png`

After applying lazy loading to the selected images, the remaining opportunity was reduced to approximately:

**9 KiB estimated savings**

## Result

The optimization reduced the Lighthouse **Defer offscreen images** opportunity from approximately:

**20 KiB → 9 KiB**

The audit was not completely eliminated because some remaining offscreen resources are outside the scope of this targeted optimization, including third-party assets.

Rather than applying aggressive lazy loading globally, this implementation targets only known non-critical images to minimize the risk of affecting above-the-fold content or LCP performance.

## Validation

After implementation, the affected areas were checked to ensure that:

- Footer images still render correctly
- Images load when they approach the viewport
- Critical above-the-fold images are unaffected
- Footer layout remains unchanged
- No global WordPress image-loading behavior is modified

## Rollback

The optimization can be rolled back by disabling the corresponding WordPress snippet.

No original theme or image files were modified as part of this optimization.
