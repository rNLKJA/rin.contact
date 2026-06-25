---
title: "I Built an AI Fact-Checker for Climate Claims. Here's What I Learned."
date: "2024-06-01"
tags: ["nlp", "ai", "engineering", "data-science", "climate"]
description: "Building a Transformer-based fact-checking system for climate change claims from scratch — no pretrained models, no BERT, no shortcuts. A COMP90042 NLP project retrospective."
---

Climate change is one of the most polarising topics of our time. Claims and counter-claims flood social media, news articles, and political speeches. Separating what's supported by evidence from what isn't — at scale — is a problem begging for an automated solution.

In 2024, as part of COMP90042 (Natural Language Processing) at the University of Melbourne, my team built exactly that. Here's how it went.

## The project

The goal was straightforward: given a climate change claim, retrieve relevant evidence from a knowledge corpus and classify the claim into one of four categories:

- **SUPPORTS** — the evidence backs the claim
- **REFUTES** — the evidence contradicts the claim
- **NOT_ENOUGH_INFO** — the evidence is insufficient to judge
- **DISPUTED** — the evidence conflicts within itself

## The constraint that made it interesting

Here's the catch: **no pretrained models allowed.** No Word2Vec embeddings. No BERT. No GPT. No transfer learning from any pre-existing language model.

Everything had to be trained from scratch.

This constraint — imposed by the course to ensure we understood the fundamentals — is what made the project genuinely educational. You can't just `from transformers import pipeline` and call it a day. You have to build the pipeline, understand the tokenisation, feel the pain of training a Transformer on a college student's computing budget.

The permitted tooling: PyTorch, TF-IDF, and traditional NLP libraries. The architecture had to be an RNN, LSTM, GRU, or Transformer. We chose the latter.

## The architecture

Our system had two stages, mirroring how a human fact-checker works:

**Stage 1: Evidence retrieval (TF-IDF).** Given a claim, we needed to find the most relevant passages from the evidence corpus. TF-IDF vectorisation with cosine similarity turned out to be surprisingly effective here. The vocabulary overlap between climate claims and their supporting evidence is high enough that a bag-of-words approach does meaningful retrieval without any neural complexity.

**Stage 2: Claim classification (Transformer).** Once we had the top-N evidence passages, we fed them into a Transformer classifier trained from scratch. The model learned to attend to the relationship between claim text and evidence text, outputting one of the four labels.

```flow
join Cosine similarity
  from Claim → TF-IDF vectoriser
  from Evidence corpus → TF-IDF index
step Top-K passages
step Transformer classifier
step SUPPORTS / REFUTES / NOT_ENOUGH_INFO / DISPUTED
```

## The dataset

The project came with a curated dataset of climate change claims, each annotated with ground-truth evidence IDs and labels. A separate evidence corpus provided the passage-level knowledge base the system could query. Training and development sets were labelled; the test set was submitted to a Codalab competition for blind evaluation.

The evaluation used three metrics:

1. **Evidence retrieval F-score** — how well we retrieved the right passages
2. **Claim classification accuracy** — how often we got the label right
3. **Harmonic mean of F-score and accuracy** — the primary ranking metric

## What I learned

**TF-IDF is underrated.** In an era of dense vector embeddings, it's easy to forget that a well-tuned sparse retrieval method can be remarkably effective — especially when the domain vocabulary is consistent. The evidence passages and claims share a common lexicon of climate terminology that TF-IDF exploits naturally.

**Training a Transformer from scratch is expensive.** Even a small Transformer takes non-trivial compute to converge. On a Colab instance (which was our constraint), we had to be deliberate about hyperparameters, batch size, and early stopping. There was no throwing compute at the problem.

**The retrieval stage is the bottleneck.** No matter how good your classifier is, if the evidence retriever returns irrelevant passages, the classifier has nothing useful to work with. We spent as much effort tuning the retrieval stage as the classification stage — a lesson that carries to any two-stage NLP system.

## Team

This was a group effort with **Xuan Wang** and **Wei Zhao**, both talented engineers I had the privilege of working with. The project repository, including our main notebook and report, is available on GitHub at [github.com/rNLKJA/Automated-Fact-Checking-System-for-Climate-Change-Claims](https://github.com/rNLKJA/Automated-Fact-Checking-System-for-Climate-Change-Claims).

## Reflection: then vs. now

Looking back from mid-2026, what strikes me is how much the landscape has shifted. The constraint that made this project hard — no pretrained models — is now almost unimaginable in production NLP. Today, I'd reach for a Claude or GPT-4 with a retrieval-augmented generation pipeline and have a prototype running in an afternoon.

But I'm glad I built it the hard way first. Understanding why attention mechanisms work, what a Transformer actually computes, and where the bottlenecks live in a two-stage retrieval-classification pipeline — these are insights that don't expire when the next model ships. They're the difference between someone who can *use* an AI system and someone who can *build* one.

The full project report, including our final Codalab results, is in the repository's PDF. If you're interested in NLP fact-checking, climate misinformation analysis, or just want to see what a from-scratch Transformer looks like — it's all there, open-source under MIT.

---

*Project completed for COMP90042 (Natural Language Processing), University of Melbourne, Semester 1 2024. Team: Xuan Wang, Wei Zhao, Sunchuangyu Huang. Repository available at [github.com/rNLKJA/Automated-Fact-Checking-System-for-Climate-Change-Claims](https://github.com/rNLKJA/Automated-Fact-Checking-System-for-Climate-Change-Claims).*
