import { Globe, Code2, Server, GitBranch, Database, Brain } from "lucide-react"

export const TECHSTACKS = [
  {
    category: 'Web Frameworks',
    technologies: ['NextJS', 'Django', 'Flask', 'AstroJS', 'SvelteJS', 'Fiber', 'Go'],
    icon: Globe,
  },
  {
    category: 'Programming Languages',
    technologies: ['Python', 'Javascript', 'Typescript', 'Golang', 'Rust'],
    icon: Code2,
  },
  {
    category: 'Web Servers',
    technologies: ['Apache', 'Nginx', 'Kubernetes', 'Gunicorn'],
    icon: Server,
  },
  {
    category: 'Development & Testing Environment',
    technologies: ['Git', 'Github', 'Postman', 'Github actions', 'Arch Linux'],
    icon: GitBranch,
  },
  {
    category: 'Databases',
    technologies: ['Mariadb', 'PostgreSQL', 'MongoDB', 'CouchDB', 'PouchDB', 'IndexedDB', 'Xata', 'Pocketbase'],
    icon: Database,
  },
  {
    category: 'Machine Learning / AI Stack',
    technologies: ['Keras', 'Pytorch', 'OpenCV', 'Pandas', 'Scikit-Learn', 'Tensorflow', 'Hugging Face', 'Sentence Transformer'],
    icon: Brain,
  },
];
