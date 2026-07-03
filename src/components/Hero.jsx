import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe as GlobeIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Globe as CobeGlobe } from './CobeGlobe';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-10 md:pt-48 md:pb-12">
      <div className="hero-glow" />
      
      {/* Decorative Rotating Globe */}
      <div
        className="absolute z-0 pointer-events-none hidden lg:block"
        style={{ top: '-60px', right: '-180px' }}
      >
        <CobeGlobe />
      </div>

      <div className="container relative px-4 mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full glass border-cyan-500/20 text-[#00d2ff]">
            Next-Gen Cloud Hosting
          </span>
          <h1 className="max-w-4xl mx-auto mb-6 text-4xl font-extrabold tracking-tight md:text-7xl leading-tight">
            <span className="text-outline text-white">Infrastructure to Make Your</span> <span className="text-gradient">Dreams Live</span>
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-base md:text-xl text-slate-300 px-2">
            Providing premium, zero-lag infrastructure across Nepal, India, and beyond.
            Lightning-fast speeds, secured data, and dedicated support for gamers, creators, and companies.
          </p>
        </motion.div>


        {/* Stats / Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-3 lg:gap-12 max-w-6xl mx-auto mb-16"
        >
          {[
            { icon: Zap, title: 'High Performance', desc: 'NVMe & Latest Processors', bgImage: '/nvme.png' },
            { icon: Shield, title: 'DDoS Protection', desc: 'L3 & L4 attack protection with great bandwidth' },
            { icon: GlobeIcon, title: 'Multi Locations', desc: 'Global server connectivity' },
          ].map((feature, i) => (
            <div 
              key={i} 
              style={feature.bgImage ? { backgroundImage: `url(${feature.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              className="relative p-8 transition-transform rounded-3xl glass border-slate-800 hover:-translate-y-2 overflow-hidden group"
            >
              <img 
                src="/button-deco-up.png" 
                alt="" 
                className="absolute top-0 right-0 w-12 h-auto opacity-100 pointer-events-none z-20" 
              />
              <img 
                src="/button-deco-down.png" 
                alt="" 
                className="absolute bottom-0 left-0 w-12 h-auto opacity-100 pointer-events-none z-20" 
              />
              <div className="absolute inset-0 rounded-3xl pointer-events-none glow-border" />
              <div className="relative z-10">
                <div className="inline-flex p-3 mb-4 rounded-2xl bg-cyan-600/10 text-[#00d2ff]">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white text-outline">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Service Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 max-w-5xl mx-auto mt-16"
        >
          {/* Minecraft Card */}
          <Link to="/minecraft-hosting" className="bg-[#0b1126] border-2 border-indigo-500/40 rounded-[2rem] p-4 hover:shadow-[0_0_50px_rgba(99,102,241,0.25)] hover:border-indigo-500/80 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden block">
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="rounded-2xl overflow-hidden mb-6 border-2 border-indigo-500/20 group-hover:border-indigo-500/50 transition-colors h-56 relative shadow-inner">
              <img 
                src="/minecraft-bg.png" 
                alt="Minecraft" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block" 
              />
            </div>
            <h3 className="text-3xl font-black text-center text-white tracking-wider mb-2 text-shadow-sm group-hover:text-indigo-400 transition-colors">MINECRAFT</h3>
          </Link>

          {/* VPS Hosting Card */}
          <Link to="/vps" className="bg-[#0b1126] border-2 border-cyan-500/40 rounded-[2rem] p-4 cursor-pointer hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] hover:border-cyan-500/80 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden block">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="rounded-2xl overflow-hidden mb-6 border-2 border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors h-56 relative shadow-inner flex items-center justify-center">
              <img 
                src="/vps-bg.png" 
                alt="VPS Hosting" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block" 
              />
            </div>
            <h3 className="text-3xl font-black text-center text-white tracking-wider mb-2 text-shadow-sm group-hover:text-cyan-400 transition-colors">VPS HOSTING</h3>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
