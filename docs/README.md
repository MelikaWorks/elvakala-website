# Digits Homepage Assets Optimization

## Overview

The ELVA Kala homepage was loading CSS and JavaScript assets from the Digits authentication plugin even though the Digits login interface is not rendered directly on the homepage.

The header's **Login / Register** button links to the My Account page, where Digits handles the authentication flow separately.

Loading Digits authentication assets on the homepage therefore added unnecessary CSS and JavaScript to the initial page load.

This optimization removes selected Digits login assets **only from the homepage**, while keeping the Digits login page and OTP authentication flow fully functional.

---

## Problem

Performance analysis showed that Digits-specific assets were being loaded on the homepage.

These included resources related to:

- Digits login functionality
- `scrollTo`
- `libphonenumber`
- Digits login styles

The Digits login stylesheet was also reported by Lighthouse as largely unused on the homepage.

Before the optimization, Lighthouse reported approximately:

- **Unused CSS:** 142 KiB
- Digits `login.min.css`: approximately 15 KiB unused

Because the homepage does not directly render the Digits login form, these resources were unnecessary for the initial homepage request.

---

## Implementation

A WordPress optimization snippet was added to dequeue selected Digits assets only when the current page is the homepage.

The implementation is intentionally scoped using:

```php
if (!is_front_page()) {
    return;
}
```

This prevents the optimization from affecting pages where Digits is actually required.

### Removed from the homepage

The optimization removes the following Digits-related assets:

- Digits login JavaScript
- `scrollTo`
- `libphonenumber-mobile`
- Digits login stylesheet

The implementation is stored in:

```text
snippets/performance/homepage-digits-assets-optimization.php
```

---

## Verification

The optimization was verified using Chrome DevTools Network filtering.

### Digits login script

Searching for `login` on the homepage returned no Digits login asset.

![Digits login script removed from homepage](01-homepage-digits-login-script-removed.png)

### libphonenumber

Searching for `libphonenumber` on the homepage returned no matching request.

![libphonenumber removed from homepage](02-homepage-libphonenumber-removed.png)

### scrollTo

Searching for `scrollTo` on the homepage returned no matching request.

![scrollTo removed from homepage](03-homepage-scrollto-removed.png)

---

## Lighthouse Result

A Lighthouse test was performed after the optimization.

The recorded performance metrics were:

| Metric | Result |
|---|---:|
| Performance Score | 77 |
| First Contentful Paint (FCP) | 2.6 s |
| Largest Contentful Paint (LCP) | 3.3 s |
| Total Blocking Time (TBT) | 340 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 5.4 s |

![Lighthouse performance after Digits optimization](04-lighthouse-performance-after-digits-optimization.png)

> Lighthouse scores can vary between test runs. The score above is recorded as a test result and should not be interpreted as being caused exclusively by this optimization.

---

## Remaining Performance Issues

The optimization successfully removed the targeted Digits assets, but Lighthouse still identified other performance opportunities.

### Render-blocking resources

Estimated potential saving:

**930 ms**

![Render blocking resources](05-lighthouse-render-blocking-after.png)

### Diagnostics

The remaining diagnostics included:

- JavaScript execution time: approximately **1.8 s**
- Main-thread work: approximately **6.9 s**
- Unused CSS: approximately **127 KiB**
- Unused JavaScript: approximately **98 KiB**
- 20 long main-thread tasks

![Lighthouse diagnostics](06-lighthouse-diagnostics-after.png)

### Unused CSS

After removing the Digits login stylesheet from the homepage, Lighthouse reported approximately:

**127 KiB of unused CSS**

The remaining major sources included:

- Theme stylesheet
- WooCommerce stylesheet
- Font Awesome
- Theme plugin stylesheet

The Digits `login.min.css` file was no longer present in the Lighthouse unused CSS list.

![Unused CSS after Digits optimization](07-lighthouse-unused-css-after.png)

### JavaScript execution

The remaining JavaScript execution cost was primarily associated with:

- jQuery
- Swiper
- Theme JavaScript

![JavaScript execution after Digits optimization](08-lighthouse-javascript-execution-after.png)

---

## Functional Safety Verification

Removing assets from the homepage must not break the actual authentication flow.

The Digits login page was therefore tested separately.

### JavaScript assets preserved on the login page

Required Digits JavaScript files still load on the authentication page, including:

- `scrollTo.js`
- `script.min.js`
- `main.min.js`
- `login.min.js`
- `libphonenumber-max.js`

![Digits JavaScript preserved on login page](09-digits-login-page-js-assets-preserved.png)

### CSS assets preserved on the login page

Required login styles also remain available on the Digits authentication page.

![Digits CSS preserved on login page](10-digits-login-page-css-assets-preserved.png)

### OTP authentication test

The complete mobile authentication flow was tested after the optimization.

The SMS verification code was received and the OTP login completed successfully.

![Digits OTP login successful](11-digits-otp-login-success.png)

---

## Result

The optimization achieved the intended behavior:

- Digits login assets are no longer unnecessarily loaded on the homepage.
- `libphonenumber` is no longer loaded on the homepage.
- `scrollTo` is no longer loaded on the homepage.
- Digits login CSS is no longer loaded on the homepage.
- Digits assets remain available on the authentication page.
- SMS OTP delivery continues to work.
- OTP authentication completes successfully.
- No authentication functionality was removed globally.

This reduces unnecessary homepage resources while preserving the full Digits authentication workflow.

---

## Related File

Implementation:

```text
snippets/performance/homepage-digits-assets-optimization.php
```

---

## Status

**Completed and verified.**
