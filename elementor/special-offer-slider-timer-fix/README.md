# Special Offer Slider Timer Fix

## Problem

In the Elementor **“Special Sale 3”** widget, WooCommerce products with an active sale price but **no sale end date** displayed an **“Sale Schedule Ended”** message along with a clock icon.

For products without a scheduled sale end date, the widget used the following fallback date:

`1970-01-01 00:00:00`

The sale itself was still active and valid; only the countdown timer had no valid end date.

## Solution

The following CSS was added to the **Custom CSS section of the Elementor widget**:

```css
selector .vc_deal_time[data-date^="1970-01-01"] {
    display: none !important;
}

selector .timer_wrap > .pack-theme {
    display: none !important;
}
```

This change:

* Hides the expired schedule message.
* Hides the clock/timer icon.
* Keeps the discount percentage visible.
* Keeps the regular and sale prices unchanged.
* Does not modify the WooCommerce product sale prices.

## Implementation Location

`Elementor → Special Sale 3 Widget → Advanced → Custom CSS`

> The CSS file included in this repository is for documentation and version tracking only. The active CSS is applied through the Elementor widget's Custom CSS settings.

## Before & After

* `before.png` — Widget before applying the fix.
* `after.png` — Widget after applying the fix.

The discount percentage remains visible while the unnecessary timer icon and expired schedule message are removed.
