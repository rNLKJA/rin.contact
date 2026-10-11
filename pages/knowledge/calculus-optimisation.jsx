import KnowledgeLayout from "@/components/knowledge/KnowledgeLayout";
import { useI18n } from "@/contexts/I18nContext";
import { getContent } from "@/components/knowledge/content/calculus-optimisation";
import { getSkillsForTopic } from "@/lib/topic-skills-loader";

export async function getStaticProps() {
  const relatedSkills = getSkillsForTopic("calculus-optimisation");
  return { props: { relatedSkills } };
}

export default function CalculusOptimisationKnowledgePage({ relatedSkills = [] }) {
  const { locale = "en-AU" } = useI18n();
  const { Body, ...meta } = getContent(locale);

  return (
    <KnowledgeLayout {...meta} relatedSkills={relatedSkills}>
      <Body />
    </KnowledgeLayout>
  );
}
