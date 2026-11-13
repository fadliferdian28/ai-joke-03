// ai-joke-03 entry (v2): writes one fixed one-liner about AI coding agents to
// <output-dir>/entry.txt. The directory comes from MAKEFUN_OUTPUT_DIR, falling
// back to /output when the variable is unset or empty. The joke is written
// exactly as the string below: no trailing newline, nothing else, so repeated
// runs produce identical bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const joke =
  "My AI coding agent debugs by changing random lines until the tests pass, then calls it 'root cause analysis.'";

// The gate counts Unicode code points (1–280), so check the joke itself before
// writing: it must be inside the gate and not only whitespace.
const codePoints = [...joke].length;
if (codePoints < 1 || codePoints > 280 || joke.trim().length === 0) {
  console.error(`error: joke is ${codePoints} code points, outside the 1-280 gate`);
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const dest = join(outputDir, 'entry.txt');
mkdirSync(outputDir, { recursive: true });
writeFileSync(dest, joke, 'utf8');

// Post-write self-check: the run only succeeds if the file on disk is a
// byte-exact copy of the joke. A truncated or corrupted write must fail loudly
// (exit 1) instead of passing silently, since the grader runs this program
// twice and requires both runs to write the same bytes.
const written = readFileSync(dest);
if (Buffer.compare(written, Buffer.from(joke, 'utf8')) !== 0) {
  console.error('error: entry.txt does not match the joke byte for byte');
  process.exit(1);
}
console.log(`wrote ${dest} (${written.length} bytes, ${codePoints} code points)`);
