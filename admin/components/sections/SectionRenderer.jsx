import HeroSection from "./HeroSection";

export default function SectionRenderer({ section }) {
  if (!section) return null;

  const type = section.type?.toLowerCase();

  if (type === "hero") {
    return <HeroSection data={section.data} />;
  }

  return null;
}


