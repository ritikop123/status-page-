import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Server, Cpu, Gamepad2, MessageSquare, Calculator, Users, BookOpen, Handshake, FileText, Lock, RotateCcw, Headphones, LayoutDashboard, MonitorPlay, Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';





const services = [
  { icon: Gamepad2, title: 'Minecraft Hosting', desc: 'High performance minecraft hosting', path: '/minecraft-hosting' },
  { icon: Server, title: 'VPS Hosting', desc: 'Scalable virtual private servers', path: '/vps' },
  { icon: Cpu, title: 'Dedicated Servers', desc: 'Full power, zero limitations', path: '/dedicated-servers' },
];

const quickLinks = [
  { icon: Calculator, title: 'Plan Calculator', desc: 'Find the right plan for you', path: '/calculator', external: false },
  { icon: MessageSquare, title: 'Discord Community', desc: 'Get help & connect with us', path: 'https://discord.gg/bkC7UjtcT', external: true },
];

const companyItems = [
  { icon: Users, title: 'About Us', desc: 'Learn more about Sagarmatha', path: '/about' },
  { icon: BookOpen, title: 'Blog', desc: 'Latest news and guides', path: '/blog' },
  { icon: Handshake, title: 'Partnerships', desc: 'Collaborate with us', path: '/contact' },
];

const companyLinks = [
  { icon: FileText, title: 'Terms of Service', path: '/terms' },
  { icon: Lock, title: 'Privacy Policy', path: '/privacy' },
  { icon: RotateCcw, title: 'Refund Policy', path: '/refund' },
  { icon: Headphones, title: 'Contact Support', path: '/contact' },
  { icon: Activity, title: 'System Status', path: '/status' },
];

const websiteItems = [
  { icon: Gamepad2, title: 'Minecraft Panel', desc: 'Secure host.sagarmatha.site', path: 'https://host.sagarmatha.site' }
];




const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const { isDark, toggle } = useTheme();



  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 1, layout: { duration: 0.3 } }}
        className={`flex items-center justify-between px-8 py-4 pointer-events-auto ${
          isScrolled
            ? 'w-[92%] max-w-6xl mt-6 rounded-full bg-slate-950/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl'
            : 'w-full max-w-full mt-0 rounded-none bg-slate-950/40 backdrop-blur-md border-b border-white/10 shadow-none'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group flex-shrink-0">
          <img
            src="/hostinglogo.png"
            alt="Sagarmatha Hosting Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block text-outline">
            Sagarmatha
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-14 absolute left-1/2 -translate-x-1/2">

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <a
              href="#"
              className="text-[14px] font-medium transition-colors text-slate-400 hover:text-white whitespace-nowrap"
            >
              Services
            </a>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[560px] bg-slate-950/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-6"
                  style={{ boxShadow: '0 0 40px rgba(0,210,255,0.07), 0 25px 50px rgba(0,0,0,0.7)' }}
                >
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                      {services.map((s) => (
                        <Link key={s.title} to={s.path} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-800/60 transition-colors group">
                          <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors flex-shrink-0">
                            <s.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{s.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="w-px bg-slate-700/50 self-stretch" />
                    <div className="w-48 flex flex-col justify-center gap-1">
                      {quickLinks.map((q) => (
                        q.external
                          ? <a key={q.title} href={q.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800/60 transition-colors group">
                              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors flex-shrink-0">
                                <q.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{q.title}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{q.desc}</div>
                              </div>
                            </a>
                          : <Link key={q.title} to={q.path} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-800/60 transition-colors group">
                              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors flex-shrink-0">
                                <q.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{q.title}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{q.desc}</div>
                              </div>
                            </Link>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <a href="#" className="text-[14px] font-medium transition-colors text-slate-400 hover:text-white whitespace-nowrap">
              Company
            </a>
            <AnimatePresence>
              {companyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[520px] bg-slate-950/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-6"
                  style={{ boxShadow: '0 0 40px rgba(0,210,255,0.07), 0 25px 50px rgba(0,0,0,0.7)' }}
                >
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1">
                      {companyItems.map((c) => (
                        <Link key={c.title} to={c.path} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-800/60 transition-colors group">
                          <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors flex-shrink-0">
                            <c.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{c.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{c.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="w-px bg-slate-700/50 self-stretch" />
                    <div className="w-44 flex flex-col justify-center gap-1">
                      {companyLinks.map((q) => (
                        <Link key={q.title} to={q.path} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-800/60 transition-colors group text-slate-400 hover:text-white">
                          <q.icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                          <span className="text-sm font-medium">{q.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Websites Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setWebsiteOpen(true)}
            onMouseLeave={() => setWebsiteOpen(false)}
          >
            <a href="#" className="text-[14px] font-medium transition-colors text-slate-400 hover:text-white whitespace-nowrap">
              Websites
            </a>
            <AnimatePresence>
              {websiteOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-72 bg-slate-950/95 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-4"
                  style={{ boxShadow: '0 0 40px rgba(0,210,255,0.07), 0 25px 50px rgba(0,0,0,0.7)' }}
                >
                  <div className="flex flex-col gap-1">
                    {websiteItems.map((w) => (
                      <a key={w.title} href={w.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-800/60 transition-colors group">
                        <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors flex-shrink-0">
                          <w.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{w.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{w.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status Link */}
          <Link
            to="/status"
            className="text-[14px] font-medium transition-colors text-slate-400 hover:text-white whitespace-nowrap"
          >
            Status
          </Link>

        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/50 text-slate-400 hover:text-white hover:border-slate-600 transition-all duration-300"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            to="/contact"
            className="px-6 py-2.5 border border-cyan-400 text-cyan-400 text-sm font-medium rounded-xl hover:bg-cyan-500/10 transition-all duration-300 relative group/btn flex items-center justify-center"
            style={{ boxShadow: '0 0 15px rgba(0,210,255,0.35), inset 0 0 10px rgba(0,210,255,0.05)' }}
          >
            <img 
              src="/ice.png" 
              alt="" 
              className="absolute right-4 top-full -mt-2 w-10 h-auto pointer-events-none select-none z-20 opacity-100" 
            />
            <span className="relative z-10">Support</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-300 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute left-4 right-4 top-24 rounded-3xl bg-slate-900/95 backdrop-blur-2xl p-6 flex flex-col gap-1 md:hidden z-40 border border-slate-800 shadow-2xl pointer-events-auto"
          >
            {/* Services */}
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest px-2 pb-1 pt-2">Services</p>
            {[
              { name: 'Minecraft Hosting', path: '/minecraft-hosting' },
              { name: 'VPS Hosting', path: '/vps' },
              { name: 'Dedicated Servers', path: '/dedicated-servers' },
            ].map((link) => (
              <Link key={link.name} to={link.path} className="text-base font-semibold text-slate-300 hover:text-white transition-colors py-2 px-2 rounded-xl hover:bg-slate-800/50" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}

            <div className="border-t border-slate-800/60 my-2" />

            {/* Tools */}
            <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest px-2 pb-1">Tools</p>
            {[
              { name: 'Plan Calculator', path: '/calculator' },
              { name: 'Blog', path: '/blog' },
              { name: 'About Us', path: '/about' },
              { name: 'System Status', path: '/status' },
            ].map((link) => (
              <Link key={link.name} to={link.path} className="text-base font-semibold text-slate-300 hover:text-white transition-colors py-2 px-2 rounded-xl hover:bg-slate-800/50" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
            ))}

            <div className="border-t border-slate-800/60 my-2" />

            {/* External */}
            <a href="https://host.sagarmatha.site" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-2 px-2 rounded-xl hover:bg-slate-800/50" onClick={() => setIsOpen(false)}>
              Minecraft Panel ↗
            </a>
            <a href="https://discord.gg/bkC7UjtcT" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-2 px-2 rounded-xl hover:bg-slate-800/50" onClick={() => setIsOpen(false)}>
              Discord Community ↗
            </a>

            <div className="pt-3">
              <Link
                to="/contact"
                className="w-full py-4 border border-cyan-400 text-cyan-400 font-bold rounded-xl flex items-center justify-center relative group/btn"
                style={{ boxShadow: '0 0 10px rgba(0,210,255,0.4), inset 0 0 10px rgba(0,210,255,0.05)' }}
                onClick={() => setIsOpen(false)}
              >
                <img 
                  src="/ice.png" 
                  alt="" 
                  className="absolute right-6 top-full -mt-2.5 w-12 h-auto pointer-events-none select-none z-20 opacity-100" 
                />
                <span className="relative z-10">Support</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
