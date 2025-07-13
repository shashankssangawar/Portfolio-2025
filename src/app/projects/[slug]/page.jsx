import Link from 'next/link';
import { projectsData } from '@/data/projects';

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <div className="text-center mt-20 text-xl text-red-600">Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className='text-xl font-semibold'>/<Link className='text-blue-400' href={`/projects`}>projects</Link>/{project.slug}</h1>
      <div className='flex justify-between items-start flex-col sm:flex-row p-10'>
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        {
          project?.liveDemo && (
            <Link
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Visit Live Demo
            </Link>
          )
        }
      </div>
      <p className="text-lg mb-8 text-gray-400 text-center">{project.description}</p>

      {project.images && project.images.length > 0 ? (
        <div className={`grid gap-4 mb-8 ${
          project.images.length === 1
            ? 'grid-cols-1'
            : project.images.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        }`}>
          {project.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${project.title} Image ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          ))}
        </div>
      ) : null}

      <div className="text-center">
      </div>
    </div>
  );
}
