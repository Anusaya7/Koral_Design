import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/upload';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, media });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch media assets.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Validate MIME type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file format. Supported formats: JPG, JPEG, PNG, WEBP.' },
        { status: 400 }
      );
    }

    const fileUrl = await saveUploadedFile(file);

    const media = await prisma.media.create({
      data: {
        name: file.name,
        url: fileUrl,
        size: file.size,
        mimeType: file.type,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: 'UPLOAD_MEDIA',
        user: user.email,
        module: 'MEDIA',
        details: `Uploaded media: ${file.name}`,
      },
    });

    return NextResponse.json({ success: true, url: fileUrl, media });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'File upload failed.' }, { status: 500 });
  }
}
