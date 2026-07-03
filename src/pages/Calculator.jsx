import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator as CalcIcon, Users, Cpu, Zap, Shield, ArrowRight, Server, Box, Layers, Settings2, Globe, Eye, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const Calculator = () => {
  const [players, setPlayers] = useState(0);
  const [plugins, setPlugins] = useState(0);
  const [mods, setMods] = useState(0);
  const [serverType, setServerType] = useState('Paper/Purpur');
  const [version, setVersion] = useState('1.18 - 1.21');
  const [viewDistance, setViewDistance] = useState(8);
  const [priority, setPriority] = useState('Budget');
  const [recommendedPlan, setRecommendedPlan] = useState(null);

  const serverTypes = [
    { name: 'Vanilla', baseRam: 1, icon: <Server className="w-5 h-5" /> },
    { name: 'Paper/Purpur', baseRam: 1.5, icon: <Zap className="w-5 h-5" /> },
    { name: 'Spigot/Bukkit', baseRam: 2, icon: <Layers className="w-5 h-5" /> },
    { name: 'Forge/Fabric', baseRam: 3, icon: <Box className="w-5 h-5" /> },

  ];

  const versions = [
    { name: '1.8 - 1.12', multiplier: 1.0 },
    { name: '1.13 - 1.17', multiplier: 1.3 },
    { name: '1.18 - 1.21', multiplier: 1.8 },
  ];

  const plansData = {
    'Budget': [
      { name: 'Budget 3 GB Plan', ram: 3, price: 50, series: 'Budget Series' },
      { name: 'Budget 6 GB Plan', ram: 6, price: 80, series: 'Budget Series' },
      { name: 'Budget 8 GB Plan', ram: 8, price: 130, series: 'Budget Series' },
      { name: 'Budget 12 GB Plan', ram: 12, price: 200, series: 'Budget Series' },
      { name: 'Budget 16 GB Plan', ram: 16, price: 280, series: 'Budget Series' },
      { name: 'Budget 24 GB Plan', ram: 24, price: 380, series: 'Budget Series' },
      { name: 'Budget 32 GB Plan', ram: 32, price: 500, series: 'Budget Series' },
    ],
    'Performance': [
      { name: 'Perf 3 GB Plan', ram: 3, price: 80, series: 'Performance Series' },
      { name: 'Perf 6 GB Plan', ram: 6, price: 130, series: 'Performance Series' },
      { name: 'Perf 8 GB Plan', ram: 8, price: 210, series: 'Performance Series' },
      { name: 'Perf 12 GB Plan', ram: 12, price: 320, series: 'Performance Series' },
      { name: 'Perf 16 GB Plan', ram: 16, price: 450, series: 'Performance Series' },
      { name: 'Perf 24 GB Plan', ram: 24, price: 610, series: 'Performance Series' },
      { name: 'Perf 32 GB Plan', ram: 32, price: 800, series: 'Performance Series' },
    ]
  };

  useEffect(() => {
    const pCount = parseInt(players) || 0;
    const plCount = parseInt(plugins) || 0;
    const mCount = parseInt(mods) || 0;

    if (pCount > 0 || plCount > 0 || mCount > 0 || serverType !== '') {
      calculatePlan();
    } else {
      setRecommendedPlan(null);
    }
  }, [players, plugins, mods, serverType, priority, version, viewDistance]);

  const calculateRequiredRam = () => {
    const selectedType = serverTypes.find(t => t.name === serverType) || serverTypes[1];
    const selectedVersion = versions.find(v => v.name === version) || versions[2];
    const pCount = parseInt(players) || 0;
    const plCount = parseInt(plugins) || 0;
    const mCount = parseInt(mods) || 0;

    // View Distance Multiplier (Aggressive scaling for modern chunk loads)
    let vdMult = 1.0;
    if (viewDistance === 4) vdMult = 0.45;
    else if (viewDistance === 5) vdMult = 0.55;
    else if (viewDistance === 6) vdMult = 0.65;
    else if (viewDistance <= 8) vdMult = 1.0;
    else if (viewDistance <= 10) vdMult = 1.6;
    else if (viewDistance <= 12) vdMult = 2.8;
    else vdMult = 5.2; // 16 chunks is exponential load

    // Core Logic Adjusted to match Reality of Plan Cards
    // Budget: ~0.28GB per player | Performance: ~0.18GB per player (Reduced by 30% for efficiency)
    const pWeight = priority === 'Performance' ? 0.18 : 0.28;
    const coreRam = selectedType.baseRam * selectedVersion.multiplier;
    
    // Plugins and Mods weights
    const pluginVal = plCount * 0.17;
    const modVal = mCount * 0.35;

    let required = coreRam + (pCount * pWeight * vdMult) + pluginVal + modVal;
    
    return required;
  };

  const calculatePlan = () => {
    const requiredRam = calculateRequiredRam();
    const availablePlans = plansData[priority];
    const bestPlan = availablePlans.find(plan => plan.ram >= requiredRam) || availablePlans[availablePlans.length - 1];
    setRecommendedPlan(bestPlan);
  };

  const getTpsStatus = () => {
    if (!recommendedPlan) return {};
    const ramUsage = (calculateRequiredRam() / recommendedPlan.ram) * 100;
    const isBudget = priority === 'Budget';
    const isExtremeVD = viewDistance >= 13;
    const isHeavy = parseInt(players) > 40 || parseInt(mods) > 80;

    // Logic Priority: Extreme Load > Heavy Scale > Normal
    if (isExtremeVD && isBudget) {
      return { label: 'CPU Boundary Reach / TPS Risk', color: 'text-red-500', bar: 'bg-red-500', width: '25%' };
    }
    if (ramUsage > 90 || (isHeavy && isBudget)) {
      return { label: 'Medium Stability / Sizable Load', color: 'text-amber-500', bar: 'bg-amber-500', width: '55%' };
    }
    if (isExtremeVD && !isBudget) {
      return { label: 'Platinum Smooth / High Distance', color: 'text-cyan-400', bar: 'bg-cyan-400', width: '85%' };
    }
    
    return { label: 'Zero Lag / 20.0 TPS', color: 'text-green-400', bar: 'bg-green-400', width: '100%' };
  };

  const handleInputChange = (setter, val, max) => {
    if (val === '') {
      setter('');
      return;
    }
    const num = parseInt(val) || 0;
    setter(Math.min(num, max));
  };

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          >
            <CalcIcon className="w-3 h-3" />
            Sagarmatha Server Requrements
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">World Class Accuracy</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Developed with real-world JVM profiling data. Our algorithm accounts for Minecraft versions, view distance, and entity scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls - Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Software & Version */}
              <div className="space-y-6 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Server Software
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {serverTypes.map((type) => (
                      <button
                        key={type.name}
                        onClick={() => setServerType(type.name)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all text-[11px] font-bold ${
                          serverType === type.name 
                            ? 'bg-cyan-400 border-cyan-400 text-[#020617]' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block flex items-center gap-2">
                    <History className="w-3 h-3" /> Game Version
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {versions.map((v) => (
                      <button
                        key={v.name}
                        onClick={() => setVersion(v.name)}
                        className={`px-2 py-2.5 rounded-xl border transition-all text-[10px] font-black ${
                          version === v.name 
                            ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Distance Card */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block flex items-center gap-2">
                    <Eye className="w-3 h-3" /> View Distance
                  </label>
                  <p className="text-slate-500 text-[10px] mb-6 leading-relaxed">Higher distance exponentially increases RAM usage as more chunks are loaded for every player.</p>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-4xl font-black text-white">{viewDistance}</span>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="4"
                        max="16"
                        value={viewDistance}
                        onChange={(e) => setViewDistance(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-2xl">
                  <p className="text-[10px] font-bold text-indigo-400 text-center">
                    {viewDistance > 12 
                      ? '⚠️ Extreme Area Loading: Significant CPU strain detected' 
                      : viewDistance > 8 
                        ? 'Standard SMP Load: Balanced performance profile' 
                        : 'Optimized Visibility: Minimum resource footprint'}
                  </p>
                </div>
              </div>
            </div>

            {/* Scale Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Players */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-6 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Players</label>
                  <input 
                    type="number" 
                    value={players}
                    onFocus={() => players === 0 && setPlayers('')}
                    onBlur={() => players === '' && setPlayers(0)}
                    onChange={(e) => handleInputChange(setPlayers, e.target.value, 500)}
                    className="bg-slate-950/50 border border-slate-800 rounded-lg text-cyan-400 font-black text-center w-12 py-1 outline-none text-xs"
                  />
                </div>
                <input type="range" min="0" max="250" value={players} onChange={(e) => setPlayers(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
              </div>

              {/* Plugins */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-6 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Plugins</label>
                  <input 
                    type="number" 
                    value={plugins}
                    onFocus={() => plugins === 0 && setPlugins('')}
                    onBlur={() => plugins === '' && setPlugins(0)}
                    onChange={(e) => handleInputChange(setPlugins, e.target.value, 200)}
                    className="bg-slate-950/50 border border-slate-800 rounded-lg text-cyan-400 font-black text-center w-12 py-1 outline-none text-xs"
                  />
                </div>
                <input type="range" min="0" max="100" value={plugins} onChange={(e) => setPlugins(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
              </div>

              {/* Mods */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-6 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mods</label>
                  <input 
                    type="number" 
                    value={mods}
                    onFocus={() => mods === 0 && setMods('')}
                    onBlur={() => mods === '' && setMods(0)}
                    onChange={(e) => handleInputChange(setMods, e.target.value, 500)}
                    className="bg-slate-950/50 border border-slate-800 rounded-lg text-cyan-400 font-black text-center w-12 py-1 outline-none text-xs"
                  />
                </div>
                <input type="range" min="0" max="300" value={mods} onChange={(e) => setMods(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400" />
              </div>
            </div>

            {/* Tier Select */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-4 backdrop-blur-xl">
              <div className="flex gap-2">
                {[
                  { id: 'Budget', label: 'Budget Series (Xeon)', icon: <Shield className="w-4 h-4" /> },
                  { id: 'Performance', label: 'Performance Series (Platinum)', icon: <Zap className="w-4 h-4" /> }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriority(p.id)}
                    className={`flex-1 py-4 rounded-2xl font-black text-[11px] transition-all flex items-center justify-center gap-2 border ${
                      priority === p.id 
                        ? 'bg-slate-800 border-slate-700 text-white shadow-xl' 
                        : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results - Right Column */}
          <div className="lg:col-span-5 space-y-6 sticky top-32">
            <AnimatePresence mode="wait">
              {recommendedPlan ? (
                <div className="space-y-6">
                  {/* Main Result Card */}
                  <motion.div
                    key={recommendedPlan.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-gradient-to-br from-[#0b1126] to-[#020617] border-2 border-cyan-400 rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(34,211,238,0.2)] overflow-hidden relative group"
                  >
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                      <CalcIcon className="w-48 h-48 text-cyan-400 rotate-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-6">
                        <div className="bg-cyan-400 text-[#020617] text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                          Server Requirement Suggestion
                        </div>
                        {priority === 'Budget' && calculateRequiredRam() > 10 && (
                          <div className="bg-amber-500 text-[#020617] text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full animate-pulse">
                            ⚠️ High Swap Risk
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-4xl font-black text-white mb-2">{recommendedPlan.name}</h3>
                      <p className="text-cyan-400/80 font-black text-xs uppercase tracking-[0.2em] mb-10">{recommendedPlan.series}</p>

                      <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                          <span className="text-slate-500 text-[10px] font-black uppercase block mb-1">Guaranteed RAM</span>
                          <p className="text-3xl font-black text-white flex items-center gap-2">
                            <Cpu className="w-6 h-6 text-cyan-400" />
                            {recommendedPlan.ram}GB
                          </p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                          <span className="text-slate-500 text-[10px] font-black uppercase block mb-1">Monthly Price</span>
                          <p className="text-3xl font-black text-white flex items-baseline gap-1">
                            ₹{recommendedPlan.price}
                          </p>
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className="flex items-center justify-center gap-3 w-full py-5 bg-cyan-400 rounded-2xl text-[#020617] font-black transition-all hover:bg-cyan-300 shadow-[0_15px_30px_rgba(34,211,238,0.3)] hover:-translate-y-1"
                      >
                        Launch Server Now <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Insights Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md"
                  >
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-cyan-400" /> Real-time JVM Profiling
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">TPS Stability</span>
                          <span className={getTpsStatus().color}>{getTpsStatus().label}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: getTpsStatus().width }} className={`h-full ${getTpsStatus().bar}`} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-slate-400">Memory Allocation</span>
                          <span className={Math.round((calculateRequiredRam() / recommendedPlan.ram) * 100) > 85 ? 'text-red-500' : 'text-cyan-400'}>
                            {Math.round((calculateRequiredRam() / recommendedPlan.ram) * 100)}% Used
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${Math.min(100, (calculateRequiredRam() / recommendedPlan.ram) * 100)}%` }} 
                            className={`h-full ${Math.round((calculateRequiredRam() / recommendedPlan.ram) * 100) > 85 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]'}`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800/50">
                          <span className="text-slate-600 font-black text-[9px] uppercase block mb-1">CPU Overhead</span>
                          <p className="text-slate-300 font-black text-sm">
                            {priority === 'Performance' 
                              ? (viewDistance <= 6 ? '2-5%' : '5-12%') 
                              : (viewDistance <= 6 ? '8-12%' : '15-28%')}
                          </p>
                        </div>
                        <div className="p-4 bg-slate-950/40 rounded-2xl border border-slate-800/50 text-right">
                          <span className="text-slate-600 font-black text-[9px] uppercase block mb-1">latency rank</span>
                          <p className="text-green-400 font-black text-sm">Top 1%</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center min-h-[500px] border-2 border-dashed border-slate-800 rounded-[3rem] bg-slate-900/10 p-12 text-center">
                  <div className="max-w-xs">
                    <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Settings2 className="w-10 h-10 text-slate-700 animate-spin-slow" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-400 mb-2">Awaiting Requirements</h3>
                    <p className="text-slate-600 text-sm">Fine-tune the architecture on the left to initialize the recommendation engine.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
