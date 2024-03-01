'use client';
import Link from 'next/link';
import { ArrowRight } from 'iconoir-react';

interface Project {
  title: string;
  slug: string;
  description?: string;
}

export default function Home() {
  const projects = [
    {
      title: 'Arabella',
      slug: 'arabella',
      description: 'Distorting an image texture based on mouse movement',
    },
  ];
  return (
    <main className="h-screen bg-slate-100 flex flex-col items-center justify-center">
      {projects.map((project: Project) => (
        <Link
          className="w-80 group px-4 py-3 rounded-md text-slate-700 hover:text-blue-500 flex flex-col gap-2 bg-white shadow-sm hover:shadow-md transition-all duration-300"
          href={`/projects/${project.slug}`}
          key={project.slug}
        >
          <div className="flex w-full justify-between">
            <h2 className="text-xl">{project.title}</h2>
            <ArrowRight
              className="group-hover:translate-x-0.5 transform transition-transform duration-300"
              color="currentColor"
              width={'20px'}
              strokeWidth={'2px'}
            />
          </div>
          <p className="text-sm text-slate-500">{project.description}</p>
        </Link>
      ))}
    </main>
  );
}
