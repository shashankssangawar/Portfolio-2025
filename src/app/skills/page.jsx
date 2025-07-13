"use client";
import SkillCard from '../components/SkillCard'

const skills = [
  { title: 'System Architect', description: 'Designing and implementing complex software systems' },
  { title: 'Fullstack Dev', description: 'Proficient in both frontend and backend development' },
  { title: 'Mobile/Desktop App Dev', description: 'Creating applications for various platforms' },
  { title: 'Reverse Engineering', description: 'Analyzing and understanding existing software systems' },
  { title: 'Fintech', description: 'Developing solutions for the financial technology sector' },
  { title: 'System Administrator', description: 'Managing and maintaining computer systems and networks' },
  { title: 'Integrated Solutions Dev (IOT)', description: 'Developing solutions for Internet of Things' },
  { title: 'AI / ML Dev', description: 'Creating intelligent systems using artificial intelligence and machine learning' },
]

export default function Skills() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient">
          My Skills
        </h1>
        <p className="text-muted-foreground text-lg">
          Skills I learnt over the period.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </div>
  )
}

