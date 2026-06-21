# FEATURE REQUESTS

## 2026-05-08 21:05 UTC - execution-plan-delivery

**Context:** Wave execution task loaded from `docs/context/execution-plan-web-extension-wave2.md`

**Signal:** Execution plans are written as markdown docs and stored in `docs/context/`. The agent reads them and follows steps sequentially. This works well.

**Request:** When `/goal` tasks reference an execution plan, the plan should be loaded before proceeding. Keep plan format consistent: Phase headers, file-level change descriptions, verification steps.

**Promoted:** none — workflow pattern, not a feature request.