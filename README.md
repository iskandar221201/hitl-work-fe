# HITL.Work for FE
### Human-in-the-Loop Frontend Design Pipeline

A structured, agent-assisted workflow for turning a design system spec into production-ready UI components — with human approval at every stage.

---

## Why This Exists

AI is good at logic. AI is weak at frontend. It generates UI that *works* but feels generic, inconsistent, and disconnected from the actual design intent. HITL.Work for FE closes that gap by keeping a human in control of every decision that matters — while letting AI handle the repetitive scaffolding.

---

## Two Entry Modes

### Mode A — Spec First (you have a DESIGN.md)
```
DESIGN.md → Planner → HITL → Executor → HITL → QA → HITL → Done
```
You already have a design system document (shared, downloaded, or self-written). Drop it in and start the pipeline.

### Mode B — Visual First (you have a screenshot or mockup)
```
Screenshot/Mockup → AI derives DESIGN.md → HITL (you approve spec) → Mode A pipeline
```
You have a visual reference but no written spec. AI generates the DESIGN.md first, you review and correct it, then the normal pipeline begins.

---

## File Structure

```
hitl-fe/
├── README.md             ← You are here
├── PROJECT-BRIEF.md      ← Fill this before starting any session
├── DESIGN-TEMPLATE.md    ← Reference / starter DESIGN.md
├── PLANNER.md            ← Agent 1: parse, normalize, plan
├── EXECUTOR.md           ← Agent 2: generate code per component
├── QA.md                 ← Agent 3: consistency, a11y, naming
├── SKILL-EXTRACTOR.md    ← Agent 4: capture reusable patterns
└── HITL.md               ← Checkpoint protocol (used across all agents)
```

---

## How a Session Works

1. **Fill `PROJECT-BRIEF.md`** — stack, output format, scope
2. **Provide input** — paste your DESIGN.md (Mode A) or upload a screenshot (Mode B)
3. **Planner runs** → produces component list + priority order → **you approve**
4. **Executor runs** → generates code per component → **you review each one**
5. **QA runs** → checks consistency + accessibility → **you approve final**
6. **Skill Extractor runs** → logs reusable patterns for future sessions

---

## HITL Checkpoints

Every agent stops and waits for your input before proceeding. You have three responses:

- `APPROVE` — looks good, continue
- `REVISE: [your notes]` — make changes, show me again
- `REJECT` — scrap this, start differently

No agent proceeds without an explicit approval.

---

## Design Philosophy

- **Component-first** — one component at a time, not the whole page
- **Stack-agnostic** — you declare the stack in PROJECT-BRIEF.md, agents adapt
- **Spec-faithful** — every output is traceable back to a line in DESIGN.md
- **Human owns aesthetics** — AI proposes, human decides

---

## Compatibility

Works with any DESIGN.md format. The Planner normalizes whatever format you provide — Tailwind config exports, Figma token JSON, manual markdown docs, community-shared templates. You don't need to reformat your file.
