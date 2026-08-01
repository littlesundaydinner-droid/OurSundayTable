# Our Sunday Table — Publishing Structure v1.0

Two things defined here:

**Part A** — the Recipe Post structure (the fields every Sunday post fills in)
**Part B** — the feed ordering rules (newest first, everywhere)

Built to match the new design. If a post fills these fields, it renders correctly with no layout work.

---

# PART A — THE RECIPE POST

## A note on how this is organised

Every recipe post is **11 blocks in a fixed order**. Six are required, five are optional. The order never changes — that's what makes the design work without per-post fiddling.

If a block is empty, it doesn't render. Nothing breaks.

---

## Block 1 — Hero *(required)*

The dark navy opening panel.

| Field | Type | Required | Notes |
|---|---|---|---|
| `hero_image` | Image | Yes | Wide crop, sits behind/above the title. Min 2000px wide. |
| `region_line` | Short text | Yes | e.g. `Nigeria · West Africa · April 2026` — use ` · ` as separator |
| `title_script` | Short text | No | The italic line above the main title, e.g. `Mom's Maltina` |
| `title_main` | Short text | Yes | The big serif line, e.g. `Double Chocolate Cake` |
| `serves` | Short text | Yes | e.g. `10–12` |
| `active_time` | Short text | Yes | e.g. `45 min` |
| `bake_time` | Short text | Yes | e.g. `26 min` |
| `edition_line` | Short text | No | e.g. `May 2026 Sunday Edition` |

**Guidance:** `title_main` reads best under 34 characters. If the dish name is long, split it — put the possessive or descriptor in `title_script`.

---

## Block 2 — Metadata Card *(required)*

The dark card that overlaps the bottom of the hero.

| Field | Type | Required | Notes |
|---|---|---|---|
| `tradition` | Text | Yes | The format being reimagined, e.g. `America`, `Scotland`, `Ireland` |
| `heritage` | Text | Yes | Where the soul of it comes from, e.g. `Nigeria · West Africa` |
| `category` | Select | Yes | Baking / Bread / Cookies / Cakes / Pastry / Confection |
| `pillars` | Multi-select | Yes | Any of: Joy, Heritage, Science. At least one. |
| `level` | Select | Yes | Beginner / Intermediate / Confident / Advanced |

**Why pillars are multi-select:** the Maltina cake is all three. The card prints them joined by ` · `. The feed card shows only the **first** one listed — so order them by dominance.

---

## Block 3 — The Story *(required)*

Personal, first-person. The Joy pillar doing its work.

| Field | Type | Required | Notes |
|---|---|---|---|
| `story_opening` | Short text | Yes | One line, set larger. e.g. `She asked for chocolate.` |
| `story_body` | Rich text | Yes | 2–5 paragraphs |
| `story_image` | Image | No | Sits after the story, full column width |

**Guidance:** `story_opening` should be a single sentence, ideally under 8 words. It's the hook and it's typeset as such.

---

## Block 4 — Heritage Essay *(optional)*

The section with the gold `— HERITAGE` tag.

| Field | Type | Required | Notes |
|---|---|---|---|
| `heritage_title` | Short text | — | e.g. `Maltina Is Not an Ingredient.` |
| `heritage_subtitle` | Short text | — | The italic second line, e.g. `It Is a Memory.` |
| `heritage_standfirst` | Short text | — | Gold italic line under the title |
| `heritage_body` | Rich text | — | 3–6 paragraphs. Bold the opening sentence. |

**Skip this block** when a recipe has no heritage story to tell. Don't invent one.

---

## Block 5 — Pull Quote *(optional)*

The full-width dark band.

| Field | Type | Required | Notes |
|---|---|---|---|
| `pullquote` | Short text | — | Under 30 words. Renders italic, centred. |
| `pullquote_emphasis` | Short text | — | A phrase within the quote to set in gold |

---

## Block 6 — The Chemistry *(optional but encouraged)*

The cream panel. This is the Science pillar and it's your differentiator — most food blogs can't write it.

| Field | Type | Required | Notes |
|---|---|---|---|
| `chemistry_body` | Rich text | — | 2–5 paragraphs |
| `chemistry_terms` | Tag list | — | Compound names to set in gold italic, e.g. `pyrazines, furans, melanoidins` |

**How the terms work:** list them here and they're highlighted automatically wherever they appear in the body. Don't hand-format inside the text.

---

## Block 7 — Recipe Card Header *(required)*

The white card. This is the part people print and cook from.

| Field | Type | Required | Notes |
|---|---|---|---|
| `recipe_title` | Short text | Yes | Full name, e.g. `Mom's Maltina Double Chocolate Cake` |
| `recipe_edition` | Short text | No | Gold italic, e.g. `Nigerian Heritage Edition` |
| `serves` | — | — | *pulled from Block 1* |
| `active_time` | — | — | *pulled from Block 1* |
| `bake_range` | Short text | Yes | e.g. `22–26 min` — the precise range, vs the round number in the hero |
| `temperature` | Short text | Yes | e.g. `350°F` |

---

## Block 8 — Ingredients *(required)*

Grouped, repeatable.

**Structure:** a repeating **Group**, each containing repeating **Items**.

```
Group
  group_name        e.g. "The Maltina Sponge"
  items[]
    item_name       e.g. "Unsalted butter, room temperature"
    item_amount     e.g. "170g (¾ cup)"
    item_note       optional, e.g. "NOT sweetened condensed"
```

**Rules that keep it consistent:**
- Metric first, cups in parentheses — `240g (2 cups)`
- Use `–` (en dash) for ranges, not a hyphen
- Put warnings in `item_name` in caps where it matters: `Evaporated milk — NOT sweetened condensed`
- Every item renders with a checkbox automatically. Don't add your own.

**Optional:** `ingredients_image` — the flat-lay of everything laid out. Sits after the last group.

---

## Block 9 — Method *(required)*

Repeatable steps.

```
Step
  step_title        e.g. "Make the Fudge — Friday Night"
  step_body         the instruction paragraph
  step_tip          optional — renders gold italic beneath
```

**Rules:**
- Numbering is automatic (01, 02, 03…). Never type numbers into the title.
- `step_title` should say *what* and *when* — the "— Friday Night" suffix is doing real work for make-ahead recipes. Keep that pattern.
- `step_tip` is for the thing that goes wrong. One per step maximum. This is the highest-value field in the whole post — it's where your expertise shows.

---

## Block 10 — Closer *(optional)*

The centred italic paragraph that ends the post.

| Field | Type | Required | Notes |
|---|---|---|---|
| `closer` | Rich text | — | 1–3 sentences. Returns to the story. |

---

## Block 11 — Cross-sell *(automatic)*

**Don't fill this in.** It renders automatically at the foot of every recipe, pointing at the Sunday Sunrise Box. Managed globally so you can change the offer once instead of on 200 posts.

---

## Fields the feed needs

These aren't visible on the post page but the index and homepage cards need them:

| Field | Type | Required | Notes |
|---|---|---|---|
| `publish_date` | Date | Yes | Drives ordering. See Part B. |
| `card_image` | Image | Yes | **Portrait crop, 3:3.5.** Not the hero — the hero is wide, the card is tall. |
| `card_title` | Short text | Yes | Can be shorter than the post title. Under 42 characters. |
| `card_meta` | Short text | Yes | e.g. `Jul 26 · Nigeria · West Africa` |
| `slug` | Text | Yes | e.g. `moms-maltina-double-chocolate-cake` |
| `status` | Select | Yes | Draft / Scheduled / Published |

**The card_image is the one people forget.** If it's missing, the feed falls back to cropping the hero, which cuts your composition badly. Shoot or crop a portrait version every time.

---

# PART B — FEED ORDERING

## The rule

**Newest first, everywhere, no exceptions.**

Sort by `publish_date` descending. No featured flag, no manual pinning, no curation step. This is deliberate — it's what makes the site maintenance-free. You publish; the site reorders itself.

## Where it applies

| Surface | Shows | Order |
|---|---|---|
| Homepage feed | 6 most recent | `publish_date` DESC |
| Recipes index | All, paginated 9 or 12 per page | `publish_date` DESC |
| Filtered views (pillar, region, category) | All matching | `publish_date` DESC |
| Baking 101 | **Lesson number ASC** | ← the exception |

**Baking 101 is the one exception.** It's a curriculum, not a feed. Lesson 01 always comes first regardless of when it was published. Sort by `lesson_number` ascending.

## The "This Sunday" flag

The most recent published post can carry a small flag on its card. Two options:

- **Automatic** (recommended) — whatever is newest gets it, no action needed
- **Manual** — a checkbox per post

Automatic is better. Manual means one more thing to remember every week, and a stale "This Sunday" flag on a three-week-old post is worse than no flag.

## Scheduling

Set `publish_date` to the Sunday it should appear and let it publish on schedule. Because ordering is purely date-driven, a scheduled post slots into the right position automatically when it goes live.

**One caution:** if you backdate a post to fill a gap, it will bury itself down the feed rather than appear at the top. That's usually the correct behaviour — just know it's what will happen.

---

# THE FIRST POST IN

**Mom's Maltina Double Chocolate Cake** is the test case — and note the title needs settling first: the live index calls it *Mama Maltina Chocolate Cake*, the post calls it *Mom's Maltina Double Chocolate Cake*. Pick one before it goes in. It's the right one to go first because it exercises every block — it has a story, a heritage essay, a pull quote, real chemistry, grouped ingredients, and make-ahead steps with tips.

If it renders correctly, the structure is proven.

## Checklist

- [ ] Hero image uploaded (wide crop)
- [ ] Card image uploaded (**portrait 3:3.5** — separate file)
- [ ] Region line: `Nigeria · West Africa · April 2026`
- [ ] Title split: script `Mom's Maltina` / main `Double Chocolate Cake`
- [ ] Serves `10–12`, active `45 min`, bake `26 min`
- [ ] Metadata: region, category Baking, pillars Heritage · Science · Joy, level Intermediate
- [ ] Story opening + body + image
- [ ] Heritage essay (title, subtitle, standfirst, body)
- [ ] Pull quote with gold emphasis phrase
- [ ] Chemistry body + terms list
- [ ] Recipe card: bake range `22–26 min`, temp `350°F`
- [ ] Ingredients: 2 groups (The Maltina Sponge / The Whipped Fudge)
- [ ] Method: 7 steps, tips on steps 01, 03, 04, 05, 07
- [ ] Closer
- [ ] Publish date set to the Sunday
- [ ] Slug set

---

---

# WHAT'S THERE NOW (audited from the live site)

Seven recipes are published. Each one is a **hand-built individual page**, not an entry in a post type. The slugs show it:

| Live slug | Problem |
|---|---|
| `/maltina_blog_embedded` | working filename, underscores, "embedded" |
| `/ost_nsibidishortbread_blogpost_final` | "final" in a public URL |
| `/ost-carrot-cake-blog-2` | version number |
| `/lagos-lace-blog-2` | version number |
| `/coconut-mango-triangle-bars` | ✅ clean |
| `/ost-agege-zobo-hot-cross-bun` | ✅ clean |
| `/ost-guinness-cake` | ✅ clean |
| `/ost-our-recipes-v2` | index page, versioned |
| `/ost-global-lab-v2` | index page, versioned |

**This is the actual thing to fix.** Not the layout — the fact that there's no repeatable post type, so every Sunday is a rebuild and every index is hand-maintained.

## The hand-maintenance is already drifting

The homepage "From the Sunday Table" currently shows:

- The Guinness Celebration Cake — **Mar 17**
- Carrot Cake with Mango Curd — **Mar 22**
- Mama Maltina Chocolate Cake — **May 3**

Your three newest are Maltina (May 3), Nsibidi Shortbread (Apr 19), and Coconut Mango Bars (Apr 12). **Nsibidi and Coconut Mango are missing from the homepage entirely.** The recipes index is ordered correctly; the homepage isn't, because it's a second list maintained separately.

That's the ordering problem in one screenshot. Fixing it isn't a design change — it's making both surfaces read from the same source, sorted by date.

## Other inconsistencies found

| Issue | Where | Fix |
|---|---|---|
| **4am vs 5am** | Homepage + footers say `4am` and `4:00 AM`. Shop and Our Story say `5am` and `THE 5 AM RITUAL`. | Pick one, set it as a global variable, use it everywhere |
| **Title mismatch** | Index says `Mama Maltina Chocolate Cake`. Post says `Mom's Maltina Double Chocolate Cake`. | One canonical `title`, one optional shorter `card_title` |
| **Region doing two jobs** | Nsibidi Shortbread → `Scotland`. Maltina → `America`. But both heritage stories are Nigerian. | Split into two fields — see below |

## Region needs to become two fields

Right now one `region` field is being asked to mean two different things, and it reads oddly: a cookie about Igbo script is filed under Scotland.

What you actually mean is *"a Scottish format, a Nigerian heart."* So:

| Field | Example (Nsibidi Shortbread) | Example (Maltina Cake) |
|---|---|---|
| `tradition` | Scotland | America |
| `heritage` | West Africa · Igbo | Nigeria · West Africa |

The recipe page already carries this idea — "America · West African Twist" is that sentence written by hand. Make it two fields and the filter stops being confusing: people can browse by *Scotland* **or** by *West Africa* and find the same cookie for different reasons. That's a genuinely better archive, and it's the Global Lab's whole premise.

## Slug rules going forward

- Lowercase, hyphens only, no underscores
- No `-v2`, `-final`, `-embedded`, `-blog`, `-2`
- Pattern: the dish, plainly — `moms-maltina-double-chocolate-cake`
- Keep the old URLs alive with 301 redirects to the new ones

## Migration order

1. Build the post type with the fields in Part A
2. Rebuild **Maltina** first — it exercises every block
3. Move the other six in, newest first
4. Point homepage and index at the same query, sorted by date
5. Redirect old slugs
6. Retire the hand-built pages

---

---

# PART C — CHANGES TO OST PUBLISHER

The publisher is a custom tool writing drafts to `github.com/littlesundaydinner-droid/OurSundayTable/drafts/`. Everything below is a change to that tool's fields and output, not a platform migration.

## Status: built, never used

**Zero posts have shipped through it.** The drafts list reads `0 DRAFTS · No drafts yet`. The seven live recipes were hand-built separately and did not come from this tool.

Two things follow:

**There is nothing to migrate.** No draft data exists inside the publisher, so fields can be renamed, split, and added with no backfill. Changing them will never be cheaper than right now, before the first post.

**The publish path is unproven.** Draft → GitHub commit → site build → live URL has never completed end to end. That is the real risk — larger than any field naming decision, and it will not surface until something is actually published.

### Do this before anything else

1. Create a throwaway draft — any title, minimum required fields
2. Publish it
3. Confirm: the commit lands in the repo, the build runs, the post is reachable at a real URL, and it appears on the recipes index in the right position
4. Delete it

If that chain works, everything below is field work. If it doesn't, fix it first — none of the rest matters until a post can reach the internet.

### Why the publisher and the live site disagree

They were built at different times against different assumptions, and have never been reconciled because nothing has passed through:

| | Publisher assumes | Live site uses |
|---|---|---|
| Region | African regions only, previews as `— AFRICA` | Scotland, Ireland, America, England, Caribbean |
| Temperature | `175°C` | `350°F` |
| Slug | derived from filename | `-v2`, `-final`, `_embedded` already public |
| Card image | none | index cards exist and need portraits |

None of these are regressions. They're just two systems that have never met.

## Bugs to fix first

### 1. Section 4 is missing
The editor's body sections are numbered **1, 2, 3, 5**:

| # | Section | Status |
|---|---|---|
| 1 | Opening — Temie's Voice | Present |
| 2 | Joy in Our Heritage | Present |
| 3 | The Chemistry of Baking | Present |
| 4 | **— missing —** | **Gone, but the number is still reserved** |
| 5 | Recipe Card | Present |

Either section 4 was removed and the numbering never re-flowed, or it failed to render. Two things to check: whether drafts written before the gap appeared still carry a section-4 payload, and what the template expects at position 4.

**In the new structure, position 4 should be The Pull Quote** — it sits between the chemistry and the recipe card and it's the block that gives the page its breath.

### 2. "African Region" can't hold your taxonomy
The field is labelled African Region, offers African options, and the preview stamps `— AFRICA` above every recipe name. But live posts are filed under **Scotland, Ireland, America, England, Caribbean**. The field and the content disagree.

Replace one field with two:

| Field | Holds | Examples from your archive |
|---|---|---|
| `tradition` | The format being reimagined | Scotland, Ireland, America, England, Caribbean |
| `heritage` | Where the soul comes from | Nigeria · West Africa, West Africa · Igbo |

Both render. `— AFRICA` in the preview becomes the two joined: `SCOTLAND · WEST AFRICAN HERITAGE`. The archive can then be browsed either way, which is the Global Lab's entire premise.

### 3. No slug field
Slugs are being derived from draft filenames, which is why `maltina_blog_embedded`, `ost_nsibidishortbread_blogpost_final`, and `ost-carrot-cake-blog-2` are public URLs.

Add a `slug` field, auto-generated from `recipe_name` (lowercase, hyphens, no filler words), editable before publish, locked after. Redirect the existing seven.

### 4. No portrait card image
Photos currently offers **Hero (full bleed · landscape)** and **Food Image 1–3**. The feed cards in the new design are **3:3.5 portrait**. Without a dedicated field the generator has to crop the landscape hero, which cuts the dish.

Add `card_image` — portrait, required, with the ratio stated in the label the way Hero already does.

---

## Fields to add

| Field | Type | Why |
|---|---|---|
| `slug` | Text, auto-filled | Clean URLs |
| `card_image` | Image (3:3.5) | Feed cards |
| `card_excerpt` | Text, ~140 char | The description on index cards — currently written by hand per page |
| `heritage` | Text | Second half of the region split |
| `pillars` | Multi-select: Joy / Heritage / Science | Live cards already display these tags; nothing generates them |
| `pull_quote` | Text | Section 4 |
| `closer` | Rich text | The italic paragraph that ends the post |
| `status` | Draft / Scheduled / Published | The homepage already shows "Publishing Sunday April 5 · Coming Soon" states — that needs a real field behind it |
| `temp_unit` | °C / °F toggle | Editor placeholder says `175°C`; the live Maltina recipe says `350°F` |

## Fields to keep as-is

Recipe Name · Subtitle/Hook · Category · Level · Publish Date · Edition/Series · Prep Time · Bake Time · Servings · Temp · Hero Image · Food Image 1–3 · Next Recipe Name · Next Publish Date

**The Next Recipe Teaser pair is genuinely good** and most CMSs don't have it. It's what powers the "Publishing Sunday April 5 — Coming Soon" block. Keep it.

## Recipe Card section — check these exist inside it

I can't see inside the collapsed Recipe Card section. It needs:

- **Grouped** ingredients (The Maltina Sponge / The Whipped Fudge), not one flat list
- Amount as its own field per item, so it can right-align in gold
- Method steps with an optional **tip** per step — the gold italic line. This is the highest-value field in the post and the one most likely to be missing.

---

## Ordering — what to change in the generator

The publisher writes files; the site templates read them. The ordering fix lives in the templates.

1. **Homepage and recipes index must read the same query** — `status == published`, sorted `publish_date` DESC. Right now the homepage list is separate and has drifted: it shows Guinness (Mar 17), Carrot (Mar 22), Maltina (May 3) while skipping Nsibidi (Apr 19) and Coconut Mango (Apr 12).
2. **Homepage takes the first 6.** No hand-picking.
3. **"This Sunday" is computed**, not a checkbox — it belongs to whichever post is newest.
4. **Scheduled posts** appear as the teaser block until their date, then flip to live automatically.
5. **Baking 101 sorts by `lesson_number` ASC**, not date — it's a curriculum.

## Order of work

**Before the first post:**
1. Prove the publish path with a throwaway post *(above)*
2. Fix the section 4 gap
3. Split region into `tradition` + `heritage`
4. Add `slug`, `card_image`, `pillars`, `status`
5. Confirm grouped ingredients and per-step tips exist inside Recipe Card
6. Settle **4am vs 5am** and the Maltina title

**First real post:** Mom's Maltina Double Chocolate Cake — it exercises every block, so if it renders correctly the structure is proven.

**After, at your own pace:** decide what to do with the seven hand-built pages. They can stay as they are with redirects, or be re-entered through the publisher so the archive is uniform. Re-entering is more work but means the index generates itself from then on, instead of being hand-maintained.

## One-time cleanup

- [ ] Fix the section 4 gap
- [ ] Split region into `tradition` + `heritage`, backfill all 7
- [ ] Add slug field, rename all 7, add redirects
- [ ] Add card_image, shoot or crop 7 portraits
- [ ] Settle **4am vs 5am** — both are live right now (homepage says 4am, Shop and Our Story say 5am) and set it as one global variable
- [ ] Settle **"Mama Maltina Chocolate Cake"** vs **"Mom's Maltina Double Chocolate Cake"**
- [ ] Point homepage at the shared date-sorted query

---

# PLATFORM NOTES

*Note: the sections below are for reference only — OST Publisher is custom, so Part C applies instead.*

**WordPress** — build this as a custom post type `recipe` with ACF field groups mapping to the blocks. Ingredients and Method are ACF Repeaters (Ingredients is a nested repeater: groups containing items). Feed ordering is the default `date DESC` — no query modification needed.

**Ghost** — Ghost's editor is linear, so build the blocks as reusable snippets and insert them in order. Metadata goes in post settings as internal tags (`#pillar-heritage`, `#region-nigeria`). Ghost sorts newest-first by default.

**Webflow** — a CMS Collection `Recipes` with these fields. Ingredients and Method need child Collections (`Ingredient Groups` → `Ingredient Items`, and `Method Steps`) linked by reference, since Webflow has no repeater inside a single item. Set Collection List sort to `publish_date` descending.

**Squarespace** — the block structure will need to live in a code block or a custom template; Squarespace's native blog fields won't hold this many typed fields cleanly.

**Custom** — the field table above is your schema. `publish_date DESC` on the index, `lesson_number ASC` on Baking 101.

---

*Structure v1.0 — supersedes the recipe post structure in the v1.0 design spec.*
