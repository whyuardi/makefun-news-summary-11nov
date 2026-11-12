// news-summary-01 entry (Node 22, standard library only).
// The summary lives in summary.txt beside this file; the program writes it
// byte-for-byte to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The gate takes UTF-8 text of 1 to 2,000 characters, so no line end is
// added or removed here: the bytes copied are exactly the bytes judged.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const summaryPath = join(dirname(fileURLToPath(import.meta.url)), 'summary.txt');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const text = readFileSync(summaryPath, 'utf8');
// Fail loudly instead of submitting a summary the gate would reject.
if (text.length < 1 || text.length > 2000 || !text.trim()) {
  throw new Error(`summary.txt is ${text.length} chars; the gate takes 1-2000.`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), text, 'utf8');
