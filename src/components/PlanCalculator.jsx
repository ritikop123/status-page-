import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlanCalculator = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-8 pb-32 px-4 overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-cyan-400/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto max-w-3xl relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex mb-8 p-5 rounded-2xl bg-slate-900 border border-slate-700/60"
            style={{ boxShadow: '0 0 40px rgba(0,210,255,0.2), 0 0 80px rgba(0,210,255,0.05)' }}
          >
            <Calculator className="w-9 h-9 text-[#00d2ff]" />
          </motion.div>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Calculate Your <span className="text-gradient">Minecraft Server</span> Needs
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Find the perfect Minecraft hosting plan based on your community size, plugins, and modpacks. Our smart calculator recommends the exact amount of RAM and CPU power you need for a lag-free experience.
          </p>

          {/* CTA Button */}
          <motion.button
            onClick={() => navigate('/calculator')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#00d2ff] hover:bg-cyan-400 text-black font-bold text-lg rounded-full transition-all duration-300 group"
            style={{ boxShadow: '0 0 40px rgba(0,210,255,0.4), 0 0 80px rgba(0,210,255,0.1)' }}
          >
            Calculate Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>

          {/* Subtle tag line */}
          <p className="mt-6 text-sm text-slate-600">No account needed · Results in seconds</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanCalculator;
