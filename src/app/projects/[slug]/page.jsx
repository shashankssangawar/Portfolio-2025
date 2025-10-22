import { projectsData } from '@/data/projects';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProjectClientPage from './components/ProjectClientPage';

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound()
  }

  return (
    <Suspense fallback={<div className='w-full min-h-screen h-full flex items-center justify-center'>Loading search...</div>}>
      <ProjectClientPage project={project} />
    </Suspense>
  );
}
