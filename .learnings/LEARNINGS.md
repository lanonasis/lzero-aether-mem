# LEARNINGS

## 2026-05-08 21:05 UTC - wave-execution-pattern

**Context:** Executing Wave 2 of web extension build from a pre-written execution plan

**Signal:** When executing a planned wave/phase of work:
1. Read the execution plan first
2. Verify clean state before starting (git status, current version)
3. Make all code changes first, then build+verify in a separate step
4. Phase 2 (store assets / non-code) requires external inputs — separate from code execution
5. Commit only after all phases complete and verified

**Pattern:** Phase-ordered execution (Code → Verify → Non-code inputs → Package → Commit)

**Promoted:** skill — "wave-execution" for phased execution of pre-planned work