# How To Use HITL.Work for FE
### Step-by-step guide: dari nol sampai komponen jadi

---

## Persiapan Awal (Lakukan Sekali)

### 1. Siapkan semua file ini di satu folder

```
my-project/
├── README.md
├── HOW-TO-USE.md          ← kamu di sini
├── PROJECT-BRIEF.md
├── DESIGN-TEMPLATE.md
├── PLANNER.md
├── EXECUTOR.md
├── QA.md
├── SKILL-EXTRACTOR.md
└── HITL.md
```

### 2. Pilih AI agent yang akan kamu pakai

HITL.Work for FE dirancang untuk dijalankan di AI assistant berbasis chat (Claude, GPT-4, Gemini, dll). Satu session = satu conversation window. Jangan ganti tab di tengah session.

### 3. Tentukan entry mode kamu

| Kamu punya... | Entry Mode |
|---|---|
| File DESIGN.md (dari mana saja) | **Mode A** |
| Screenshot / mockup Figma | **Mode B** |
| Tidak punya keduanya | Isi `DESIGN-TEMPLATE.md` dulu, lalu Mode A |

---

## Alur Session Lengkap

```
[MULAI SESSION]
      │
      ▼
Isi PROJECT-BRIEF.md
      │
      ▼
Prompt #1 → Aktifkan Planner
      │
      ▼
Planner parsing DESIGN.md
      │
      ▼
[HITL] Approve component plan?
    ├── APPROVE → lanjut ke Executor
    └── REVISE  → Planner revisi, tampil ulang
      │
      ▼
Executor generate komponen pertama
      │
      ▼
[HITL] Approve komponen?
    ├── APPROVE → log, lanjut komponen berikutnya
    ├── REVISE  → Executor revisi, tampil ulang
    └── REJECT  → Executor tanya arah baru
      │
      ▼
Semua Priority 1 selesai?
      │
      ▼
[HITL] Trigger QA batch review
      │
      ▼
QA report: PASS / FAIL / Minor
      │
      ▼
[HITL] Approve QA?
    ├── APPROVE → lanjut Priority 2
    └── Kirim fix notes ke Executor
      │
      ▼
Semua priority selesai
      │
      ▼
Trigger Skill Extractor
      │
      ▼
[HITL] Approve STYLE-MEMORY.md?
      │
      ▼
[SESSION SELESAI]
```

---

## Prompt-by-Prompt: Cara Ngomong ke Agent

### PROMPT #1 — Mulai Session & Aktifkan Planner

Ini prompt pertama yang kamu kirim di awal session. Copy semua konten file yang relevan dan paste ke dalam prompt ini.

```
Kamu akan menjalankan HITL.Work for FE — sebuah workflow untuk 
mengubah design system menjadi komponen UI dengan human approval 
di setiap tahap.

Baca instruksi agent berikut:
---
[paste isi PLANNER.md di sini]
---

Baca project brief berikut:
---
[paste isi PROJECT-BRIEF.md yang sudah kamu isi di sini]
---

Baca design system berikut:
---
[paste isi DESIGN.md kamu di sini]
---

Mulai sebagai PLANNER. Parse design system, buat component plan, 
dan tunggu approval saya sebelum melanjutkan.
```

> **Tips:** Kalau AI-mu support file upload, upload langsung file-nya. 
> Kalau tidak, paste kontennya sebagai teks.

---

### PROMPT #2 — Merespons Planner (Component Plan)

Setelah Planner menampilkan component plan:

```
APPROVE
```

Atau kalau ada yang perlu diubah:

```
REVISE: hapus Modal dari scope, tambahkan Toast, 
mulai dari Button dulu bukan Badge
```

Atau kalau mau mulai dari komponen tertentu:

```
APPROVE
START: Button
```

---

### PROMPT #3 — Aktifkan Executor

Setelah component plan di-approve, aktifkan Executor:

```
Sekarang jalankan sebagai EXECUTOR. 

Baca instruksi berikut:
---
[paste isi EXECUTOR.md di sini]
---

Baca HITL protocol berikut:
---
[paste isi HITL.md di sini]
---

Gunakan token summary dan component list dari Planner tadi.
Generate komponen pertama dalam antrian dan tunggu approval saya.
```

> **Catatan:** Di beberapa AI, kamu bisa langsung bilang 
> "sekarang jalankan sebagai EXECUTOR" tanpa paste ulang file-nya, 
> kalau konteks conversation masih panjang dan belum terpotong.

---

### PROMPT #4 — Review Komponen dari Executor

Setelah Executor menampilkan komponen:

**Kalau oke:**
```
APPROVE
```

**Kalau perlu revisi:**
```
REVISE: 
- border-radius pakai rounded-lg bukan rounded-md
- tambah loading state dengan spinner
- warna disabled text terlalu gelap, pakai opacity-50 saja
```

**Kalau approach-nya salah total:**
```
REJECT
Saya mau button ini pakai shadcn/ui Button sebagai base, 
bukan dari scratch. Coba lagi dari sana.
```

---

### PROMPT #5 — Trigger QA (Setelah Satu Priority Group Selesai)

```
Semua Priority 1 sudah selesai. Sekarang jalankan sebagai QA.

Baca instruksi berikut:
---
[paste isi QA.md di sini]
---

Review semua komponen Priority 1 yang sudah kita approve tadi 
(Button, Badge, Input, Avatar). Buat QA report lengkap dan 
tunggu approval saya.
```

---

### PROMPT #6 — Merespons QA Report

**Kalau semua pass:**
```
APPROVE
Lanjut ke Priority 2.
```

**Kalau ada yang fail:**
```
APPROVE
Kirim fix notes berikut ke Executor:
- Button: ganti loading spinner color ke white token, bukan hardcoded
- Badge: warning color harus pakai token color-warning
```

**Kalau mau skip issue tertentu:**
```
OVERRIDE: Badge
Saya terima font-size 11px walau tidak ada di scale. Lanjut.
```

---

### PROMPT #7 — Trigger Skill Extractor (Akhir Session)

```
Session selesai. Jalankan sebagai SKILL EXTRACTOR.

Baca instruksi berikut:
---
[paste isi SKILL-EXTRACTOR.md di sini]
---

Extract semua pattern, human corrections, dan anti-pattern 
dari session hari ini. Tulis ke STYLE-MEMORY.md dan 
tampilkan hasilnya untuk saya review.
```

---

## Command Cheat Sheet

Kamu bisa kirim command ini kapan saja selama session:

| Command | Efek |
|---|---|
| `APPROVE` | Terima output, lanjut ke step berikutnya |
| `REVISE: [catatan]` | Minta revisi dengan instruksi spesifik |
| `REJECT` | Scrap output, agent tanya arah baru |
| `START: [nama komponen]` | Loncat ke komponen tertentu |
| `SKIP: [nama komponen]` | Lewati komponen ini, lanjut berikutnya |
| `OVERRIDE: [nama komponen]` | Approve komponen yang QA-nya FAIL |
| `STATUS` | Tampilkan progress: apa yang sudah done, apa yang pending |
| `PAUSE` | Stop session di sini, bisa dilanjut nanti |
| `DISCUSS: [topik]` | Buka diskusi sebelum memutuskan |
| `EXTRACT SKILLS` | Trigger Skill Extractor sekarang (tanpa tunggu akhir session) |

---

## Tips Penting

### Soal konteks conversation
AI tidak punya memori antar session. Kalau kamu mulai conversation baru, kamu harus paste ulang file-file yang relevan. Makanya:
- Satu session = satu conversation window, sampai selesai
- Kalau terpaksa ganti session, kirim `STATUS` dulu di session lama, screenshot hasilnya, lalu paste ke session baru sebagai konteks

### Soal panjang conversation
Kalau conversation sudah sangat panjang dan AI mulai "lupa" instruksi awalnya, refresh dengan:
```
Reminder: kamu sedang menjalankan HITL.Work for FE sebagai EXECUTOR.
Instruksi ada di EXECUTOR.md dan HITL.md yang sudah kita baca tadi.
Komponen yang sedang dikerjakan: [nama komponen].
Lanjutkan.
```

### Soal revisi berulang
Kalau satu komponen sudah 3x revisi dan masih belum pas, coba:
```
DISCUSS: Button
Saya tidak puas dengan hasilnya. Ini referensi yang saya mau: [deskripsi / link / screenshot].
Coba approach yang berbeda.
```

### Soal STYLE-MEMORY.md
Semakin sering kamu pakai HITL.Work for FE, semakin berguna file ini. Di session berikutnya, selalu sertakan STYLE-MEMORY.md di Prompt #1 supaya Planner dan Executor tidak mengulang kesalahan yang sama.

Tambahkan ini ke Prompt #1 kalau sudah ada STYLE-MEMORY.md:
```
Baca juga style memory dari session sebelumnya:
---
[paste isi STYLE-MEMORY.md di sini]
---
Prioritaskan aturan di sini ketika ada konflik dengan DESIGN.md.
```

---

## Contoh Session Singkat (End-to-End)

```
Kamu: [Prompt #1 — paste Planner + Brief + DESIGN.md]

Agent: [PLANNER] Berikut component plan...
       Priority 1: Button, Badge, Input
       Ambiguity: SF Pro diganti Inter
       APPROVE / REVISE / REJECT?

Kamu: APPROVE
      START: Button

Agent: [EXECUTOR] Aktif. Building: Button...
       [menampilkan Button.jsx]
       APPROVE / REVISE / REJECT?

Kamu: REVISE:
      - focus ring pakai ring-offset-2
      - tambah size xs untuk icon button

Agent: [menampilkan Button.jsx yang diupdate]
       Changes: ditambah ring-offset-2, ditambah size xs
       APPROVE / REVISE / REJECT?

Kamu: APPROVE

Agent: [EXECUTOR] Button.jsx saved ✓
       Next: Badge. Proceeding...
       [menampilkan Badge.jsx]
       APPROVE / REVISE / REJECT?

Kamu: APPROVE

      [... lanjut sampai Priority 1 selesai ...]

Kamu: [Prompt #5 — trigger QA]

Agent: [QA REPORT]
       Button: PASS
       Badge: FAIL — warning color hardcoded
       Input: PASS
       APPROVE / kirim fix notes?

Kamu: APPROVE
      Fix notes untuk Executor:
      - Badge: ganti #F59E0B ke color-warning token

Agent: [EXECUTOR] Fixing Badge...
       [Badge.jsx updated]
       APPROVE / REVISE / REJECT?

Kamu: APPROVE

Kamu: [Prompt #7 — trigger Skill Extractor]

Agent: [SKILL EXTRACTOR] 
       Extracted: 3 patterns, 1 correction rule, 1 anti-pattern
       Written to STYLE-MEMORY.md
       APPROVE / EDIT?

Kamu: APPROVE

Agent: Session complete. STYLE-MEMORY.md finalized.
```

---

## File yang Perlu Disimpan Setelah Session

| File | Simpan? | Keterangan |
|---|---|---|
| `STYLE-MEMORY.md` | ✅ Wajib | Akumulasi pattern, makin berharga tiap session |
| Komponen hasil Executor | ✅ Wajib | Copy ke project folder kamu |
| `PROJECT-BRIEF.md` yang sudah diisi | ✅ Disarankan | Reuse di session berikutnya |
| Conversation log | 🔁 Opsional | Berguna kalau mau resume session |
