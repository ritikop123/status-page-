import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Zap, Server, Globe } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      features: ['10GB NVMe SSD', '100GB Bandwidth', '1 Website', 'Free SSL'],
      accent: 'slate'
    },
    {
      name: 'Professional',
      price: '$29',
      recommended: true,
      features: ['50GB NVMe SSD', 'Unlimited Bandwidth', '5 Websites', 'Daily Backups', 'Global CDN'],
      accent: 'primary'
    },
    {
      name: 'Enterprise',
      price: '$99',
      features: ['500GB NVMe SSD', 'Unlimited Bandwidth', 'Unlimited Websites', 'Dedicated IP', 'Priority Support'],
      accent: 'slate'
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your <span className="text-[#00d2ff]">Plan</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Flexible hosting solutions designed to grow with your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-3xl glass border-slate-800 flex flex-col ${
                plan.recommended ? 'ring-2 ring-[#00d2ff] shadow-2xl shadow-cyan-500/10' : ''
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d2ff] text-black text-xs font-bold px-4 py-1 rounded-full uppercase">
                  Most Popular
                </span>
              )}
              
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-slate-500">/mo</span>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-[#00d2ff]" />
                    {feature}
                  </div>
                ))}
              </div>

              <Link 
                to="/contact"
                className={`w-full py-3 rounded-full font-bold transition-all text-center ${
                plan.recommended 
                  ? 'bg-[#00d2ff] hover:bg-[#00b5dc] text-black shadow-lg shadow-cyan-900/20' 
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
