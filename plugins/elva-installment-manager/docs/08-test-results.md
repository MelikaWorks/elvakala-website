# Test Results

| Area | Test | Result |
| --- | --- | --- |
| Network inspection | Search DenaPay requests/assets | Inconclusive for stored structure |
| Metadata inspection | Read manually saved product plan | Passed |
| Formula | 20% prepayment, five checks | Passed |
| Single product | Write generated DenaPay metadata | Passed in controlled test |
| Storefront | Render generated product plan | Passed for the recorded single-product test |
| Category discovery | Find `stove-parnian` products | Passed; 13 products |
| Category calculation | Report values without writes | Passed |
| MehranPay UI | Add scope/category fields | Passed |
| MehranPay execution | Hide unrelated plans | Failed; all plans remained visible |
| Rule Manager | Create/list/edit/delete | Passed |
| Saved-rules Runner | First rule load | Initially failed with `No rules found` |
| Controlled batch | Apply stored rule to 13 products | Runner reported `SYNCED ✓` |
| Final 30/4/4 storefront | Revisit product after batch | Not performed |
| Generic price listener | Detect test price update | Not validated |
| Bazara listener | Install/status check | Active, waiting for real execution |
| Digits dependency | Load `libphonenumber` locally | Passed in Console check |
| Checkout flow | Proceed to payment stage | Passed in recorded test |

## Interpretation

Screenshots record the observed environment at the time of testing. They are
not a guarantee of compatibility with future DenaPay, WooCommerce, WordPress,
Digits, Bazara, or theme releases.

