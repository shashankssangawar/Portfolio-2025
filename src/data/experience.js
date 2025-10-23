import { Badge } from "@/components/ui/badge";

const experience_data = [
  {
    timeline: 'Aug 2025 — Present',
    role: 'Software Developer',
    company: 'Masys Tech Solution Pvt. Ltd.',
    description: 'Designing, developing, and deploying scalable web and SaaS applications using modern full-stack technologies. Successfully developed and deployed two web applications within a month, contributing directly to increased company revenue and client satisfaction.',
    badges: [
      'Software Design',
      'Software Infrastructure',
      'Full-Stack Development',
      'System Administration',
    ],
    technologies: [
      { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
      { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
      { name: "MariaDB", logo: "https://cdn.worldvectorlogo.com/logos/mariadb.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" },
      { name: "Apache", logo: "https://cdn.worldvectorlogo.com/logos/apache-13.svg" },
    ],
  },
  {
    timeline: 'Nov 2023 — Aug 2025',
    role: 'Full-Stack Developer (Freelance)',
    company: 'Appniche Technologies',
    description: 'Expanded front-end expertise with API calls, SSR, state management, and UI development. Built multiple web applications and apps for clients in collaboration with colleagues, learning advanced front-end and full-stack practices through hands-on projects.',
    badges: [
      'React.js',
      'React Native',
      'Next.js',
      'Electron.js',
      'Express.js',
      'MERN Stack',
      'PostgreSQL',
      'MariaDB',
    ],
    technologies: [
      { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
      { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
      { name: "Next.js", logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
      { name: "MariaDB", logo: "https://cdn.worldvectorlogo.com/logos/mariadb.svg" },
      { name: "Tailwind CSS", logo: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg" },
      { name: "Apache", logo: "https://cdn.worldvectorlogo.com/logos/apache-13.svg" },
      { name: "PostgreSQL", logo: "https://cdn.worldvectorlogo.com/logos/postgresql.svg" },
      { name: "Nginx", logo: "https://cdn.worldvectorlogo.com/logos/nginx-1.svg" },
      { name: "Netlify", logo: "https://cdn.worldvectorlogo.com/logos/netlify.svg" },
      { name: "Vercel", logo: "https://cdn.worldvectorlogo.com/logos/vercel.svg" },
      { name: "Astro.js", logo: "https://cdn.worldvectorlogo.com/logos/astrojs.svg" },
      { name: "Arch Linux", logo: "https://cdn.worldvectorlogo.com/logos/arch-linux-logo.svg" },
      { name: "Electron.js", logo: "https://cdn.worldvectorlogo.com/logos/electron-1.svg" },
      { name: "Git", logo: "https://cdn.worldvectorlogo.com/logos/git.svg" },
      { name: "Github", logo: "https://cdn.worldvectorlogo.com/logos/github-icon-2.svg" },
      { name: "Postman", logo: "https://cdn.worldvectorlogo.com/logos/postman.svg" },
      { name: "MongoDB", logo: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-2.svg" },
      { name: "Neovim", logo: "https://cdn.worldvectorlogo.com/logos/neovim.svg" },
    ],
  },
  {
    timeline: 'Jul 2021 — Nov 2023',
    role: 'Back-End Developer',
    company: 'Finoplex',
    description: 'Served as lead back-end developer for a FinTech project, managing system design, deployments, and micro-services. Explored extensive back-end development domains and handled end-to-end server-side operations.',
    badges: [
      'Python',
      'Flask',
      'Kubernetes',
      'Docker',
      'Linux',
      'System Administration',
      'React.js',
      'React Native',
    ],
    technologies: [
      { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
      { name: "Flask", logo: "https://cdn.worldvectorlogo.com/logos/flask.svg" },
      { name: "Kubernetes", logo: "https://cdn.worldvectorlogo.com/logos/kubernets.svg" },
      { name: "MariaDB", logo: "https://cdn.worldvectorlogo.com/logos/mariadb.svg" },
      { name: "Apache", logo: "https://cdn.worldvectorlogo.com/logos/apache-13.svg" },
      { name: "Nginx", logo: "https://cdn.worldvectorlogo.com/logos/nginx-1.svg" },
      { name: "Docker", logo: "https://cdn.worldvectorlogo.com/logos/docker.svg" },
      { name: "Postman", logo: "https://cdn.worldvectorlogo.com/logos/postman.svg" },
    ],
  },
];

export const EXPERIENCE = experience_data?.map((item) => ({
  title: item.timeline,
  content: (
    <div>
      <h1 className="font-semibold text-4xl">{item?.role}</h1>
      <h2 className="text-foreground/80 text-lg">{item?.company}</h2>
      <p className="mb-4 text-sm md:text-base font-light text-muted-foreground">
        {item?.description}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {
          item?.badges?.map((b, idx) => (
            <Badge key={idx} variant={'outline'}>
              {b}
            </Badge>
          ))
        }
      </div>
      <div className="grid lg:grid-cols-8 md:grid-cols-5 grid-cols-3 gap-4 mt-4">
        {
          item?.technologies?.map((t, idx) => (
            <img
              key={idx}
              src={t.logo}
              alt={t.name}
              className="h-20 w-full object-contain rounded-lg bg-card shadow hover:shadow-2xl dark:hover:scale-110 hover:duration-300 transition-all p-2"
              title={t.name}
              aria-label={t.name}
            />
          ))
        }
      </div>
    </div>
  ),
}));
