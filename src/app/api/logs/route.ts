import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const logPath = path.join(process.cwd(), 'logs', 'app.log');
    const content = await readFile(logPath, 'utf-8');
    const lines = content.split('\n').filter((l) => l);
    return NextResponse.json({ logs: lines });
  } catch (error) {
    return NextResponse.json(
      { error: 'Could not read log file', details: String(error) },
      { status: 500 }
    );
  }
}
