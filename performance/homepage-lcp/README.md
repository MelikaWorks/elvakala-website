# Homepage LCP Optimization

## Goal

Optimize the Largest Contentful Paint (LCP) of the ElvaKala homepage, with a focus on the main Elementor slider image on mobile and desktop.

## Initial Problem

Lighthouse identified the main homepage slider image (`slider02`) as the LCP element.

The Elementor slider loads the image as a `background-image` on a Swiper element:

```html
<div class="swiper-slide-bg ...">
```

Because the image is loaded as a CSS background, the browser discovers it later than a normal `<img>` element.

Initial tests showed:

- High LCP time
- High Resource Load Delay
- The original desktop `slider02.png` image was approximately 1.7 MB
- The large desktop image was also being used on mobile
- Lighthouse consistently identified `slider02` as the LCP element

## Step 1 — Preload the LCP Image

The main slider image was explicitly preloaded from the document `<head>` so the browser could discover and start downloading it before Elementor finished processing the slider.

Testing confirmed that preloading significantly reduced the LCP Resource Load Delay.

The implementation is stored in:

```text
snippets/performance/preload-homepage-lcp.php
```

## Step 2 — Create a Mobile-Specific Slider Image

A smaller version of the slider image was created specifically for mobile devices:

```text
slider02-900x480-1.png
```

This image was configured as the mobile background image in Elementor.

The original desktop image remains:

```text
slider02.png
```

This prevents mobile devices from downloading the much larger desktop image unnecessarily.

## Step 3 — Responsive LCP Preload

The preload logic was updated so the browser only prioritizes the appropriate image for the current viewport.

### Mobile

```html
<link
    rel="preload"
    as="image"
    href="/wp-content/uploads/2026/08/slider02-900x480-1.png"
    media="(max-width: 767px)"
    fetchpriority="high">
```

### Desktop

```html
<link
    rel="preload"
    as="image"
    href="/wp-content/uploads/2026/07/slider02.png"
    media="(min-width: 768px)"
    fetchpriority="high">
```

The final PHP implementation is stored in:

```text
snippets/performance/preload-homepage-lcp.php
```

## Verification

The generated homepage HTML was inspected to confirm that both responsive preload declarations are present in the initial document.

Mobile preload:

```text
media="(max-width: 767px)"
```

Desktop preload:

```text
media="(min-width: 768px)"
```

This allows the browser to discover the correct LCP image immediately without waiting for Elementor or Swiper to fully initialize.

Network inspection also confirmed that the mobile version of the slider image is loaded on mobile.

## Lighthouse Result

A Lighthouse test after implementing the mobile image and responsive preload produced:

| Metric | Result |
|---|---:|
| Performance | 51 |
| First Contentful Paint | 3.6 s |
| Largest Contentful Paint | 11.2 s |
| Total Blocking Time | 340 ms |
| Cumulative Layout Shift | 0.007 |
| Speed Index | 11.3 s |

## LCP Breakdown

Lighthouse reported the following LCP breakdown:

| Subpart | Duration |
|---|---:|
| Time to First Byte | 520 ms |
| Resource Load Delay | 100 ms |
| Resource Load Duration | 8,390 ms |
| Element Render Delay | 20 ms |

The most important improvement was the reduction of **Resource Load Delay to approximately 100 ms**.

This confirms that the browser is now discovering the LCP image very early.

The remaining LCP time is primarily associated with the actual image transfer duration rather than late discovery of the resource.

## Technical Result

Two separate LCP bottlenecks were identified:

1. **Late discovery of the LCP image**
   - Improved by explicitly preloading the slider image in the document `<head>`.

2. **Large desktop image being downloaded on mobile**
   - Improved by creating a dedicated mobile image and using responsive preload rules.

The browser can now discover the LCP resource almost immediately and mobile devices no longer need to use the full desktop slider image.

## Related Performance Findings

During testing, other Lighthouse performance issues were also identified, including:

- Render-blocking requests
- Font display
- Google Fonts / Roboto loading
- Image delivery
- Cache lifetime
- Forced reflow
- Network dependency tree

These are separate optimization tasks and should be handled independently from the homepage LCP image optimization.

## Status

**Implemented and tested**

The responsive LCP preload and mobile-specific slider image are currently active.

> Lighthouse scores can vary significantly between individual runs. The primary success metric for this optimization is the reduction in LCP Resource Load Delay and confirmation that the correct responsive slider image is loaded for each viewport.
