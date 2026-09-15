import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const { status } = await request.json();
    if (!status) {
      return NextResponse.json({ error: 'Status is required.' }, { status: 400 });
    }

    const application = await prisma.jobApplication.update({
      where: { id: params.id },
      data: { status },
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE_APPLICATION_STATUS',
        user: user.email,
        module: 'APPLICATIONS',
        details: `Updated applicant status to ${status} for ${application.name}`,
      },
    });

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update application status.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    await prisma.jobApplication.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Application deleted.' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete application.' }, { status: 500 });
  }
}
