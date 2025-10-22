'use client';

import { useEffect, useState } from 'react';
import { projectsData } from '@/data/projects'
import ProjectsHeader from './projects-header';
import ProjectCard from '@/app/components/ProjectCard';

export default function ProjectsPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: ''
  });
  const [filteredProjects, setFilteredProjects] = useState(projectsData || []);

  useEffect(() => {
    let data = projectsData;
    if (searchQuery) {
      data = data?.filter((item) => item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
    }
    if (filters.category) {
      data = data?.filter((item) => item?.category === filters.category)
    }
    setFilteredProjects(data);
  }, [searchQuery, filters.category]);

  return (
    <div className="container mx-auto px-4">
      <ProjectsHeader searchQuery={searchQuery} handleSearchChange={setSearchQuery} filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
};
