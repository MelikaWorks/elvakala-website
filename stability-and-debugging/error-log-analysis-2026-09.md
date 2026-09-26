# PHP Error Log Analysis — September 2026

## Scope

The production PHP error log had grown to approximately 189 MB. Rather than publishing or treating the complete historical file as current state, it was archived and replaced with a fresh-log baseline.

Raw logs are excluded because they may contain server paths, plugin internals, request details, and other operational information.

## Confirmed Findings

### MWEB Store API fatal

```text
Call to a member function get_type() on null
```

Source behavior: an encoded theme callback attempted to use a missing global WooCommerce product during Store API requests.

Resolution: remove the incompatible callback only during REST initialization. Storefront behavior remains unchanged.

Result: Store API, product page, Add to Cart, and cart page passed.

### Bazara optional request warning

Cause: direct access to a missing `active_auto_sync` request key.

Resolution: existence check, unslashing, sanitization, boolean conversion, and a safe default.

Result: synchronization completed without a new warning.

### Bazara empty attribute warning

Cause: use of an empty key returned by `array_key_first()`.

Resolution: validate the key and array value before object inspection.

Result: synchronization completed without a new warning.

### Bazara price and discount guards

Cause: trailing semicolons made two `if` conditions ineffective.

Resolution: guarded reads with `isset()` and explicit non-empty checks.

Result: real accounting-system price changes synchronized correctly.

## Observed but Not Reproduced

These entries were present historically but did not return after the fresh-log reset:

- Missing SMS logger table.
- Missing WooCommerce survey queue table.
- Digits warnings.
- A one-time `ABSPATH` failure.

No database tables or plugin internals were changed without a reproduced current failure.

## Transient Cron Event

A `could_not_set` event for `action_scheduler_run_queue` appeared while draft products were being deleted. It did not return after the bulk operation ended and a new baseline was created.

Classification: transient concurrency/write collision; monitor if repeated.

## Validation Workflow

1. Archive the historical log.
2. Generate a clean baseline.
3. Open the homepage and a product page.
4. Call the WooCommerce Store API.
5. Add a product to the cart.
6. Open and verify the cart.
7. Run a real Bazara synchronization after an accounting-system price change.
8. Check whether a fresh error log is created.

## Final Result

- Repeated MWEB fatal: resolved.
- Bazara warning 253: resolved.
- Bazara warning 1366: resolved.
- Price and discount guards: resolved.
- Store API: pass.
- Add to Cart: pass.
- Real synchronization: pass.
- Fresh error log after final synchronization: not created.

Status: `STABLE / VALIDATED — 2026-09-26`

