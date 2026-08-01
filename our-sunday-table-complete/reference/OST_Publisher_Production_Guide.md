# OST Publisher — Going to Production

The publisher currently generates a finished `.html` file. That's fine for testing and wrong for production, for one reason: **it bakes the design into every post permanently.** It's the same trap the seven live pages are in — they can't be restyled without being rebuilt by hand.

**The fix: publish data, render at build.**

```
Publisher  →  commits  moms-maltina.json  →  build renders it through the template  →  live page
```

Change the template once, every post restyles. That single decision is what makes this survive the next redesign.

---

# THE SHAPE OF IT

```
OurSundayTable/
├── content/
│   ├── recipes/
│   │   ├── moms-maltina-double-chocolate-cake.json
│   │   ├── nsibidi-shortbread-cookies.json
│   │   └── …
│   └── lessons/
│       └── why-your-cakes-sink.json
├── public/
│   └── images/
│       └── moms-maltina-double-chocolate-cake/
│           ├── hero.jpg
│           ├── card.jpg
│           └── story.jpg
├── templates/
│   ├── recipe.js        ← the buildHTML() function, lifted out of the publisher
│   ├── index.js
│   └── home.js
├── build/
│   └── build.js         ← reads content, writes dist
├── publish/
│   └── index.html       ← the publisher itself
├── netlify/functions/   ← or api/ on Vercel
│   └── commit.js        ← holds the GitHub token
└── dist/                ← generated, deployed, never edited by hand
```

**The rule:** nothing in `dist/` is ever edited. If you find yourself editing it, something upstream is wrong.

---

# PHASE 1 — SPLIT THE TEMPLATE OUT

The `buildHTML(o)` function inside the publisher is already your renderer. Move it.

1. Copy `buildHTML()` into `templates/recipe.js` and export it:

```js
export function renderRecipe(post) { /* the existing function body */ }
```

2. In the publisher, import the same file rather than keeping a copy. **One template, two consumers** — the preview and the build. If they ever diverge, preview stops telling the truth.

3. The publisher's Publish button stops producing HTML and starts producing the post object as JSON.

---

# PHASE 2 — IMAGES OUT OF JSON

Right now images are base64 strings inside the draft. That works in a browser and fails in a repo — a single hero can be 2–4 MB of text, and git will carry every version forever.

**On publish, for each image:**

1. Resize to a sane maximum — hero 2400px wide, card 1200px, story 1600px
2. Convert to WebP with a JPEG fallback if you want to be thorough
3. Commit to `public/images/<slug>/hero.webp`
4. Store only the **path** in the JSON

```json
{
  "slug": "moms-maltina-double-chocolate-cake",
  "images": {
    "hero": "/images/moms-maltina-double-chocolate-cake/hero.webp",
    "card": "/images/moms-maltina-double-chocolate-cake/card.webp"
  }
}
```

Resizing happens in the browser before upload using a canvas — no server needed:

```js
async function resize(file, maxW, quality = 0.82) {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, maxW / img.width);
  const c = document.createElement('canvas');
  c.width = Math.round(img.width * scale);
  c.height = Math.round(img.height * scale);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  return new Promise(r => c.toBlob(r, 'image/webp', quality));
}
```

**Do this before the first post, not after.** Retrofitting image handling once there are 50 posts is genuinely unpleasant.

---

# PHASE 3 — THE COMMIT PATH

The publisher needs to write to GitHub. It must not hold the token.

A GitHub token in a public page is a token anyone can read and use to write to your repo. So the token lives on the server side, and the publisher calls a small function.

## The function

`netlify/functions/commit.js` (Vercel: `api/commit.js`, Cloudflare: a Worker — same logic):

```js
export async function handler(event) {
  // 1. Verify the caller is you
  const auth = event.headers.authorization || '';
  if (auth !== `Bearer ${process.env.PUBLISH_SECRET}`) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const { slug, post, images } = JSON.parse(event.body);
  const repo = 'littlesundaydinner-droid/OurSundayTable';
  const token = process.env.GITHUB_TOKEN;

  const put = async (path, contentBase64, message) => {
    // check if the file already exists, to get its sha
    let sha;
    const head = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${token}` }
    });
    if (head.ok) sha = (await head.json()).sha;

    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: contentBase64, sha, branch: 'main' })
    });
    if (!res.ok) throw new Error(`${path}: ${await res.text()}`);
  };

  try {
    for (const img of images) {
      await put(`public/images/${slug}/${img.name}`, img.base64, `Add image for ${slug}`);
    }
    const json = Buffer.from(JSON.stringify(post, null, 2)).toString('base64');
    await put(`content/recipes/${slug}.json`, json, `Publish: ${post.name}`);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
```

## Environment variables

Set these in your host's dashboard — never in the repo:

| Variable | What |
|---|---|
| `GITHUB_TOKEN` | Fine-grained PAT, scoped to **this one repo**, Contents: read & write |
| `PUBLISH_SECRET` | A long random string the publisher sends back |

**Use a fine-grained token scoped to one repo.** A classic token with full `repo` scope can write to everything you own.

## In the publisher

```js
async function publishToRepo(post, imageBlobs) {
  const res = await fetch('/.netlify/functions/commit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('ost_key')
    },
    body: JSON.stringify({ slug: post.slug, post, images: imageBlobs })
  });
  if (!res.ok) throw new Error(await res.text());
}
```

Prompt for the key once per session and keep it in `sessionStorage`, not `localStorage` — it should die when the tab closes.

---

# PHASE 4 — LOCK THE PUBLISHER DOWN

`/publish` must not be public. Pick one:

| Method | How | Notes |
|---|---|---|
| **Cloudflare Access** | Zero Trust → Application → email one-time PIN | Best option. Free tier covers this. Nothing reaches the page unauthenticated. |
| **Netlify Identity** | Enable Identity, set the site to invite-only | Easy if you're already on Netlify |
| **Basic auth** | `_headers` file or edge middleware | Crude but effective for one user |

Also add to `robots.txt`:

```
User-agent: *
Disallow: /publish
```

That's not security — it just stops it being indexed. The auth is the security.

---

# PHASE 5 — THE BUILD

`build/build.js`:

```js
import fs from 'fs';
import path from 'path';
import { renderRecipe } from '../templates/recipe.js';
import { renderIndex }  from '../templates/index.js';
import { renderHome }   from '../templates/home.js';

const DIR = 'content/recipes';
const now = new Date();

// 1. read every post
const posts = fs.readdirSync(DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')));

// 2. only what should be visible, newest first
const live = posts
  .filter(p => p.status === 'Published' ||
              (p.status === 'Scheduled' && new Date(p.date) <= now))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// 3. write each post page
for (const p of live) {
  const out = `dist/${p.slug}`;
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(`${out}/index.html`, renderRecipe(p));
}

// 4. index and homepage read the SAME array
fs.writeFileSync('dist/recipes/index.html', renderIndex(live));
fs.writeFileSync('dist/index.html', renderHome(live.slice(0, 6)));

console.log(`Built ${live.length} posts`);
```

**Step 4 is the fix for your homepage drift.** The homepage and the index consume the same sorted array, so they cannot disagree. Right now they're separate hand-made lists, which is why Nsibidi and Coconut Mango fell off the homepage.

---

# PHASE 6 — DEPLOY ON PUSH

`.github/workflows/build.yml`:

```yaml
name: Build and deploy
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 11 * * 0'   # Sundays 11:00 UTC — flips scheduled posts live
  workflow_dispatch:        # manual button

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: node build/build.js
      - uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: './dist'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**The cron line is what makes scheduling real.** A static site can't publish itself at a future date — nothing runs. The scheduled build wakes up, sees that a post's date has passed, and includes it. Without it, a Scheduled post sits invisible until you next push.

Set the cron a little before you want the post live: `0 11 * * 0` is 11:00 UTC Sunday, which is 6am Central.

---

# PHASE 7 — OLD URLS

Seven pages are already indexed and shared. Don't break them.

`public/_redirects` (Netlify) or `vercel.json`:

```
/maltina_blog_embedded                    /moms-maltina-double-chocolate-cake     301
/ost_nsibidishortbread_blogpost_final     /nsibidi-shortbread-cookies             301
/ost-carrot-cake-blog-2                   /carrot-cake-mango-curd                 301
/lagos-lace-blog-2                        /lagos-lace-coconut-dream-cake          301
/coconut-mango-triangle-bars              /coconut-mango-triangle-bars            301
/ost-agege-zobo-hot-cross-bun             /agege-zobo-hot-cross-bun               301
/ost-guinness-cake                        /guinness-celebration-cake              301
/ost-our-recipes-v2                       /recipes                                301
/ost-global-lab-v2                        /baking-101                             301
```

301 tells Google the move is permanent and passes the ranking across. A 302 does not.

---

# THE ORDER TO DO IT IN

| # | Step | Why here |
|---|---|---|
| 1 | Split the template out | Everything else depends on one shared renderer |
| 2 | Image resize + path-based storage | Painful to retrofit later |
| 3 | Commit function + token in env | The publisher can't write until this exists |
| 4 | Lock `/publish` behind auth | Before it's ever reachable publicly |
| 5 | Build script | Turns content into a site |
| 6 | CI on push + Sunday cron | Automates it |
| 7 | **Smoke test — throwaway post** | Prove the whole chain before real content |
| 8 | Maltina as post one | Exercises every block |
| 9 | Redirects | Once new slugs exist |
| 10 | Backfill the other six | At your own pace |

---

# THE SMOKE TEST

Do this before Maltina. It takes ten minutes and tells you whether any of the above actually works.

1. New draft, name it `Test Post — Delete Me`
2. Fill only the required fields, any image
3. Publish
4. Check, in order:
   - [ ] `content/recipes/test-post-delete-me.json` appears in the repo
   - [ ] Images landed in `public/images/test-post-delete-me/`
   - [ ] The Action ran green
   - [ ] `oursundaytable.co/test-post-delete-me` loads
   - [ ] It appears **first** on `/recipes`
   - [ ] It appears on the homepage
5. Delete the JSON, push, confirm the page 404s and drops off both lists

**If any step fails, stop there and fix it.** Each one is a different link in the chain and they fail differently.

---

# THINGS THAT WILL BITE

**Draft images are huge.** Base64 in browser storage will hit the ~5MB quota after two or three drafts with photos. Resize on upload (Phase 2) or store only a small thumbnail in the draft and hold the full file until publish.

**Two devices, two draft sets.** Browser storage is per-device. Starting a post on your laptop and finishing on your phone won't work until drafts also live in the repo. Worth doing eventually: save drafts to `content/drafts/` with `status: Draft`, and the build simply skips them.

**Timezone on scheduled posts.** `new Date('2026-08-02')` is parsed as UTC. If you're in Central and want a post live at 6am your time, the cron and the date comparison need to agree. Store dates as plain `YYYY-MM-DD` and compare at UTC noon to stay clear of the boundary.

**A failed build leaves the last good site up.** That's the nice property of static hosting. Check the Actions tab when a post doesn't appear — the most likely cause is malformed JSON from a stray quote in a field.

**Rollback is `git revert`.** Every publish is a commit, so undoing a bad post is one command and one rebuild.

---

*Written against: repo `littlesundaydinner-droid/OurSundayTable`, publisher at `/publish`. Host-specific paths assume Netlify; Vercel and Cloudflare differ only in where functions live and what the redirect file is called.*
