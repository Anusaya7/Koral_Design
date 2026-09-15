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
    const { number, title, icon, image, shortDesc, fullDesc, features, isPublished, sortOrder } = body;

    const existing = await prisma.service.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        number: number ?? existing.number,
        title: title ?? existing.title,
        icon: icon ?? existing.icon,
        image: image ?? existing.image,
        shortDesc: shortDesc ?? existing.shortDesc,
        fullDesc: fullDesc ?? existing.fullDesc,
        features: features !== undefined ? (typeof features === 'object' ? JSON.stringify(features) : features) : existing.features,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : existing.isPublished,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE_SERVICE',
        user: user.email,
        module: 'SERVICES',
        details: `Updated service: ${updated.title}`,
      },
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update service.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const existing = await prisma.service.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Service not found.' }, { status: 404 });
    }

    await prisma.service.delete({ where: { id: params.id } });

    await prisma.activityLog.create({
      data: {
        action: 'DELETE_SERVICE',
        user: user.email,
        module: 'SERVICES',
        details: `Deleted service: ${existing.title}`,
      },
    });

    return NextResponse.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete service.' }, { status: 500 });
  }
}
