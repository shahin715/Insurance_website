import HeroSection from "./sections/HeroSection"

export default function SectionRenderer({ section }) {
  switch (section.type) {

    case "hero":
      return <HeroSection data={section.data} />

    default:
      return (
        <div className="border p-4">
          Unknown section: {section.type}
        </div>
      )
  }
}

