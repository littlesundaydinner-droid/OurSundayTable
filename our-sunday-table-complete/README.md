# Our Sunday Table — Files

Three folders. Only two of them get uploaded.

---

## site/ — upload these to your repo root

Nine pages, each self-contained (images embedded, no folders needed).

| File | URL it becomes |
|---|---|
| `index.html` | homepage |
| `recipes.html` | /recipes.html |
| `moms-maltina-double-chocolate-cake.html` | the Maltina post |
| `baking-101.html` | the school |
| `why-your-cakes-sink.html` | lesson 01 |
| `sunrise-box.html` | the Sunday Sunrise Box |
| `shop.html` | Olúmọ̀ Indigo + Mápò Clay |
| `food-fund.html` | the Food Fund |
| `our-story.html` | your story |

**Filenames matter.** The nav in every page — and in every post the publisher generates — points at exactly these names. Rename them and the links break.

### The old files

Your repo still has `ost-our-recipes-v2.html`, `ost-shop.html`, `ost-food-fund.html`, `ost-our-story.html`, `ost-global-lab-v2.html` and the seven recipe pages. Options:

- **Leave them.** Nothing links to them any more, but old shared links keep working.
- **Delete them** once you're happy the new pages are live.

Either way, don't delete `index.html` before uploading the new one — replace it in place.

---

## publisher/ — replaces one file in your repo

**`pubish.html`** — your publisher, with `buildPage()` swapped so it generates the new design. Everything else is byte-identical to what you had: drafts, GitHub sync, autosave, settings, keyboard shortcuts.

Upload it over the existing `pubish.html`. Your GitHub token is stored in your browser, not in the file, so it survives the swap.

**`sample-post-preview.html`** — a real Maltina post rendered through the new builder. Open it to see what a published post looks like. Not for upload.

---

## reference/ — don't upload, just keep

- **`OST_Publishing_Structure_v1.md`** — the post structure, field-by-field, and the ordering rules
- **`OST_Publisher_Production_Guide.md`** — the longer-term plan if you ever move from static pages to a build step
- **`buildPage-replacement.js`** — just the function, if you'd rather patch by hand than replace the file
- **`diacritic-test.html`** — the Yorùbá àmì ohùn rendering check

---

# Order to do it in

1. Upload the nine files in **site/**
2. Check the homepage, then click through every nav link
3. Upload **publisher/pubish.html**
4. Open `oursundaytable.co/pubish.html`, make a throwaway draft, publish it, confirm it appears and looks right, then delete it
5. Then publish Maltina for real

---

# Still to fill in

Things I wrote as placeholders. All are content, not code.

**Sunrise Box** — "7 of 20 seats left" is invented. Set the real number.

**Baking 101** — twelve lessons, the titles, "4–7 min each", and the video players are all placeholder. Videos are visual only until real embeds go in.

**Shop** — ship date for the pre-orders, and whether payment is taken now or on despatch. Also confirm: fifty sets *per collection*, or fifty total? I've written fifty of each.

**The bundle** — $360 for both collections is my invention. Keep or cut.

**Food Fund** — the ledger is deliberately empty. Fill it after the first distribution; an empty honest ledger is worth more than an invented one.

**5am vs 4am** — I've used 5am everywhere, matching your live site. Your earlier copy said 4am. Worth a search-and-replace if it's wrong.

---

# One thing worth doing soon

Every page here has its design baked into it. That's fine now, and it's what made this redesign painful — nine files each carrying their own copy of the CSS.

`reference/OST_Publisher_Production_Guide.md` describes the alternative: posts as data, one shared template, the site built on publish. Not urgent. But when you next want to change the design, that's the difference between editing one file and editing two hundred.
