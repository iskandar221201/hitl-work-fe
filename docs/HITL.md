# HITL
### Human-in-the-Loop Checkpoint Protocol

---

## Purpose

This file defines the checkpoint protocol used by all agents in HITL.Work for FE. Every agent references this file when pausing for human input.

The core principle: **no agent proceeds without an explicit human decision.**

---

## The Three Responses

Every HITL checkpoint accepts exactly one of these responses:

### `APPROVE`
The work is accepted as-is. The agent logs approval and proceeds to the next step.

### `REVISE: [notes]`
The work needs changes. The human provides notes. The agent applies all changes and presents the updated work for another review round. Does not count as approval — the checkpoint stays open until `APPROVE` or `REJECT`.

### `REJECT`
The work is scrapped entirely. The agent asks for direction before attempting again. Use this when the approach is wrong, not just the details.

---

## Additional Commands (Context-Specific)

These are available at specific checkpoints:

| Command | When | Effect |
|---------|------|--------|
| `START: [component]` | Planner checkpoint | Jump to a specific component instead of the proposed order |
| `SKIP: [component]` | Any component checkpoint | Skip this component, move to next |
| `OVERRIDE: [component]` | QA checkpoint | Approve a failed component anyway (human accepts risk) |
| `PAUSE` | Any checkpoint | Stop the session here, resume later |
| `EXTRACT SKILLS` | Any point | Trigger Skill Extractor immediately |
| `DISCUSS: [topic]` | Any checkpoint | Open a conversation about a specific issue before deciding |
| `STATUS` | Any point | Show current progress: what's done, what's next |

---

## Checkpoint Format

Every agent uses this format when presenting work for review:

```
[AGENT NAME — HITL CHECKPOINT: Description]

[Work presented here]

[Summary of what was done / decisions made]

Reply APPROVE / REVISE: [notes] / REJECT
```

---

## Checkpoint Log

Agents maintain an implicit log of checkpoints in the session. When the user calls `STATUS`, the log is surfaced:

```
[SESSION STATUS]

Completed (approved):
  ✓ Component Plan (Planner)
  ✓ Button.jsx (Executor)
  ✓ Badge.jsx (Executor)

In progress:
  → Input.jsx (Executor — awaiting your review)

Pending:
  ○ Avatar.jsx
  ○ Card.jsx
  ○ Form Group.jsx
  ○ QA — Priority 1 batch

Blockers:
  None
```

---

## Revision Rounds

There is no hard limit on revision rounds. The human may revise as many times as needed.

However, if a component reaches **3+ revision rounds**, the Skill Extractor is automatically notified. The pattern of revisions is logged as a correction rule — so future components don't repeat the same mistakes.

---

## What Agents Cannot Do Without HITL Approval

- Proceed to the next component
- Move from one priority group to the next
- Skip a QA-flagged FAIL issue
- Begin Mode B (visual-to-spec) processing
- Finalize the STYLE-MEMORY.md

---

## What Agents Can Do Without HITL

- Parse and normalize input (Planner, internally)
- Translate tokens to stack format (Executor, before first component)
- Run QA checks (QA, before presenting report)
- Extract patterns (Skill Extractor, before presenting for approval)

In other words: agents may do all their internal work. They only stop at the moment of presenting output to the human.

---

## Session Resume

If a session is paused or interrupted, the next session begins with a `STATUS` call to surface what was completed and what remains. Agents do not restart from scratch — they pick up from the last approved checkpoint.

---

## Philosophy

HITL checkpoints exist because the human's aesthetic judgment is the part of this process that cannot be automated. The pipeline handles the mechanical, the repetitive, the spec-faithful. The human handles the subjective — whether something feels right, whether the proportions work, whether the code matches the real intent behind the design.

Every `APPROVE` is a real decision. Every `REVISE` is expertise being transferred into the system. Every `REJECT` is a course correction that saves hours of downstream work.

The loop is not a bottleneck. It is the feature.
