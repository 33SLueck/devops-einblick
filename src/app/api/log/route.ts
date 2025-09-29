import { NextRequest, NextResponse } from 'next/server';
import logger from '@/utils/logger';

export async function POST(req: NextRequest) {
  try {
    const { level = 'info', message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    // IP aus Header extrahieren
    let ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    if (ip === '::1') ip = '127.0.0.1';
    logger.log({ level, message: `[IP: ${ip}] ${message}` });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error(`Logging failed: ${error}`);
    return NextResponse.json({ error: 'Logging failed' }, { status: 500 });
  }
}
