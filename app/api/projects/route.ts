import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const whereClause: any = {};
    if (category && category !== 'All') {
      whereClause.category = category;
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error('GET Projects Error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
      isFeatured = false,
      isPublished = true,
      galleryImages = [],
    } = body;

    if (!title || !category || !location || !shortDesc || !fullDesc || !coverImage) {
      return NextResponse.json({ error: 'Missing required project fields.' }, { status: 400 });
    }

    let slug = slugify(title);
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        category,
        location,
        area: area || null,
        client: client || null,
        year: year || null,
        shortDesc,
        fullDesc,
        scopeOfWork: typeof scopeOfWork === 'object' ? JSON.stringify(scopeOfWork) : scopeOfWork,
        coverImage,
        isFeatured: Boolean(isFeatured),
        isPublished: Boolean(isPublished),
        images: {
          create: galleryImages.map((img: any, idx: number) => ({
            url: typeof img === 'string' ? img : img.url,
            caption: img.caption || null,
            sortOrder: idx + 1,
          })),
        },
      },
      include: { images: true },
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE_PROJECT',
        user: user.email,
        module: 'PROJECTS',
        details: `Created project: ${project.title}`,
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error('POST Project Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create project.' }, { status: 500 });
  }
}
