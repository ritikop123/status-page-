import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Users, Code, MessageSquare, Zap, Shield, Globe, Terminal, Heart, Lock, Headphones } from 'lucide-react';

const About = () => {
  const founders = [
    {
      name: "RITIK OP",
      role: "Founder & CTO",
      desc: "The technical powerhouse behind Sagarmatha. Ritik manages the intricate hosting panels, builds our high-performance websites, and works tirelessly on infrastructure improvements to ensure a lag-free experience.",
      icon: <Terminal className="w-8 h-8 text-cyan-400" />,
      skills: ["Infrastructure", "Web Development", "Panel Security"]
    },
    {
      name: "BABALJAMES",
      role: "Founder & COO",
      desc: "The heart of our community. Babaljames handles the Sagarmatha family, managing our vibrant Discord community and ensuring every player gets the attention and quality service they deserve.",
      icon: <MessageSquare className="w-8 h-8 text-indigo-400" />,
      skills: ["Community Growth", "Support Lead", "Operations"]
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Users className="w-3 h-3" />
            Our Story
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            We are <span className="text-gradient">Sagarmatha.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Born from a passion for gaming and a need for regional excellence, we're building the future of hosting across Nepal, India, and beyond.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 md:p-14 backdrop-blur-xl relative group hover:border-cyan-400/30 transition-all overflow-hidden"
            >
              <img 
                src="/button-deco-up.png" 
                alt="" 
                className="absolute top-0 right-0 w-16 h-auto opacity-100 pointer-events-none z-20" 
              />
              <img 
                src="/button-deco-down.png" 
                alt="" 
                className="absolute bottom-0 left-0 w-16 h-auto opacity-100 pointer-events-none z-20" 
              />
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                {founder.icon}
              </div>
              
              <div className="mb-10 inline-flex p-5 bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl group-hover:scale-110 transition-transform">
                {founder.icon}
              </div>
              
              <h3 className="text-4xl font-extrabold text-white mb-2">{founder.name}</h3>
              <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.3em] mb-8">{founder.role}</p>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                {founder.desc}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {founder.skills.map(skill => (
                  <span key={skill} className="px-4 py-1.5 bg-slate-950 border border-slate-800 rounded-full text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission / Values Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black text-white mb-6">Built for the <br /> <span className="text-indigo-400">Next Generation</span></h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              We don't just sell servers. We provide the infrastructure that turns your creative ideas into digital realities.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 font-black text-xs uppercase tracking-widest">
              Our Vision <Zap className="w-4 h-4" />
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: "Zero Compromise", desc: "We use only top-tier hardware—from Intel Platinum to NVMe SSDs." },
              { icon: Lock, title: "Data Privacy", desc: "Player privacy and data security is our top priority. We use enterprise encryption and zero-log policies." },
              { icon: Headphones, title: "Seamless Support", desc: "We provide instant, 24/7 reliability and support to every player in the Sagarmatha family." },
              { icon: Globe, title: "Regional Focus", desc: "Optimizing networks specifically for Nepal, India, and the South Asian market." },
              { icon: Code, title: "Custom Solutions", desc: "Tailor-made panels and automated requirements calculators." },
              { icon: Heart, title: "Community First", desc: "Support that actually understands gamers because we are gamers." }
            ].map((value) => (
              <div key={value.title} className="p-8 bg-slate-900/40 border border-slate-800 rounded-[2rem] hover:bg-slate-900/60 transition-colors">
                <value.icon className="w-6 h-6 text-indigo-400 mb-6" />
                <h4 className="text-white font-bold mb-3">{value.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
