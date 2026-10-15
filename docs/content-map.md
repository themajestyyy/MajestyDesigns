# MajestyDesigns — Content Map

Every word and every image slot on the site, what each one is for, and the rules
that keep the page from breaking when you change them.

**How to use this file.** Edit the copy in place, then hand the whole file back
with a note like *"apply the changes"*. Anything you leave alone stays as it is.
Slots are addressed as `chapter › slot`, e.g. `05 Asabcore › headline`.

---

## 0 · The rules everything obeys

These are load-bearing. Breaking one changes the site's argument, not just its wording.

| Rule | Why it exists |
|---|---|
| **One person, no team.** Never "we", "our studio", "the team". | The whole positioning is a solo practice. "We" from a one-person studio reads as inflation, and the copy calls this out explicitly in two places. |
| **Only one award: Loksanskriti 2025.** | It is the only real one. Chapter 10 is built so a single award reads as deliberate rather than thin. |
| **Real tools only:** After Effects, Photoshop, Illustrator, Figma, Adobe suite, Blender (learner). | Chapter 09 says "still learning it, and saying so" — the honesty is the point. |
| **No phone numbers, no street address.** | Deliberate privacy choice. Email and social only. |
| **LSM imagery stays in chapter 06.** | LSM is an Asabcore product line; its screens are meaningless anywhere else. |
| **Portrait images go in portrait slots, landscape in landscape.** | Every plate is measured and given a box matching its true aspect ratio. Putting a 16:9 image in a 9:16 slot forces a crop and wrecks the row. See §3. |
| **Faces of players are struck out.** | The 4AM roster plates in chapter 13 have faces redacted on purpose — the copy says "the layout is the work". |

**Voice.** Short declaratives. Concrete nouns. A craft claim, then the constraint
that proves it ("the counter stays open at favicon size — that was the test it had
to pass"). No adjectives doing work a fact could do. No "passionate", "innovative",
"pixel-perfect".

---

## 1 · The shape of the page

One continuous scroll. Sixteen chapters, each in a different visual language,
pinned full-screen while you scroll through it. The order is an argument:

| # | id | Chapter | Visual language | What it has to do |
|---|---|---|---|---|
| 00 | `s-hero` | MajestyDesigns | Kinetic depth | Say who, in three seconds, over moving work |
| 01 | `s-swiss` | Statement | Swiss / International | The thesis, and the solo-practice disclosure |
| 02 | `s-bento` | Selected Work | Shokado bento | Breadth — ten pieces at once, none cropped |
| 03 | `s-glass` | Capabilities | Glass morphism | What a client actually receives |
| 04 | `s-cmyk` | Process | CMYK press sheet | How the work gets made, in four steps |
| 05 | `s-brut` | Asabcore | Brutalist | The main engagement, stated as a record |
| 06 | `s-y2k` | LSM | Y2K / cybercore | The product line — the most technical work |
| 07 | `s-press` | Fields | Editorial duotone | The through-line across unrelated industries |
| 08 | `s-riso` | Archive | Risograph | The rejected routes — proof the choice was a choice |
| 09 | `s-neu` | Studio Stack | Neumorphism | Tools, and the handover promise |
| 10 | `s-deco` | Recognition | Art deco | One award, framed so it reads as enough |
| 11 | `s-study` | Logo Study | Draughting case sheet | Depth — two marks taken fully apart |
| 12 | `s-wall` | Marks | Gallery wall | Eighteen marks, same square, comparable |
| 13 | `s-cast` | Broadcast | Sixteen-nine | Work judged at thumbnail size |
| 14 | `s-motion` | Motion | Edit suite | Three reels |
| 15 | `s-contact` | Contact | 70s retro | The ask |

---

## 2 · Chapter by chapter

### 00 · Hero — `s-hero`
Ten pieces of real work drift in 3D depth behind the wordmark and float gently when idle.

| Slot | Current text | Notes |
|---|---|---|
| `tag-left` | MajestyDesigns ® | Top-left corner mark |
| `tag-centre` | Portfolio — Vol. 04 | Edition line. Bump the volume if you rebuild |
| `tag-right` | 2022 → 2026 | Practice span. Update the end year each January |
| `wordmark-1` | MAJESTY | Solid ivory with a red offset ghost |
| `wordmark-2` | DESIGNS | Outline only. Two lines is the lockup — a longer name breaks it |
| `lead` | Identity, posters and launch design for e-sports orgs, creators and the shops they build. Sixteen chapters, sixteen visual languages, one hand. | **The single most important sentence on the site.** Two clauses: who you serve, then the format promise. Keep under ~30 words — it animates word by word |
| `foot-1` | Role / Creative Director — Asabcore | |
| `foot-2` | Practice / Identity · E-sports · Creator brands | Three categories max; they must fit one line |
| `foot-3` | Index / 16 chapters / 78 plates | **Update the plate count if you add or remove work** |
| `foot-4` | Scroll | Scroll cue |

**Images (10, any ratio):** `majesty-nothing-but`, `genesis-comeback`, `lm-mark`,
`saathi-board`, `black-day`, `higgs-spotlight`, `bgis-showdown`, `cotake-chrome`,
`smokah-box`, `nakhatra-menu`. The first four load eagerly — put your strongest there.

---

### 01 · Statement — `s-swiss`
Twelve-column Swiss grid, your portrait, one blue accent.

| Slot | Current text | Notes |
|---|---|---|
| `chapter` | 01 · Statement · Swiss / International | |
| `headline` | Direction is a *system*, not a *mood*. Four years spent building the <u>rules</u> that let a brand keep its nerve at every size. | Italic on *system* / *mood*, underline on <u>rules</u> — the emphasis carries the argument |
| `body` | I run creative at Asabcore. Everything here is mine, start to finish — no team, no studio behind me. Universities, agencies, medical and training platforms, e-sports orgs, YouTube channels, e-commerce shops and individual creators: crests, logo suites, product UI, poster runs, thumbnails, merch. Sixteen chapters, each set in the visual language the project was actually born in, because one dialect can only take one kind of brief. | The solo disclosure and the client-type list. **This is where "no team" is stated outright** |
| `portrait-caption` | Plate 11 — MajestyDesigns, Kolkata / 2026 | |
| `meta` | Based · Kolkata, IN · GMT+5:30 — Experience · 4 years — 2022 to 2026 — Current · Creative Director, asabcore.com — Sub-brand · LSM, asabcore.com/lsm | Four rows, fixed shape. Update the experience span yearly |

**Images:** your portrait (`assets/portrait-lg.webp`, 4:3, face upper third) plus a
strip of three landscape plates: `m4-roster-banner`, `russian-trap`, `neapolitan-wars`.

---

### 02 · Selected Work — `s-bento`
Black lacquer bento tray on washi paper, with the tray's construction geometry drawn over it.
Compartments are solved at load: each plate gets a box cut to its true ratio, so **nothing is cropped**.

| Slot | Current text | Notes |
|---|---|---|
| `chapter` | 02 · Selected work · Shokado bento | |
| `seal` | 匠 Twenty-six clients · one designer · 2022–2026 | 匠 = *takumi*, artisan. **Update the client count** |
| `note-label` | Lead engagement | |
| `note-title` | A modular identity that survives 12 px favicons and 12 metre banners. | The range claim. Keep both extremes concrete |
| `note-body` | Marks, grid, motion signature, and a governance doc thin enough that people read it. | Hidden automatically when the tile is short |
| `chop-label` | Where the work lands | |
| `chop-title` | E-sports 26% · Creators 24% · Product 20% · E-commerce 16% · Print 14% | Must total 100 |

**Plate captions** — `name — piece` on the left, plate number right:
`Mysterious Four — roster · 21`, `Bolai — logo board · 23`, `Saathi — lockup · 24`,
`Genesis Esports — Comeback · 14`, `Literary Milestones · 20`, `The Smokah — carton · 19`,
`LMX Laser — qualified · 17`, `Prizepool board · 16`, `Broken But Never Beaten · 15`.
Keep captions under ~28 characters — longer ones ellipsis on small compartments.

---

### 03 · Capabilities — `s-glass`
Four frosted cards on an indigo mesh. Answers "what do I actually get?"

| Slot | Current text |
|---|---|
| `headline` | What a director actually *hands over* |
| `note` | Four deliverables. No slide decks about slide decks. |
| `card 01` | **01 — Identity** · Marks & crests · Logo suites, e-sports crests and the lockup rules that keep them sharp on a jersey and a favicon. |
| `card 02` | **02 — Surface** · Store & channel · Storefronts, channel art, thumbnails and overlays — built as templates the client can run themselves. |
| `card 03` | **03 — Print** · Posters & merch · Match-day posters, drop campaigns and apparel, prepped to real ink limits and real print budgets. |
| `card 04` | **04 — Direction** · Art direction · Campaign direction for launches and tournaments — briefing, shoot or render, through final grade. |

Four cards is the layout. Card bodies must stay within ~110 characters or they overflow on tablet.
Each card carries one landscape image: `chained-together-live`, `m4-roster-banner`,
`boxing-voucher`, `bgmi-majesty-live`.

---

### 04 · Process — `s-cmyk`
A press sheet. The artwork prints four times, once per process ink (drawn in code, not photographed).

| Slot | Current text |
|---|---|
| `headline` | Register, then print. |
| `separation caption` | Plate 25 — four separations, 3 mm misregistration |
| `C · Interrogate` | Audit, interviews, a look at every competitor in the bracket. The brief you arrive with is rarely the brief you leave with. |
| `M · Direct` | Three routes, each pushed far enough to be genuinely different. No safe middle option padding the deck. |
| `Y · Systemise` | The chosen route becomes files the client can actually run — templates, tokens, export presets, rules. |
| `K · Register` | Press checks, build reviews, QA on real devices. Everything lines up or it goes back on the plate. |

Exactly four steps — they are keyed to C, M, Y, K. Adding a fifth breaks the metaphor and the layout.
Side figures: `literary-milestones-alt`, `srgi-plantation`, `nakhatra-menu`.

---

### 05 · Asabcore — `s-brut`
Brutalist: 3px black rules, red alarm ticker, a spec table, and a wall of plates
solved to fill the column with nothing cropped.

| Slot | Current text | Notes |
|---|---|---|
| `ticker-top` | ASABCORE.COM ■ CREATIVE DIRECTION SINCE 2024 ■ IDENTITY / PRODUCT / MOTION | Loops; keep each fragment short |
| `ticker-bottom` | NO TEMPLATES ● NO PLACEHOLDER THINKING ● SHIP IT | The manifesto line |
| `kicker` | 05 / Lead engagement — asabcore.com | |
| `headline` | ASAB**CORE** | Second half in red. Two syllables is the lockup |
| `body` | Joined as senior designer in 2024. Creative Director the following year. Rebuilt the identity from the type up, then built the product surface for LSM on top of it — one system, one repo, one source of truth, drawn by one person. | The promotion narrative |
| `table` | Role · Creative Director — Tenure · 2024 → Present — Studio · One — no team — Surfaces · Web / Product / Print / OOH — Systems · 1 core, 1 product line — Release · v4.2 — shipped | Six rows. Values are right-aligned; keep them short |
| `note` | > Deliverables: identity manual (84pp), design tokens, component library, product UI kit, motion spec, and one very opinionated <u>do-not-do</u> page. | Terminal-style; the `>` is deliberate |
| `ink slabs` | ASABCORE / V4.2 / ONE HAND / SHIPPED · 05 / ASAB. / SYSTEM | Short labels on the hatched black fillers. Under 10 characters each |

---

### 06 · LSM — `s-y2k`
Y2K cybercore: chrome type, a perspective floor, an orbiting wireframe. The most technical chapter.

| Slot | Current text |
|---|---|
| `headline` | LSM |
| `window title` | LSM_LAUNCH.EXE |
| `body` | Asabcore's training platform: a 3D simulation where the trainee actually does the procedure, and a telemetry layer that scores hesitation, wrong moves and sequence compliance behind them. I designed the product surface end to end — the argument page, the rig scenes, the trainee metrics dashboard and the admin panel — in a language that boots rather than opens. |
| `holo tags` | Launched Q1 2026 · Product UI + Site + Motion |
| `frames` | Rig — training scene · The case · Performance dashboard · Telemetry |

**Only the four `lsm-*` images belong here**, and they belong nowhere else.

---

### 07 · Fields — `s-press`
Editorial duotone. A pull quote and four commemorative posters.

| Slot | Current text |
|---|---|
| `pullquote` | "A crest, a storefront, a thumbnail set and a poster run are the same problem in four coats: make it *recognisable at a glance*, then make it survive being used by someone who isn't me." |
| `attribution` | MajestyDesigns — Working note — 2026 |
| `plates` | Black Day — tribute (40) · 26/11 — Mumbai (41) · Maha Shivratri (42) · Women's Day (43) |
| `field list` | 01 E-sports crests · 02 Training platforms · 03 University campaigns · 04 Thumbnail systems · 05 Agency overflow · 06 Medical & care brands · 07 Packaging · 08 Poster runs · 09 Logo suites · 10 Merch drops |

Ten fields, two to four words each. The four plates are all 9:16 portraits — replacements must be too.

---

### 08 · Archive — `s-riso`
Risograph. Plates print under the cursor as you move it across the sheet.

| Slot | Current text |
|---|---|
| `headline` | SKETCHBOOK |
| `standfirst` | Unused routes, dead ends and the plates that got better after they failed. |
| `cue (desktop)` | Move the cursor — the archive prints under it, one plate per pass |
| `cue (touch)` | Drag across the sheet — the archive prints under your finger |
| `Stock` | French Speckletone, 118 gsm. Two passes, hand-fed, drum drift left in on purpose. |
| `Why keep it` | The archive is the argument. It shows the routes that were considered and rejected, which is the only proof that the chosen one was a decision. |
| `Edition` | Printed twice a year, 60 copies, sent to clients and to whoever asks nicely. |

**"Why keep it" is the best paragraph on the site** — it turns an archive into a claim about judgement.

---

### 09 · Studio Stack — `s-neu`
Soft-extruded tiles. Six tools, honestly rated.

| Slot | Current text |
|---|---|
| `headline` | Soft tools, **hard opinions.** |
| `lede` | Six tools, one hand on all of them. The stack is boring on purpose — what matters is the handover: a client should be able to run the brand for a year without emailing me. |
| `dial` | 4 YRS |
| `Ae` | After Effects — Stingers, overlays and brand motion — the reels in chapter 14 were cut here. |
| `Ps` | Photoshop — Thumbnails, key art and every composite that has to survive a feed. |
| `Ai` | Illustrator — Crests and logo suites, drawn on grid and kerned by hand. |
| `Fg` | Figma — Product UI and design tokens. Source of truth for anything that ships as a screen. |
| `Ad` | Adobe suite — InDesign, Lightroom, Premiere — whatever the deliverable actually needs. |
| `Bl` | Blender — 3D marks and product renders. Still learning it, and saying so. |

Six tiles fill the grid. **Do not add a tool you do not use** — the Blender line is what makes the rest credible.

---

### 10 · Recognition — `s-deco`
Art deco. One award in an arch, three factual ledger columns beneath so the chapter carries weight without inventing anything.

| Slot | Current text |
|---|---|
| `headline` | Recognition — *One · and what it was for* |
| `award` | **2025 · Loksanskriti** · BAMMC Cultural Seminar Competition · Reel Competition Category |
| `ledger 1` | Since 2025 · Creative Director · Asabcore |
| `ledger 2` | Q1 2026 · LSM — product line shipped · Identity, UI and motion |
| `ledger 3` | 2022 — 2026 · Eighteen marks in use · Twenty-six clients |
| `signature` | MajestyDesigns |

The subtitle *"One · and what it was for"* is what makes a single award read as
confidence rather than a gap. **Never add an award that did not happen.**

---

### 11 · Logo Study — `s-study`
Draughting case sheet. Two marks, four tests each.

Structure per mark: name, category · year, the mark large, a **Holds at** row
(96/56/32/18 px), an **Ink** row of four hex swatches, an **In use** pair, then four numbered notes.

**Saathi** — Care platform · 2025 — inks `#246C9C` `#0CB4E4` `#243C54` `#0C0C0C`
1. The cross does two jobs in one shape — a clinical cross, and a figure leaning in to help. Nothing is illustrated; the second reading is cut into the counter.
2. Stroke weights sit on a six-unit grid, so the mark keeps the same colour at 16 px that it has at a metre. The counter stays open at favicon size — that was the test it had to pass.
3. Two blues and black. The gradient runs one way only, so the mark still works flat when a printer refuses gradients.
4. The lockup is fixed: wordmark on the mark's cap-height, one mark-width of air, no vertical variant. Fewer options is why it still looks right a year on.

**Lost Magicians** — E-sports crest · 2025 — inks `#9C3C9C` `#54246C` `#0C0C24` `#E4E4E4`
1. Silhouette first. The hat was drawn solid black at 24 px and only earned detail once the shape alone was already recognisable.
2. The LM ligature is cut out of the hat's own shadow, so monogram and icon are one object rather than a letter parked in front of an icon.
3. One purple at two values plus paper. A third colour and the edges vanish in jersey embroidery, which is where this crest actually lives.
4. The sparkles are the only decoration, and they sit on the composition's diagonal so they can be deleted without breaking the mark.

Each note follows the same shape: **decision → the constraint that forced it**. Keep that
when rewriting. Exactly two marks and four notes each — the grid is built for it.

---

### 12 · Marks — `s-wall`
A gallery hang. Eighteen chips on a plaster wall; one large frame holds the selected mark.
It rotates on its own and stops when you click or hover a chip.

| Slot | Current text |
|---|---|
| `headline` | Eighteen marks, *one hand* |
| `body` | Restaurants, hostels, software, weddings, tobacco, care platforms, e-sports. Different rooms, one discipline. Every mark is cut to the same square, on the same paper, at the same size — so what you are comparing is the drawing and nothing else. |
| `footer` | Eighteen marks · 2022 — 2026 · all in use — Click a mark to hold it · ↑↓ steps chapters · M for sound |

**The eighteen** (number · name · category):
01 SSE × UTIL, Crossover crest · 02 Lost Magicians, E-sports crest · 03 God Rage, E-sports crest ·
04 Eden, Wordmark · 05 Cotake, Blackletter · 06 UTIL, Type mark · 07 Mysterious Four, Bolt ·
08 Shivaay Hostel, Emblem · 09 The Smokah, Emblem · 10 Bolai, Restaurant · 11 Renata, Swan ·
12 Shaddi Easy, Monogram · 13 Shaddi Easy, Lockup · 14 SeniorCare+, Care platform ·
15 Wellness, Symbol · 16 BodhIT, Wordmark · 17 ASAB., Software · 18 SeniorCare+, System board

Categories are one to two words. **If you change the count, update the headline, the footer,
chapter 10's ledger, and chapter 00's index.**

---

### 13 · Broadcast — `s-cast`
Eight 16:9 covers, then the 4AM roster set.

| Slot | Current text |
|---|---|
| `headline` | Work that lives in a *16:9 box* |
| `body` | Thumbnails, covers and match-day art get judged at the size of a fingernail, in a feed, next to nine others shouting the same thing. One idea per frame, one subject, and type heavy enough to survive being 210 pixels wide. |
| `covers` | Chained Together / Live cover · Chained Together / Episode art · The Neapolitan Wars / History series · Grinding for BGIS / Match day · Battlegrounds Mobile India / Live · Scrims / Highlights · 19 Points / Chicken dinner · Sauna Ve / Music cut |
| `roster lead` | **Roster reveal — 4AM Esports** · One template, five names, no redrawing. The name is set condensed and stretched edge to edge whatever its length, role in red script above it, crest locked top-left. Faces struck out here — the layout is the work. |
| `roster` | Jayant / Owner · Wyteee / Fragger · Volcano / Entry · Slayer / IGL · Vishu / Assaulter |

Eight covers fill the grid exactly. All must be 16:9.

---

### 14 · Motion — `s-motion`
Edit-suite frames with timecode. Muted, autoplay when in view.

| Slot | Current text |
|---|---|
| `headline` | The mark, moving. |
| `body` | Three cuts. A logo sting built so the mark resolves on the beat rather than after it, a launch film for asabcore.com, and a product post cut square for feed. Muted by design — none of these were made to be heard. |
| `Reel 01` | 00:00:17:12 · Majesty — logo sting · 3D / smoke / ember |
| `Reel 02` | 00:00:12:00 · ASAB — launch film · Site reveal |
| `Reel 03` | 00:00:15:20 · ASAB — client panel · 1:1 feed cut |
| `scrub` | TC 00:00:00:00 · Cut & graded in-house |

Timecodes must match the real durations. A new reel needs both `.mp4` and `.webm`, plus a `poster-*.webp`.

---

### 15 · Contact — `s-contact`
70s retro. Rings rise and blend as you scroll. The ask.

| Slot | Current text | Notes |
|---|---|---|
| `headline` | LET'S MAKE SOMETHING LOUD | Three lines. A longer word breaks the stack on tablet |
| `badge` | Open for select briefs — Q4 2026 | **Update the quarter, or delete the badge when closed** |
| `mark note` | The mark, extruded. Four years of it on jerseys, thumbnails, cartons and shopfronts. | |
| `Email` | majestyyydesigns@gmail.com · Replies in 24h | The 24h promise is a commitment — soften if you can't keep it |
| `Studio` | asabcore.com · Creative Director | |
| `Sub-brand` | asabcore.com/lsm · Performance line | |
| `Social` | Coming soon · Handles to follow | Placeholder until the accounts exist |
| `Based` | Kolkata, India — GMT+5:30 · Working worldwide | City only, by choice |
| `colophon` | MajestyDesigns — est. 2022 / Sixteen chapters · seventy-eight plates · three reels · one page · © 2026 / Set in Archivo Black, Bodoni Moda, Instrument Serif, Space Grotesk & Space Mono | Update the year and counts |

---

## 3 · Swapping an image

Images are referenced by **slug**, never by filename. `data-img="genesis-comeback"`
loads `assets/genesis-comeback-sm.webp` and `-lg.webp` (and `-xs.webp` for small slots).

To replace one:

1. Export at the **same aspect ratio as the slot** — this is the rule that keeps
   rows from breaking. The page measures every image and cuts its box to match, so a
   9:16 poster dropped into a 16:9 slot forces the layout to crop it.
2. Save three widths: `-xs` 430px, `-sm` 760px, `-lg` 1500px, all WebP.
3. Keep the slug, or tell me the new one and where it goes.

Ratio families in use: **16:9** (1.78) covers and banners · **2:1 to 2.6:1** logo
boards and lockups · **1:1** cartons and logo chips · **4:5** (0.8) and **2:3**
(0.667) posters · **9:16** (0.562) story posters · **3:4** the portrait.

Chapter 12's chips are square specimen tiles on shared paper — a new mark needs the
same treatment (trimmed, re-centred at ~75% on `#f4f1ea`) or it won't sit with the others.

---

## 4 · Site-wide strings

| Where | Text |
|---|---|
| Browser tab | MajestyDesigns |
| HUD, bottom left | The current chapter name |
| HUD, bottom right | Sound off / Sound on · the current visual-language label |
| Keyboard | ↑↓ steps chapters · Home / End · M toggles sound |

Each chapter's HUD label comes from its `data-name` and `data-style` — they are the
same strings as the chapter headers in §2, so change both together.

---

## 5 · When you send edits back

Useful:
> `07 Fields › pullquote` — replace with: "…"
> `12 Marks` — add mark 19: Name, Category
> `15 Contact › badge` — change to Q1 2027

Also fine: edit this file in place and send the whole thing back. Flag anything that
changes a **count** (plates, marks, clients, chapters) — those numbers appear in four
places and have to move together.
