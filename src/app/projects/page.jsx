import { Suspense } from 'react';
import ProjectsPageClient from './components/projects-page-client';

export default function Projects() {
  return (
    <Suspense fallback={<div className='w-full min-h-screen h-full flex items-center justify-center'>Loading search...</div>}>
      <ProjectsPageClient />
    </Suspense>
  )
}

