---
title: "Fix the Data Before You Touch the Model"
date: "2026-11-07"
tags: ["data-science", "government", "decision-making", "data-governance"]
description: "Data is everywhere and worth little on its own. Turning it into decisions depends far more on the quality, lawful handling and sharing of the inputs than on the cleverness of the algorithm."
---

Data is everywhere. Every form submitted, every system log and every sensor reading adds another row somewhere. On its own, none of it means very much. A table of a million records answers no question until someone shapes it into an answer, and most organisations already hold far more data than they will ever turn into a decision.

I find it useful to think in three stages. Data is the raw record of what was captured. Information is that record cleaned, labelled and put in context, so it can answer a factual question such as how many, where and since when. Intelligence is information weighed against a decision someone has to make, with its risks and its uncertainty attached. I wrote about that last step in [Analytics Tells You What Happened](/blog/analytics-tells-you-what-happened). This post is about the first two, because that is where most of the value is quietly won or lost.

```flow
step Data: raw records from many systems
step Quality and integrity checks
step Information: clean, labelled, in context
step Intelligence: weighed against a decision
step Decision
note Legislation, privacy and the FAIR principles apply at every step
```

## Rubbish in, rubbish out

An analysis behaves like a function. Give it the same input and it returns the same output, faithfully, whether the input was right or wrong. A model has no way of knowing that a date field was entered in two formats, that one region stopped reporting in March, or that a category was renamed halfway through the year. It will process all of that with complete confidence and hand back a number that looks precise.

This is why I spend more time on data quality than on modelling. Quality means the values are accurate, complete and consistent with how they were defined. Integrity means they stay that way as they move between systems, so a record is not silently dropped, duplicated or altered along the way. Neither is glamorous work. Both decide whether the chart at the end of the pipeline is honest.

## Change the data, keep the algorithm

Something I have come to believe more firmly over the past year is that, in most cases, the algorithm should stay the same and the data should change. When a result looks wrong, the instinct is to reach for a more sophisticated model. Usually the better move is to go back to the inputs, fix the definitions, fill the gaps and remove the duplicates, then run the same well-understood method again.

Machine learning researchers call this data-centric AI. In public-sector analysis it has a practical advantage beyond accuracy. A stable, documented method is easier to explain, easier to audit and easier for someone else to rerun next year. Each time the algorithm changes, every past result has to be questioned again. When the data improves and the method holds still, the improvement shows up as better answers to the same question, and decision-makers can compare those answers over time.

## Shared data gives better answers

The largest gains come from data that is joined up across organisations. One agency sees part of a person's or a place's story, another agency sees a different part, and neither sees the whole pattern alone. The same method applied to unified data simply has more to work with.

Unifying data is harder than it sounds. Take two agencies that both record a location. One stores a free-text address and the other stores a geocoded point. Before either dataset can inform the other, both need a shared definition of what a location is, a common identifier, and an agreed way of handling records that do not match. That agreement is mostly organisational work, and it pays off for every analysis that follows.

## Compliance comes first

None of this is worth doing if it breaks the law or the trust of the people the data describes. In Australia, Commonwealth agencies work under the Privacy Act 1988 and its Australian Privacy Principles, and South Australian agencies follow the state's Information Privacy Principles. Sharing between public bodies has its own legislation as well, such as the Public Sector (Data Sharing) Act 2016 in South Australia and the Data Availability and Transparency Act 2022 at the Commonwealth level. Compliance sets the boundary the work happens inside, so it belongs at the start of a project and not in a review at the end.

The FAIR principles are a useful companion to the legal rules. Published in 2016, they ask that data be Findable, Accessible, Interoperable and Reusable. Findable means someone can discover that the data exists. Accessible means there is a clear way to obtain it, which can include logins and conditions of use. Interoperable means it uses shared formats and vocabularies, so it can be combined with other data. Reusable means it carries enough documentation and licensing for someone else to use it properly. FAIR data can still be restricted. What the principles ask for is good description and clear governance, and those are the same things that make sharing across agencies possible.

## Release as much as you safely can

The other lesson I have taken on recently is that sensitive data should be de-identified and released as widely as is safe, instead of being kept closed by default. Public data lets researchers, journalists and community groups check the work, ask their own questions and find problems the original team missed. Every useful question answered outside the agency is one the agency did not have to answer itself.

De-identification takes more than deleting names. A postcode, an age and a date can together identify a person in a small community, even when each field looks harmless alone. Safe release usually means aggregating to a level where individuals disappear, suppressing small counts, and testing the output for re-identification risk before it goes out. The Five Safes framework, used by the Australian Bureau of Statistics among others, helps weigh this. It asks whether the project, the people, the setting, the data and the outputs are each safe, and it treats openness and protection as settings to balance case by case.

## Where the decision is made

The decision is the last and smallest step in the pipeline. By the time a manager reads a recommendation, its quality has already been settled by whether the records were accurate, whether they could be lawfully joined, and whether the definitions meant the same thing in every system. That early work is where I would invest first.
