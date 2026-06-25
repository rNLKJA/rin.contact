---
title: "A Forecast Is a Statement About Uncertainty, Not the Future"
date: "2026-06-24"
tags: ["data-science", "statistics", "decision-making", "forecasting"]
description: "People want a forecast to tell them what will happen. The useful thing a forecast actually does is tell you how sure you are allowed to be, which is what lets someone make a careful decision."
---

What drew me to data work in the first place was forecasting. Not the description of what already happened, which is the bulk of analytics, but the harder and more useful thing: a defensible statement about what might happen next. Years of building these has changed what I think a forecast is for, and it is almost the opposite of what people ask for when they request one.

People ask a forecast to tell them the future. A good forecast refuses. What it offers instead is a careful account of how uncertain the future is, and that account is the part that actually helps someone decide.

## The point estimate is the least important number

Ask for a forecast and you will be handed a line: theft will be down four per cent next quarter, the commodity price will rise, the trend continues. That single number, the point estimate, is the part everyone fixates on and the part that matters least.

It matters least because it is almost certainly wrong in its exact value, and everyone knows it, and pretending otherwise helps no one. What matters is the range around it. A forecast that says "down four per cent, and I would not be surprised by anything between down twelve and up four" is telling you something honest and usable. A forecast that says "down four per cent" full stop is telling you a story.

I learned this most concretely working on climate and commodity forecasting at CSIRO, where the whole question was how a climate pattern might amplify price volatility and food-security risk years out. Nobody sane wanted a single number for something that uncertain. They wanted to know how wide the cone of possibilities was, and whether it was widening.

## Honest forecasting is mostly about the interval

So the real work of forecasting is not squeezing the point estimate closer to some imagined truth. It is being honest about the interval around it.

A few habits make that honesty concrete. Project the trend forward, but widen the band as you go, because confidence decays with distance and a forecast that stays equally confident ten steps out is lying. Separate the recurring seasonal swing from the underlying movement, so you are not fooled by a pattern that repeats every year. And mark the forecast as indicative rather than settled when there is too little history to support it, instead of laundering a guess through a model and presenting it as precision.

```flow
step History
split Trend + seasonality
  branch Point estimate
  branch Widening prediction interval
step A careful decision
```

In the products I build now, every forecast carries that interval with it, on the chart as a widening cone and in the numbers behind it. The point estimate is there, but it travels with the honest statement of how much to trust it.

## Why the interval is the useful part

A decision-maker does not actually need to know the future. They need to know how much room to leave for being wrong.

If the interval is narrow, you can plan tightly. If it is wide, you build in slack, or you buy more information before committing, or you make a reversible decision instead of an irreversible one. The width of the forecast is what tells you which of those is sensible. Strip it away and hand over a confident point estimate, and you have taken away the one thing that would have let the person manage their own risk.

This is also why a forecast and a guarantee are different things, and why anyone promising the former while implying the latter should worry you. The value was never in claiming to know. It was in measuring how much we do not.

## What it changes about the work

The practical effect is that I spend more time on the uncertainty than on the central estimate, and I report it plainly even when it is uncomfortable. "Here is my best guess, and here is how wrong it could reasonably be" is a harder sentence to say than a confident number, and it is the one that earns trust, because it is the one that holds up when the future arrives and does not match the guess.

Seeing around corners was the thing that pulled me into this work. It turns out that seeing around corners does not mean knowing what is there. It means having an honest sense of how much could be, and giving someone enough of that sense to step carefully.
