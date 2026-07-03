import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, Database, Save, HardDrive, Layout, CheckCircle2, ArrowRight, Calculator, Server, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const VPSHosting = () => {
  const [activeSeries, setActiveSeries] = useState('Xeon Series');
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹', rate: 1, flag: '🇮🇳' });
  const [location, setLocation] = useState('India');

  const seriesOptions = ['Xeon Series', 'Platinum Series'];
  const locations = [
    { name: 'India', latency: '34ms' },
    { name: 'Singapore', latency: '68ms' }
  ];

  const currencies = [
    { code: 'INR', symbol: '₹', rate: 1, flag: '🇮🇳' },
    { code: 'NPR', symbol: 'रू', rate: 1.6, flag: '🇳🇵' },
    { code: 'BDT', symbol: '৳', rate: 1.3, flag: '🇧🇩' },
    { code: 'USD', symbol: '$', rate: 0.012, flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', rate: 0.011, flag: '🇪🇺' }
  ];

  const formatPrice = (priceInINR) => {
    const converted = (parseFloat(priceInINR) * currency.rate);
    if (currency.code === 'USD' || currency.code === 'EUR') {
      return converted.toFixed(2);
    }
    return Math.round(converted).toString();
  };

  const plansData = {
    'Xeon Series': [
      { name: 'Xeon 2 GB Plan', price: '100', vcpu: 'Intel Xeon E5-2686 v4 (1 vCore)', ram: '2 GB DDR4 RAM', ssd: '20 GB SSD Disk', network: '1 Gbps Netwoek Speed', ipv4: '1 IPv4 Included', backups: 'Manual Backups', bestseller: false },
      { name: 'Xeon 4 GB Plan', price: '160', vcpu: 'Intel Xeon E5-2686 v4 (2 vCore)', ram: '4 GB DDR4 RAM', ssd: '30 GB SSD Disk', network: '1 Gbps Netwoek Speed', ipv4: '1 IPv4 Included', backups: 'Manual Backups', bestseller: false },
      { name: 'Xeon 8 GB Plan', price: '380', vcpu: 'Intel Xeon E5-2686 v4 (2 vCore)', ram: '8 GB DDR4 RAM', ssd: '60 GB SSD Disk', network: '1 Gbps Netwoek Speed', ipv4: '1 IPv4 Included', backups: ' Manual Backups', bestseller: true },
      { name: 'Xeon 16 GB Plan', price: '500', vcpu: 'Intel Xeon E5-2686 v4 (4 vCore)', ram: '16 GB DDR4 RAM', ssd: '100 GB SSD Disk', network: '1 Gbps Netwoek Speed', ipv4: '1 IPv4 Included', backups: ' Manual Backups', bestseller: false },
      { name: 'Xeon 32 GB Plan', price: '780', vcpu: 'Intel Xeon E5-2686 v4 (8 vCore)', ram: '32 GB DDR4 RAM', ssd: '200 GB SSD Disk', network: '1 Gbps Netwoek Speed', ipv4: '1 IPv4 Included', backups: ' Manual Backups', bestseller: false },
    ],
    'Platinum Series': [
      { name: 'Platinum 2 GB Plan', price: '140', vcpu: 'Intel Xeon Platinum 8175M (2 vCore)', ram: '2 GB DDR4 RAM', ssd: '25 GB NVMe Disk', network: '2 Gbps Netwoek Speed', ipv4: '1 Dedicated IPv4', backups: ' Manual Backups', bestseller: false },
      { name: 'Platinum 4 GB Plan', price: '220', vcpu: 'Intel Xeon Platinum 8175M (2 vCore)', ram: '4 GB DDR4 RAM', ssd: '40 GB NVMe Disk', network: '2 Gbps Netwoek Speed', ipv4: '1 Dedicated IPv4', backups: ' Manual Backups', bestseller: false },
      { name: 'Platinum 8 GB Plan', price: '460', vcpu: 'Intel Xeon Platinum 8175M (2 vCore)', ram: '8 GB DDR4 RAM', ssd: '80 GB NVMe Disk', network: '2 Gbps Netwoek Speed', ipv4: '1 Dedicated IPv4', backups: ' Manual Backups', bestseller: true },
      { name: 'Platinum 16 GB Plan', price: '600', vcpu: 'Intel Xeon Platinum 8175M (4 vCore)', ram: '16 GB DDR4 RAM', ssd: '150 GB NVMe Disk', network: '2 Gbps Netwoek Speed', ipv4: '1 Dedicated IPv4', backups: ' Manual Backups', bestseller: false },
      { name: 'Platinum 32 GB Plan', price: '900', vcpu: 'Intel Xeon Platinum 8175M (8 vCore)', ram: '32 GB DDR4 RAM', ssd: '300 GB NVMe Disk', network: '2 Gbps Netwoek Speed', ipv4: '1 Dedicated IPv4', backups: ' Manual Backups', bestseller: false },
    ],
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            poster="/vps-bg.png"
            className="w-full h-full object-cover opacity-70 scale-100"
          >
            <source src="/dark-coding-opt.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/10 via-[#020617]/40 to-[#020617]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-bold mb-6">
            <Server className="w-4 h-4" /> Scalable VPS Solutions
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-4 text-white drop-shadow-2xl">
            Virtual Private Servers
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto mb-8 drop-shadow-lg">
            High-performance VPS hosting with full root access and NVMe storage
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 px-6 py-2 rounded-full inline-flex items-center gap-2">
              <span className="text-slate-400 text-lg">Starting at</span>
              <span className="text-2xl font-bold text-white text-gradient">{currency.symbol}{formatPrice(100)}/month</span>
            </div>
            
            <button 
              onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-cyan-400 text-[#020617] font-black rounded-full flex items-center gap-3 hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] group"
            >
              Configure Your Server <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-[#010413]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Instant Deployment', desc: 'Your VPS is ready in seconds after payment' },
              { icon: Shield, title: 'DDoS Protection', desc: 'Advanced L3 and L4 Ddos Protection' },
              { icon: Activity, title: '99.9% Uptime', desc: 'Reliable infrastructure with 24/7 monitoring' },
              { icon: Layout, title: 'Full Root Access', desc: 'Complete control over your server environment' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-cyan-400/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Choose Your Processor</h2>
            <p className="text-slate-400 text-lg">Select the performance tier that matches your requirements</p>
          </div>

          {/* Series Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {seriesOptions.map((series) => (
              <button
                key={series}
                onClick={() => setActiveSeries(series)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all border ${
                  activeSeries === series 
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                    : 'border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white bg-slate-900/40'
                }`}
              >
                {series}
              </button>
            ))}
          </div>

          {/* Currency and Location Toggles */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Currency</span>
              <div className="bg-slate-900/60 p-1 rounded-2xl border border-slate-800 flex gap-1">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => setCurrency(curr)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                      currency.code === curr.code 
                        ? 'bg-cyan-400 text-[#020617] shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{curr.flag}</span>
                    <span>{curr.code}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Location</span>
              <div className="bg-slate-900/60 p-1 rounded-2xl border border-slate-800 flex gap-1">
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => setLocation(loc.name)}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                      location === loc.name 
                        ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {loc.name} <span className="opacity-60 text-[10px]">({loc.latency})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {plansData[activeSeries].map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`bg-[#0b1126] border rounded-[2rem] p-6 flex flex-col group transition-all relative ${
                    plan.bestseller 
                      ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-[1.02] z-10' 
                      : 'border-slate-800 hover:border-cyan-500/50'
                  }`}
                >
                  {plan.bestseller && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-cyan-400 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-black text-white">{currency.symbol}{formatPrice(plan.price)}</span>
                      <span className="text-slate-500 text-sm font-medium">/month</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-slate-300">
                      <Cpu className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs">{plan.vcpu}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Database className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs">{plan.ram}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs">{plan.ssd}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Zap className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs">{plan.network}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Globe className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs">{plan.ipv4}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Save className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs">{plan.backups}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      Full Root Access
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      Choice of OS (Ubuntu/Debian)
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      DDoS Protected
                    </div>
                  </div>

                  <Link 
                    to="/contact"
                    className="w-full py-3 bg-slate-900 border border-slate-700 rounded-xl font-bold text-white hover:bg-cyan-500 hover:border-cyan-400 hover:text-[#020617] transition-all text-sm text-center"
                  >
                    Select Plan
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* OS Section */}
      <section className="py-20 bg-[#010413]">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-12">Supported Operating Systems</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            {['Ubuntu', 'Debian'].map((os) => (
              <span key={os} className="text-lg font-bold text-white">{os}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VPSHosting;
