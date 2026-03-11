import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  try {
    // Generate a cryptographically secure random token
    const token = crypto.randomBytes(32).toString('hex');

    const response = NextResponse.json({ csrfToken: token });

    // Set HttpOnly, secure, SameSite:strict cookie
    response.cookies.set({
      name: 'csrf-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}
