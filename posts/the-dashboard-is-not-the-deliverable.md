---
title: "The Dashboard Is Not the Deliverable"
date: "2026-06-23"
tags: ["data-science", "communication", "decision-making", "continuous-improvement"]
description: "Early on I thought the chart was the work. It took a few years of building analysis for people who had to act on it to learn that the real output is a decision, not a dashboard."
---

For my first couple of years working with data, I quietly believed the chart was the point. If the model was sound, the query was efficient, and the dashboard was clean, I had done my job. Whether anyone did anything with it afterwards felt like someone else's problem.

I was wrong, and the correction was useful.

## The thing nobody acts on

The clearest lesson came from building analysis for people who had to make a call by the end of the day. A well-made dashboard would land, get a polite nod, and then nothing would change. No decision moved. Meanwhile a single sentence with one number in it would get acted on within the hour.

The difference was never the quality of the analysis. It was whether the output answered a question someone actually had in front of them. A dashboard that shows everything answers nothing in particular. A decision-maker doesn't need the whole landscape. They need the one fork in the road they are standing at, and a clear read on which way the evidence points.

## Working backwards from the decision

So I changed where I start. Before I open a notebook, I try to write down the decision the work is meant to serve, in plain words:

- What choice is this person about to make?
- What would change their mind one way or the other?
- What is the smallest piece of evidence that would let them choose well?

```flow
step Decision to be made
step What would change the call?
step Smallest evidence that settles it
step Analysis
step One clear read + its uncertainty
loop back to the decision
```

The loop runs backwards from how I used to work. I no longer begin with the data I have and look for something interesting in it. I begin with the choice, and let that decide what is worth measuring. Most of the time the answer is far less than I would have built if left to my own curiosity.

## Honesty about uncertainty is part of the job

There is a temptation, when you finally have someone's attention, to sound more certain than you are. Resist it. The fastest way to lose a decision-maker's trust is to be confidently wrong once. I would rather say "the evidence leans this way, but here is what could flip it" than hand over a clean number that hides its own fragility.

Stating uncertainty plainly does not weaken the work. It tells the person where to be careful, which is exactly the kind of judgement they are paying for. A result that travels with its own caveats is more useful than one that pretends to be final.

## Why this matters more now, not less

It is easier than ever to produce a chart. Tools that used to take a day of scripting now return something polished in minutes. When the mechanical part of the work gets cheap, the scarce part is not the chart. It is knowing which question is worth asking, and turning the answer into something a busy person can act on without misreading it.

That skill does not live in any single technique. It is built by sitting close to real decisions and watching what actually moves them. The chart is the easy part. The deliverable is the decision it lets someone make.

If I could hand my earlier self one note, it would be short. Stop polishing the dashboard. Go and find out what someone is trying to decide, and make that one thing clearer than it was before you arrived.
