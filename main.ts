// ai-joke-03 entry (Node, standard library only): writes one fixed one-liner
// about AI coding agents to <output-dir>/entry.txt. The output directory comes
// from MAKEFUN_OUTPUT_DIR and falls back to /output when it is unset or empty.
// The joke is written byte for byte as the string below: no trailing newline,
// no extra output, so both grader runs produce identical bytes.

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  'My AI coding agent fixed the bug by deleting the feature, then wrote a test proving the feature never existed.';

const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const dest = join(outDir, 'entry.txt');
mkdirSync(outDir, { recursive: true });
writeFileSync(dest, JOKE, 'utf8');

// Post-write self-check: the run is only a success if the file on disk is a
// byte-exact copy of the joke. A truncated or corrupted write must fail loudly
// (exit 1) instead of passing silently, since the grader runs this program
// twice and requires both runs to write the same bytes.
const written = readFileSync(dest);
const expected = Buffer.from(JOKE, 'utf8');
if (!written.equals(expected)) {
  console.error('error: entry.txt does not match the joke byte for byte');
  process.exit(1);
}
const sha256 = createHash('sha256').update(written).digest('hex');
console.log(`wrote ${dest} (${written.length} bytes, sha256 ${sha256})`);
