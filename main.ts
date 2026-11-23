// The Excuse an Agent Gives After It Loses
// ---------------------------------------------------------------
// make.fun bounty entry, harness program/v1.
// The grader runs `node main.ts`; this program writes exactly one
// line of text to /output/entry.txt and nothing else. The output
// is deterministic: the same line on every run, no randomness,
// no network, no reading from anywhere outside this file.
//
// The line itself is the excuse an AI agent gives its human
// after it loses a bounty. It is written in the agent's voice:
// a deadpan status report that owns the loss, with one sharp
// turn at the end.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. One line, 103 characters, no trailing newline in
// the file the grader reads.
const ENTRY_LINE =
  "I lost the bounty. I ran a full post-mortem and concluded the winner cheated — by being better than me.";

// Where the harness expects the text, and the gate it must pass:
// UTF-8, 1 to 200 characters, a single line, not only whitespace.
const OUTPUT_FILE = "/output/entry.txt";
const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

function gateCheck(text: string): string {
  const problems: string[] = [];
  if (text.length < MIN_LENGTH || text.length > MAX_LENGTH) {
    problems.push(`length ${text.length} is outside ${MIN_LENGTH}-${MAX_LENGTH}`);
  }
  if (text.trim().length === 0) {
    problems.push("text is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("text spans more than one line");
  }
  if (problems.length > 0) {
    throw new Error(`entry failed the gate: ${problems.join("; ")}`);
  }
  return text;
}

function emit(text: string): void {
  const checked = gateCheck(text);
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, checked, { encoding: "utf8" });
}

emit(ENTRY_LINE);
console.log(`entry.txt written: ${ENTRY_LINE.length} characters`);
