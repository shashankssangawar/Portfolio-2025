import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const techStacks = [
  {
    category: 'Web Frameworks',
    technologies: ['NextJS', 'Django', 'Flask', 'AstroJS', 'SvelteJS', 'Fiber', 'Go'],
    icon: '🌐 ',
  },
  {
    category: 'Programming Languages',
    technologies: ['Python', 'Javascript', 'Typescript', 'Golang', 'Rust'],
    icon: '⚛ ',
  },
  {
    category: 'Web Servers',
    technologies: ['Apache', 'Nginx', 'Kubernetes', 'Gunicorn'],
    icon: '🌐',
  },
  {
    category: 'Development & Testing Environment',
    technologies: ['Git', 'Github', 'Postman', 'Github actions', 'Arch Linux'],
    icon: '⚡',
  },
  {
    category: 'Databases',
    technologies: ['Mariadb', 'PostgreSQL', 'MongoDB', 'CouchDB', 'PouchDB', 'IndexedDB', 'Xata', 'Pocketbase'],
    icon: '📥 ',
  },
  {
    category: 'Machine Learning / AI Stack',
    technologies: ['Keras', 'Pytorch', 'OpenCV', 'Pandas', 'Scikit-Learn', 'Tensorflow', 'Hugging Face', 'Sentence Transformer'],
    icon: '◷',
  },
]

export default function TechStacks() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 -translate-x-1/2 bg-primary opacity-10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 translate-x-1/2 bg-primary opacity-10 blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient">
          Tech Stacks
        </h1>
        <p className="text-muted-foreground text-lg">
          Cutting-edge technologies I work with to build modern solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techStacks.map((stack, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{stack.icon}</span>
                <h2 className="text-xl font-bold text-foreground/90 group-hover:text-glow">
                  {stack.category}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {stack.technologies.map((tech, techIndex) => (
                  <Badge
                    key={techIndex}
                    variant="secondary"
                    className="bg-secondary/50 hover:bg-primary/20 transition-colors duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

