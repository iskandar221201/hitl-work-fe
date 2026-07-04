# How To Use HITL.Work for FE
### Step-by-step guide: from zero to shipped components

---

## Initial Setup (Do This Once)

### 1. Place all files in one folder

```
my-project/
├── README.md
├── HOW-TO-USE.md
├── HOW-TO-USE-EN.md          ← you are here
├── PROJECT-BRIEF.md
├── DESIGN-TEMPLATE.md
├── PLANNER.md
├── EXECUTOR.md
├── QA.md
├── SKILL-EXTRACTOR.md
└── HITL.md
```

### 2. Choose your AI agent

HITL.Work for FE is designed to run inside any chat-based AI assistant (Claude, GPT-4, Gemini, etc.). One session = one conversation window. Don't switch tabs mid-session.

### 3. Determine your entry mode

| You have... | Entry Mode |
|---|---|
| A DESIGN.md file (from anywhere) | **Mode A** |
| A screenshot or Figma mockup | **Mode B** |
| Neither | Fill in `DESIGN-TEMPLATE.md` first, then Mode A |

---

## Full Session Flow

```
[START SESSION]
      │
      ▼
Fill out PROJECT-BRIEF.md
      │
      ▼
Prompt #1 → Activate Planner
      │
      ▼
Planner parses DESIGN.md
      │
      ▼
[HITL] Approve component plan?
    ├── APPROVE → hand off to Executor
    └── REVISE  → Planner revises and re-presents
      │
      ▼
Executor generates first component
      │
      ▼
[HITL] Approve component?
    ├── APPROVE → log it, move to next component
    ├── REVISE  → Executor revises and re-presents
    └── REJECT  → Executor asks for new direction
      │
      ▼
All Priority 1 components done?
      │
      ▼
[HITL] Trigger QA batch review
      │
      ▼
QA report: PASS / FAIL / Minor
      │
      ▼
[HITL] Approve QA?
    ├── APPROVE → move to Priority 2
    └── Send fix notes back to Executor
      │
      ▼
All priorities complete
      │
      ▼
Trigger Skill Extractor
      │
      ▼
[HITL] Approve STYLE-MEMORY.md?
      │
      ▼
[SESSION COMPLETE]
```

---

## Prompt-by-Prompt: How to Talk to the Agent

### PROMPT #1 — Start Session & Activate Planner

This is the first message you send at the start of every session. Copy the relevant file contents and paste them into this prompt.

```
You will be running HITL.Work for FE — a structured workflow for 
turning a design system into UI components with human approval 
at every stage.

Read the following agent instructions:
---
[paste contents of PLANNER.md here]
---

Read the following project brief:
---
[paste your filled-out PROJECT-BRIEF.md here]
---

Read the following design system:
---
[paste your DESIGN.md here]
---

Begin as the PLANNER. Parse the design system, produce a component 
plan, and wait for my approval before proceeding.
```

> **Tip:** If your AI supports file uploads, upload the files directly.
> If not, paste the contents as plain text.

---

### PROMPT #2 — Responding to the Planner (Component Plan)

After the Planner presents the component plan:

```
APPROVE
```

Or if something needs to change:

```
REVISE: remove Modal from scope, add Toast instead,
start with Button not Badge
```

Or to jump to a specific starting point:

```
APPROVE
START: Button
```

---

### PROMPT #3 — Activate Executor

After the component plan is approved, activate the Executor:

```
Now run as the EXECUTOR.

Read the following instructions:
---
[paste contents of EXECUTOR.md here]
---

Read the following HITL protocol:
---
[paste contents of HITL.md here]
---

Use the token summary and component list from the Planner above.
Generate the first component in the queue and wait for my approval.
```

> **Note:** In some AIs, you can simply say "now run as EXECUTOR" 
> without re-pasting the files, as long as the conversation 
> context is still intact and hasn't been truncated.

---

### PROMPT #4 — Reviewing a Component from the Executor

After the Executor presents a component:

**If it looks good:**
```
APPROVE
```

**If it needs changes:**
```
REVISE:
- use rounded-lg instead of rounded-md for border-radius
- add loading state with a spinner
- disabled text color is too dark, use opacity-50 instead
```

**If the whole approach is wrong:**
```
REJECT
I want this button to use shadcn/ui Button as the base,
not built from scratch. Start from there instead.
```

---

### PROMPT #5 — Trigger QA (After a Priority Group Is Done)

```
All Priority 1 components are done. Now run as QA.

Read the following instructions:
---
[paste contents of QA.md here]
---

Review all Priority 1 components we approved (Button, Badge, 
Input, Avatar). Produce a full QA report and wait for my approval.
```

---

### PROMPT #6 — Responding to the QA Report

**If everything passes:**
```
APPROVE
Move on to Priority 2.
```

**If something failed:**
```
APPROVE
Send the following fix notes to the Executor:
- Button: replace hardcoded loading spinner color with white token
- Badge: warning color must use color-warning token, not hardcoded hex
```

**If you want to override a failed issue:**
```
OVERRIDE: Badge
I accept the 11px font-size even though it's not in the scale. Continue.
```

---

### PROMPT #7 — Trigger Skill Extractor (End of Session)

```
Session complete. Now run as the SKILL EXTRACTOR.

Read the following instructions:
---
[paste contents of SKILL-EXTRACTOR.md here]
---

Extract all patterns, human corrections, and anti-patterns from 
today's session. Write them to STYLE-MEMORY.md and present the 
result for my review.
```

---

## Command Cheat Sheet

You can send any of these commands at any point during a session:

| Command | Effect |
|---|---|
| `APPROVE` | Accept the output, proceed to the next step |
| `REVISE: [notes]` | Request changes with specific instructions |
| `REJECT` | Scrap the output, agent asks for new direction |
| `START: [component name]` | Jump to a specific component |
| `SKIP: [component name]` | Skip this component, move to the next |
| `OVERRIDE: [component name]` | Approve a QA-failed component anyway |
| `STATUS` | Show progress: what's done, what's pending |
| `PAUSE` | Stop the session here, resume later |
| `DISCUSS: [topic]` | Open a discussion before making a decision |
| `EXTRACT SKILLS` | Trigger Skill Extractor immediately (mid-session) |

---

## Important Tips

### On conversation context
AI has no memory between sessions. If you start a new conversation window, you'll need to re-paste the relevant files. That's why:
- One session = one conversation window, all the way through
- If you must switch sessions, send `STATUS` in the old session first, screenshot the result, then paste it into the new session as context

### On long conversations
If the conversation has gotten very long and the AI starts "forgetting" its earlier instructions, refresh it with:
```
Reminder: you are running HITL.Work for FE as the EXECUTOR.
Instructions are in EXECUTOR.md and HITL.md which we read earlier.
Current component: [component name].
Continue.
```

### On repeated revisions
If a component has gone through 3+ revision rounds and still isn't right, try:
```
DISCUSS: Button
I'm not satisfied with the current direction. Here's what I'm going for: 
[description / link / screenshot].
Try a different approach.
```

### On STYLE-MEMORY.md
The more you use HITL.Work for FE, the more valuable this file becomes. In future sessions, always include STYLE-MEMORY.md in Prompt #1 so the Planner and Executor don't repeat mistakes you've already corrected.

Add this to Prompt #1 when STYLE-MEMORY.md exists:
```
Also read the style memory from previous sessions:
---
[paste contents of STYLE-MEMORY.md here]
---
Prioritize rules here when they conflict with DESIGN.md.
```

---

## Example Session (End-to-End)

```
You:   [Prompt #1 — paste Planner + Brief + DESIGN.md]

Agent: [PLANNER] Here is the component plan...
       Priority 1: Button, Badge, Input
       Ambiguity: SF Pro replaced with Inter
       APPROVE / REVISE / REJECT?

You:   APPROVE
       START: Button

Agent: [EXECUTOR] Active. Building: Button...
       [shows Button.jsx]
       APPROVE / REVISE / REJECT?

You:   REVISE:
       - focus ring needs ring-offset-2
       - add xs size for icon-only buttons

Agent: [shows updated Button.jsx]
       Changes: added ring-offset-2, added xs size variant
       APPROVE / REVISE / REJECT?

You:   APPROVE

Agent: [EXECUTOR] Button.jsx saved ✓
       Next: Badge. Proceeding...
       [shows Badge.jsx]
       APPROVE / REVISE / REJECT?

You:   APPROVE

       [... continue until Priority 1 is complete ...]

You:   [Prompt #5 — trigger QA]

Agent: [QA REPORT]
       Button: PASS
       Badge: FAIL — warning color hardcoded
       Input: PASS
       APPROVE / send fix notes?

You:   APPROVE
       Fix notes for Executor:
       - Badge: replace #F59E0B with color-warning token

Agent: [EXECUTOR] Fixing Badge...
       [updated Badge.jsx]
       APPROVE / REVISE / REJECT?

You:   APPROVE

You:   [Prompt #7 — trigger Skill Extractor]

Agent: [SKILL EXTRACTOR]
       Extracted: 3 patterns, 1 correction rule, 1 anti-pattern
       Written to STYLE-MEMORY.md
       APPROVE / EDIT?

You:   APPROVE

Agent: Session complete. STYLE-MEMORY.md finalized.
```

---

## Files to Save After a Session

| File | Save? | Notes |
|---|---|---|
| `STYLE-MEMORY.md` | ✅ Required | Accumulates patterns — gets more valuable each session |
| Components from Executor | ✅ Required | Copy to your actual project folder |
| Filled `PROJECT-BRIEF.md` | ✅ Recommended | Reuse in future sessions for the same project |
| Conversation log | 🔁 Optional | Useful if you need to resume a paused session |
