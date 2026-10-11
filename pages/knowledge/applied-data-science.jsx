import KnowledgeLayout from "@/components/knowledge/KnowledgeLayout";
import { useI18n } from "@/contexts/I18nContext";
import { getContent } from "@/components/knowledge/content/applied-data-science";

export async function getStaticProps({ locale = "en-AU" }) {
  // Placeholder: return dummy skills for acceptance test
  const relatedSkills = [
    { id: "python", label: "Python" },
    { id: "data-analysis", label: "Data Analysis" },
  ];
  return { props: { relatedSkills } };
}

export default function AppliedDataScienceKnowledgePage({ relatedSkills = [] }) {
  const { locale = "en-AU" } = useI18n();
  const { Body, ...meta } = getContent(locale);

  return (
    <KnowledgeLayout {...meta} relatedSkills={relatedSkills}>
      <Body />
    </KnowledgeLayout>
  );
}
