import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Contact from './pages/Contact';
import MinecraftHosting from './pages/MinecraftHosting';
import Calculator from './pages/Calculator';
import Blog from './pages/Blog';
import About from './pages/About';
import ComingSoon from './pages/ComingSoon';
import VPSHosting from './pages/VPSHosting';
import Status from './pages/Status';

function App() {
  return (
    <ThemeProvider>
      <Router>
      <div className="min-h-screen bg-[#020617] text-white selection:bg-primary-500/30">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/minecraft-hosting" element={<MinecraftHosting />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/dedicated-servers" element={<ComingSoon />} />
          <Route path="/vps" element={<ComingSoon />} />
          <Route path="/status" element={<Status />} />
        </Routes>
        <Footer />
      </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
