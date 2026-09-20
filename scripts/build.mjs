import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs');
const base = 'https://anaitmessaoud.github.io/rafik-al-mouslim-privacy/';
const languages = ['fr', 'en', 'ar'];
const updatedIso = '2026-09-20';
const data = Object.assign(
  {},
  ...fs.readdirSync(path.join(root, 'content'))
    .filter(file => file.endsWith('.json'))
    .sort()
    .map(file => JSON.parse(fs.readFileSync(path.join(root, 'content', file), 'utf8').replace(/^\uFEFF/, ''))),
);
const escape = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');
const email = 'capitech92@gmail.com';
const paragraph = value => escape(value).replace(
  '{{CONTACT}}',
  `<a href="mailto:${email}" dir="ltr">${email}</a>`,
);
const providerLinks = [
  { url: 'https://policies.google.com/privacy', localized: true },
  { url: 'https://policies.google.com/technologies/partner-sites', localized: true },
  { url: 'https://policies.google.com/technologies/retention', localized: true },
  { url: 'https://developers.google.com/admob/android/privacy/play-data-disclosure', localized: true },
  { url: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement', localized: false },
];

function render(lang, isRoot = false) {
  const policy = data[lang];
  const prefix = isRoot ? './' : '../';
  return `<!doctype html>
<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escape(policy.title)} — ${escape(policy.name)}. ${escape(policy.updated)}.">
  <meta name="theme-color" content="#123c43">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'">
  <title>${escape(policy.title)} · ${escape(policy.name)}</title>
  <link rel="canonical" href="${base}${lang}/">
${languages.map(code => `  <link rel="alternate" hreflang="${code}" href="${base}${code}/">`).join('\n')}
  <link rel="alternate" hreflang="x-default" href="${base}">
  <link rel="icon" href="${prefix}icon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${prefix}styles.css">
</head>
<body id="top">
  <a class="skip" href="#main">${escape(policy.skip)}</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${prefix}${lang}/"><img src="${prefix}icon.svg" alt="" width="40" height="40"><span>${escape(policy.name)}</span></a>
      <nav class="languages" aria-label="${escape(policy.nav)}">
${languages.map(code => `        <a href="${prefix}${code}/" lang="${code}" dir="${code === 'ar' ? 'rtl' : 'ltr'}" hreflang="${code}"${code === lang ? ' aria-current="page"' : ''}>${escape(data[code].label)}</a>`).join('\n')}
      </nav>
    </div>
  </header>
  <main id="main" tabindex="-1">
    <div class="intro">
      <p class="updated"><time datetime="${updatedIso}">${escape(policy.updated)}</time></p>
      <h1>${escape(policy.title)}</h1>
      <p class="lead">${escape(policy.lead)}</p>
    </div>
    <div class="document-layout">
      <aside class="toc">
        <nav aria-label="${escape(policy.contents)}">
          <h2>${escape(policy.contents)}</h2>
          <ol>
${policy.sections.map(section => `            <li><a href="#${section.id}">${escape(section.title)}</a></li>`).join('\n')}
          </ol>
        </nav>
      </aside>
      <article aria-label="${escape(policy.title)}">
${policy.sections.map((section, index) => `        <section id="${section.id}" aria-labelledby="heading-${section.id}">
          <h2 id="heading-${section.id}"><span class="number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${escape(section.title)}</h2>
${section.p.map(text => `          <p>${paragraph(text)}</p>`).join('\n')}
        </section>`).join('\n')}
        <section class="providers" aria-labelledby="providers-title">
          <h2 id="providers-title">${escape(policy.sourcesTitle)}</h2>
          <ul>
${providerLinks.map((entry, index) => `            <li><a href="${entry.url}${entry.localized ? `?hl=${lang}` : ''}">${escape(policy.links[index])}</a></li>`).join('\n')}
          </ul>
        </section>
      </article>
    </div>
  </main>
  <footer><span>${escape(policy.name)} · ${escape(policy.title)}</span><a href="#top">${escape(policy.top)} ↑</a></footer>
</body>
</html>
`;
}

for (const lang of languages) {
  fs.mkdirSync(path.join(out, lang), { recursive: true });
  fs.writeFileSync(path.join(out, lang, 'index.html'), render(lang));
}
fs.writeFileSync(path.join(out, 'index.html'), render('fr', true));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${languages.map(lang => `  <url><loc>${base}${lang}/</loc><lastmod>${updatedIso}</lastmod></url>`).join('\n')}\n</urlset>\n`);
console.log('Built three localized policies and the French default page.');
