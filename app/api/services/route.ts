import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch services.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const body = await request.json();
    const { number, title, icon, image, shortDesc, fullDesc, features, isPublished = true, sortOrder = 0 } = body;

    if (!number || !title || !icon || !shortDesc || !fullDesc || !image) {
      return NextResponse.json({ error: 'Missing required service fields.' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        number,
        title,
        icon,
        image,
        shortDesc,
        fullDesc,
        features: typeof features === 'object' ? JSON.stringify(features) : (features || '[]'),
        isPublished: Boolean(isPublished),
        sortOrder: Number(sortOrder),
      },
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE_SERVICE',
        user: user.email,
        module: 'SERVICES',
        details: `Created service: ${service.title}`,
      },
    });

    return NextResponse.json({ success: true, service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create service.' }, { status: 500 });
  }
}
