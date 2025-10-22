import { projectsData } from '@/data/projects';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProjectClientPage from './components/ProjectClientPage';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  const tags = [];
  project?.tags?.map((tag) => tags?.push(tag));
  const heroImage = project?.images[0];

  if (!project) {
    return {
      title: `Project Not Found`,
      description: 'The project you are looking for does not exist.'
    };
  }

  return {
    title: project.title,
    description: project.description,
    authors: [{ name: `Shashank Sangawar` }],
    keywords: tags,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [heroImage],
    },
  };
}

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
