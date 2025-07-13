import { Card, CardHeader, CardContent } from "@/components/ui/card"

const SkillCard = ({ skill }) => {
  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50">
      <CardHeader>
        {skill.icon && <div className="mb-2 text-primary">{skill.icon}</div>}
        <h3 className="text-xl font-semibold tracking-tight">{skill.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{skill.description}</p>
      </CardContent>
    </Card>
  )
}

export default SkillCard

