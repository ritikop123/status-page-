import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full glass border-cyan-500/20 text-[#00d2ff]">
            <Lock className="w-4 h-4" />
            Data Protection
          </div>
          <h1 className="mb-10 text-4xl font-extrabold tracking-tight md:text-5xl text-white">
            Privacy <span className="text-gradient">Policy</span>
          </h1>

          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p>
              At Sagarmatha Hosting, your privacy is our priority. We are committed to protecting your personal information and ensuring transparency behind what data we collect and how we use it. 
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">1. Information We Collect</h3>
            <p>
              When you register an account or use our services, we may collect minimal data necessary for verification and servicing, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Email addresses for account management and communication.</li>
              <li>Payment identifiers supplied by gateways (Visa, eSewa, GPay, Mastercard) strictly for verifying transactions.</li>
              <li>IP addresses for DDOS mitigation and fraud prevention.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">2. How We Use Your Information</h3>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Data is used exclusively for provisioning servers, resolving technical issues, handling billing inquiries, and ensuring platform security.
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">3. Cookies and Tracking</h3>
            <p>
              Our website uses essential cookies required to keep you logged into the client area. We also utilize anonymous analytics to understand site traffic and optimize our platform layout. 
            </p>

            <h3 className="text-xl font-bold text-white mt-12 border-b border-slate-800 pb-2">4. Data Security</h3>
            <p>
              All traffic routed through our website is encrypted via SSL. Passwords and sensitive tokens are securely hashed in our databases, ensuring that our support staff cannot view raw credentials.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
