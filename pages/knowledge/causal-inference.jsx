import KnowledgeLayout from "@/components/knowledge/KnowledgeLayout";
import { useI18n } from "@/contexts/I18nContext";
import { getContent } from "@/components/knowledge/content/causal-inference";
import { getSkillsForTopic } from "@/lib/topic-skills-loader";

export async function getStaticProps({ locale = "en-AU" }) {
  const relatedSkills = getSkillsForTopic("causal-inference");
  return { props: { relatedSkills } };
}

export default function CausalInferenceKnowledgePage({ relatedSkills = [] }) {
  const { locale = "en-AU" } = useI18n();
  const { Body, ...meta } = getContent(locale);

  return (
    <KnowledgeLayout {...meta} relatedSkills={relatedSkills}>
      <Body />
    </KnowledgeLayout>
  );
}
