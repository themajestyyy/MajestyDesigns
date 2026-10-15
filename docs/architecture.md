# MajestyDesigns Architecture

## How the Build Works

The site is built from source files in `src/` and published to `dist/index.html`. Running `./build.sh` concatenates the source files in order:

1. `10-head.html` — all `<meta>` tags, `<title>`, and Google Fonts links
2. `20-styles.css` — wrapped in `<style>` tags
3. `30-body-a.html` — markup for chapters 00–04
4. `31-body-b.html` — markup for chapters 05–15
5. `40-app.js` — wrapped in `<script>` tags

After concatenation, a Python step performs string substitution on four tokens:

- `__LOGO_PATH__` — replaced with the SVG path data from `src/logo.txt`
- `__PORTRAIT__` — replaced with the portrait image path from `src/portrait.txt`
- `__AR_TABLE__` — replaced with a JSON map of image slug to aspect ratio, built from `src/manifest.json`
- `__XS_TABLE__` — replaced with a list of which image slugs have an `-xs` size variant

The built file is then wrapped in a standard HTML5 doctype and head skeleton that matches the hosting platform's wrapper. This matters: without the doctype, the browser runs in quirks mode and CSS inheritance for properties like colour behaves differently, causing local previews to render differently from the live page.

The result is a single-file, self-contained webpage with no external dependencies other than Google Fonts.

## The Desktop Scroll Engine

The core interaction is a scroll-driven animation engine. Each chapter is a `.stage` section given a tall height in viewport units (stored in its `data-h` attribute). Inside each stage sits a `.pin` element with `position:sticky` and `height:100vh`, which pins the chapter content to the viewport while the user scrolls past it.

A single `requestAnimationFrame` loop runs continuously, computing a progress value `p` for each chapter based on the scroll position:

```javascript
// Conceptual: actual code is more complex
const p = (scrollPosition - stageStart) / stageHeight;
```

This progress value drives three derived states:

- `e` (entering) — 0 to 1 as the chapter comes into view
- `x` (exiting) — 0 to 1 as the chapter leaves the viewport
- `hold` — clamped to [0, 1] when the chapter is fully pinned

These states drive four visual systems on the `.pin` content:

- A 3D transform on the `.depth` layer, creating parallax and entrance/exit motion
- A `.veil` cross-dissolve that carries the previous chapter's background colour, so the seam never reads as a sharp cut
- A parallax offset on the `.fx` background layer
- Text reveals (see next section)

## Text Reveals

Individual elements inside the stages are marked with a `data-anim="..."` attribute that specifies which animation mode to apply. Eight animation modes are dispatched from an `ANIM` object in `40-app.js`:

- `words` — reveals text word by word
- `rise` — elements slide up into place
- `line` — lines of text appear in sequence
- `mask` — text is revealed through a moving mask
- `wipe` — a horizontal wipe reveals text
- `track` — text moves horizontally
- `flip` — text rotates in 3D
- `blur` — text de-blurs from blurred to sharp

Word-based modes (`words`, `mask`) first split their text into individual word spans so each can be animated separately.

Each animation mode is a small function that takes an animation record and a drive value from 0 to 1, and returns the CSS transforms or opacity needed for that frame.

On desktop, the drive value comes from the chapter's progress (0 to 1 as you scroll down, then reversed 1 to 0 as you scroll back out). On mobile, the drive comes from the element's own position in the viewport and only ever plays forward.

## The Ratio Engine

Every image in the portfolio must fit within layout boxes without being cropped. The ratio engine solves this by:

1. At build time, publishing each image's true pixel aspect ratio into the `AR` table
2. At load time, reading `AR` and setting a `--ar` CSS custom property on each image plate and its ratio host
3. In layout code, using a shared `split()` function to partition images into rows

The `split()` function uses dynamic programming to partition a run of plates into rows, minimizing the total height of all rows while respecting minimum and maximum plates per row. Each chapter that uses images then scores the candidate row counts differently:

- **Chapter 02** (bento tray) maximizes tray coverage — prefer more, smaller plates per row
- **Chapter 05** (plate wall) maximizes (plate area × height used) — prefer fewer, larger plates per row

Once a row count is chosen, the function returns the explicit pixel bounding boxes for each plate, sized to match its own aspect ratio. The result: no image is ever cropped or stretched to fit a grid.

Chapter 02 also draws the tray's construction geometry as an SVG, with rectangles measured from the real cell bounding boxes computed by `split()`.

## The Phone Model (≤1000px)

On screens 1000px wide or narrower, the layout switches to a document flow model:

- `.stage` height becomes `auto`
- `.pin` becomes `position:relative` with `min-height:100svh`
- Chapters flow naturally as a document, stacking vertically

All content remains visible on mobile—an earlier version hid content at small screen sizes, but that was removed deliberately. The site exists to show the work; nothing is hidden.

Two chapters present interactive experiences differently on mobile:

- **Chapter 00** (depth tunnel) becomes a horizontally scrollable strip of all ten plates in a single row
- **Chapter 08** (cursor-driven archive) becomes a two-column printed spread of all seventeen entries, scrollable

Under `prefers-reduced-motion`, all animations are disabled and stay visible, and the three video reels get native HTML5 play controls instead of autoplaying.

## Performance Notes

The site loads quickly through several techniques:

- **Content visibility**: each `.stage` has `content-visibility:auto` with `contain-intrinsic-size`, so the browser skips rendering offscreen chapters
- **Lazy loading**: all images use native `loading="lazy"` with `fetchpriority="high"` on the four eager hero plates in chapter 01
- **Responsive images**: three width variants per image (–xs 430w, –sm 760w, –lg 1500w) chosen by a `realPlate()` helper based on layout width
- **Video**: `<video>` elements have `preload="none"` and are played/paused by an IntersectionObserver, so they only load when they come into view
- **Audio**: audio bed files are only fetched when the visitor enables sound

First paint is approximately 0.56 MB. A visitor who reads the entire page loads roughly 2.9 MB total; adding all three video reels brings the total to about 7 MB.

## Where to Change What

| What | Where |
|------|-------|
| Visible text on the page | `src/30-body-a.html`, `src/31-body-b.html` (see also `docs/content-map.md` for context) |
| Colours and typography | `src/20-styles.css` (organized chapter by chapter with numbered banner comments 00–15) |
| Animation behaviour and scroll logic | `src/40-app.js` |
| Adding or replacing an image | `dist/assets/` (add/replace the image files) and `src/manifest.json` (add the asset metadata: width, height, ratio, which sizes exist) |
| Page title and metadata | `src/10-head.html` |
| Logo or portrait | `src/logo.txt` or `src/portrait.txt`, then rebuild |
