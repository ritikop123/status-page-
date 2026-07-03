import React from 'react';
import { motion } from 'framer-motion';
import { HeadphonesIcon, Mail, MessageSquare, Ticket, ArrowRight } from 'lucide-react';

const DISCORD_LINK = "https://discord.gg/bkC7UjtcT";

const Contact = () => {
  return (
    <div className="relative pt-32 pb-20 min-h-screen">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="container px-4 mx-auto max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase rounded-full glass border-indigo-500/20 text-indigo-400">
            <HeadphonesIcon className="w-4 h-4" />
            24/7 Support
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl text-white">
            How can we <span className="text-gradient">Help?</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-16 text-lg text-slate-300">
            Choose your preferred way to contact us. For fastest support, join our Discord and open a ticket directly.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">

            {/* Discord Community */}
            <div className="bg-[#020617] border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/50 transition-all duration-300 flex flex-col items-start group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Join Family</h3>
              <p className="text-slate-400 mb-8 flex-grow text-sm leading-relaxed">
                Join our Discord community to chat with other players, see announcements, and get community support.
              </p>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                JOIN DISCORD <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Email Support */}
            <div className="bg-[#020617] border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-start group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-slate-400 mb-8 flex-grow text-sm leading-relaxed">
                For partnerships, billing disputes, or formal inquiries that need a written record.
              </p>
              <a href="mailto:support@host.sagarmatha.site" className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                EMAIL SUPPORT <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Discord Ticket */}
            <div className="bg-slate-900/60 border-2 border-cyan-400 p-8 rounded-3xl shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-cyan-400 text-[#020617] text-[9px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                Fastest Response
              </div>

              <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center text-cyan-400 mb-6">
                <Ticket className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black text-white mb-3">Open a Ticket</h3>
              <p className="text-slate-400 mb-10 flex-grow text-sm leading-relaxed">
                Get direct help from our staff. Join our Discord server and open a support ticket — our team will be with you shortly.
              </p>

              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-cyan-400 text-[#020617] text-center font-black rounded-xl hover:bg-cyan-300 transition-all shadow-[0_10px_20px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2 group"
              >
                OPEN TICKET ON DISCORD
                <Ticket className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
