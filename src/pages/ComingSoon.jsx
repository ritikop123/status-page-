import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Shield, Clock, Bell, ArrowLeft, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  const isVps = location.pathname.includes('/vps');

  const title1 = isVps ? "VPS" : "Dedicated";
  const title2 = isVps ? "Hosting" : "Servers";
  const description = isVps
    ? "Highly scalable virtual private servers with guaranteed resource allocation. We're building a state-of-the-art virtualization platform — stay tuned."
    : "Full bare-metal hardware, exclusively yours. No shared resources, no limits. We're building something powerful — stay tuned.";

  const features = isVps
    ? [
        { icon: Cpu, label: "Dedicated vCPU", desc: "No overcommit on performance" },
        { icon: Shield, label: "DDoS Shield", desc: "Enterprise-grade protection" },
        { icon: Zap, label: "NVMe Storage", desc: "Ultra-fast SSD speeds" },
      ]
    : [
        { icon: Server, label: "Bare Metal", desc: "100% dedicated hardware" },
        { icon: Shield, label: "DDoS Shield", desc: "Enterprise-grade protection" },
        { icon: Zap, label: "NVMe SSD", desc: "Ultra-fast disk speeds" },
      ];

  return (
    <div className="bg-[#020617] min-h-screen flex flex-col px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-indigo-600/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 pt-28 pb-20 text-center">
        
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm font-bold transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.25em] mb-8">
            <Clock className="w-3 h-3" />
            In Development
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter leading-none">
            {title1}
          </h1>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            <span className="text-gradient">{title2}</span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-14">
            {description}
          </p>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-left hover:border-indigo-500/40 transition-colors"
              >
                <f.icon className="w-6 h-6 text-indigo-400 mb-4" />
                <div className="text-white font-bold mb-1">{f.label}</div>
                <div className="text-slate-500 text-sm">{f.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://discord.gg/bkC7UjtcT"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-cyan-400 text-[#020617] font-black rounded-xl hover:bg-cyan-300 transition-all shadow-[0_10px_30px_rgba(34,211,238,0.3)] flex items-center gap-2 group"
            >
              <Bell className="w-4 h-4 group-hover:animate-bounce" />
              GET NOTIFIED ON DISCORD
            </a>
            <Link
              to="/minecraft-hosting"
              className="px-8 py-4 border border-slate-700 text-slate-400 font-bold rounded-xl hover:border-slate-500 hover:text-white transition-all"
            >
              View Minecraft Plans →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;
