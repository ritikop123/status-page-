import React from 'react';
import { Star } from 'lucide-react';

const mc = (name) => `https://mc-heads.net/avatar/${name}/64`;
const av = (n) => `https://i.pravatar.cc/64?img=${n}`;

const reviews = [
  { name: "Aarav S.", role: "SMP Owner", avatar: av(11), msg: "Server's been running smooth for a while now. No complaints, good support.", stars: 5 },
  { name: "CreeperKing99", role: "Survival Player", avatar: mc("Emerald_Grind"), msg: "Decent host, no major lag spikes. My friends enjoy the server.", stars: 5 },
  { name: "Rohan M.", role: "Developer", avatar: av(3), msg: "Got a VPS for a side project. Setup was quick and ping is solid from India.", stars: 5 },
  { name: "BlazeMC_", role: "Server Owner", avatar: mc("PixelNova88"), msg: "Running a small minigames server. Handles it fine with no TPS issues.", stars: 5 },
  { name: "Priya K.", role: "Player", avatar: av(25), msg: "The server my friend hosts feels really smooth here. Good experience overall.", stars: 5 },
  { name: "FactionFox", role: "Factions Host", avatar: mc("IronFang_PvP"), msg: "Better performance than our old host for a cheaper price. Happy with the switch.", stars: 5 },
  { name: "Deepak L.", role: "CS Student", avatar: av(13), msg: "Hosted a small app on their VPS. Staff helped me get it running. Pretty good.", stars: 5 },
  { name: "RedstoneWizard_", role: "Technical MC", avatar: mc("BlockSmith72"), msg: "Redstone farms work without tick issues. Server handles the load well.", stars: 5 },
  { name: "Sameer T.", role: "Server Admin", avatar: av(7), msg: "Panel is clean and easy to use. Managing servers here is straightforward.", stars: 5 },
  { name: "LavaRunner_", role: "Minecraft Player", avatar: mc("LavaRun_99"), msg: "Good value for money. Server runs well, team is responsive when you need them.", stars: 5 },
];

const ReviewCard = ({ review }) => (
  <div className="flex-shrink-0 w-64 bg-slate-900/50 border border-slate-800/60 rounded-2xl p-5 mx-3">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={review.avatar}
        alt={review.name}
        className="w-9 h-9 rounded-full object-cover bg-slate-800 ring-2 ring-slate-700 flex-shrink-0"
        onError={(e) => { e.target.src = `https://i.pravatar.cc/64?u=${encodeURIComponent(review.name)}`; }}
      />
      <div className="min-w-0">
        <div className="text-white font-semibold text-sm truncate">{review.name}</div>
        <div className="text-slate-500 text-[10px] uppercase tracking-wider">{review.role}</div>
      </div>
    </div>
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: review.stars }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-slate-400 text-xs leading-relaxed">{review.msg}</p>
  </div>
);

const Testimonials = () => {
  const row1 = [...reviews, ...reviews];
  const row2 = [...reviews.slice(5), ...reviews.slice(0, 5), ...reviews.slice(5), ...reviews.slice(0, 5)];

  return (
    <div className="py-20 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />

      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3">What People Are Saying</h2>
        <p className="text-slate-600 text-sm">From our growing community of players and developers.</p>
      </div>

      <div className="flex mb-4" style={{ animation: 'marquee 60s linear infinite', width: 'max-content' }}>
        {row1.map((r, i) => <ReviewCard key={`r1-${i}`} review={r} />)}
      </div>
      <div className="flex" style={{ animation: 'marquee-reverse 55s linear infinite', width: 'max-content' }}>
        {row2.map((r, i) => <ReviewCard key={`r2-${i}`} review={r} />)}
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
      `}</style>
    </div>
  );
};

export default Testimonials;
