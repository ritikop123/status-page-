import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

const Refund = () => {
  return (
    <div className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full glass border-cyan-500/20 text-[#00d2ff]">
            <RefreshCcw className="w-4 h-4" />
            Money-Back Guarantee
          </div>
          <h1 className="mb-10 text-4xl font-extrabold tracking-tight md:text-5xl text-white">
            Refund <span className="text-gradient">Policy</span>
          </h1>

          <div className="relative p-6 mb-12 border-2 border-cyan-500/30 rounded-2xl bg-cyan-500/5">
            <h2 className="text-xl font-bold text-white mb-2">The 24-Hour Promise</h2>
            <p className="text-slate-300">
              We stand by our hardware quality. If you are unsatisfied with your Minecraft or VPS server, you are eligible for an <strong>80% refund</strong> of the amount paid <strong>if requested within 24 hours</strong> of your initial purchase.
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">1. Eligibility for Refunds</h3>
            <p>
              Refunds (80% of the service amount) are strictly provided for initial, newly registered services within the first 24 hours of activation. Renewals, upgrades, and add-ons are strictly non-refundable. 
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">2. Exception to Refunds</h3>
            <p>
              The following services are fundamentally non-refundable due to the nature of licensing and provisioning:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Dedicated Servers</li>
              <li>Domain Name Registrations</li>
              <li>Software Licenses (e.g., cPanel, Windows OS)</li>
              <li>Custom Management Services</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">3. Refund Processing</h3>
            <p>
              To request a refund, you must open a billing ticket through our client area or Support Discord within the 24-hour timeframe. Once approved, the refund will be returned to your original payment method (Visa, Mastercard, GPay, or eSewa). Depending on the gateway, it may take 3-7 business days for the funds to reflect in your account.
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">4. Policy Abuse</h3>
            <p>
              Users found to be abusing the refund policy (e.g., repeatedly purchasing and refunding to utilize servers for short bursts without paying) will be permanently banned from the platform and forfeit all active services.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Refund;
