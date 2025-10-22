export const metadata = {
  title: `Projects`,
  description: "Browse through my collection of web development projects showcasing full-stack applications, interactive tools, and innovative solutions built with modern technologies.",
  keywords: 'web development projects, portfolio projects, full stack applications, react projects, next.js applications, javascript projects, software engineering portfolio',
  openGraph: {
    title: `Projects`,
    description: "Browse through my collection of web development projects showcasing full-stack applications, interactive tools, and innovative solutions built with modern technologies.",
    type: 'website',
  },
};

import { Suspense } from 'react';
import ProjectsPageClient from './components/projects-page-client';

export default function Projects() {
  return (
    <Suspense fallback={<div className='w-full min-h-screen h-full flex items-center justify-center'>Loading search...</div>}>
      <ProjectsPageClient />
    </Suspense>
  );
};
