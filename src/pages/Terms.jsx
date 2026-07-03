import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Zap } from 'lucide-react';

const Terms = () => {
  return (
    <div className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full glass border-cyan-500/20 text-[#00d2ff]">
            <FileText className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="mb-10 text-4xl font-extrabold tracking-tight md:text-5xl text-white">
            Terms of <span className="text-gradient">Service</span>
          </h1>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p>
              Welcome to Sagarmatha Hosting. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully before utilizing our Minecraft or VPS hosting platforms.
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">1. Use of Services</h3>
            <p>
              Our hosting services are intended for personal and commercial use in accordance with all applicable laws. You agree not to use our infrastructure for any illegal activities, including but not limited to hosting malicious software, conducting DDoS attacks, or infringing on intellectual property.
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">2. Account Responsibility</h3>
            <p>
              You are responsible for maintaining the security of your account and any associated passwords. Sagarmatha Hosting cannot be held liable for any loss or damage from your failure to comply with this security obligation.
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">3. Acceptable Use Policy (AUP)</h3>
            <p>
              Users must not consume excessive network resources that negatively impact other users on shared nodes. While we provide high-performance unmetered connections, sustained abuse of CPU, RAM, or bandwidth limits on fair-use plans may result in service suspension.
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">4. Service Uptime and SLA</h3>
            <p>
              We strive to provide a 99.9% uptime. However, scheduled maintenance or unforeseen hardware failure may occur. In the event of a significant unannounced outage, users may be eligible for SLA credits as determined by our support team.
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">5. Data Loss and Backups</h3>
            <p>
              While Sagarmatha Hosting provides redundant NVMe storage, you act as the sole responsible party for your data. We highly recommend maintaining off-site backups configurations. We are not liable for lost game server chunks, database corruption, or unintended file deletions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
