'use client';

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Image from "next/image";

const SkillCard = ({ skill }) => {
  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50">
      <CardHeader>
        {skill.image && <Image src={skill.image} width={5000} height={5000} alt={skill.title} className="w-20 h-20 object-contain bg-white rounded-2xl" />}
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold tracking-tight pb-2">{skill.title}</h3>
        <p className="text-muted-foreground">{skill.description}</p>
      </CardContent>
    </Card>
  )
}

export default SkillCard

