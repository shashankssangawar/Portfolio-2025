import Link from 'next/link'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

const ProjectCard = ({ project }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="h-full group relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg ">
        <Image
          src={project.images?.[0]}
          alt={project.title}
          width={4000}
          height={4000}
          className='w-full h-64 -mt-6 object-cover'
        />
        <CardHeader>
          <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-5">{project.description}</p>
          {project.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
              {
                project?.tags?.length > 3 && (
                  <Badge variant="secondary">
                    +{project?.tags?.length - 3} more
                  </Badge>
                )
              }
            </div>
          )}
          <button
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium
          bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            View Project
          </button>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard
