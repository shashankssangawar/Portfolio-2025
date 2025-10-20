import ProjectCard from '../components/ProjectCard'
import { projectsData } from '@/data/projects'

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient">
          Projects
        </h1>
        <p className="text-muted-foreground text-md">
          Projects I have created for the clients.
          (Most of the websites mentioned are demo websites and not live website as we have signed NDAs for them)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

