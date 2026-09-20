import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(root, 'docs');
const brands = { fr: 'Rafik Al Mouslim', en: 'Rafik Al Mouslim', ar: 'Rafik Al Mouslim' };
const languages = Object.keys(brands);
const base = 'https://anaitmessaoud.github.io/rafik-al-mouslim-privacy/';
const pages = ['index.html', ...languages.map(lang => `${lang}/index.html`)];
const sectionIds = ['local', 'location', 'backup', 'ads', 'choices', 'retention', 'security', 'contact', 'website', 'changes'];

for (const page of pages) {
  const lang = page === 'index.html' ? 'fr' : page.split('/')[0];
  const file = path.join(docs, page);
  const html = fs.readFileSync(file, 'utf8');
  assert(html.startsWith('<!doctype html>'), `${page}: doctype`);
  assert(html.includes(`<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">`), `${page}: language/direction`);
  assert(html.includes(`· ${brands[lang]}</title>`), `${page}: app name`);
  assert(html.includes(`rel="canonical" href="${base}${lang}/"`), `${page}: canonical`);
  assert.equal((html.match(/<h1>/g) || []).length, 1, `${page}: one heading`);
  assert.equal((html.match(/<section id=/g) || []).length, 10, `${page}: complete policy`);
  assert.equal((html.match(/aria-current="page"/g) || []).length, 1, `${page}: selected language`);
  assert.equal((html.match(/hreflang=/g) || []).length, 7, `${page}: language alternatives and navigation`);
  assert(html.includes('href="mailto:capitech92@gmail.com"'), `${page}: contact`);
  assert(!/<script\b|<iframe\b|<form\b|http-equiv="refresh"/i.test(html), `${page}: no scripts, embeds, forms or redirects`);
  assert(!/\bTODO\b|\bPLACEHOLDER\b|\{\{CONTACT\}\}|\uFFFD/.test(html), `${page}: no unfinished content or encoding errors`);
  for (const id of sectionIds) assert(html.includes(`<section id="${id}"`), `${page}: missing section ${id}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page}: unique anchors`);
  for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (ref.startsWith('https:') || ref.startsWith('mailto:')) continue;
    if (ref.startsWith('#')) {
      assert(ids.includes(ref.slice(1)), `${page}: ${ref}`);
      continue;
    }
    const target = path.resolve(path.dirname(file), ref);
    assert(target.startsWith(docs + path.sep), `${page}: contained link ${ref}`);
    assert(fs.existsSync(target), `${page}: missing ${ref}`);
    if (fs.statSync(target).isDirectory()) {
      assert(fs.existsSync(path.join(target, 'index.html')), `${page}: index ${ref}`);
    }
  }
  for (const code of languages) assert(html.includes(`hreflang="${code}"`), `${page}: missing ${code}`);
  console.log(`OK ${page}: ${brands[lang]}, 10 sections, language links, anchors, assets, contact`);
}

assert(fs.existsSync(path.join(docs, '.nojekyll')));
assert.equal((fs.readFileSync(path.join(docs, 'sitemap.xml'), 'utf8').match(/<url>/g) || []).length, 3);
assert(!fs.readFileSync(path.join(docs, 'styles.css'), 'utf8').includes('@import'));
console.log('All four pages passed structural validation.');
