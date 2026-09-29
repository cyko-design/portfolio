import { readFileSync, statSync } from 'node:fs';
import vm from 'node:vm';

const manifest = JSON.parse(readFileSync(new URL('../assets/manifest.json', import.meta.url)));
const errors = [];
for (const path of [...manifest.assets.map(asset => asset.path), 'assets/inter-latin.woff2', 'assets/OFL.txt']) {
  try {
    if (!statSync(new URL('../' + path, import.meta.url)).size) errors.push('Empty file: ' + path);
  } catch { errors.push('Missing file: ' + path); }
}
const context = { window: {}, document: { querySelectorAll: () => [] } };
vm.runInNewContext(readFileSync(new URL('../links.js', import.meta.url), 'utf8'), context);
for (const [name, url] of Object.entries(context.window.portfolioLinks)) {
  if (!url) errors.push('Missing destination: ' + name);
  else if (!/^https:\/\//.test(url)) errors.push('Expected HTTPS destination: ' + name);
}
if (errors.length) {
  console.error('Launch checks failed:\n' + errors.map(error => '- ' + error).join('\n'));
  process.exitCode = 1;
} else console.log('All required assets and destinations are present. Complete visual QA before launch.');
