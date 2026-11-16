// Copies the open data from aiscoreboard.app into this repository: the API price ledger and the
// model retirement calendar. Runs daily in GitHub Actions; needs no key. Node 20+.
import fs from 'node:fs';

const SITE = 'https://aiscoreboard.app';
const get = async path => { const r = await fetch(SITE + path, {headers: {'user-agent': 'ai-api-price-ledger-sync'}}); if (!r.ok) throw new Error(`${path} answered ${r.status}`); return r.json(); };
const csv = rows => rows.map(r => r.map(v => { const s = v == null ? '' : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\n') + '\n';

const ledger = await get('/next/data/price-history.json');
const index = await get('/next/data/agent-index.json');
const sunset = index.sunset || {};
const changes = ledger.changes || [];
if (!changes.length || !ledger.models) throw new Error('The ledger came back empty; nothing written.');

fs.mkdirSync('data', {recursive: true});
fs.writeFileSync('data/price-history.json', JSON.stringify(ledger, null, 1) + '\n');
fs.writeFileSync('data/price-changes.csv', csv([
  ['date', 'model_id', 'model', 'change', 'source', 'input_before_usd_per_1m', 'output_before_usd_per_1m', 'input_after_usd_per_1m', 'output_after_usd_per_1m'],
  ...changes.map(c => [c.at, c.id, c.name, c.kind, c.src === 'router' ? 'openrouter' : c.src || '', c.from?.[0], c.from?.[1], c.to?.[0], c.to?.[1]]),
]));
fs.writeFileSync('data/prices-over-time.csv', csv([
  ['model_id', 'date', 'input_usd_per_1m', 'output_usd_per_1m', 'source', 'retired'],
  ...Object.entries(ledger.models).flatMap(([id, points]) => points.map(p => [id, p.at, p.in, p.out, p.src === 'router' ? 'openrouter' : p.src || '', p.retired ? 'yes' : ''])),
]));
const events = [...(sunset.upcoming || []).map(x => ({...x, status: 'upcoming'})), ...(sunset.deprecated || []).map(x => ({...x, status: 'deprecated'})), ...(sunset.retired || []).map(x => ({...x, status: 'retired'}))];
fs.writeFileSync('data/retirements.json', JSON.stringify({asOf: index.asOf, license: ledger.license, events}, null, 1) + '\n');
fs.writeFileSync('data/retirements.csv', csv([
  ['date', 'model_id', 'model', 'event', 'status', 'suggested_replacement', 'source_url', 'source_checked'],
  ...events.map(x => [x.date, x.id, x.name, x.event, x.status, x.replacement?.name, x.sourceUrl, x.checked]),
]));

// Older prices, read from Internet Archive copies of the vendors' own pricing pages (a fixed import; kept if the fetch fails).
try {
  const archive = await get('/next/data/price-archive.json');
  if (archive.schemaVersion !== 'aiscoreboard-price-archive-1' || !archive.vendors?.length) throw new Error('unexpected shape');
  fs.writeFileSync('data/price-archive.json', JSON.stringify(archive, null, 1) + '\n');
  fs.writeFileSync('data/archive-prices.csv', csv([
    ['vendor', 'model', 'first_seen', 'last_seen', 'input_usd_per_1m', 'output_usd_per_1m', 'note', 'archived_page'],
    ...archive.vendors.flatMap(v => v.models.flatMap(m => m.points.map(p => [v.name, m.name, p.from, p.until, p.in, p.out, p.note, p.snapshot]))),
  ]));
  fs.writeFileSync('data/archive-price-changes.csv', csv([
    ['first_seen_at_new_price', 'old_price_last_seen', 'vendor', 'model', 'change', 'input_before_usd_per_1m', 'output_before_usd_per_1m', 'input_after_usd_per_1m', 'output_after_usd_per_1m', 'archived_page'],
    ...archive.changes.map(c => [c.at, c.lastSeenOld, c.vendor, c.model, c.kind, c.from[0], c.from[1], c.to[0], c.to[1], c.snapshot]),
  ]));
} catch (error) { console.log('price archive not updated: ' + error.message); }

const moves = changes.filter(c => Array.isArray(c.from) && Array.isArray(c.to));
const usd = n => `$${Number(n).toFixed(2)}`;
const latest = moves.slice(0, 10).map(c => `| ${c.at} | ${c.name} | ${usd(c.from[0])} / ${usd(c.from[1])} | ${usd(c.to[0])} / ${usd(c.to[1])} | ${c.src === 'router' ? 'OpenRouter' : 'vendor page'} |`).join('\n');
const next = (sunset.upcoming || []).slice(0, 10).map(x => `| ${x.date} | ${x.name} | ${x.event} | ${x.replacement?.name || ''} | [source](${x.sourceUrl}) |`).join('\n');
const block = `<!-- stats:start -->
Data as of **${ledger.lastObservation}**: ${changes.length} recorded changes (${changes.filter(c => c.kind === 'up').length} price rises, ${changes.filter(c => c.kind === 'down').length} price cuts, ${changes.filter(c => c.kind === 'retired').length} retirements) across ${Object.keys(ledger.models).length} models, first observation ${ledger.firstObservation}.

**Latest price moves** (USD per 1M tokens, input / output)

| Date | Model | Before | After | Source |
|---|---|---|---|---|
${latest}

**Announced dates ahead**

| Date | Model | Event | Suggested replacement | Source |
|---|---|---|---|---|
${next || '| | none announced | | | |'}
<!-- stats:end -->`;
const readme = fs.readFileSync('README.md', 'utf8');
fs.writeFileSync('README.md', readme.replace(/<!-- stats:start -->[\s\S]*<!-- stats:end -->/, block));
console.log(`${changes.length} changes, ${events.length} retirement events, as of ${ledger.lastObservation}`);
