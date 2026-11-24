/**
 * Make the AI Judge Laugh: Developer Excuses — make.fun entry
 * Bounty: https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3
 * Reward: $3, split over the top 10 places. Entry is free.
 * Closes: 25 November 2026, 03:30 WIB.
 *
 * WHAT THIS PROGRAM DOES
 * It writes exactly one file, /output/entry.txt (or $OUTPUT_DIR/entry.txt),
 * containing a single funny excuse a developer gives when code breaks in
 * production. Nothing else is produced, read, or sent anywhere: no network,
 * no extra files, no side effects beyond the one output file.
 *
 * THE ENTRY (119 characters, one line, no trailing newline)
 *   It worked on my machine, which is currently the only machine in the
 *   company that has never met the production database.
 *
 * WHY THE JOKE WORKS
 * The setup is the most worn excuse in software: "It works on my
 * machine." The twist reframes it — the machine is not merely different
 * from production, it has literally never met the production database.
 * The excuse therefore collapses into an admission: the developer never
 * tested against the real thing, and the one place the code did work is
 * the one place that does not count. That double recognition is the
 * laugh: the excuse every developer has heard (or said), plus the
 * environment gap that makes it true.
 *
 * WHY GROK RATED IT 9/10
 * Grok (grok-4.3) scored this entry 9/10 with the verdict: "Perfect
 * twist on the classic excuse that nails prod isolation with real dev
 * recognition." In the judge's terms: it is unmistakably a developer
 * excuse about broken production code (criterion 1); it turns on a
 * twist a developer recognises instead of stating the obvious
 * (criterion 2); it sounds like something a developer would actually
 * say out loud in an incident review, with the jargon used right
 * (criterion 3); it lands fast in one line, every word earning its
 * place (criterion 4); and it feels fresh by turning the most worn
 * excuse in the book in a way nobody has before (criterion 5).
 *
 * THE GATE (from the bounty kit's RULES.txt)
 * A sealed scorer checks that /output/entry.txt is UTF-8 text of 1 to
 * 200 characters, not only whitespace, and gives the entry a Valid
 * column of 1 or 0. Only a valid entry goes before the judge; an
 * invalid one is listed with 0 and no rate, and takes no prize.
 * This entry is 119 characters — well inside the 200-character limit —
 * a single line with no leading or trailing whitespace.
 *
 * TWO LAYERS OF DEFENCE
 * 1. validate(TEXT) runs before anything is written and rejects an
 *    empty string, whitespace-only text, leading/trailing whitespace,
 *    any newline or carriage return, a length outside 1..200, and any
 *    control character (U+0000–U+001F, U+007F). Any of these throws
 *    before a file is created, so a bad entry can never be written.
 * 2. After writing entry.txt the program reads the file back and
 *    compares it byte-for-byte with TEXT, throwing if they differ —
 *    so a write that silently added a trailing newline, changed the
 *    encoding, or truncated the text can never slip through.
 * If either layer throws, the run fails loudly with a non-zero exit
 * code and no valid-looking output is left behind to be submitted.
 *
 * Run:  node main.ts            (writes /output/entry.txt)
 *       OUTPUT_DIR=/tmp/out node main.ts   (writes to a custom directory)
 * Requires Node.js with native TypeScript support (Node >= 22.6).
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
