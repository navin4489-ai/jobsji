// Second-pass repair: collapse duplicate frontmatter closing delimiters
// introduced by fix-frontmatter.mjs (original files had a closing --- but no opening).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(join(root, 'src')).filter((f) => f.endsWith('.astro'));
let repaired = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  const lines = source.split(eol);

  if (lines[0]?.trim() !== '---') {
    console.error(`no opening frontmatter: ${relative(root, file)}`);
    process.exitCode = 1;
    continue;
  }

  const closing = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  if (closing === -1) {
    console.error(`no closing frontmatter: ${relative(root, file)}`);
    process.exitCode = 1;
    continue;
  }

  // From after the closing delimiter, skip extra '---' / blank lines until markup.
  let j = closing + 1;
  while (j < lines.length && (lines[j].trim() === '---' || lines[j].trim() === '')) j++;

  const rebuilt = [...lines.slice(0, closing + 1), '', ...lines.slice(j)];
  const next = rebuilt.join(eol);
  if (next !== source) {
    writeFileSync(file, next);
    repaired++;
    console.log(`repaired ${relative(root, file)}`);
  }
}

console.log(`\n${repaired} files repaired`);
