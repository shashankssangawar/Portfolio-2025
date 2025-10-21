import Link from 'next/link'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ProjectCard = ({ project }) => {
  return (
    <Card className="group relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg ">
      <CardHeader>
        <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-5">{project.description}</p>
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium
          bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Project
        </Link>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
