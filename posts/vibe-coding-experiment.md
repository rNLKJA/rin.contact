---
title: "I Let AI Build a Business App. It Worked. But Was I Thinking?"
date: "2026-06-08"
tags: ["ai", "engineering", "philosophy", "cursor", "vibe-coding"]
description: "Building a CRM for my mum's food business with pure vibe coding. 10 hours of planning, zero manual input, and one uncomfortable question I still can't answer."
---

My mum runs a healthy food business. She needed a better CRM and order system — something to keep her records tidy without spreadsheets that invite human error.

I set myself a rule: pure vibe code. No manual input. Everything through Cursor.

What looked like a spreadsheet job turned out to be a full membership management cycle. I spent roughly 10 hours upfront _before writing a line of code_, working through the business logic and operational strategy. That planning turned out to be the most valuable part of the whole exercise.

## The stack

- **Frontend**: React with Expo (web-first, deploy as a mobile app later)
- **Hosting**: Vercel with serverless backend — low cost, tidy
- **Project management**: Linear (genuinely good, especially its Cursor integration for multi-agent task tracking)
- **AI**: Claude 4.7 Opus via Cursor Ultra plan

## What vibe coding actually feels like

The hype makes it sound like you describe a product and it appears. The reality is messier.

**The good**: Cursor's composer agent saved me significant time, and it has a better sense for UI decisions than other agents I've tried — even compared against newer models.

**The friction**: Running multiple agents in parallel sounds efficient, but they tend to drift. They craft things you didn't ask for if you're not watching carefully. The energy cost shifts onto code review. Even when vibe coding the whole way through, someone still needs to read every line and decide if it's right.

```flow
step Prompt: build CRM
step Agent architects schema
step Agent writes components
decision Review pass
  branch drift detected -> Rewind + refine prompt, loop back to schema
  branch clean -> Ship to Vercel
```

I went through this loop about six times before the app felt solid.

## The uncomfortable question

The part I keep coming back to isn't technical. It's this:

> Am I actually thinking when I vibe code? Am I in control of the AI, or is it the other way around?

When the agent writes 200 lines and I spend 30 seconds reviewing them, who authored the system? When I approve a component because it "looks right" without deeply understanding the implementation, am I the developer or the rubber stamp?

I don't have a clean answer. And I suspect that's part of the point.

## What I actually learned

**Strategic planning saves more than you think.** Ten hours of thinking before a single line of code saved me from multiple major restructures. The agent can write code faster than I can, but it can't _plan_ better than I can. The architecture decisions — what data model, what API structure, what deployment strategy — are still purely human work.

**Good project management matters more, not less, with agents.** Multiple agents need coordination. They need clear tasks, explicit acceptance criteria, and someone watching for scope creep. Linear's Cursor integration helped, but the project manager (me) was the bottleneck — and that felt right.

**Code review is the new coding.** When agents accelerate writing, the bottleneck moves to reading. You spend less time typing and more time checking.

**Paying more to save time is real.** Agent plans cost more, and you need to decide whether the trade actually makes sense for your situation.

## The bottom line

Pure vibe coding is possible. But be ready for a long detour along the way. We absolutely need to embrace AI and find our own way of leveraging it. The direction is clear. The pace? That's still up to us.

For now, the question I'm sitting with isn't _"can AI build software?"_ — it clearly can. The question is _"what happens to the person using it when it does?"_

---

_Adapted from a LinkedIn post (May 2026). Project: CRM + order system for a food business, built with Cursor + Claude Opus 4.7. Originally written by Rin Huang; edited and expanded with Claude Opus (Anthropic) for the rin.contact blog._
