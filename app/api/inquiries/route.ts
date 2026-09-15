import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const unreadCount = await prisma.contactInquiry.count({
      where: { status: 'New' },
    });

    return NextResponse.json({ success: true, inquiries, unreadCount });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch inquiries.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: 'Missing required inquiry fields.' }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        subject,
        message,
        status: 'New',
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    console.error('POST Contact Inquiry Error:', error);
    return NextResponse.json({ error: 'Failed to submit contact inquiry.' }, { status: 500 });
  }
}
