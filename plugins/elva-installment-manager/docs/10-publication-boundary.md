# Publication Boundary

## Included

- English and Persian project overview
- Architectural decisions
- Failed and successful path documentation
- Selected screenshots with clear evidence limits
- Archived MehranPay prototypes
- Read-only metadata inspector
- Calculation-only dry runs

## Excluded

- Installable production plugin
- Rule Manager and WordPress admin menu source
- Create/edit/delete production code
- Saved-rules Runner
- Bulk DenaPay metadata writer
- Automatic price synchronization
- Bazara/Mahak hook and listener source
- Listener flags, status storage, logs, recovery, and scheduling
- Production credentials and configuration
- Customer/order personal information
- Third-party plugin archives and complete third-party source

## Security note

The experimental scripts are historical engineering artifacts. They are not
supported endpoints and should not be deployed to a production site. Any
visible administration URLs, old nonces, or account labels in screenshots are
incidental historical evidence and confer no access.

## Commercial scope

The private product consists of the reusable rule model, administration UX,
product matching, synchronized writes, price-source integration, observability,
and safe operational controls. This repository intentionally stops before that
implementation boundary.

