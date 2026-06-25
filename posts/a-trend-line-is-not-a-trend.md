---
title: "A Trend Line Is Not a Trend"
date: "2026-06-25"
tags: ["statistics", "data-science", "decision-making", "government"]
description: "Drawing a line through some points always produces a trend. Whether that movement is real, or just noise dressed up as a finding, is a separate question, and the one that should decide whether anyone acts on it."
---

Give me any series of numbers and I can draw a line through them. Fit a straight line, connect the dots, add a smooth curve, and there it is: a trend, pointing up or down, ready for a slide. The line will look convincing, because lines always do. That is exactly the problem. The line is not evidence that anything is actually moving. It is evidence that I know how to draw a line.

The question that matters is not "what is the trend." It is "is this movement real, or is it noise I have dressed up as a finding." Those are different questions, and most of the damage in data work comes from answering the first while pretending you answered the second.

## Why the eye is a bad judge

Human eyes are pattern-finding machines, and they do not have an off switch. Show someone a random walk and they will see momentum, reversals, and a story. Crime figures, case numbers, demand for a service: these wobble from month to month for reasons that have nothing to do with any underlying change, and the wobble is more than enough to draw a confident line through. Read three rising months as a trend and you will commit resources to a movement that was never there.

So before I report a trend, I want something more disciplined than "it looks like it is going up." I want a test that asks, honestly, whether the series tends to move in one direction more than chance would produce.

## What a trend test actually does

A trend test does one careful thing: it checks whether the values tend to rise or fall through time more consistently than random noise would. The version I reach for most, the Mann-Kendall test, does this by comparing every point with the ones that came before it and counting how often later values are higher rather than lower. It does not assume the trend is a straight line, and it does not assume the data follow a neat bell curve, which matters because real operational data almost never do.

```flow
step Monthly series
decision Is the movement more than noise?
  branch yes -> Estimate the slope robustly, report the trend with its rate
  branch no -> Leave the line off, and say why
```

If the series genuinely drifts in one direction, those comparisons pile up and the test says the movement is unlikely to be chance. If the series is just noisy, the comparisons roughly cancel, and the honest answer is "no trend you can stand behind." That second answer is the valuable one, because it stops you acting on a pattern that was only ever in your eyes.

## The size of the move, separately

Knowing a trend is real is not the same as knowing how big it is, and the two should be estimated separately. For the size, I use a slope estimate that is robust to outliers, the Sen slope, which takes the median of the slopes between all pairs of points rather than letting one strange month drag the whole estimate around. A single spike, a data-entry error, a one-off event, none of them get to define the rate of change. The result is a figure you can report as "about this much per year" without it being hostage to the worst point in the series.

So a real finding has two parts the eye blurs together: whether there is a trend at all, and if so, how steep. Keeping them separate is most of the discipline.

## Why this matters more in public work

In a business, over-reacting to a noisy uptick costs you some wasted effort. In public work, the same mistake can move resources away from where they are actually needed, or put a number into a statement the data never supported. The cost of seeing a trend that is not there is carried by people who had no say in the analysis.

That is why I would rather report "the movement this quarter is within what noise produces, so I would not act on it yet" than hand over a confident line. The first sentence is harder to say and far more useful. It protects the decision-maker from their own pattern-finding, and from mine.

## The honest version of a trend

A trend line is a drawing. A trend is a claim, and a claim needs evidence: that the movement is more than noise, and that its size is estimated in a way one bad month cannot hijack. When both of those hold, the line on the chart finally means something. When they do not, the most professional thing I can do is leave the line off the slide and say so.

In the tools I build now, every trend carries that test with it. The line is there, but it travels with the honest statement of whether it is real, the same way a forecast should travel with its interval.

---

_This is the trend-testing approach behind Signal, which applies it to public crime statistics. See the [case study](/projects/signal) for how it fits together._
