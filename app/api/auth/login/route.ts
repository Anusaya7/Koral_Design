import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const cleanPassword = String(password);

    // 1. Check if user exists in database
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbError: any) {
      console.error('Database connection / query error during login:', dbError);
      return NextResponse.json(
        { error: 'Database connection error. Please verify DATABASE_URL in Vercel environment variables.' },
        { status: 500 }
      );
    }

    // 2. Auto-seed default admin if database has no users and matching default credentials are submitted
    if (!user && cleanEmail === 'admin@koralsdesign.com' && cleanPassword === 'admin123') {
      try {
        const userCount = await prisma.user.count();
        if (userCount === 0) {
          const passwordHash = await bcrypt.hash('admin123', 10);
          user = await prisma.user.create({
            data: {
              email: 'admin@koralsdesign.com',
              name: 'Administrator',
              passwordHash,
              role: 'ADMIN',
            },
          });
          console.log('Auto-created default admin user on first login!');
        }
      } catch (seedError: any) {
        console.error('Auto-creation of default admin failed:', seedError);
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // 3. Verify password
    const isValid = await bcrypt.compare(cleanPassword, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // 4. Generate JWT Token
    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // 5. Create activity log entry safely without blocking login if log creation fails
    try {
      await prisma.activityLog.create({
        data: {
          action: 'LOGIN',
          user: user.email,
          module: 'AUTHENTICATION',
          details: 'Admin user logged in successfully',
        },
      });
    } catch (logErr) {
      console.warn('Activity log creation skipped:', logErr);
    }

    // 6. Build success response with secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error('Unhandled Login Route Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server authentication error.' },
      { status: 500 }
    );
  }
}
