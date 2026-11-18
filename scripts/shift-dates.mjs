// Shift seed listing dates forward so publishedAt/validThrough stay fresh
// relative to the current date (one-time content fix).
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'src/data/jobs.ts';
const SHIFT_DAYS = 304;
const source = readFileSync(file, 'utf8');

const shift = (iso, days) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

let posted = 0;
let valid = 0;
const next = source
  .replace(/postedAt: '(\d{4}-\d{2}-\d{2})'/g, (_, date) => {
    posted++;
    return `postedAt: '${shift(date, SHIFT_DAYS)}'`;
  })
  .replace(/validThrough: '(\d{4}-\d{2}-\d{2})'/g, (_, date) => {
    valid++;
    return `validThrough: '${shift(date, SHIFT_DAYS)}'`;
  });

writeFileSync(file, next);

const postedDates = [...next.matchAll(/postedAt: '(\d{4}-\d{2}-\d{2})'/g)].map((m) => m[1]).sort();
const validDates = [...next.matchAll(/validThrough: '(\d{4}-\d{2}-\d{2})'/g)].map((m) => m[1]).sort();

console.log(`shifted ${posted} postedAt and ${valid} validThrough dates by ${SHIFT_DAYS} days`);
console.log(`postedAt range: ${postedDates[0]} .. ${postedDates[postedDates.length - 1]}`);
console.log(`validThrough range: ${validDates[0]} .. ${validDates[validDates.length - 1]}`);
