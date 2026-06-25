---
title: "Analytics Tells You What Happened. Intelligence Tells You What To Do."
date: "2026-06-24"
tags: ["strategic-intelligence", "data-science", "decision-making", "government"]
description: "Most data work stops at describing the past. The harder and more valuable step is turning that description into a recommendation someone can act on, framed by the risk they carry and the call they have to make."
---

A lot of data roles are scored on one thing: is the analysis correct. Correct is necessary, but it is not the job. The job is to help a specific person make a better call than they would have made without you. Those are not the same task, and the gap between them is where most of the real value sits.

I learned this most clearly in government work, first building an intelligence capability inside a compliance team, then translating policing data into decision-ready reporting. The technical part mattered. It was rarely the part that decided whether the work was useful.

## Two questions that look alike and are not

There are two questions a decision-maker can ask of data. The first is "what happened". The second is "what should we do about it". They sound close. They are different disciplines.

Analytics answers the first. A trend line showing non-compliance rising over the last two quarters is a clean, honest answer to "what happened". Intelligence answers the second. Telling a manager which sites to inspect next, given a fixed number of inspectors and the risk each site carries, is a different kind of output. Same data, very different work.

The first question is satisfied by a chart. The second is only satisfied by a judgement, and judgement is the part the tooling does not hand you.

## What you add on top of the numbers

The move from analytics to intelligence is the move from describing to framing. The numbers describe what is there. To turn that into a recommendation, you have to layer three things on top that do not live in the dataset.

```flow
step Question someone has to act on
step The numbers: what happened
split Weighed against
  branch Operational context
  branch Risk tolerance
  branch What the organisation protects
step A recommendation: what to do
loop the recommendation drives the next question
```

Operational context tells you what can actually be acted on. A perfect ranking of problem sites is useless if the team can only reach three of them this month. Risk tolerance tells you how wrong you are allowed to be, which decides how much evidence you need before you say anything at all. And the objective, what the organisation is really trying to protect, decides which signal in the data is worth chasing and which is noise dressed up as insight.

Strip those three away and you are left with a description. Add them back and you have something a busy person can act on without having to do the framing themselves. That framing is the work.

## Frameworks outlast clever answers

The most useful thing I have built was never a single sharp analysis. It was a repeatable way of turning scattered, multi-source data into a read that holds up the next time someone asks.

When I joined a team with its intelligence trapped in spreadsheets and individual memory, the valuable output was not one good dashboard. It was the standard procedures, the validation steps, and the single agreed source of truth that meant the same question got the same trustworthy answer in six months, run by someone else. A risk-based framework points attention where the exposure is, rather than spreading it evenly on a routine cycle. That is intelligence as a system, not a one-off.

Clever answers impress once. Frameworks keep paying out, which is what an organisation is actually buying when it hires for this.

## Say what you would do, and where you might be wrong

A recommendation has to be explicit. "Inspect these, in this order, for this reason" is intelligence. "Here is a dashboard of everything, you decide" quietly hands the hard part back to the person who asked. But an explicit recommendation also has to carry its own uncertainty and name the assumption it rests on.

I would rather say "the evidence points here, and this is the one thing that would change my mind" than offer a confident read that hides its own fragility. Stating the risk does not weaken the recommendation. It tells the decision-maker exactly where to be careful, which is the judgement they are relying on you for. A recommendation that travels with its caveats is more useful, and far more trusted, than one that pretends to be final.

## Why this is the skill that lasts

It has never been cheaper to produce the description. Tools that once took a day of scripting now return a polished chart in minutes. As the mechanical part gets cheap, the scarce part is not the analysis. It is knowing which decision is actually live, understanding what the organisation can bear to get wrong, and turning the numbers into a defensible "do this".

That skill is not in any single technique. It is built by sitting close to real decisions, watching what moves them, and being accountable for the call you recommend. Analytics will tell you what happened, and it should. Intelligence is the harder promise: here is what I would do, here is why, and here is where I could be wrong.
