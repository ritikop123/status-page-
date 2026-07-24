import net from 'net';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const NODES = [
  {
    id: 'vps-amd',
    name: 'VPS – AMD',
    host: '98.70.24.182',
    port: 22,
  },
  {
    id: 'vps-amd-2',
    name: 'VPS – AMD 2',
    host: '151.242.187.201',
    port: 22,
  },
  {
    id: 'vps-budget',
    name: 'VPS – Budget',
    host: '79.108.225.107',
    port: 22,
  },
  {
    id: 'vps-intel-platinum',
    name: 'VPS – Intel Platinum',
    host: '151.242.187.129',
    port: 22,
  },
  {
    id: 'web-panel',
    name: 'Web Panel',
    host: '151.242.187.127',
    port: 22,
  }
];

function pingTcp(host, port, timeout = 5000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const start = Date.now();
    
    socket.setTimeout(timeout);
    
    socket.on('connect', () => {
      const latency = Date.now() - start;
      socket.destroy();
      resolve({ status: 'up', latency });
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ status: 'down', latency: 0 });
    });
    
    socket.on('error', () => {
      socket.destroy();
      resolve({ status: 'down', latency: 0 });
    });
    
    socket.connect(port, host);
  });
}

async function run() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
    process.exit(1);
  }

  console.log("Starting server status checks...");
  const records = [];

  for (const node of NODES) {
    console.log(`Checking ${node.name} (${node.host}:${node.port})...`);
    const result = await pingTcp(node.host, node.port);
    
    console.log(`Result for ${node.name}: ${result.status} (${result.latency}ms)`);
    records.push({
      node_id: node.id,
      status: result.status,
      latency_ms: result.latency,
    });
  }

  // Insert records into Supabase via REST API
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/status_records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(records)
    });

    if (res.ok) {
      console.log("Successfully logged status records to Supabase!");
    } else {
      const text = await res.text();
      console.error(`Failed to log to Supabase: ${res.statusText}`, text);
    }
  } catch (err) {
    console.error("Error connecting to Supabase API:", err);
  }
}

run();
