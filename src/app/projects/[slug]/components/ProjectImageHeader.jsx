'use client';

import React, { useState } from 'react';
import { Share2, Heart, Grid3x3, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProjectImageHeader({ project, setShowGallery }) {
  const images = project.images;

  // Determine grid layout based on number of images
  const getGridLayout = () => {
    if (project.images.length === 0) return null;
    if (project.images.length === 1) {
      return (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg sm:rounded-xl overflow-hidden">
          <img src={project.images[0]} alt={`${project.title} 0`} className="w-full h-full object-cover" />
          {images.length > 1 && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-4 right-4 text-xs sm:text-sm"
              onClick={() => setShowGallery(true)}
            >
              <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Show all photos
            </Button>
          )}
        </div>
      );
    }
    if (project.images.length === 2) {
      return (
        <div className="relative grid grid-cols-2 gap-2 h-[300px] sm:h-[400px] md:h-[500px] rounded-lg sm:rounded-xl overflow-hidden">
          {images.slice(0, 2).map((image, index) => (
            <div key={index} className="relative cursor-pointer">
              <img src={image} alt={`${project.title} ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 text-xs sm:text-sm"
            onClick={() => setShowGallery(true)}
          >
            <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Show all photos
          </Button>
        </div>
      );
    }
    if (images.length === 3) {
      return (
        <div className="relative grid grid-cols-2 gap-2 h-[300px] sm:h-[400px] md:h-[500px] rounded-lg sm:rounded-xl overflow-hidden">
          <div className="row-span-2">
            <img src={images[0]} alt={`${project.title} 0`} className="w-full h-full object-cover" />
          </div>
          {images.slice(1, 3).map((image, index) => (
            <div key={index} className="relative cursor-pointer">
              <img src={image} alt={`${project.title} ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 text-xs sm:text-sm"
            onClick={() => setShowGallery(true)}
          >
            <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Show all photos
          </Button>
        </div>
      );
    }
    if (images.length === 4) {
      return (
        <div className="relative grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-2 h-[400px] sm:h-[500px] rounded-lg sm:rounded-xl overflow-hidden">
          <div className="row-span-2 md:col-span-2">
            <img src={images[0]} alt={`${project.title} 0`} className="w-full h-full object-cover" />
          </div>
          {images.slice(1, 3).map((image, index) => (
            <div key={index} className="relative cursor-pointer">
              <img src={image} alt={`${project.title} ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="relative md:flex hidden cursor-pointer md:col-span-2">
            <img src={images[3]} alt={`${project.title}-4`} className="w-full h-full object-cover" />
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 text-xs sm:text-sm"
            onClick={() => setShowGallery(true)}
          >
            <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Show all photos
          </Button>
        </div>
      );
    }


    // 4 or more images
    return (
      <div className="relative grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-2 h-[400px] sm:h-[500px] rounded-lg sm:rounded-xl overflow-hidden">
        <div className="col-span-2 row-span-2 relative cursor-pointer">
          <img src={images[0]} alt={`${project.title} 0`} className="w-full h-full object-cover" />
        </div>
        {images.slice(1, 5).map((image, index) => (
          <div key={index} className="relative cursor-pointer hidden sm:block">
            <img src={image} alt={`${project.title} ${index}`} className="w-full h-full object-cover" />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-[#27272a]/40 flex items-center justify-center">
                <span className="text-white/80 text-lg font-semibold">+{images.length - 5}</span>
              </div>
            )}
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-4 right-4 text-xs sm:text-sm"
          onClick={() => setShowGallery(true)}
        >
          <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Show all photos</span>
          <span className="sm:hidden">All ({images.length})</span>
        </Button>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="md:text-4xl text-2xl font-semibold">{project.title}</h1>
        {
          project?.liveDemo && (
            <Link
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer">
              <Button size="sm" className="text-sm font-medium">
                Visit Live Demo
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          )
        }

      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="mb-6 sm:mb-8">
          {getGridLayout()}
        </div>
      )}
    </div>
  )
};
