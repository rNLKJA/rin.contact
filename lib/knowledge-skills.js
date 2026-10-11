/**
 * Derives which skills are supported by each knowledge topic.
 * A skill "supports" a topic if that topic appears in the skill's evidence (subjects).
 * The skills atlas (lib/skills-atlas.js) maps each skill to its evidence; we invert
 * that to get topic -> [skills].
 */

import { buildSkillsAtlas } from "./skills-atlas";
import { knowledgeSlug } from "./knowledge-index";
import { getAllPosts } from "./posts";
import en from "@/locales/en-AU.json";
import zh from "@/locales/zh-Hans.json";

/**
 * Returns a Map: topic slug -> [{id, label}] skills that cite it.
 * @param {string} locale - "en-AU" or "zh-Hans"
 */
export async function getTopicSkillsMap(locale = "en-AU") {
  const posts = await getAllPosts();
  const dict = locale === "zh-Hans" ? zh : en;
  const atlas = buildSkillsAtlas(locale, { dict, posts });

  const topicToSkills = new Map();

  for (const skill of atlas.skills) {
    // Each skill has evidence: { subjects: [...], projects: [...], ... }
    // subjects array contains subject IDs that map to knowledge topics
    const subjectIds = skill.evidence?.subjects || [];

    for (const subjectId of subjectIds) {
      // Subject IDs in the atlas match knowledge topic slugs (e.g., "applied-data-science")
      const topicSlug = subjectId;

      if (!topicToSkills.has(topicSlug)) {
        topicToSkills.set(topicSlug, []);
      }

      topicToSkills.get(topicSlug).push({
        id: skill.id,
        label: skill.label,
      });
    }
  }

  return topicToSkills;
}

/**
 * Returns skills that support a specific topic.
 * @param {string} topicSlug - e.g., "applied-data-science"
 * @param {string} locale
 */
export async function getSkillsForTopic(topicSlug, locale = "en-AU") {
  const map = await getTopicSkillsMap(locale);
  return map.get(topicSlug) || [];
}
