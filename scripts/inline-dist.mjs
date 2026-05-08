import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const indexPath = join(dist, 'index.html');

let html = await readFile(indexPath, 'utf8');

const scriptMatch = html.match(/<script type="module" crossorigin src="\.\/assets\/([^"]+)"><\/script>/);
const styleMatch = html.match(/<link rel="stylesheet" crossorigin href="\.\/assets\/([^"]+)">/);

if (!scriptMatch || !styleMatch) {
  throw new Error('Could not find built JS/CSS assets to inline.');
}

const js = (await readFile(join(dist, 'assets', scriptMatch[1]), 'utf8'))
  .replace(/<\/script/gi, '<\\/script')
  .replace(/<!--/g, '<\\!--');
const css = (await readFile(join(dist, 'assets', styleMatch[1]), 'utf8')).replace(/<\/style/gi, '<\\/style');

html = html
  .replace(styleMatch[0], () => `<style>\n${css}\n</style>`)
  .replace(scriptMatch[0], () => `<script type="module">\n${js}\n</script>`);

await writeFile(indexPath, html, 'utf8');
