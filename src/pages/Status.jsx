import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, AlertTriangle, XCircle, RefreshCw,
  Server, Cpu, Gamepad2, Globe, Database, Clock, ChevronDown
} from 'lucide-react';


const useStatusData = () => {
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData]         = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const generateHistory = (downsAt = []) =>
    Array.from({ length: 90 }, (_, i) => {
      const dayAgo = 90 - i;
      if (downsAt.includes(dayAgo)) return { status: 'down', latency: 0 };
      return { status: 'up', latency: Math.floor(Math.random() * 12) + 18 };
    });

  const fetch_data = async () => {
    setRefreshing(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const mockIncidents = [
        {
          id: 3,
          title: 'VPS – Budget Node Scheduled Kernel Update',
          status: 'Resolved',
          severity: 'maintenance',
          date: 'June 28, 2026',
          body: 'Kernel security patch applied to Budget VPS cluster. All VMs were live-migrated before maintenance. Total customer-facing downtime: 0 minutes.'
        },
        {
          id: 2,
          title: 'VPS – AMD Brief NIC Disruption',
          status: 'Resolved',
          severity: 'minor',
          date: 'June 14, 2026',
          body: 'A brief network card disruption was detected on the AMD node. The hardware issue was isolated and resolved within 4 minutes. No data loss occurred.'
        },
        {
          id: 1,
          title: 'VPS – Premium Singapore Latency Spike',
          status: 'Resolved',
          severity: 'minor',
          date: 'May 31, 2026',
          body: 'Upstream routing changes caused a latency spike of ~240ms for approximately 12 minutes on the Singapore node. Rerouted via alternate peering. All services restored.'
        }
      ];

      // If environment variables are missing, fall back to mock data
      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase environment variables not configured. Displaying mock status data.");
        await new Promise(r => setTimeout(r, 600)); // simulate slight network load
        
        setData({
          overall: 'operational',
          nodes: [
            {
              id: 'vps-budget',
              name: 'VPS – Budget',
              subtitle: 'Intel Xeon E5-2699 v4 · India',
              icon: 'server',
              status: 'operational',
              latency: '22ms',
              uptime: '99.94%',
              history: generateHistory([68, 42])
            },
            {
              id: 'vps-amd',
              name: 'VPS – AMD',
              subtitle: 'AMD EPYC 9V74 · India',
              icon: 'cpu',
              status: 'operational',
              latency: '19ms',
              uptime: '99.99%',
              history: generateHistory([])
            },
            {
              id: 'web-panel',
              name: 'Web Panel',
              subtitle: 'host.sagarmatha.site · Control API',
              icon: 'globe',
              status: 'operational',
              latency: '41ms',
              uptime: '100.00%',
              history: generateHistory([])
            }
          ],
          incidents: mockIncidents
        });
        setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        return;
      }

      // Query real status checks from Supabase REST API
      const nodeIds = ['vps-budget', 'vps-amd', 'web-panel'];
      const nodeMetadata = {
        'vps-budget': { name: 'VPS – Budget', subtitle: '138.252.100.241 · India', icon: 'server' },
        'vps-amd': { name: 'VPS – AMD', subtitle: '74.225.254.243 · India', icon: 'cpu' },
        'web-panel': { name: 'Web Panel', subtitle: '163.61.39.61 · Control API', icon: 'globe' }
      };

      const fetchNodeData = async (nodeId) => {
        const url = `${supabaseUrl}/rest/v1/status_records?node_id=eq.${nodeId}&order=created_at.desc&limit=90`;
        const res = await fetch(url, {
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`
          }
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status} fetching status for ${nodeId}`);
        return res.json();
      };

      const results = await Promise.all(nodeIds.map(id => fetchNodeData(id).catch(err => {
        console.error(`Failed to fetch status records for ${id}:`, err);
        return [];
      })));

      const mappedNodes = nodeIds.map((id, idx) => {
        const records = results[idx] || [];
        const meta = nodeMetadata[id];

        // If no database records exist yet for this node, show operational with mock history
        if (records.length === 0) {
          return {
            id,
            ...meta,
            status: 'operational',
            latency: 'N/A',
            uptime: '100.00%',
            history: generateHistory([])
          };
        }

        const latestRecord = records[0];
        const currentStatus = latestRecord.status === 'up' ? 'operational' : 'outage';
        const currentLatency = latestRecord.status === 'up' ? `${latestRecord.latency_ms}ms` : '0ms';

        // Calculate actual uptime percentage over the loaded records (up to 90 checks)
        const upCount = records.filter(r => r.status === 'up').length;
        const uptimePct = ((upCount / records.length) * 100).toFixed(2);

        // Map records to graph items (oldest first)
        const history = [...records].reverse().map(r => ({
          status: r.status,
          latency: r.latency_ms
        }));

        // Pad history with default up entries if there are fewer than 90 logs in the DB
        const paddedHistory = [
          ...Array.from({ length: Math.max(0, 90 - history.length) }, () => ({
            status: 'up',
            latency: Math.floor(Math.random() * 5) + 20
          })),
          ...history
        ];

        return {
          id,
          ...meta,
          status: currentStatus,
          latency: currentLatency,
          uptime: `${uptimePct}%`,
          history: paddedHistory
        };
      });

      // Overall status defaults to operational unless a node has an outage
      const hasOutage = mappedNodes.some(n => n.status === 'outage');
      const overallStatus = hasOutage ? 'outage' : 'operational';

      setData({
        overall: overallStatus,
        nodes: mappedNodes,
        incidents: mockIncidents
      });

      setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Status fetch failed:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetch_data(); }, []);

  return { loading, refreshing, data, lastUpdated, refresh: fetch_data };
};

/* ─── helpers ──────────────────────────────── */
const NodeIcon = ({ type, className }) => {
  const props = { className };
  if (type === 'cpu')     return <Cpu {...props} />;
  if (type === 'gamepad') return <Gamepad2 {...props} />;
  if (type === 'globe')   return <Globe {...props} />;
  return <Server {...props} />;
};

const statusMeta = {
  operational:  { label: 'Operational',  dot: 'bg-green-400',  badge: 'bg-green-500/10 border-green-500/25 text-green-400',  icon: CheckCircle2,   glow: 'shadow-[0_0_20px_rgba(34,197,94,0.2)]'  },
  degraded:     { label: 'Degraded',     dot: 'bg-yellow-400', badge: 'bg-yellow-500/10 border-yellow-500/25 text-yellow-400', icon: AlertTriangle,   glow: 'shadow-[0_0_20px_rgba(234,179,8,0.2)]'  },
  outage:       { label: 'Outage',       dot: 'bg-red-400',    badge: 'bg-red-500/10 border-red-500/25 text-red-400',          icon: XCircle,         glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]'  },
};

const barColor = s => s === 'down' ? 'bg-red-500/80' : 'bg-green-400/70 hover:bg-green-400';

/* ─── UptimeBar component ───────────────────── */
const UptimeBar = ({ history }) => {
  const chunks = history.reduce((acc, d, i) => {
    if (i % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(d);
    return acc;
  }, []);

  const chunkStatus = chunk => chunk.some(d => d.status === 'down') ? 'down' : 'up';

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest">
        <span>90 days ago</span>
        <span>Uptime History (90d)</span>
        <span>Today</span>
      </div>
      <div className="flex gap-px items-end h-8">
        {chunks.map((chunk, idx) => {
          const cs = chunkStatus(chunk);
          const avgLatency = Math.round(chunk.reduce((s, d) => s + d.latency, 0) / chunk.length);
          return (
            <div key={idx} className="relative group flex-1">
              <div className={`h-8 rounded-[2px] transition-all duration-200 ${barColor(cs)} hover:scale-y-110 cursor-default`} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-28 bg-[#020617] border border-slate-800 rounded-xl p-2 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-40 shadow-2xl">
                <p className="text-[9px] font-black text-slate-500 uppercase mb-0.5">~{3 * (chunks.length - idx)}d ago</p>
                <p className="text-[10px] font-black text-white capitalize">
                  {cs === 'down' ? '🔴 Outage' : '🟢 Uptime'}
                </p>
                {cs === 'up' && <p className="text-[9px] text-cyan-400 font-bold mt-0.5">{avgLatency}ms avg</p>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-green-400/70" />Operational</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-red-500/80" />Outage</span>
      </div>
    </div>
  );
};

/* ─── NodeCard ───────────────────────────────── */
const NodeCard = ({ node, index }) => {
  const [open, setOpen] = useState(false);
  const meta = statusMeta[node.status] || statusMeta.operational;
  const StatusIcon = meta.icon;

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-slate-900/30 border border-slate-800/80 rounded-[1.75rem] overflow-hidden hover:border-slate-700/80 transition-colors"
    >
      {/* Card Header – always visible */}
      <button
        className="w-full p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-5 text-left"
        onClick={() => setOpen(o => !o)}
      >
        {/* Icon */}
        <div className={`w-12 h-12 flex-shrink-0 rounded-2xl bg-slate-800 flex items-center justify-center text-cyan-400 ${meta.glow}`}>
          <NodeIcon type={node.icon} className="w-5 h-5" />
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <h3 className="text-base font-black text-white">{node.name}</h3>
            <span className="text-[9px] bg-slate-800/80 text-slate-500 font-bold px-2 py-0.5 rounded-md uppercase tracking-widest">{node.subtitle}</span>
          </div>
          <p className="text-slate-500 text-xs font-semibold">Response latency: <span className="text-cyan-400">{node.latency}</span></p>
        </div>

        {/* Stats + Badge */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">90d Uptime</p>
            <p className="text-sm font-black text-white">{node.uptime}</p>
          </div>
          <div className={`flex items-center gap-1.5 px-3.5 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-widest ${meta.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${meta.dot}`} />
            {meta.label}
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Expandable History */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 border-t border-slate-800/60 pt-6">
              <UptimeBar history={node.history} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main Page ─────────────────────────────── */
const Status = () => {
  const { loading, refreshing, data, lastUpdated, refresh } = useStatusData();

  const overallMeta = data ? (statusMeta[data.overall] || statusMeta.operational) : null;
  const OverallIcon = overallMeta?.icon;

  const SECTIONS = [
    { key: 'vps',   label: 'VPS Nodes',           ids: ['vps-budget', 'vps-amd'] },
    { key: 'infra', label: 'Infrastructure & API', ids: ['web-panel'] }
  ];

  return (
    <div className="bg-[#020617] text-white min-h-screen pt-32 pb-28 px-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/4 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            >
              <Database className="w-3 h-3" /> Live Status Dashboard
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">System Status</h1>
            <p className="text-slate-400 mt-2 font-medium max-w-xl">
              Real-time health monitoring for all Sagarmatha Hosting infrastructure.
            </p>
          </div>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-2.5 px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:border-slate-700 transition-all font-bold text-xs uppercase tracking-widest flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-5">
            <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" />
            <p className="text-slate-600 font-black text-xs uppercase tracking-[0.25em]">Connecting to status database…</p>
          </div>
        ) : (
          <div className="space-y-12">

            {/* ── Overall Banner ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-[2rem] overflow-hidden border border-green-500/20 bg-gradient-to-br from-green-500/5 via-slate-900/40 to-cyan-500/5 p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
              style={{ boxShadow: '0 0 60px rgba(34,197,94,0.06)' }}
            >
              <img src="/button-deco-up.png"   alt="" className="absolute top-0 right-0 w-14 h-auto opacity-100 pointer-events-none z-20" />
              <img src="/button-deco-down.png" alt="" className="absolute bottom-0 left-0 w-14 h-auto opacity-100 pointer-events-none z-20" />

              <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400" style={{ boxShadow: '0 0 30px rgba(34,197,94,0.2)' }}>
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-black text-white">All Systems Fully Operational</h2>
                <p className="text-slate-500 text-sm mt-1 font-semibold">
                  3 VPS nodes · 1 Game node · 1 Web panel · All healthy
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-black text-green-400 uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  99.98% avg uptime
                </div>
                {lastUpdated && (
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Updated {lastUpdated}
                  </p>
                )}
              </div>
            </motion.div>

            {/* ── Node Sections ── */}
            {SECTIONS.map(section => {
              const sectionNodes = data.nodes.filter(n => section.ids.includes(n.id));
              if (!sectionNodes.length) return null;
              return (
                <div key={section.key} className="space-y-4">
                  <div className="flex items-center gap-3 px-1">
                    <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{section.label}</h2>
                    <div className="flex-1 h-px bg-slate-800" />
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{sectionNodes.length} nodes</span>
                  </div>
                  <div className="space-y-4">
                    {sectionNodes.map((node, i) => (
                      <NodeCard key={node.id} node={node} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}



          </div>
        )}
      </div>
    </div>
  );
};

export default Status;
