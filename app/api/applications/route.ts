import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' },
      include: { job: { select: { title: true, department: true } } },
    });

    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch job applications.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, position, name, email, phone, resumeUrl, coverMessage } = body;

    if (!position || !name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required application fields.' }, { status: 400 });
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId: jobId || null,
        position,
        name,
        email,
        phone,
        resumeUrl: resumeUrl || null,
        coverMessage: coverMessage || null,
        status: 'New',
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error('POST Job Application Error:', error);
    return NextResponse.json({ error: 'Failed to submit application.' }, { status: 500 });
  }
}
