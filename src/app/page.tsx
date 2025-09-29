'use client';

import { useEffect, useState } from 'react';

interface DiskInfo {
  fs: string;
  size: number;
  used: number;
  available: number;
  usage: number;
  mount: string;
}
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
  const [cpuData, setCpuData] = useState<number[]>([]);
  const [memData, setMemData] = useState<number[]>([]);
  const [netInData, setNetInData] = useState<number[]>([]);
  const [netOutData, setNetOutData] = useState<number[]>([]);
  const [diskData, setDiskData] = useState<DiskInfo[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    // Schreibe Log beim ersten Rendern
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        level: 'info',
        message: 'Dashboard loaded: ' + new Date().toLocaleString(),
      }),
    });

    const interval = setInterval(async () => {
      const res = await fetch('/api/sysinfo');
      const data = await res.json();
      setCpuData((prev) => [...prev.slice(-19), data.cpu]);
      setMemData((prev) => [...prev.slice(-19), data.mem.usage]);
      setNetInData((prev) => [...prev.slice(-19), data.net.rx / 1024]); // KB/s
      setNetOutData((prev) => [...prev.slice(-19), data.net.tx / 1024]); // KB/s
      setDiskData(data.disk);
      setLabels((prev) => [...prev.slice(-19), new Date().toLocaleTimeString()]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // Analytics: Page Loads und IPs aus Logs extrahieren
  const pageLoads = logs.filter((l) => l.includes('Dashboard loaded'));
  const ipCounts: Record<string, number> = {};
  pageLoads.forEach((l) => {
    const match = l.match(/\[IP: ([^\]]+)\]/);
    if (match) {
      const ip = match[1];
      ipCounts[ip] = (ipCounts[ip] || 0) + 1;
    }
  });

  return (
    <div style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <h2>System Monitoring Dashboard</h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: 'CPU Usage (%)',
                  data: cpuData,
                  borderColor: '#36a2eb',
                  backgroundColor: 'rgba(54,162,235,0.2)',
                },
                {
                  label: 'RAM Usage (%)',
                  data: memData,
                  borderColor: '#ff6384',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'CPU & RAM Usage' },
              },
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: 'Net In (KB/s)',
                  data: netInData,
                  borderColor: '#4bc0c0',
                  backgroundColor: 'rgba(75,192,192,0.2)',
                },
                {
                  label: 'Net Out (KB/s)',
                  data: netOutData,
                  borderColor: '#9966ff',
                  backgroundColor: 'rgba(153,102,255,0.2)',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Network In/Out' },
              },
            }}
          />
        </div>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Disk Usage</h3>
      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Mount</th>
            <th>Size (GB)</th>
            <th>Used (GB)</th>
            <th>Available (GB)</th>
            <th>Usage (%)</th>
          </tr>
        </thead>
        <tbody>
          {diskData.map((d, i) => (
            <tr key={i}>
              <td>{d.mount}</td>
              <td>{(d.size / 1024 / 1024 / 1024).toFixed(2)}</td>
              <td>{(d.used / 1024 / 1024 / 1024).toFixed(2)}</td>
              <td>{(d.available / 1024 / 1024 / 1024).toFixed(2)}</td>
              <td>{d.usage.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '2rem' }}>Analytics: Page Loads</h3>
      <div
        style={{
          background: '#f5f5f5',
          color: '#222',
          padding: '1rem',
          borderRadius: '8px',
          maxWidth: '400px',
          marginBottom: '2rem',
        }}
      >
        <strong>Page Loads insgesamt: {pageLoads.length}</strong>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(ipCounts).map(([ip, count]) => (
            <li
              key={ip}
              style={{
                fontFamily: 'monospace',
                fontSize: '0.95em',
                borderBottom: '1px solid #ccc',
              }}
            >
              {ip}: {count}x
            </li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Logs</h3>
      <div
        style={{
          background: '#222',
          color: '#eee',
          padding: '1rem',
          borderRadius: '8px',
          height: '15vh',
          minHeight: '4em',
          overflowY: 'auto',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[...logs].reverse().map((log, idx) => (
            <li
              key={idx}
              style={{
                fontFamily: 'monospace',
                fontSize: '0.95em',
                borderBottom: '1px solid #444',
              }}
            >
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
