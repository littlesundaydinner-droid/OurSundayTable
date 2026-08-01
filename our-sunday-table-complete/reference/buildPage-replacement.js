// ============================================================
// PAGE BUILDER  — replaces lines 998–1207 of pubish.html
// Same signature, same field names. Nothing else needs to change.
// ============================================================
function buildPage(data, imgs) {
  imgs = imgs || images;
  const heroImg = imgs.hero || data._images?.hero || '';
  const img1    = imgs.img1 || data._images?.img1 || '';
  const img2    = imgs.img2 || data._images?.img2 || '';
  const img3    = imgs.img3 || data._images?.img3 || '';

  const ingLines = (data.ingredients||'').split('\n').filter(l=>l.trim())
    .map(l=>`<li class="ing-item"><span class="ing-check">☐</span><span>${l.trim()}</span></li>`).join('\n');

  const methLines = (data.method||'').split('\n').filter(l=>l.trim())
    .map((l,i)=>`<div class="meth-step"><span class="step-num">${String(i+1).padStart(2,'0')}</span><p>${l.trim()}</p></div>`).join('\n');

  const toParas = t => (t||'').split('\n\n').filter(p=>p.trim()).map(p=>`<p>${p.trim()}</p>`).join('\n');

  const pubDate  = data.publishDate ? new Date(data.publishDate).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : 'Sunday';
  const nextDate = data.nextDate    ? new Date(data.nextDate).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '';

  // eyebrow above the title: region · month year
  const monthYear = data.publishDate ? new Date(data.publishDate).toLocaleDateString('en-GB',{month:'long',year:'numeric'}) : '';
  const eyebrow = [data.region, monthYear].filter(Boolean).join(' · ').toUpperCase();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.recipeName||'Recipe'} · Our Sunday Table</title>
<meta name="description" content="${(data.recipeSubtitle||data.heritageSubhead||'').replace(/"/g,'&quot;')}">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Archivo:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --paper:#FFFFFF;--cream:#FAF6EC;--cream-d:#F2EADA;
  --ink:#1B2836;--ink-d:#132030;
  --gold:#A9762F;--gold-lt:#D9BC7C;
  --mid:#6B665D;--line:#E3DDD1;--edge:40px;
}
body{background:var(--paper);color:#1E1B16;font-family:'Fraunces',serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}

/* edge panels */
.edge{position:fixed;top:0;bottom:0;width:var(--edge);z-index:60;pointer-events:none;background:var(--ink);
background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='132' viewBox='0 0 40 132'><rect width='40' height='132' fill='%231B2836'/><g stroke='%23FFFFFF' stroke-width='1' fill='none' stroke-linecap='round' opacity='0.85'><path d='M20 4 L32 16 L20 28 L8 16 Z'/><path d='M20 10 L26 16 L20 22 L14 16 Z'/><path d='M6 36 H34'/><path d='M9 45 q11 -9 22 0'/><circle cx='20' cy='58' r='7'/><path d='M13 58 h14 M20 51 v14'/><path d='M7 72 l7 -7 M7 72 l7 7 M33 72 l-7 -7 M33 72 l-7 7'/><path d='M6 84 H34'/><path d='M10 94 a10 10 0 0 1 20 0'/><circle cx='15' cy='94' r='2'/><circle cx='25' cy='94' r='2'/><path d='M12 108 q8 8 16 0 q-8 -8 -16 0 Z'/><circle cx='20' cy='108' r='2.2' fill='%23FFFFFF'/><path d='M6 120 H34'/></g><g stroke='%23D9BC7C' stroke-width='1' fill='none'><path d='M11 36 H29'/><path d='M11 84 H29'/><path d='M11 120 H29'/></g></svg>");
background-repeat:repeat-y;background-size:var(--edge) auto}
.edge.l{left:0}.edge.r{right:0;transform:scaleX(-1)}
.shell{margin:0 var(--edge)}

nav{background:var(--ink);display:flex;align-items:center;justify-content:center;gap:34px;height:74px;padding:0 24px;flex-wrap:wrap}
nav a{font-family:'Archivo',sans-serif;font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.72)}
nav a:hover{color:var(--gold-lt)}
.bm{font-family:'Fraunces',serif;font-size:1.1rem;letter-spacing:.14em;color:#fff;text-align:center;line-height:1.1}
.bm span{display:block;font-family:'Archivo',sans-serif;font-size:.48rem;letter-spacing:.26em;color:var(--gold-lt);margin-top:4px}

/* hero */
.hero{background:var(--ink);color:#fff;text-align:center;padding:0 0 64px}
.hero .band{height:230px;overflow:hidden;background:#0F1822}
.hero .band img{width:100%;height:100%;object-fit:cover;opacity:.9}
.hero .band .ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Archivo',sans-serif;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35)}
.hero .in{padding:52px 40px 0;max-width:900px;margin:0 auto}
.hero .loc{font-family:'Archivo',sans-serif;font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold-lt);font-weight:600;margin-bottom:28px}
.hero .pre{font-style:italic;font-weight:400;font-size:2.4rem;line-height:1}
.hero h1{font-weight:600;font-size:3.8rem;line-height:1.02;margin-top:4px}
.stats{display:flex;justify-content:center;gap:56px;margin-top:38px;flex-wrap:wrap}
.stats .v{font-size:1.5rem;font-weight:500}
.stats .k{font-family:'Archivo',sans-serif;font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-lt);margin-top:9px;font-weight:600}
.edn{font-family:'Archivo',sans-serif;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:32px}
.jump{display:block;max-width:540px;margin:26px auto 0;background:var(--gold-lt);color:#2B2010;padding:16px;font-family:'Archivo',sans-serif;font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;font-weight:600}

/* meta card */
.meta{max-width:820px;margin:-58px auto 0;background:var(--ink-d);color:#fff;position:relative;z-index:3;padding:8px 40px}
.mrow{display:grid;grid-template-columns:150px 1fr;padding:19px 0;border-bottom:1px solid rgba(255,255,255,.12)}
.mrow:last-child{border-bottom:none}
.mrow .k{font-family:'Archivo',sans-serif;font-size:.56rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold-lt);font-weight:600}
.mrow .v{color:rgba(255,255,255,.9)}

/* body */
.story{max-width:720px;margin:0 auto;padding:70px 40px 0}
.story p{font-size:1.06rem;line-height:1.85;color:#3A362E;margin-bottom:22px}
.story p:first-child{font-size:1.3rem;color:#1E1B16}
.full-img{width:100%;display:block;margin:38px 0}
.img-cap{font-family:'Archivo',sans-serif;font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin:-26px 0 34px}

.her{max-width:720px;margin:0 auto;padding:52px 40px 0}
.her .tag{font-family:'Archivo',sans-serif;font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:18px}
.her h2{font-weight:600;font-size:2.2rem;line-height:1.14}
.her .sub{font-style:italic;color:var(--gold);font-size:1.05rem;margin:14px 0 24px}
.her p{font-size:1.04rem;line-height:1.85;color:#3A362E;margin-bottom:20px}

.qb{background:var(--ink);color:#fff;padding:70px 40px;text-align:center;margin-top:46px}
.qb p{font-style:italic;font-size:1.8rem;line-height:1.5;max-width:44ch;margin:0 auto}

.chem{background:var(--cream-d);max-width:820px;margin:44px auto 0;padding:42px 46px}
.chem .k{font-family:'Archivo',sans-serif;font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:20px}
.chem h2{font-weight:600;font-size:1.7rem;line-height:1.2;margin-bottom:20px}
.chem p{font-size:1.02rem;line-height:1.85;color:#3A362E;margin-bottom:20px}
.chem em{color:var(--gold);font-style:italic}

/* recipe card */
.card{background:#fff;max-width:900px;margin:60px auto;border:1px solid var(--line);padding:44px 50px 54px}
.ctop{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
.ctop .k{font-family:'Archivo',sans-serif;font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);font-weight:600}
.pb{background:var(--ink);color:#fff;font-family:'Archivo',sans-serif;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;padding:12px 20px;font-weight:600;border:none;cursor:pointer}
.card h2{font-weight:600;font-size:2.1rem;line-height:1.1}
.card .rsub{font-style:italic;color:var(--gold);margin-top:10px;font-size:1.05rem}
.quad{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);margin:28px 0 4px}
.quad div{padding:24px 10px;text-align:center;border-right:1px solid var(--line)}
.quad div:last-child{border-right:none}
.quad .v{font-size:1.4rem;font-weight:500}
.quad .k{font-family:'Archivo',sans-serif;font-size:.54rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:8px;font-weight:600}
.sk{font-family:'Archivo',sans-serif;font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);font-weight:600;margin:36px 0 4px;padding-bottom:13px;border-bottom:1px solid var(--line)}
.ing-list{list-style:none;margin-top:4px}
.ing-item{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--line);font-size:1rem}
.ing-check{color:var(--gold);cursor:pointer;user-select:none;font-size:.95rem;flex-shrink:0}
.meth-step{display:grid;grid-template-columns:88px 1fr;gap:14px;padding:24px 0;border-bottom:1px solid var(--line)}
.meth-step:last-child{border-bottom:none}
.step-num{font-size:2.2rem;color:#E8DFC9;line-height:1}
.meth-step p{font-size:1rem;line-height:1.8;color:#3A362E}

.closing{max-width:760px;margin:0 auto;padding:64px 40px 80px;text-align:center}
.closing-rule{width:70px;height:1px;background:var(--gold-lt);margin:0 auto 38px}
.closing-q{font-style:italic;font-size:1.6rem;line-height:1.6}
.closing-attr{font-family:'Archivo',sans-serif;font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--mid);margin-top:26px}

.next-up{background:var(--cream);border-top:1px solid var(--line);padding:54px 40px;text-align:center}
.next-lbl{font-family:'Archivo',sans-serif;font-size:.6rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:12px}
.next-name{font-style:italic;font-size:1.8rem;margin-bottom:22px}
.next-btn{display:inline-block;background:var(--ink);color:#fff;font-family:'Archivo',sans-serif;font-size:.64rem;letter-spacing:.18em;text-transform:uppercase;padding:14px 28px;font-weight:600}

footer{background:var(--ink);color:rgba(255,255,255,.5);padding:34px 40px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
.foot-logo{font-family:'Fraunces',serif;font-style:italic;color:#fff;font-size:1.1rem}
.foot-logo span{display:block;font-family:'Archivo',sans-serif;font-style:normal;font-size:.55rem;letter-spacing:.2em;color:var(--gold-lt);margin-top:5px}
.foot-copy{font-family:'Archivo',sans-serif;font-size:.58rem;letter-spacing:.12em}

@media print{.edge,nav,footer,.next-up,.jump,.hero,.meta,.story,.her,.qb,.chem,.closing{display:none!important}
.shell{margin:0}.card{border:none;margin:0;padding:0;max-width:none}}
@media(max-width:900px){
  :root{--edge:0px}.edge{display:none}
  .hero h1{font-size:2.2rem}.hero .pre{font-size:1.5rem}.stats{gap:24px}
  .quad{grid-template-columns:1fr 1fr}.card{padding:26px 20px}.meth-step{grid-template-columns:52px 1fr}
}
</style>
</head>
<body>
<div class="edge l"></div><div class="edge r"></div>
<div class="shell">

<nav>
  <a href="/recipes.html">Our Recipes</a>
  <a href="/baking-101.html">Baking 101</a>
  <a href="/shop.html">Shop the Table</a>
  <a href="/" class="bm">OUR SUNDAY TABLE<span>JOY · HERITAGE · SCIENCE</span></a>
  <a href="/food-fund.html">The Food Fund</a>
  <a href="/our-story.html">Our Story</a>
</nav>

<div class="hero">
  <div class="band">${heroImg ? `<img src="${heroImg}" alt="${data.recipeName||'Recipe'}">` : `<div class="ph">Hero image goes here</div>`}</div>
  <div class="in">
    <div class="loc">${eyebrow||'OUR SUNDAY TABLE'}</div>
    ${data.recipeSubtitle ? `<div class="pre">${data.recipeSubtitle}</div>` : ''}
    <h1>${data.recipeName||'Recipe Name'}</h1>
    <div class="stats">
      <div><div class="v">${data.servings||'—'}</div><div class="k">Serves</div></div>
      <div><div class="v">${data.prepTime||'—'}</div><div class="k">Active Time</div></div>
      <div><div class="v">${data.bakeTime||'—'}</div><div class="k">Bake Time</div></div>
    </div>
    ${data.edition ? `<div class="edn">${data.edition}${data.publishDate ? ' · '+pubDate : ''}</div>` : ''}
    <a href="#recipe" class="jump">↓ Jump to Recipe</a>
  </div>
</div>

<div class="meta">
  <div class="mrow"><div class="k">Region</div><div class="v">${data.region||'—'}</div></div>
  <div class="mrow"><div class="k">Category</div><div class="v">${data.category||'—'}</div></div>
  <div class="mrow"><div class="k">Pillars</div><div class="v">Heritage · Science · Joy</div></div>
  <div class="mrow"><div class="k">Level</div><div class="v">${data.level||'—'}</div></div>
</div>

<div class="story">
  ${toParas(data.opening)}
  ${img1 ? `<img class="full-img" src="${img1}" alt="${data.recipeName||''}"><div class="img-cap">${data.recipeName||'Our Sunday Table'}</div>` : ''}
</div>

${(data.heritageHeadline||data.heritage) ? `<div class="her">
  <div class="tag">— Joy in our Heritage</div>
  ${data.heritageHeadline ? `<h2>${data.heritageHeadline}</h2>` : ''}
  ${data.heritageSubhead ? `<div class="sub">${data.heritageSubhead}</div>` : ''}
  ${toParas(data.heritage)}
</div>` : ''}

${data.pullQuote ? `<div class="qb"><p>${data.pullQuote}</p></div>` : ''}

${img2 ? `<div class="story" style="padding-top:44px"><img class="full-img" src="${img2}" alt="${data.recipeName||''}"><div class="img-cap">${data.recipeName||''}</div></div>` : ''}

${(data.science||data.scienceHeadline) ? `<div class="chem">
  <div class="k">The Chemistry of Baking</div>
  ${data.scienceHeadline ? `<h2>${data.scienceHeadline}</h2>` : ''}
  ${toParas(data.science).replace(/\*(.*?)\*/g,'<em>$1</em>')}
</div>` : ''}

${img3 ? `<div class="story" style="padding-top:44px"><img class="full-img" src="${img3}" alt="${data.recipeName||''}"><div class="img-cap">${data.recipeName||''} · Detail</div></div>` : ''}

<div class="card" id="recipe">
  <div class="ctop"><div class="k">The Recipe</div><button class="pb" onclick="window.print()">Print Recipe</button></div>
  <h2>${data.recipeName||'Recipe'}</h2>
  ${data.recipeSubtitle ? `<div class="rsub">${data.recipeSubtitle}</div>` : ''}
  <div class="quad">
    <div><div class="v">${data.servings||'—'}</div><div class="k">Serves</div></div>
    <div><div class="v">${data.prepTime||'—'}</div><div class="k">Active</div></div>
    <div><div class="v">${data.bakeTime||'—'}</div><div class="k">Bake</div></div>
    <div><div class="v">${data.temp||'—'}</div><div class="k">Temperature</div></div>
  </div>
  <div class="sk">Ingredients</div>
  <ul class="ing-list">${ingLines||'<li class="ing-item"><span>Ingredients go here</span></li>'}</ul>
  <div class="sk" style="margin-top:42px">Method</div>
  ${methLines||'<div class="meth-step"><span class="step-num">01</span><p>Method steps go here</p></div>'}
</div>

${data.closingLine ? `<div class="closing">
  <div class="closing-rule"></div>
  <div class="closing-q">${data.closingLine}</div>
  <div class="closing-attr">— Temie Giwa-Tubosun · Our Sunday Table</div>
</div>` : ''}

${data.nextName ? `<div class="next-up">
  <div class="next-lbl">Next Sunday${nextDate ? ' · '+nextDate : ''}</div>
  <div class="next-name">${data.nextName}</div>
  <a href="/recipes.html" class="next-btn">See all recipes →</a>
</div>` : ''}

<footer>
  <div class="foot-logo">Our Sunday Table<span>Baked at 5am · Published every Sunday</span></div>
  <div class="foot-copy">© Our Sunday Table · oursundaytable.co</div>
</footer>

</div>
<script>
document.querySelectorAll('.ing-check').forEach(el => {
  el.addEventListener('click', function() {
    this.textContent = this.textContent === '☐' ? '☑' : '☐';
    this.parentElement.style.opacity = this.textContent === '☑' ? '0.45' : '1';
  });
});
<\/script>
</body>
</html>`;
}
