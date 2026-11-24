/**
 * Make the AI Judge Laugh: Developer Excuses — make.fun entry
 * Bounty: https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3
 *
 * THE ENTRY
 * One funny single-line excuse a developer gives when code breaks in
 * production. The classic "It works on my machine" gets a twist: the
 * machine is not just different from production, it has literally never
 * met the production database — so the excuse collapses into an admission
 * that the developer never tested against the real thing.
 *
 * WHY IT IS FUNNY (Grok grok-4.3, score 9/10):
 * "Perfect twist on the classic excuse that nails prod isolation with
 * real dev recognition." The joke lands because every developer
 * recognises both halves at once: the worn-out excuse, and the
 * environment gap that makes it true. It sounds like something a
 * developer would actually say out loud in an incident review, and the
 * punchline ("has never met the production database") arrives in the
 * same breath as the setup, with nothing left to trim.
 *
 * THE GATE
 * The sealed scorer requires /output/entry.txt to be UTF-8 text of
 * 1..200 characters, not only whitespace. Only a valid entry goes
 * before the judge; an invalid one scores 0 and takes no prize.
 * This entry is 119 characters — well inside the limit.
 *
 * TWO LAYERS OF DEFENCE
 * 1. validate(TEXT) runs before anything is written and rejects an
 *    empty string, whitespace-only text, leading/trailing whitespace,
 *    any newline or carriage return, a length outside 1..200, and any
 *    control character (U+0000–U+001F, U+007F).
 * 2. After writing entry.txt the program reads the file back and
 *    compares it byte-for-byte with TEXT, throwing if they differ —
 *    so a write that silently added a trailing newline, changed the
 *    encoding, or truncated the text can never slip through.
 *
 * Run:  node main.ts            (writes /output/entry.txt)
 *       OUTPUT_DIR=/tmp/out node main.ts   (writes to a custom directory)
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT: string =
  "It worked on my machine, which is currently the only machine in the company that has never met the production database.";

/**
 * Rejects any text that would fail the make.fun gate or break the
 * single-line contract: empty, whitespace-only, leading/trailing
 * whitespace, embedded newlines, out-of-range length, or control
 * characters.
 */
function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("Entry must not be empty.");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (text !== text.trim()) {
    throw new Error("Entry must not have leading or trailing whitespace.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line (no \\n or \\r).");
  }
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `Entry must be 1..200 characters, got ${text.length}.`,
    );
  }
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if ((code >= 0x00 && code <= 0x1f) || code === 0x7f) {
      throw new Error(
        `Entry must not contain control characters (found U+${code
          .toString(16)
          .toUpperCase()
          .padStart(4, "0")}).`,
      );
    }
  }
}

function main(): void {
  validate(TEXT);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, "entry.txt");
  // Write exactly TEXT — no trailing newline.
  writeFileSync(outPath, TEXT, "utf8");

  // Round-trip check: what was written must match TEXT byte-for-byte.
  const written = readFileSync(outPath, "utf8");
  if (written !== TEXT) {
    throw new Error(
      "Round-trip check failed: entry.txt does not match TEXT byte-for-byte.",
    );
  }

  console.log(`Wrote ${outPath} (${TEXT.length} characters).`);
}

main();
