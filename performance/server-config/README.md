# Browser Cache Performance Optimization

## Purpose

Improve website performance by resolving the **Use efficient cache lifetimes** warning reported by Lighthouse and enabling long-term browser caching for static assets.

## Implementation

The configuration was applied to:

`public_html/.htaccess`

The Browser Cache configuration is stored separately in:

`browser-cache.htaccess`

## Changes

A one-year browser cache lifetime was configured for static assets, including:

- CSS
- JavaScript
- Images (`WebP`, `AVIF`, `PNG`, `JPG`, `SVG`, etc.)
- Fonts (`WOFF`, `WOFF2`, `TTF`, `OTF`, etc.)

Cache-Control:

`public, max-age=31536000`

## Results

Before the optimization, several static assets such as `plugins-theme.js` had no defined cache lifetime, and Lighthouse reported approximately **493 KiB** of potential savings under **Use efficient cache lifetimes**.

After the optimization:

- Static asset cache lifetime: **1 year**
- Use efficient cache lifetimes: **~3 KiB remaining**
- Lighthouse Performance Score: **77**
- FCP: **2.8s**
- LCP: **3.4s**
- TBT: **300ms**
- CLS: **0.023**

## Lighthouse Result

The Lighthouse result after applying the browser cache optimization is available in:

`lighthouse-performance-77-after-browser-cache.png`

## Note

`browser-cache.htaccess` contains only the Browser Cache configuration added during this optimization. It is **not** a complete copy of the production `.htaccess` file.
