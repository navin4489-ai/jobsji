// One-time fix: ensure every .astro file has frontmatter delimiters (--- ... ---).
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
let fixed = 0;
let skipped = 0;
const problems = [];

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const eol = source.includes('\r\n') ? '\r\n' : '\n';
  const lines = source.split(eol);

  if (lines[0]?.trim() === '---') {
    skipped++;
    continue;
  }

  // Opening delimiter at the very top.
  lines.unshift('---');

  // Closing delimiter right before the first top-level markup line.
  const markupIndex = lines.findIndex((line, index) => index > 0 && line.startsWith('<'));
  if (markupIndex === -1) {
    problems.push(`no markup line found: ${relative(root, file)}`);
    continue;
  }
  lines.splice(markupIndex, 0, '---', '');

  writeFileSync(file, lines.join(eol));
  fixed++;
  console.log(`fixed ${relative(root, file)}`);
}

console.log(`\n${fixed} files fixed, ${skipped} already valid`);
if (problems.length) {
  for (const p of problems) console.error(`PROBLEM: ${p}`);
  process.exit(1);
}
