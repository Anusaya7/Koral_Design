import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const body = await request.json();
    const { title, department, location, experience, type, description, requirements, responsibilities, isPublished } = body;

    const existing = await prisma.job.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    }

    const updated = await prisma.job.update({
      where: { id: params.id },
      data: {
        title: title ?? existing.title,
        department: department ?? existing.department,
        location: location ?? existing.location,
        experience: experience ?? existing.experience,
        type: type ?? existing.type,
        description: description ?? existing.description,
        requirements: requirements !== undefined ? (typeof requirements === 'object' ? JSON.stringify(requirements) : requirements) : existing.requirements,
        responsibilities: responsibilities !== undefined ? (typeof responsibilities === 'object' ? JSON.stringify(responsibilities) : responsibilities) : existing.responsibilities,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : existing.isPublished,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE_JOB',
        user: user.email,
        module: 'CAREERS',
        details: `Updated job posting: ${updated.title}`,
      },
    });

    return NextResponse.json({ success: true, job: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update job.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const existing = await prisma.job.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Job not found.' }, { status: 404 });
    }

    await prisma.job.delete({ where: { id: params.id } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE_JOB',
        user: user.email,
        module: 'CAREERS',
        details: `Deleted job posting: ${existing.title}`,
      },
    });

    return NextResponse.json({ success: true, message: 'Job deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete job.' }, { status: 500 });
  }
}
