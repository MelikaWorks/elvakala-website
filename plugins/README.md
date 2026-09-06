# ELVA KALA Plugins and Plugin Projects

This directory contains WordPress plugins, plugin prototypes, and plugin-oriented engineering projects developed specifically for ELVA KALA.

It is intentionally separate from `Plugin-Customizations/`:

- `plugins/` contains solutions developed by ELVA KALA.
- `Plugin-Customizations/` contains extensions built around third-party plugins.

## Included Project

### `elva-installment-manager/`

Engineering documentation and safe research artifacts for addressing limitations in DenaPay-based installment sales for ELVA KALA.

The project records:

- Business requirements for category-based installment rules
- The unsuccessful MehranPay filtering approach
- The successful product-metadata architecture
- Controlled synchronization testing
- Checkout validation and customer communication
- Price-change and Bazara/Mahak integration investigation
- Architecture decisions and publication boundaries

The public project directory is not the complete commercial plugin. Production rule management, bulk synchronization, automatic metadata writing, external-system listeners, and the installable commercial package are intentionally private.

## Project Requirements

Every plugin project should include:

- A clear English `README.md`
- A Persian README when useful for internal handover
- Current status: production, prototype, research, archived, or private
- Dependencies and compatibility notes
- Installation instructions only when an installable package is actually included
- A clear boundary between published and private code
- Screenshots and evidence organized by feature

## Security and Publication

Never commit credentials, API secrets, private keys, customer data, database exports, production backups, or commercial source that is not approved for publication.

