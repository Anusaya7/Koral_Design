import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { images: { orderBy: { sortOrder: 'asc' } } },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch project.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      category,
      location,
      area,
      client,
      year,
      shortDesc,
      fullDesc,
      scopeOfWork,
      coverImage,
      isFeatured,
      isPublished,
      galleryImages,
    } = body;

    const existingProject = await prisma.project.findUnique({ where: { id: params.id } });
    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    const slug = title && title !== existingProject.title ? slugify(title) : existingProject.slug;

    // Delete existing gallery images if new list is provided
    if (galleryImages) {
      await prisma.projectImage.deleteMany({ where: { projectId: params.id } });
    }

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: title ?? existingProject.title,
        slug,
        category: category ?? existingProject.category,
        location: location ?? existingProject.location,
        area: area !== undefined ? area : existingProject.area,
        client: client !== undefined ? client : existingProject.client,
        year: year !== undefined ? year : existingProject.year,
        shortDesc: shortDesc ?? existingProject.shortDesc,
        fullDesc: fullDesc ?? existingProject.fullDesc,
        scopeOfWork: scopeOfWork !== undefined ? (typeof scopeOfWork === 'object' ? JSON.stringify(scopeOfWork) : scopeOfWork) : existingProject.scopeOfWork,
        coverImage: coverImage ?? existingProject.coverImage,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existingProject.isFeatured,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : existingProject.isPublished,
        images: galleryImages
          ? {
              create: galleryImages.map((img: any, idx: number) => ({
                url: typeof img === 'string' ? img : img.url,
                caption: img.caption || null,
                sortOrder: idx + 1,
              })),
            }
          : undefined,
      },
      include: { images: true },
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE_PROJECT',
        user: user.email,
        module: 'PROJECTS',
        details: `Updated project: ${updatedProject.title}`,
      },
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error: any) {
    console.error('PUT Project Error:', error);
    return NextResponse.json({ error: 'Failed to update project.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const project = await prisma.project.findUnique({ where: { id: params.id } });
    if (!project) {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    await prisma.project.delete({ where: { id: params.id } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE_PROJECT',
        user: user.email,
        module: 'PROJECTS',
        details: `Deleted project: ${project.title}`,
      },
    });

    return NextResponse.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete project.' }, { status: 500 });
  }
}
