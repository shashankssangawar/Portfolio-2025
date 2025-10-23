import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AboutSection from "./components/AboutSection"
import SkillsSection from "./components/SkillsSection"
import TechnologySection from "./components/TechnologySection"
import ExperienceSection from "./components/ExperienceSection"
import EducationSection from "./components/EducationSection"

export default function About() {
  return (
    <div className="container mx-auto px-4 pb-16 pt-4">
      <Tabs defaultValue="about" className="w-full h-full">
        <TabsList className="w-full h-full bg-card grid md:grid-cols-5 grid-cols-2">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="technologies">Technologies</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <AboutSection />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsSection />
        </TabsContent>
        <TabsContent value="technologies">
          <TechnologySection />
        </TabsContent>
        <TabsContent value="experience">
          <ExperienceSection />
        </TabsContent>
        <TabsContent value="education">
          <EducationSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};
