import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, Database, Save, HardDrive, Layout, CheckCircle2, ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const MinecraftHosting = () => {
  const [activeSeries, setActiveSeries] = useState('Budget Series');
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹', rate: 1, flag: '🇮🇳' });
  const [location, setLocation] = useState('India');

  const seriesOptions = ['Budget Series', 'Platinum Series', 'Proxy Series', 'Premium Series'];
  const locations = [
    { name: 'India', latency: '40-60ms', outOfStock: false },
    { name: 'Singapore', latency: '80-100ms', outOfStock: false }
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
    'Budget Series': [
      { name: 'Dirt Plan', price: '10', vcpu: 'Intel Xeon @2.7GHz', cpu: '50%', ram: '1 GB RAM', ssd: '10 GB Disk', allocations: '1 Allocation', db: '1 Database', backups: '1 Backup', players: '1-3 Players' },
      { name: 'Stone Plan', price: '20', vcpu: 'Intel Xeon @2.7GHz', cpu: '100%', ram: '2 GB RAM', ssd: '10 GB Disk', allocations: '1 Allocation', db: '1 Database', backups: '1 Backup', players: '2-5 Players' },
      { name: 'Coal Plan', price: '40', vcpu: 'Intel Xeon @2.7GHz', cpu: '150%', ram: '4 GB RAM', ssd: '20 GB Disk', allocations: '2 Allocations', db: '1 Database', backups: '2 Backups', players: '3-8 Players' },
      { name: 'Copper Plan', price: '60', vcpu: 'Intel Xeon @2.7GHz', cpu: '200%', ram: '6 GB RAM', ssd: '30 GB Disk', allocations: '2 Allocations', db: '2 Databases', backups: '2 Backups', players: '5-12 Players' },
      { name: 'Iron Plan', price: '80', vcpu: 'Intel Xeon @2.7GHz', cpu: '300%', ram: '8 GB RAM', ssd: '40 GB Disk', allocations: '3 Allocations', db: '2 Databases', backups: '3 Backups', players: '10-20 Players' },
      { name: 'Redstone Plan', price: '120', vcpu: 'Intel Xeon @2.7GHz', cpu: '400%', ram: '12 GB RAM', ssd: '50 GB Disk', allocations: '4 Allocations', db: '3 Databases', backups: '3 Backups', players: '15-25 Players' },
      { name: 'Gold Plan', price: '160', vcpu: 'Intel Xeon @2.7GHz', cpu: '500%', ram: '16 GB RAM', ssd: '60 GB Disk', allocations: '4 Allocations', db: '3 Databases', backups: '4 Backups', bestseller: true, players: '20-30 Players' },
      { name: 'Diamond Plan', price: '240', vcpu: 'Intel Xeon @2.7GHz', cpu: '600%', ram: '24 GB RAM', ssd: '80 GB Disk', allocations: 'Unlimited', db: 'Unlimited', backups: '5 Backups', players: '30-45 Players' },
      { name: 'Netherite Plan', price: '320', vcpu: 'Intel Xeon @2.7GHz', cpu: '800%', ram: '32 GB RAM', ssd: '100 GB Disk', allocations: 'Unlimited', db: 'Unlimited', backups: '5 Backups', players: '40-60 Players' },
    ],
    'Platinum Series': [
      { name: 'Aqua Plan', price: '60', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (2 vCore)', ram: '2 GB DDR4 RAM', ssd: '10 GB NVMe Disk', allocations: '1 Allocation', db: '1 Database', backups: '1 Backup', players: '1-5 Players', cpu: '200%' },
      { name: 'Tidal Plan', price: '120', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (3 vCore)', ram: '4 GB DDR4 RAM', ssd: '20 GB NVMe Disk', allocations: '2 Allocations', db: '1 Database', backups: '2 Backups', players: '5-12 Players', cpu: '300%' },
      { name: 'Lunar Plan', price: '240', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (5 vCore)', ram: '6 GB DDR4 RAM', ssd: '30 GB NVMe Disk', allocations: '3 Allocations', db: '2 Databases', backups: '3 Backups', players: '10-20 Players', cpu: '500%' },
      { name: 'Storm Plan', price: '270', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (8 vCore)', ram: '8 GB DDR4 RAM', ssd: '40 GB NVMe Disk', allocations: '4 Allocations', db: '2 Databases', backups: '3 Backups', bestseller: true, players: '15-30 Players', cpu: '800%' },
      { name: 'Inferno Plan', price: '360', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (12 vCore)', ram: '12 GB DDR4 RAM', ssd: '50 GB NVMe Disk', allocations: '5 Allocations', db: '3 Databases', backups: '4 Backups', players: '25-40 Players', cpu: '1200%' },
      { name: 'Thunder Plan', price: '480', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (16 vCore)', ram: '16 GB DDR4 RAM', ssd: '60 GB NVMe Disk', allocations: 'Unlimited', db: '4 Databases', backups: '5 Backups', players: '35-55 Players', cpu: '1600%' },
      { name: 'Galaxy Plan', price: '720', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (20 vCore)', ram: '24 GB DDR4 RAM', ssd: '80 GB NVMe Disk', allocations: 'Unlimited', db: 'Unlimited', backups: '5 Backups', players: '50-75 Players', cpu: '2000%' },
      { name: 'Immortal Plan', price: '960', vcpu: 'Intel Xeon Platinum 8269CY @2.5GHz (24 vCore)', ram: '32 GB DDR4 RAM', ssd: '100 GB NVMe Disk', allocations: 'Unlimited', db: 'Unlimited', backups: '5 Backups', players: '70-100 Players', cpu: '2400%' },
    ],

    'Proxy Series': [
      { name: 'Starter Proxy', price: '200', vcpu: '2 vCore', ram: '1 GB DDR4 RAM', ssd: '5 GB NVMe Disk', allocations: '3 Allocations', db: '1 Database', backups: '1 Backup', players: 'Proxy' },
      { name: 'Basic Proxy', price: '400', vcpu: '3 vCore', ram: '2 GB DDR4 RAM', ssd: '10 GB NVMe Disk', allocations: '3 Allocations', db: '1 Database', backups: '2 Backups', bestseller: true, players: 'Proxy' },
      { name: 'Advanced Proxy', price: '600', vcpu: '4 vCore', ram: '4 GB DDR4 RAM', ssd: '15 GB NVMe Disk', allocations: '3 Allocations', db: '1 Database', backups: '3 Backups', players: 'Proxy' },
    ],
    'Premium Series': [
      { name: 'Blue Sea Plan', price: '80', vcpu: 'AMD EPYC 9V74 (1 vCore)', ram: '2 GB DDR5 RAM', ssd: '10 GB NVMe Disk', allocations: '1 Allocation', db: '1 Database', backups: '1 Backup', players: '2-5 Players' },
      { name: 'East Blue Plan', price: '160', vcpu: 'AMD EPYC 9V74 (1.5 vCore)', ram: '4 GB DDR5 RAM', ssd: '20 GB NVMe Disk', allocations: '2 Allocations', db: '1 Database', backups: '2 Backups', players: '5-10 Players' },
      { name: 'Grand Line Plan', price: '240', vcpu: 'AMD EPYC 9V74 (2.5 vCore)', ram: '6 GB DDR5 RAM', ssd: '30 GB NVMe Disk', allocations: '3 Allocations', db: '2 Databases', backups: '3 Backups', players: '10-20 Players' },
      { name: 'Supernova Plan', price: '320', vcpu: 'AMD EPYC 9V74 (3 vCore)', ram: '8 GB DDR5 RAM', ssd: '40 GB NVMe Disk', allocations: '4 Allocations', db: '2 Databases', backups: '3 Backups', players: '15-25 Players' },
      { name: 'Warlord Plan', price: '480', vcpu: 'AMD EPYC 9V74 (5 vCore)', ram: '12 GB DDR5 RAM', ssd: '50 GB NVMe Disk', allocations: '5 Allocations', db: '3 Databases', backups: '4 Backups', bestseller: true, players: '25-40 Players' },
      { name: 'Yonko Plan', price: '640', vcpu: 'AMD EPYC 9V74 (6 vCore)', ram: '16 GB DDR5 RAM', ssd: '60 GB NVMe Disk', allocations: 'Unlimited', db: '4 Databases', backups: '5 Backups', players: '35-50 Players' },
      { name: 'Roger Plan', price: '960', vcpu: 'AMD EPYC 9V74 (7 vCore)', ram: '24 GB DDR5 RAM', ssd: '80 GB NVMe Disk', allocations: 'Unlimited', db: 'Unlimited', backups: '5 Backups', players: '45-70 Players' },
      { name: 'Nika Plan', price: '1280', vcpu: 'AMD EPYC 9V74 (8 vCore)', ram: '32 GB DDR5 RAM', ssd: '100 GB NVMe Disk', allocations: 'Unlimited', db: 'Unlimited', backups: '5 Backups', players: '60-90 Players' },
    ],
  };

  return (
    <div className="bg-[#020617] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            poster="/minecraft-bg.png"
            className="w-full h-full object-cover opacity-70 scale-105"
          >
            <source src="/minecraft-bg-video-opt.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/10 via-[#020617]/30 to-[#020617]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-4 text-white">
            Minecraft Server Hosting
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto mb-8">
            Premium Minecraft hosting with zero lag and instant setup
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 px-6 py-2 rounded-full inline-flex items-center gap-2">
              <span className="text-slate-400 text-lg">Starting at</span>
              <span className="text-2xl font-bold text-white text-gradient">{currency.symbol}{formatPrice(10)}/month</span>
            </div>
            
            <button 
              onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-cyan-400 text-[#020617] font-black rounded-full flex items-center gap-3 hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] group"
            >
              View Plans <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Calculator Promo Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full -mr-20 -mt-20" />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Not sure which plan to choose?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Use our advanced Plan Recommendation Calculator to find the perfect resources for your specific server needs.
          </p>
          <Link 
            to="/calculator" 
            className="inline-flex items-center gap-3 px-8 py-3 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold rounded-full hover:bg-cyan-500/30 transition-all"
          >
            Calculate Now <Calculator className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-[#010413]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Minecraft Server Hosting Plans</h2>
            <p className="text-slate-400 text-lg">Choose the perfect plan for your Minecraft server</p>
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
                <div className="flex items-center gap-2">
                  <span>{series}</span>
                </div>
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
                    disabled={loc.outOfStock}
                    onClick={() => !loc.outOfStock && setLocation(loc.name)}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                      location === loc.name && !loc.outOfStock
                        ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' 
                        : 'text-slate-500 hover:text-slate-300'
                    } ${loc.outOfStock ? 'opacity-50 cursor-not-allowed hover:text-slate-500' : ''}`}
                  >
                    {loc.name} 
                    {loc.outOfStock ? (
                      <span className="opacity-80 text-[10px] text-red-400 font-bold tracking-widest uppercase">(Out of stock)</span>
                    ) : (
                      <span className="opacity-60 text-[10px]">({loc.latency})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {plansData[activeSeries].length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="bg-[#0b1126] border border-dashed border-slate-700 rounded-[2.5rem] p-16 max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Zap className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4">Coming Soon</h3>
                    <p className="text-slate-400 text-lg mb-8">
                      Our next-generation {activeSeries} plans are currently being deployed. Stay tuned!
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm font-bold text-slate-400">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                      Deployment in progress
                    </div>
                  </div>
                </motion.div>
              ) : (
                plansData[activeSeries].map((plan, i) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    style={{ backgroundImage: 'url(/cards-removebg-preview.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                    className={`bg-[#0b1126] border rounded-[2rem] p-6 flex flex-col group transition-all relative ${
                      plan.outOfStock
                        ? 'border-red-900/60 opacity-70'
                        : plan.bestseller 
                          ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-[1.02] z-10' 
                          : 'border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    {plan.outOfStock && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                        Out of Stock
                      </div>
                    )}
                    {!plan.outOfStock && plan.bestseller && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-cyan-400 text-[#020617] text-[10px] font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                        Bestseller
                      </div>
                    )}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-black text-white">{currency.symbol}{formatPrice(plan.price)}</span>
                        <span className="text-slate-500 text-sm font-medium">/month</span>
                      </div>
                      
                      <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-lg text-[10px] font-bold text-green-400 uppercase tracking-widest inline-block">
                        + {currency.symbol}{formatPrice(activeSeries === 'Proxy Series' ? 100 : 30)} for {activeSeries === 'Proxy Series' ? 'Full Setup' : 'Basic Plugin Setup'}
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-6 flex-grow">
                      {plan.players && (
                        <div className="flex items-center gap-3 py-1.5 border-b border-white/5 mb-2">
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-xs font-bold text-cyan-400">Recommended for {plan.players}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-100 font-medium">
                        <Cpu className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs">{plan.vcpu}</span>
                      </div>
                      {plan.cpu && (
                        <div className="flex items-center gap-3 text-slate-100 font-medium">
                          <Zap className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-xs">CPU: {plan.cpu}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-100 font-medium">
                        <Database className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs">{plan.ram}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-100 font-medium">
                        <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs">{plan.ssd}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-100 font-medium">
                        <Layout className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs">{plan.allocations}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-100 font-medium">
                        <Save className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs">{plan.db}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-100 font-medium">
                        <Shield className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs">{plan.backups}</span>
                      </div>
                    </div>

                    <div className="bg-slate-900/40 rounded-xl p-3 mb-6 border border-slate-800/50">
                      <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1.5">Additional Services</div>
                      <div className="text-xs text-slate-300 font-medium text-white mb-1">+ {currency.symbol}{formatPrice(activeSeries === 'Proxy Series' ? 100 : 30)} for {activeSeries === 'Proxy Series' ? 'Full Setup' : 'Basic Plugin Setup'} (Optional)</div>
                      {activeSeries === 'Platinum Series' ? (
                        <>
                          <div className="text-xs text-slate-300 font-medium text-white mb-1">+ {currency.symbol}{formatPrice(70)} for Extra 100% CPU (on going plan)</div>
                          <div className="text-xs text-slate-300 font-medium text-white">+ {currency.symbol}{formatPrice(30)} for Extra 1GB RAM (on going plan)</div>
                        </>
                      ) : activeSeries === 'Budget Series' ? (
                        <>
                          <div className="text-xs text-slate-300 font-medium text-white mb-1">+ {currency.symbol}{formatPrice(60)} for Extra 100% CPU (on going plan)</div>
                          <div className="text-xs text-slate-300 font-medium text-white">+ {currency.symbol}{formatPrice(10)} for Extra 1GB RAM (on going plan)</div>
                        </>
                      ) : (
                        <>
                          <div className="text-xs text-slate-300 font-medium text-white mb-1">+ {currency.symbol}{formatPrice(activeSeries === 'Premium Series' ? 90 : 50)} for Extra 100% CPU (1 vCore)</div>
                          <div className="text-xs text-slate-300 font-medium text-white">+ {currency.symbol}{formatPrice(activeSeries === 'Premium Series' ? 40 : 25)} for Extra 1GB RAM</div>
                        </>
                      )}
                    </div>

                    <div className="space-y-2 mb-6 pb-6 border-b border-slate-800">
                      <div className="flex items-center gap-3 text-white font-medium text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        99.9% Uptime Guarantee
                      </div>
                      <div className="flex items-center gap-3 text-white font-medium text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        Instant Setup
                      </div>
                      {activeSeries === 'Proxy Series' && (
                        <div className="flex items-center gap-3 text-white font-medium text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                          DDoS Protected
                        </div>
                      )}
                    </div>

                    {plan.outOfStock ? (
                      <div className="w-full py-3 bg-red-950/40 border border-red-900/50 rounded-xl font-bold text-red-400 text-sm text-center cursor-not-allowed select-none">
                        Out of Stock
                      </div>
                    ) : (
                      <Link 
                        to="/contact"
                        className="w-full py-3 bg-slate-900 border border-slate-700 rounded-xl font-bold text-white hover:bg-cyan-500 hover:border-cyan-400 hover:text-[#020617] transition-all text-sm text-center"
                      >
                        {activeSeries === 'Budget Series' ? 'Create Ticket to Buy' : 'Buy Now'}
                      </Link>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinecraftHosting;
