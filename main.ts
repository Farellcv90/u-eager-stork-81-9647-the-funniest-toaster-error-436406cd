// The Funniest Toaster Error Message — make.fun entry
// Writes one single-line toaster error message to /output/entry.txt.
//
// The line: a deadpan appliance error. Toasting is cancelled, not because
// of crumbs, a jam, or a union meeting, but because the bread has achieved
// enlightenment — and toasting an enlightened slice would be rude.
// Real error format (code + cancelled + reason), one voice throughout,
// lands on a single read.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "ERROR E08: Toasting cancelled. The bread has achieved enlightenment.";

const MAX_CHARS = 120;

// The gate counts the file's characters as-is, so the entry is written
// with no trailing newline: a newline would add a character and a line.
const OUTPUT_PATH = "/output/entry.txt";

function validate(entry: string): void {
  // Must be valid UTF-8 text: re-encoding round-trips only for valid UTF-8.
  const encoded = Buffer.from(entry, "utf8");
  if (encoded.toString("utf8") !== entry) {
    throw new Error("entry is not valid UTF-8 text");
  }
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
