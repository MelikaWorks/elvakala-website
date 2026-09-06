# MehranPay Archived Prototype

This directory preserves the first, abandoned architecture for category-scoped
DenaPay global plans.

The prototype successfully extended the settings interface, but did not achieve
reliable end-to-end filtering across every DenaPay plan-consumption path. It is
not a complete plugin and must not be installed in production.

Files:

- `original-plugin-bootstrap.php`: original MehranPay plugin bootstrap retained
  as historical evidence; its required component classes are not packaged as an
  installable plugin here
- `plan-scope-admin-fields.php`: admin-only plan scope/category fields
- `category-plan-matcher.php`: isolated category matching helper
- `product-meta-interception-prototype.php`: experimental metadata interception

The bootstrap is incomplete by design and must not be activated. No DenaPay
core files or installable MehranPay archive are included.
