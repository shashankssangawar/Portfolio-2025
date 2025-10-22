'use client'

import Link from 'next/link';
import ProjectImageHeader from './ProjectImageHeader';
import { useState } from 'react';
import ProjectImageGallery from './ProjectImageGallery';
import { Separator } from '@/components/ui/separator';

export default function ProjectClientPage({ project }) {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <ProjectImageHeader project={project} setShowGallery={setShowGallery} />
      </div>
      <Separator />
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className="py-4">
          <h1 className="md:text-2xl text-lg font-bold mb-6">Project Description</h1>
          <p className="md:text-base text-sm mb-8 text-muted-foreground">{project.description}</p>
        </div>

        <ProjectImageGallery
          images={project.images}
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
        />
      </div>
    </>
  )
}

