import SkillCard from "@/app/components/SkillCard";
import { SKILLS } from "@/data/skills";

export default function SkillsSection() {
  return (
    <div className={'md:p-10 p-4'}>
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Skills
        </h1>
        <p className="text-muted-foreground text-lg">
          The Journey of My Growth: Skills Specilisations Developed Over Time
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILLS.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};
