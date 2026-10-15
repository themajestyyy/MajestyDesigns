# MajestyDesigns — portfolio site

A single-page, scroll-driven portfolio. Sixteen chapters, each in a different
visual language. Plain HTML, CSS and JavaScript — no framework, no npm, nothing
to install.

## Just want it online?

`dist/` **is** the website. Upload that folder to any static host and you're done.
Step-by-step for three free ones (and which to pick): **`docs/deploy.md`**

## Just want to look at it?

Open `dist/index.html` in a browser. Works offline — only the web fonts need a
connection, and it falls back to close system fonts without them.

Or run `tools/serve.sh` and open http://localhost:8080 (closer to how a host serves it).

## What's in here

| Path | What it is |
|---|---|
| `dist/index.html` | The built page — everything inlined except the images |
| `dist/assets/` | 244 files: images, three reels, two audio beds |
| `src/` | The source the page is built from — **edit here** |
| `build.sh` | Rebuilds `dist/index.html` from `src/`. Needs bash + python3 |
| `docs/content-map.md` | Every word on the site, where it sits, and why |
| `docs/architecture.md` | How the code works |
| `docs/deploy.md` | Putting it online, free |
| `tools/serve.sh` | Local preview server |

## Changing something

1. Edit the file in `src/` (see the table below).
2. Run `./build.sh`.
3. Refresh the browser.

`dist/index.html` is **generated** — editing it directly works until the next
build, then your change is gone.

| To change… | Edit |
|---|---|
| Any wording | `src/30-body-a.html` (chapters 00–04) or `src/31-body-b.html` (05–15). `docs/content-map.md` tells you which slot is which and what it's for |
| Colours, type, spacing | `src/20-styles.css` — organised chapter by chapter with numbered banner comments |
| Behaviour, animation | `src/40-app.js` |
| An image | Drop the new files in `dist/assets/`, then add or update its entry in `src/manifest.json` |

## Replacing an image

Images are referenced by **slug**, not filename. `data-img="genesis-comeback"`
loads `assets/genesis-comeback-sm.webp` and `-lg.webp`.

Export three widths as WebP — `-xs` 430px, `-sm` 760px, `-lg` 1500px — keep the
slug, and record the real pixel width and height in `src/manifest.json`:

```json
"genesis-comeback": { "w": 800, "h": 1200, "lg": 1, "sm": 1, "xs": 1 }
```

Those numbers matter. The layout reads them and cuts each compartment to match
the image's own shape, which is why nothing on the site is ever cropped to fit.
Get them wrong and the row it sits in will be wrong too.

Keep a replacement close to the original's proportions — a portrait in a
portrait slot, a banner in a banner slot.

## Two things that will bite you

**Keep `index.html` and `assets/` together.** The page loads its images from a
sibling `assets/` folder. Move one without the other and you get a blank page.

**The build adds a doctype on purpose.** Without it browsers fall into quirks
mode, where tables inherit colour differently — that bug once made a whole spec
table render white-on-white. `build.sh` wraps the page in the same skeleton the
host uses, so your local preview matches the live site exactly.

---

MajestyDesigns — est. 2022 · hello@majestydesigns.com
