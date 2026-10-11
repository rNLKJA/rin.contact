#!/usr/bin/env node
/* eslint-disable no-console -- build-time CLI script that reports what it generated */
/**
 * Generates topic-to-skills mapping for knowledge pages.
 * Reads KNOWLEDGE_SKILLS from skills-taxonomy.js (which maps topic slugs to
 * skill IDs) and builds a JSON file consumed by KnowledgeLayout at build time.
 *
 * Run during build: node scripts/generate-topic-skills.mjs
 * Output: public/data/topic-skills.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { KNOWLEDGE_SKILLS, SKILLS } from "../lib/skills-taxonomy.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public/data/topic-skills.json");

// Build the mapping: topic slug -> [{id, label}]
const mapping = {};

for (const [topicSlug, skillIds] of Object.entries(KNOWLEDGE_SKILLS)) {
  const skills = [];

  for (const skillId of skillIds) {
    // Look up the skill in SKILLS to get its English label
    const skillDef = SKILLS.find((s) => s.id === skillId);

    if (skillDef) {
      skills.push({
        id: skillId,
        label: skillDef.en,
        zh: skillDef.zh || skillDef.en,
      });
    } else {
      console.warn(
        `Warning: skill ID "${skillId}" referenced by topic "${topicSlug}" not found in SKILLS`
      );
    }
  }

  mapping[topicSlug] = skills;
}

// Ensure output directory exists
const outDir = path.dirname(OUT);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Write the JSON
fs.writeFileSync(OUT, JSON.stringify(mapping, null, 2));

console.log(
  `Generated topic-skills mapping: ${Object.keys(mapping).length} topics, written to ${OUT}`
);
