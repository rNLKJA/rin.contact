---
title: "I Let Claude Build My Blog. Here's What Happened."
date: "2026-06-08"
tags: ["meta", "ai", "engineering", "philosophy"]
description: "94 pages, 6 months of iteration, and one weekend where an AI agent built the blog, RSS feed, newsletter backend, and dark mode. A reflection on building with AI."
---

A blog is one of those things every developer puts on their roadmap and then quietly ignores for two years. It sat on mine as _"Marketing: Consider blog + RSS + newsletter"_ — priority 3, forever backlog.

Then Claude shipped the entire thing in a weekend.

## The setup

rin.contact started as a single-page HTML resume and grew — through six months of late nights and between-meeting commits — into 94 pages of interactive data stories, CLI tools, Easter eggs, and a design system I actually enjoy looking at. Somewhere along the way it crossed the line from "portfolio" to "playground," and a blog became the obvious next piece.

The problem wasn't the writing. The problem was everything else: Markdown compilation, frontmatter parsing, flow-diagram support, RSS generation, newsletter backend, navigation integration, SEO, dark mode, route design, and the fifty micro-decisions that separate a blog that works from a blog that you _plan_ to build.

So I ran an experiment. I gave Claude Opus — Anthropic's most capable reasoning model — the entire Linear backlog and said: _if a job is complete, mark it, commit, check the next task, and work on it._

It executed like this:

```flow
step Dark mode gaps
step Blog scaffolding
step Markdown + flow diagrams
step RSS feed
step Newsletter backend
step CSS cleanup
step Service worker fix
step Deploy to Vercel
```

Six tasks. Three commits per task. Zero regressions.

## What Claude actually built

Not a template. Not a starter. The full thing:

- **Blog pages**: `/blog` listing with paginated post cards and `/blog/[slug]` for individual posts, using Next.js `getStaticProps` and `getStaticPaths`
- **Markdown pipeline**: `gray-matter` for frontmatter, `remark` + `remark-html` for compilation, a custom remark plugin that transforms ` ```flow ` blocks into self-contained, on-brand diagrams at build time
- **RSS feed**: `/blog/feed.xml` via `getServerSideProps`, following the same pattern as the existing sitemap generator, with proper XML namespaces
- **Newsletter backend**: Provider-agnostic API route supporting Buttondown, ConvertKit, Mailchimp, generic webhooks, and Vercel KV self-hosting — all driven by a single env var
- **Dark mode on 50+ sub-pages**: Every `pages/ds/*`, `pages/fun/*`, and `pages/info/*` wrapper, plus form inputs, modals, and design-system components that had been missed in the first dark mode pass
- **Navigation integration**: Header, footer, sitemap, and human-readable site-map all updated to include the blog section

All 87 pages still build. The CSS bundle shrank 400 bytes in the process. The service worker stopped throwing errors.

## The meta-layer

Here's what I found interesting, and it's the reason I wanted to write this before any actual "data science" blog post:

**Claude didn't just write code.** It read the existing codebase — all 94 pages — understood the Nothing/Wisr design tokens, the Tailwind `dark:` pattern, the component composition model, and the `getStaticProps`/`getServerSideProps` data flow. Then it extended the system without breaking it.

When I said "dark mode doesn't work as expected," it grep'd fifty `bg-white` wrappers missing `dark:` variants and batch-fixed them. When `cache.addAll()` threw in dev mode, it replaced the entire precache strategy with a self-destructing service worker. It didn't ask what that error meant — it already knew.

This is the part people miss about AI-assisted development. The value isn't autocomplete. It's not even writing functions from scratch. It's the ability to say: _"there's an error in the console"_ and have an agent grep 60 files, identify the root cause across the entire stack (SW bytecode caching in Chrome → `addAll` semantics → dev-mode transient SSR failures), apply a fix, verify the build, and commit — all in under three minutes.

## The role of this blog

I plan to use this space for:

1. **Data science explainers** with interactive widgets — the kind of thing I build in the `/ds` and `/lab` sections
2. **Architecture notes** on maintaining a 94-page Next.js site as a solo developer
3. **Analytics in government** — a lot of what I do at SAPOL doesn't fit in a tweet, but it does fit in a blog post
4. **Experiments with AI tooling** — because if the last weekend taught me anything, it's that the tools are moving faster than most people realise

No publishing schedule. No SEO playbook. Just the same principle that drives the rest of this site: continuous improvement, a commitment to building things that compound, and the occasional flow diagram.

## A note on authorship

This post was drafted by Claude (Anthropic's Opus model) based on the work session that built the blog infrastructure. The decisions — what to build, how to build it, which patterns to follow — were human. The execution, from scaffolding `lib/posts.js` to deploying on Vercel, was a collaboration. The words above were shaped by Claude, reviewed by me, and edited until they sounded right.

Which is, I suppose, the most honest way to introduce a blog that was written partly by the same system that built it.

---

_The blog infrastructure described in this post was built by Claude Opus 4.8 (Anthropic), directed by Rin Huang, over a single work session spanning 14 Linear tasks. The code is open-source at [github.com/rNLKJA/rin.contact](https://github.com/rNLKJA/rin.contact)._
