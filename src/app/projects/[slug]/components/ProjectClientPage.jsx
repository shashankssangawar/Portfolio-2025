'use client'

import ProjectImageHeader from './ProjectImageHeader';
import { useState } from 'react';
import ProjectImageGallery from './ProjectImageGallery';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProjectClientPage({ project }) {
  const [showGallery, setShowGallery] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'Unsolved':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'Part‑Solved':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Solved':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Unsolved':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'Part‑Solved':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <>
      <div className='max-w-7xl mx-auto px-6 pb-8'>
        <Link href="/projects" className="pt-2 pb-8 flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Back to Projects</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <ProjectImageHeader project={project} setShowGallery={setShowGallery} />
      </div>
      <Separator />
      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* Description */}
        <div className="py-4">
          <h1 className="md:text-2xl text-lg font-bold mb-6">Project Description</h1>
          <p className="md:text-base text-sm mb-4 text-muted-foreground">{project.description}</p>
          <div className='flex flex-wrap items-center gap-2 mb-12'>
            {project?.tags?.map((tag, index) => (
              <Badge variant={'outline'} key={index}>
                {tag}
              </Badge>
            ))}
          </div>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-light">
          {/* Features */}
          <div id="features" className="my-4">
            <h2 className="text-lg font-semibold pb-6">Features</h2>
            <ul className="list-disc list-outside">
              {
                project?.features?.map((feature, index) => (
                  <li key={index} className="ml-4 pl-2">{feature}</li>
                ))
              }
            </ul>
          </div>

          {/* Challenges */}
          <div id="features" className="my-4 md:row-span-3">
            <h2 className="text-lg font-semibold pb-6">Challenges</h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {
                project?.challenges?.map((challenge, index) => {
                  if (challenge?.status === 'Unsolved') {

                    (
                      <div className='py-4 w-full flex md:flex-row flex-col md:items-center gap-4 font-medium text-sm border-b'>
                        <span className="flex-1">
                          {challenge?.problem}
                        </span>

                        <span className={`px-3 py-1 mr-10 rounded-full text-xs font-medium border flex items-center gap-2 ${getStatusColor(challenge.status)}`}>
                          {getStatusIcon(challenge.status)}
                          {challenge.status}
                        </span>
                      </div>
                    )
                  } else {
                    return (
                      <AccordionItem key={index} value={challenge?.problem}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className='w-full flex md:flex-row flex-col md:items-center gap-4 font-medium text-sm justify-between pr-4'>
                            <span className="text-left flex-1">
                              {challenge?.problem}
                            </span>

                            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-2 ${getStatusColor(challenge.status)}`}>
                              {getStatusIcon(challenge.status)}
                              {challenge.status}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                          <p>{challenge?.solution}</p>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  }
                })
              }
            </Accordion>
          </div>

          {/* My Role */}
          <div id="role" className="my-4">
            <h2 className="text-lg font-semibold pb-6">My Role</h2>
            <ul className="list-disc list-outside">
              {
                project?.myRole?.map((feature, index) => (
                  <li key={index} className="ml-4 pl-2">{feature}</li>
                ))
              }
            </ul>
          </div>

          {/* Learnings */}
          <div id="learnings" className="my-4">
            <h2 className="text-lg font-semibold pb-6">Learnings</h2>
            <ul className="list-disc list-outside">
              {
                project?.learnings?.map((feature, index) => (
                  <li key={index} className="ml-4 pl-2">{feature}</li>
                ))
              }
            </ul>
          </div>
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

