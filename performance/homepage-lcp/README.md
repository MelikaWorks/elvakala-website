# Homepage LCP Optimization

## Goal

Optimize the Largest Contentful Paint (LCP) of the ElvaKala homepage, specifically the main Elementor slider image (`slider02`) on mobile devices.

---

## Initial Problem

Lighthouse identified the first homepage slider image (`slider02`) as the LCP element.

The slider is rendered by Elementor/Swiper as a background image:

```html
<div class="swiper-slide-bg elementor-ken-burns--active" role="img" aria-label="slider02">
```

Because the LCP image is applied as a CSS background rather than a normal `<img>` element, the browser does not discover the image directly from the initial HTML element.

Initial Lighthouse testing showed approximately:

| Metric | Result |
|---|---:|
| Performance | 39 |
| FCP | 4.5 s |
| LCP | 20.7 s |
| TBT | 710 ms |
| Speed Index | 11.4 s |
| CLS | 0.007 |

The main bottleneck was the LCP slider image.

---

## Step 1 — Initial Desktop Preload Test

The first optimization attempt was to explicitly preload the desktop slider image from the document `<head>`:

```php
add_action('wp_head', function () {
    if (is_front_page()) {
        echo '<link rel="preload" as="image" href="https://elvakala.com/wp-content/uploads/2026/07/slider02.png" fetchpriority="high">' . "\n";
    }
}, 1);
```

A Lighthouse run after this change produced:

| Metric | Before | Test Result |
|---|---:|---:|
| Performance | 39 | 45 |
| FCP | 4.5 s | 4.3 s |
| LCP | 20.7 s | 19.9 s |
| TBT | 710 ms | 510 ms |
| Speed Index | 11.4 s | 9.3 s |
| CLS | 0.007 | 0.007 |

Because Lighthouse results naturally vary between runs, the score difference alone was not treated as proof of the preload improvement.

![Initial Lighthouse test](./01-lighthouse-before-lcp-fix.png)

---

## LCP Breakdown Before Mobile Optimization

The LCP breakdown showed:

| Subpart | Duration |
|---|---:|
| Time to First Byte | 260 ms |
| Resource Load Delay | 1,810 ms |
| Resource Load Duration | 13,340 ms |
| Element Render Delay | 10 ms |

The two main problems were therefore:

1. The browser was discovering the LCP resource too late.
2. The actual slider image required a very long download time on the simulated mobile connection.

![LCP breakdown before optimization](./02-lcp-breakdown-before.png)

---

## LCP Request Discovery

Lighthouse also reported:

- `fetchpriority=high should be applied`
- `Request is discoverable in initial document`
- `lazy load not applied` ✓

This confirmed that the Elementor background image itself was not considered directly discoverable from the initial document.

![LCP request discovery](./03-lcp-request-discovery-before.png)

The preload was then verified directly in the generated HTML.

![Desktop preload in HTML](./04-desktop-preload-in-html.png)

---

## Step 2 — Mobile-Specific Slider Image

The original desktop slider image was approximately 1.7 MB and was unnecessarily large for mobile devices.

A dedicated mobile version was therefore created:

```text
slider02-900x480-1.png
```

The mobile image was assigned to the slider's mobile breakpoint in Elementor.

The original desktop image remained:

```text
slider02.png
```

This allowed mobile devices to load a significantly smaller image instead of downloading the full desktop asset.

---

## Step 3 — Responsive Preload

The preload implementation was updated so that the browser can preload the correct LCP image depending on the viewport width.

### Mobile

```html
<link
    rel="preload"
    as="image"
    href="https://elvakala.com/wp-content/uploads/2026/08/slider02-900x480-1.png"
    media="(max-width: 767px)"
    fetchpriority="high">
```

### Desktop

```html
<link
    rel="preload"
    as="image"
    href="https://elvakala.com/wp-content/uploads/2026/07/slider02.png"
    media="(min-width: 768px)"
    fetchpriority="high">
```

The implementation is stored in:

```text
snippets/performance/preload-homepage-lcp.php
```

---

## Verification

Chrome DevTools Network confirmed that the mobile viewport loads:

```text
slider02-900x480-1.png
```

instead of the full desktop slider image.

![Mobile slider network request](./07-mobile-slider-network.png)

The generated HTML was also inspected to verify that both responsive preload declarations are present.

![Responsive preload HTML](./08-responsive-preload-html.png)

---

## Result After Mobile Optimization

A Lighthouse test after implementing the mobile-specific image and responsive preload produced:

| Metric | Result |
|---|---:|
| Performance | 51 |
| FCP | 3.6 s |
| LCP | 11.2 s |
| TBT | 340 ms |
| CLS | 0.007 |
| Speed Index | 11.3 s |

![Lighthouse after mobile optimization](./05-lighthouse-after-mobile-optimization.png)

The LCP breakdown after the changes showed:

| Subpart | Before | After |
|---|---:|---:|
| Resource Load Delay | 1,810 ms | 100 ms |
| Resource Load Duration | 13,340 ms | 8,390 ms |
| Element Render Delay | 10 ms | 20 ms |

![LCP breakdown after optimization](./06-lcp-breakdown-after.png)

---

## Key Improvements

### Resource discovery

Resource Load Delay:

```text
1,810 ms → 100 ms
```

The browser now starts loading the LCP resource much earlier.

### Image transfer

Resource Load Duration:

```text
13,340 ms → 8,390 ms
```

Using a dedicated mobile image significantly reduced the amount of image data that must be transferred on mobile.

### Overall LCP

Observed Lighthouse LCP:

```text
20.7 s → 11.2 s
```

Lighthouse scores vary between runs, so the LCP value itself should not be treated as a perfectly controlled benchmark.

The LCP breakdown provides stronger evidence of the optimization: resource discovery became substantially faster and the mobile image reduced transfer time.

---

## Remaining Performance Work

The homepage still has other independent performance bottlenecks, including:

- Font display
- Render-blocking requests
- Image delivery
- Cache lifetime
- Forced reflow
- Network dependency tree

These should be optimized separately rather than mixed with the LCP slider implementation.

---

## Status

**Implemented and tested**

The homepage now uses:

- A dedicated mobile LCP image
- The original desktop LCP image for larger screens
- Responsive preload rules
- `fetchpriority="high"` on the preload resources

The next performance tasks should be handled independently from this optimization.
