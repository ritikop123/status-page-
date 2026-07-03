import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#040816] text-slate-400 py-16 border-t border-slate-900 border-opacity-50">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col space-y-6 md:col-span-2 md:pr-12">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/hostinglogo.png"
                alt="Sagarmatha Hosting"
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Sagarmatha
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              High-performance hosting solutions for Web Hosting, Minecraft servers, and more.
            </p>
            {/* Payment Methods Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-[340px]">
              {/* Visa */}
              <div className="flex items-center justify-center w-full h-[54px] bg-[#0c1222] border border-slate-800 rounded-xl hover:bg-[#111930] transition-colors">
                <span className="italic font-extrabold text-white text-[22px] tracking-widest mt-0.5">VISA</span>
              </div>
              
              {/* Mastercard */}
              <div className="flex items-center justify-center gap-2.5 w-full h-[54px] bg-[#0c1222] border border-slate-800 rounded-xl hover:bg-[#111930] transition-colors">
                <svg width="34" height="22" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="#EB001B"/>
                  <circle cx="22" cy="10" r="10" fill="#F79E1B"/>
                </svg>
                <span className="text-white text-[17px] font-medium tracking-tight mt-1">mastercard</span>
              </div>

              {/* GPay */}
              <div className="flex items-center justify-center gap-2.5 w-full h-[54px] bg-[#0c1222] border border-slate-800 rounded-xl hover:bg-[#111930] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22px" height="22px">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.9c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.13-10.36 7.13-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                <span className="text-white text-[21px] font-medium tracking-tight mt-0.5">Pay</span>
              </div>

              {/* eSewa */}
              <div className="flex items-center justify-center gap-2.5 w-full h-[54px] bg-[#0c1222] border border-slate-800 rounded-xl hover:bg-[#111930] transition-colors">
                <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="50" fill="#60B546"/>
                  <path d="M72 54H94V44H73C71 27 57 15 41 15C21 15 6 30 6 50C6 70 20 85 40 85C56 85 68 76 74 63L61 57C57 65 49 70 41 70C28 70 19 60 19 47H72.5ZM41 27C51 27 58 34 60 44H21C23 34 31 27 41 27Z" fill="white"/>
                </svg>
                <span className="text-[#60B546] font-bold text-[21px] tracking-tight mt-0.5">eSewa</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-lg mb-2">Services</h4>
            <Link to="/minecraft-hosting" className="hover:text-white transition-colors">Minecraft Hosting</Link>
            <Link to="/vps" className="hover:text-white transition-colors">VPS Hosting</Link>
            <Link to="/" className="hover:text-white transition-colors">Web Hosting</Link>
          </div>

          {/* Company Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-lg mb-2">Company</h4>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>

          {/* Support Column */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold text-lg mb-2">Support</h4>
            <Link to="/contact" className="hover:text-white transition-colors">Discord Server</Link>
            <Link to="/" className="hover:text-white transition-colors">Knowledge Base</Link>
            <Link to="/calculator" className="hover:text-white transition-colors">Plan Calculator</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Help Center</Link>
            <Link to="/status" className="hover:text-white transition-colors flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              System Status
            </Link>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex justify-center items-center text-sm text-slate-500">
          <p>© 2026 Sagarmatha Hosting. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
