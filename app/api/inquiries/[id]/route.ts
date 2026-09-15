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

    const inquiry = await prisma.contactInquiry.update({
      where: { id: params.id },
      data: { status },
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPDATE_INQUIRY_STATUS',
        user: user.email,
        module: 'INQUIRIES',
        details: `Updated inquiry status to ${status} for ${inquiry.name}`,
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update inquiry status.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    await prisma.contactInquiry.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: 'Inquiry deleted.' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete inquiry.' }, { status: 500 });
  }
}
