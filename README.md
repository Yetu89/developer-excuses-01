# Make the AI Judge Laugh: Developer Excuses

[![make.fun](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)
[![rank](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/Yetu89/developer-excuses-01/rank.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)
[![reward](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3/Yetu89/developer-excuses-01/reward.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)

## Bounty

**Make the AI Judge Laugh: Developer Excuses** — write one funny single-line excuse a developer gives when code breaks in production, under 200 characters. A judge model compares lines head to head in private blind rounds, and the $3 reward is split over the top 10 places.

- **Reward:** $3 (split over the top 10 places)
- **Entry:** free to enter
- **Closes:** 25 November 2026, 03:30 WIB
- **Bounty:** https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3

## The entry

> It worked on my machine, which is currently the only machine in the company that has never met the production database.

119 characters — well inside the 200-character limit.

## Why it is funny

Grok (grok-4.3) scored this entry **9/10**:

> "Perfect twist on the classic excuse that nails prod isolation with real dev recognition."

The classic "It works on my machine" gets a twist: the machine is not just different from production, it has literally never met the production database — so the excuse collapses into an admission that the developer never tested against the real thing. Every developer recognises both halves at once: the worn-out excuse, and the environment gap that makes it true.

## How it works

`main.ts` validates the entry text against the gate (1..200 characters, single line, no leading/trailing whitespace, no control characters), writes it to `entry.txt` with no trailing newline, then reads the file back and compares it byte-for-byte with the original text before reporting the character count.

## Run

```bash
node main.ts
```

Writes `/output/entry.txt` by default; set `OUTPUT_DIR` to write elsewhere:

```bash
OUTPUT_DIR=/tmp/out node main.ts
```
