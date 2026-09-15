import React from 'react';
import { notFound } from 'next/navigation';
import ProjectDetailView from '@/components/public/ProjectDetailView';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: params.slug },
    });

    if (!project) return { title: 'Project Not Found' };

    return {
      title: project.seoTitle || `${project.title} | Korals Design Projects`,
      description: project.seoDesc || project.shortDesc,
    };
  } catch (e) {
    return { title: 'Project Details' };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  let project = null;
  let relatedProjects: { slug: string; title: string; coverImage: string; category: string }[] = [];

  try {
    project = await prisma.project.findUnique({
      where: { slug: params.slug },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!project) {
      notFound();
    }

    relatedProjects = await prisma.project.findMany({
      where: {
        category: project.category,
        slug: { not: project.slug },
        isPublished: true,
      },
      take: 3,
      select: {
        slug: true,
        title: true,
        coverImage: true,
        category: true,
      },
    });
  } catch (e) {
    notFound();
  }

  return <ProjectDetailView project={project} relatedProjects={relatedProjects} />;
}
