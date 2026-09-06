# Architecture Decisions

## ADR-001 — Preserve DenaPay product-specific priority

**Decision:** Existing manual product plans retain priority over broader rules.

## ADR-002 — Inspect stored metadata directly

**Decision:** Use a read-only WordPress inspector after Network inspection
proved insufficient.

## ADR-003 — Abandon incomplete global-plan interception

**Decision:** Do not continue patching multiple DenaPay readers. The risk of
product/cart/checkout disagreement and upgrade breakage outweighed the benefit.

## ADR-004 — Generate native product-level metadata

**Decision:** Translate ELVA percentage rules into the fixed product-plan shape
DenaPay already processes.

## ADR-005 — Validate progressively

**Decision:** Inspect → calculate → single controlled write → read back →
storefront verification → category dry run → controlled batch.

## ADR-006 — Recalculate after price updates

**Decision:** Production must synchronize after the actual Mahak/Bazara price
update lifecycle, because stored installment amounts are fixed.

## ADR-007 — Keep the commercial engine private

**Decision:** Publish investigation evidence and bounded experiments only.
Rule-management CRUD, bulk writes, automatic triggers, monitoring flags, and
recovery behavior remain private.

## ADR-008 — Keep third-party source out of the repository

**Decision:** Do not publish DenaPay, Bazara, Digits, or other plugin archives or
complete modified third-party files. Document integration observations without
redistributing their source.

