import { NextRequest, NextResponse } from 'next/server';
import si from 'systeminformation';

export async function GET() {
  const cpu = await si.currentLoad();
  const mem = await si.mem();
  const net = await si.networkStats();
  const disk = await si.fsSize();

  return NextResponse.json({
    cpu: cpu.currentLoad,
    mem: {
      total: mem.total,
      used: mem.used,
      free: mem.free,
      usage: (mem.used / mem.total) * 100,
    },
    net: {
      rx: net[0]?.rx_sec || 0, // Bytes/sec in
      tx: net[0]?.tx_sec || 0, // Bytes/sec out
      rx_total: net[0]?.rx_bytes || 0,
      tx_total: net[0]?.tx_bytes || 0,
    },
    disk: disk.map((d) => ({
      fs: d.fs,
      size: d.size,
      used: d.used,
      available: d.available,
      usage: (d.used / d.size) * 100,
      mount: d.mount,
    })),
  });
}
