# ELVAKALA Performance Experiments

This directory contains performance optimization experiments that were tested on the ELVAKALA website but were **not retained in production**.

These files are preserved for documentation purposes so that previously tested approaches, their results, and the reasons for rollback are not lost.

> ⚠️ **Status: REJECTED / ROLLED BACK**
>
> The PHP files in this directory should **NOT be enabled on production** without further testing.

---

## 1. Remove jQuery Migrate

### File
`remove-jquery-migrate.php`

### Goal
Remove `jquery-migrate` from the frontend in order to reduce JavaScript loading and render-blocking resources.

### Result
The website functionality appeared to remain operational during basic testing, but Lighthouse performance became less stable and Total Blocking Time increased significantly.

One recorded test produced approximately:

- Performance: **63**
- FCP: **2.7 s**
- LCP: **3.3 s**
- TBT: **870 ms**
- Speed Index: **5.9 s**
- CLS: **0.032**

### Decision
**Rejected and rolled back.**

The potential reduction in JavaScript was not worth the performance regression and compatibility risk.

### Evidence
`remove-jquery-migrate.png`

---

## 2. Homepage WooCommerce CSS Optimization

### File
`homepage-woocommerce-css-optimization.php`

### Goal
Remove the large theme WooCommerce stylesheet from the homepage and replace it with only the CSS rules detected as used by Chrome/Edge Coverage.

The original stylesheet was approximately **225 KB**, with Coverage reporting approximately **99.8% unused CSS** during the homepage test.

### Result

The experiment did not work as intended.

The original `woocommerce.min.css` file continued to load despite the dequeue attempt, meaning the optimization did not actually remove the large stylesheet.

In addition, the replacement CSS caused visible styling differences in homepage product sections, particularly in typography/font weight.

A Lighthouse test during this experiment produced approximately:

- Performance: **68**
- FCP: **2.9 s**
- LCP: **3.5 s**
- TBT: **350 ms**
- Speed Index: **12.6 s**
- CLS: **0**

The experiment therefore added complexity without eliminating the original stylesheet and introduced a visual regression.

### Decision
**Rejected and rolled back.**

The original WooCommerce/theme CSS loading behavior was restored.

### Evidence

- `homepage-woocommerce-css-optimization.png` — Lighthouse result
- `homepage-woocommerce-css-optimization-2.png` — Coverage showing the original WooCommerce stylesheet still loaded
- `homepage-woocommerce-css-optimization-3.png` — visual comparison showing styling differences

---

## Baseline / Previous Best Result

Before these rejected experiments, repeated Lighthouse tests produced results in approximately the **72–77 Performance** range.

The best recorded result during this optimization phase was:

- Performance: **77**
- FCP: **2.8 s**
- LCP: **3.4 s**
- TBT: **300 ms**
- CLS: **0.023**

Because Lighthouse results naturally vary between runs, individual scores should not be treated as absolute measurements. Changes were evaluated using repeated tests, metric behavior, frontend stability, and visual inspection.

---

## Conclusion

Both experiments in this directory were intentionally abandoned.

They are retained in Git only as a technical record of approaches that have already been investigated.

**Do not re-enable these snippets on production without a new controlled test and a clear reason for revisiting the approach.**
