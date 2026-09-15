import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch job listings.' }, { status: 500 });
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
      department,
      location = 'Pune, India',
      experience,
      type = 'Full-time',
      description,
      requirements,
      responsibilities,
      isPublished = true,
    } = body;

    if (!title || !department || !experience || !description) {
      return NextResponse.json({ error: 'Missing required job fields.' }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        department,
        location,
        experience,
        type,
        description,
        requirements: typeof requirements === 'object' ? JSON.stringify(requirements) : (requirements || '[]'),
        responsibilities: typeof responsibilities === 'object' ? JSON.stringify(responsibilities) : (responsibilities || '[]'),
        isPublished: Boolean(isPublished),
      },
    });

    await prisma.activityLog.create({
      data: {
        action: 'CREATE_JOB',
        user: user.email,
        module: 'CAREERS',
        details: `Created job posting: ${job.title}`,
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create job posting.' }, { status: 500 });
  }
}
