import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, User, ArrowRight, Heart, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDiscordStats from '../hooks/useDiscordStats';

const Blog = () => {
  const discord = useDiscordStats('1493461491955929258');
  
  const posts = [
    {
      id: 2,
      title: "500 Members Strong: Halfway to 1K! 🏔️",
      excerpt: "We've officially crossed 500 members in the Sagarmatha family across South Asia! Thank you for choosing us to power your servers.",
      date: "June 15, 2026",
      author: "Sagarmatha Team",
      category: "Milestone",
      image: "/500.png",
      content: "We are incredibly proud to share that the Sagarmatha Hosting community has officially grown past **500 members**! Our family across Nepal, India, and the rest of South Asia is expanding faster than ever.\n\n### **Growing Together 🤝**\nThis milestone is a testament to the trust you place in our high-performance infrastructure and 24/7 support. We've been working hard behind the scenes to scale our nodes and maintain zero-lag environments.\n\n### **The Goal: 1,000 Members (1K) 🎯**\nWith 500 members under our belt, we are setting our sights on **1,000 members**. We'll continue to optimize, introduce new hosting products, and keep our server quality at its peak."
    },
    {
      id: 1,
      title: "100 Members Strong: Our Journey Begins! 🚀",
      excerpt: "Today marks a massive milestone for Sagarmatha Hosting. We've officially crossed 100 members in our growing family across Nepal, India, and beyond!",
      date: "April 22, 2024",
      author: "Sagarmatha Team",
      category: "Milestone",
      image: "/blog-100-members.png",
      content: "We are beyond thrilled to announce that Sagarmatha Hosting has officially reached **100 members**! What started as a vision to provide premium, zero-lag hosting across **Nepal, India, and beyond** has quickly turned into a vibrant family of gamers, developers, and creators.\n\n### **A Big Thank You to Our Family ❤️**\nTo every single person who chose us to host their world: **Thank you.** You are not just customers to us; you are the reason we keep pushing boundaries and optimizing our hardware every single day.\n\n### **The Road to 200: Our Next Goal 🏆**\nWe're not stopping here! Building on this momentum, our next major milestone is to reach **200 family members**. To get there, we're committing to:\n- Introducing even more powerful nodes (Platinum Series expansion).\n- Launching more community events and giveaways.\n- Continuing to provide the fastest support in the region.\n\nWe would love for you to be part of this next chapter. Let's reach 200 together! 🏔️"
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          >
            <BookOpen className="w-3 h-3" />
            Sagarmatha Chronicles
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Latest Updates</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Stay updated with the latest news, milestones, and development updates from the Sagarmatha family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden group hover:border-cyan-400/50 transition-all flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                
                <h3 className="text-xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest cursor-pointer group/link">
                    Read More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                  <div className="flex gap-2">
                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                      <Heart className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Milestone Teaser Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border-2 border-dashed border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group hover:border-indigo-500/50 transition-all relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-green-400 uppercase tracking-widest">
                {discord.loading ? 'Updating...' : discord.error ? 'LIVE' : `${discord.online} ONLINE`}
              </span>
            </div>

            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
              <Trophy className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">The Road to 1K</h3>
            <p className="text-slate-500 text-sm mb-6">Real-time family tracking enabled.</p>
            
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(590 / 1000) * 100}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              />
            </div>
            <div className="flex justify-between w-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>Current: 590</span>
              <span>1K Goal</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
