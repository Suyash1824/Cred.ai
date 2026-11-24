import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ArrowRight, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  Lock,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Cpu,
  Scale
} from 'lucide-react';
import { InteractiveCard } from '../components/InteractiveCard';

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-orange-500 selection:text-black overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION — Initial Landing Page (Reference 1: Atlas Bank Style)   */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between bg-radial from-[#1e0e03] via-[#0e0702] to-[#050507] overflow-hidden border-b border-orange-950/40">
        
        {/* Luminous Pulsing Neon Amber/Orange Auras */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[460px] bg-gradient-to-tr from-orange-600/25 via-amber-600/20 to-transparent blur-[140px] pointer-events-none rounded-full animate-aura-breath" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/15 blur-[110px] pointer-events-none rounded-full" />
        
        {/* Left Vertical Navigation Rail (Atlas Bank Style) */}
        <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-16 flex-col items-center justify-between py-8 border-r border-zinc-800/80 z-40 bg-[#07070a]/85 backdrop-blur-md">
          {/* Top Atlas Bank Sphere Indicator */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 shadow-[0_0_20px_rgba(249,115,22,0.7)] flex items-center justify-center animate-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-black shadow-xs" />
          </div>

          {/* Rotated Vertical Navigation Links */}
          <div className="flex flex-col items-center gap-10 tracking-[0.28em] text-[10px] font-bold text-zinc-400 uppercase select-none">
            <span className="rotate-180 [writing-mode:vertical-lr] hover:text-orange-400 transition-colors cursor-pointer">
              FEATURES
            </span>
            <span className="rotate-180 [writing-mode:vertical-lr] hover:text-orange-400 transition-colors cursor-pointer">
              BENEFITS
            </span>
            <span className="rotate-180 [writing-mode:vertical-lr] hover:text-orange-400 transition-colors cursor-pointer">
              OFFERS
            </span>
            <span className="rotate-180 [writing-mode:vertical-lr] hover:text-orange-400 transition-colors cursor-pointer">
              SUPPORT
            </span>
          </div>

          {/* Search Icon at Bottom */}
          <button 
            type="button"
            onClick={() => navigate('/customer/status')}
            title="Track Application Status"
            className="p-2.5 rounded-lg text-zinc-400 hover:text-orange-400 hover:bg-orange-500/10 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right Vertical Pagination Rail */}
        <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-40">
          <a href="#hero" className="w-2 h-6 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)] transition-all" title="Hero Viewport" />
          <a href="#cards-section" className="w-2 h-2 rounded-full bg-white/30 hover:bg-orange-400 transition-all" title="Card Comparison" />
          <a href="#luxury-section" className="w-2 h-2 rounded-full bg-white/30 hover:bg-orange-400 transition-all" title="Luxury Metal Cards & App" />
        </div>

        {/* Top Navbar Header */}
        <header className="relative z-30 max-w-6xl w-full mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          {/* Logo with Glowing Sphere */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 p-0.5 shadow-[0_0_20px_rgba(249,115,22,0.6)] group-hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-full bg-[#0a0a0d] flex items-center justify-center">
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 animate-ping opacity-75" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-widest text-white uppercase">
                ATLAS <span className="text-orange-400 font-light">BANK</span>
              </span>
              <span className="block text-[9px] tracking-[0.2em] font-semibold text-zinc-400 uppercase -mt-1">
                Cred.ai Credit Card Platform
              </span>
            </div>
          </Link>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/customer/verify"
              className="text-xs font-semibold text-zinc-300 hover:text-white px-3.5 py-2 rounded-full hover:bg-white/5 transition-colors"
            >
              Customer Application
            </Link>
            <Link
              to="/banker/login"
              className="text-xs font-semibold text-orange-400 bg-orange-950/40 hover:bg-orange-900/60 border border-orange-500/50 px-4 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(249,115,22,0.25)] flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Underwriter Portal</span>
            </Link>
            
            {/* 3x3 Menu Grid */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800 text-xs font-bold tracking-widest text-zinc-300">
              <span>MENU</span>
              <div className="grid grid-cols-3 gap-1 p-1 cursor-pointer hover:opacity-80">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-orange-400" />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0d] border-b border-orange-500/30 p-4 space-y-3 z-50">
            <Link
              to="/customer/verify"
              className="block py-2 text-sm text-zinc-200 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply for Credit Card
            </Link>
            <Link
              to="/banker/login"
              className="block py-2 text-sm text-orange-400 font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Banker Underwriter Login
            </Link>
            <Link
              to="/customer/status"
              className="block py-2 text-sm text-zinc-400 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Application Status
            </Link>
          </div>
        )}

        {/* Centerpiece: Live Floating 3D Animated AtlasCard & Rotating Prisms */}
        <div id="hero" className="relative z-20 max-w-5xl mx-auto px-6 py-6 sm:py-8 flex flex-col items-center text-center">
          
          {/* Quick Demo Pre-fill Pill */}
          <div className="mb-6 inline-flex flex-wrap items-center justify-center gap-2 bg-black/60 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs text-zinc-300 backdrop-blur-md shadow-lg shadow-orange-950/40">
            <span className="font-semibold text-orange-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Quick Start:</span>
            </span>
            <span className="text-[11px] font-mono text-zinc-300">
              Customer A/C: <span className="text-white font-bold">100234567890</span> (OTP: 123456) • Banker: <span className="text-white font-bold">banker@cred.ai</span>
            </span>
          </div>

          {/* Interactive 3D Card with Live Physics & Rotating Prisms */}
          <div className="relative my-4 sm:my-8 perspective-1000 flex items-center justify-center">
            
            {/* Live Rotating 3D Wireframe Prisms (Reference 1) */}
            <div className="absolute -top-12 -left-12 sm:-left-24 w-24 h-24 sm:w-32 sm:h-32 border-2 border-orange-500/50 rounded-2xl animate-rotate-prism pointer-events-none shadow-[0_0_35px_rgba(249,115,22,0.4)]" />
            <div className="absolute -bottom-10 -right-12 sm:-right-24 w-20 h-20 sm:w-28 sm:h-28 border border-amber-400/40 rounded-3xl animate-rotate-prism pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '28s' }} />

            {/* Live Floating 3D Cubes */}
            <div className="absolute top-8 -right-8 sm:-right-20 w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 shadow-[0_0_25px_rgba(249,115,22,0.6)] animate-float-cube" />
            <div className="absolute -bottom-8 left-4 w-7 h-7 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-float-cube" style={{ animationDelay: '-2.5s' }} />

            {/* Interactive 3D Tilt AtlasCard with Specular Glint */}
            <InteractiveCard intensity={18} className="cursor-grab active:cursor-grabbing">
              <div className="w-80 sm:w-[410px] h-48 sm:h-60 rounded-3xl p-6 bg-gradient-to-tr from-[#1a0c02] via-[#ea580c] to-[#7c2d12] text-white shadow-[0_0_70px_rgba(249,115,22,0.45),0_35px_70px_rgba(0,0,0,0.95)] border border-orange-400/50 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
                {/* Holographic Texture Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-amber-500/10 pointer-events-none" />

                {/* Card Top: AtlasCard branding & Contactless Waves */}
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-base font-extrabold tracking-wider italic text-amber-100 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.9)]" />
                    AtlasCard
                  </span>
                  <svg className="w-6 h-6 text-amber-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                </div>

                {/* Metallic Gold Microchip */}
                <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border border-amber-300 shadow-inner flex items-center justify-center relative z-10">
                  <div className="w-full h-full border border-amber-700/30 rounded-sm grid grid-cols-2 gap-1 p-0.5" />
                </div>

                {/* Embossed Digits & Cardholder */}
                <div className="relative z-10">
                  <p className="font-mono text-lg sm:text-xl font-black tracking-[0.22em] text-white/95 drop-shadow-md">
                    9800 6542 1002 3478
                  </p>
                  <div className="flex items-center justify-between mt-1 text-[11px] tracking-wider text-amber-200 font-mono">
                    <span>EXPIRES: 09/28</span>
                    <span className="text-lg font-black italic tracking-normal text-white">VISA</span>
                  </div>
                  <p className="text-[11px] font-mono tracking-widest uppercase text-amber-200/90 mt-0.5">
                    ADITYA SHARMA
                  </p>
                </div>
              </div>
            </InteractiveCard>
          </div>

          {/* Hero Typography Matching Reference 1 */}
          <div className="mt-6 max-w-2xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-[0.18em] text-white leading-tight">
              THE MOST ADVANTAGEOUS <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
                CREDIT CARD
              </span>
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-zinc-300 tracking-wide max-w-lg mx-auto leading-relaxed">
              Discover how AtlasCard built-in benefits help you live more spontaneously and get more of what matters with instant AI credit assessment.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/customer/verify"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-black text-sm tracking-wider uppercase bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-black shadow-[0_0_35px_rgba(249,115,22,0.55)] transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for Credit Card</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/banker/login"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase bg-[#140b05] hover:bg-[#1e1008] text-orange-300 border border-orange-500/50 hover:border-orange-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Building2 className="w-4 h-4" />
                <span>Banker Underwriter Terminal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="relative z-20 max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-orange-400" />
            <span>256-Bit Bank Grade Encryption • Zero Risk Leakage to Applicants</span>
          </span>
          <a href="#cards-section" className="text-orange-400 font-semibold hover:underline flex items-center gap-1">
            <span>Explore Credit Card Tiers</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SCROLL EXPERIENCE — Middle Sections (Reference 2: Bankai Style)       */}
      {/* ========================================================================= */}
      <section id="cards-section" className="bg-[#09090d] text-white py-24 px-6 sm:px-10 lg:px-20 border-b border-orange-950/30">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-orange-400 mb-2">
            CREDIT CARD SELECTION
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Card List & Financing Tiers
          </h2>
          <p className="text-sm text-zinc-400 mt-3 max-w-md mx-auto">
            Choose your ideal credit limit with algorithmic risk evaluation, preferential rewards, and zero annual fee.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-28">

          {/* Tier 1: Standard Credit Card */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Two Floating Tilted Graphite Cards */}
            <div className="relative flex items-center justify-center py-10 group">
              {/* Back Card */}
              <div className="w-64 sm:w-76 h-40 sm:h-46 rounded-2xl p-5 bg-gradient-to-br from-zinc-900 to-black text-white shadow-xl transform -rotate-12 translate-y-4 -translate-x-6 border border-zinc-800 transition-transform duration-500 group-hover:-translate-x-10 group-hover:-rotate-16">
                <div className="flex justify-between items-center text-xs opacity-80">
                  <span className="font-semibold text-zinc-300">Standard Credit Card</span>
                  <div className="flex -space-x-2">
                    <span className="w-4 h-4 rounded-full bg-orange-500 opacity-90" />
                    <span className="w-4 h-4 rounded-full bg-amber-400 opacity-90" />
                  </div>
                </div>
                <div className="mt-8 font-mono text-xs tracking-widest text-zinc-400">
                  1234 5678 9000 0000
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>JHON DOE</span>
                  <span>12/28</span>
                </div>
              </div>

              {/* Front Card with Hover Physics */}
              <div className="absolute w-64 sm:w-76 h-40 sm:h-46 rounded-2xl p-5 bg-gradient-to-br from-[#1a120b] via-[#241306] to-zinc-900 text-white shadow-2xl transform rotate-6 translate-x-4 border border-orange-500/40 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-8 group-hover:scale-105">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold tracking-wider text-orange-300">Atlas Standard</span>
                  <div className="flex -space-x-2">
                    <span className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="w-4 h-4 rounded-full bg-amber-400" />
                  </div>
                </div>
                <div className="mt-8 font-mono text-xs sm:text-sm tracking-widest text-white">
                  1234 5678 9000 0000
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span className="text-orange-200">ADITYA SHARMA</span>
                  <span>12/28</span>
                </div>
              </div>
            </div>

            {/* Right: Copy & 3 Structured Feature Rows */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Standard Credit Card
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Everyday spending companion. Instant digital KYC verification, 1.5% cashback on purchases, and credit limits up to ₹1,50,000.
                </p>
              </div>

              {/* 3 Structured Feature Rows */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>₹25,000 to ₹1,50,000 starting credit limit</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>1.5% cash back on every digital and point-of-sale purchase</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>12 months zero interest on balance transfers</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
              </div>

              <div>
                <Link
                  to="/customer/verify"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black shadow-md shadow-orange-500/25 transition-all cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tier 2: Premium Credit Card */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy & 3 Structured Feature Rows */}
            <div className="space-y-6 order-2 md:order-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Premium Credit Card
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Elevated lifestyle rewards. Higher credit limits up to ₹5,00,000, airport lounge access, and automated underwriter pre-approvals for existing depositors.
                </p>
              </div>

              {/* 3 Structured Feature Rows */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>Credit limits up to ₹5,00,000 with expedited underwriting</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>3X reward points on international dining, flights, and hotels</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>Complimentary annual domestic airport lounge access</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
              </div>

              <div>
                <Link
                  to="/customer/verify"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-black shadow-md shadow-orange-500/30 transition-all cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Two Floating Tilted Molten Ember Cards */}
            <div className="relative flex items-center justify-center py-10 order-1 md:order-2 group">
              <div className="w-64 sm:w-76 h-40 sm:h-46 rounded-2xl p-5 bg-gradient-to-br from-[#241005] to-[#120701] text-white shadow-xl transform rotate-12 translate-y-4 translate-x-6 border border-orange-500/30 transition-transform duration-500 group-hover:translate-x-10 group-hover:rotate-16">
                <div className="flex justify-between items-center text-xs opacity-80">
                  <span className="font-semibold text-orange-300">Atlas Premium</span>
                  <div className="flex -space-x-2">
                    <span className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="w-4 h-4 rounded-full bg-amber-400" />
                  </div>
                </div>
                <div className="mt-8 font-mono text-xs tracking-widest text-zinc-300">
                  1234 5678 9000 0000
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>JHON DOE</span>
                  <span>12/28</span>
                </div>
              </div>

              <div className="absolute w-64 sm:w-76 h-40 sm:h-46 rounded-2xl p-5 bg-gradient-to-br from-[#ea580c] via-[#c2410c] to-[#7c2d12] text-white shadow-2xl transform -rotate-6 -translate-x-4 border border-orange-400/50 transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-x-8 group-hover:scale-105">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold tracking-wider">Atlas Premium</span>
                  <div className="flex -space-x-2">
                    <span className="w-4 h-4 rounded-full bg-amber-400" />
                    <span className="w-4 h-4 rounded-full bg-orange-600" />
                  </div>
                </div>
                <div className="mt-8 font-mono text-xs sm:text-sm tracking-widest text-white">
                  1234 5678 9000 0000
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-amber-200 font-mono">
                  <span>JHON DOE</span>
                  <span>12/28</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 3: Black Credit Card */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Two Floating Tilted Matte Black Cards */}
            <div className="relative flex items-center justify-center py-10 group">
              <div className="w-64 sm:w-76 h-40 sm:h-46 rounded-2xl p-5 bg-gradient-to-br from-neutral-900 to-black text-amber-400 shadow-xl transform -rotate-12 translate-y-4 -translate-x-6 border border-neutral-800 transition-transform duration-500 group-hover:-translate-x-10 group-hover:-rotate-16">
                <div className="flex justify-between items-center text-xs opacity-80">
                  <span className="font-semibold text-neutral-400">Black Reserve</span>
                  <div className="flex -space-x-2">
                    <span className="w-4 h-4 rounded-full bg-amber-500" />
                    <span className="w-4 h-4 rounded-full bg-orange-600" />
                  </div>
                </div>
                <div className="mt-8 font-mono text-xs tracking-widest text-neutral-400">
                  1234 5678 9000 0000
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>JHON DOE</span>
                  <span>12/28</span>
                </div>
              </div>

              <div className="absolute w-64 sm:w-76 h-40 sm:h-46 rounded-2xl p-5 bg-gradient-to-br from-[#171717] via-[#0a0a0a] to-black text-white shadow-2xl transform rotate-6 translate-x-4 border border-amber-500/40 transition-transform duration-500 group-hover:rotate-0 group-hover:translate-x-8 group-hover:scale-105">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold tracking-wider text-amber-400">Black Credit Card</span>
                  <div className="flex -space-x-2">
                    <span className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="w-4 h-4 rounded-full bg-amber-400" />
                  </div>
                </div>
                <div className="mt-8 font-mono text-xs sm:text-sm tracking-widest text-white">
                  1234 5678 9000 0000
                </div>
                <div className="mt-4 flex justify-between text-[10px] text-neutral-400 font-mono">
                  <span className="text-amber-300 font-semibold">JHON DOE</span>
                  <span>12/28</span>
                </div>
              </div>
            </div>

            {/* Right: Copy & 3 Structured Feature Rows */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Black Credit Card
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Elite cardholder status. Up to ₹10,00,000 credit ceiling with dedicated senior underwriter review and comprehensive TreeSHAP default risk estimation.
                </p>
              </div>

              {/* 3 Structured Feature Rows */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>Up to ₹10,00,000 premier credit limit for verified professionals</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>21-feature TreeSHAP risk transparency for senior underwriters</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-300 flex items-center justify-between">
                  <span>Concierge banking & 24-hour turnaround on card issuance</span>
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                </div>
              </div>

              <div>
                <Link
                  to="/customer/verify"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-md shadow-amber-500/25 transition-all cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FINAL SECTION — After All Information (Reference 3: Luxury Metal Cards) */}
      {/* ========================================================================= */}
      <section id="luxury-section" className="bg-[#050507] text-white py-24 px-6 sm:px-10 border-t border-orange-950/40 relative overflow-hidden">
        
        {/* Luxury Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-orange-600/10 via-amber-600/15 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto space-y-20 relative z-10">

          {/* Part A: Luxury 3D Metal Cards Visual (Reference 3: B Partner & Brushed Gold) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: 3D Metal Card Showcase with Live Sheen Animation */}
            <div className="relative flex items-center justify-center py-12">
              
              {/* Back Deep Carbon / Espresso Metal Card */}
              <div className="w-72 sm:w-84 h-44 sm:h-52 rounded-3xl p-6 bg-gradient-to-br from-[#2a1306] via-[#1c0c03] to-[#0c0501] text-white shadow-[0_20px_50px_rgba(249,115,22,0.25)] border border-orange-500/40 transform -rotate-15 -translate-y-6 -translate-x-4 flex flex-col justify-between relative overflow-hidden animate-float-counter">
                {/* Diagonal Metal Sheen Sweep */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-metal-sheen" />
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 font-bold text-sm tracking-wider">
                    <span className="w-3.5 h-3.5 rounded-sm bg-orange-400" />
                    <span>Partner</span>
                  </div>
                  <span className="text-base font-black italic tracking-normal text-white">VISA</span>
                </div>
                
                {/* Silver Metal Chip */}
                <div className="w-11 h-8 rounded-md bg-gradient-to-br from-zinc-200 to-zinc-400 border border-zinc-300 shadow-sm relative z-10" />
                
                <div className="text-[9px] font-mono tracking-widest text-orange-200/80 relative z-10">
                  VOTRE SERVICE PRESTIGE • +33 1 81 28 12 75
                </div>
              </div>

              {/* Front Brushed Gold Metallic Card (Reference 3 Exact Visual) */}
              <InteractiveCard intensity={15} isFloating={false} className="absolute z-20">
                <div className="w-72 sm:w-84 h-44 sm:h-52 rounded-3xl p-6 bg-gradient-to-br from-[#fbbf24] via-[#d97706] to-[#b45309] text-amber-950 shadow-[0_25px_60px_rgba(217,119,6,0.5),0_0_40px_rgba(251,191,36,0.35)] border-2 border-amber-300/80 transform rotate-6 translate-y-6 translate-x-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
                  {/* Subtle Brushed Metal Texture Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)] bg-[length:4px_100%] pointer-events-none" />

                  {/* Contactless Waves & Card Brand */}
                  <div className="flex items-center justify-between relative z-10">
                    <svg className="w-6 h-6 text-amber-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                    <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-amber-950">PRESTIGE METAL</span>
                  </div>

                  {/* Embossed Gold Card Number */}
                  <div className="font-mono text-base sm:text-lg font-black tracking-[0.22em] text-amber-950 drop-shadow-xs relative z-10">
                    5387 7100 0000 0000
                  </div>

                  <div className="flex justify-between items-end text-[10px] font-mono text-amber-950 font-bold relative z-10">
                    <div>
                      <span className="block text-[8px] text-amber-900/80 uppercase">SECURITY CODE</span>
                      <span>123</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-amber-900/80 uppercase">VALID THRU</span>
                      <span>09/28</span>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            </div>

            {/* Right: Luxury Copy & AI Risk Explainability */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Go all-in on luxury 💳✨</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                High-End Banking Design,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
                  Cinematic Intelligence
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Showcasing high-end banking design, rich materials, and explainable Machine Learning. Our XGBoost engine analyzes 21 applicant features to calculate credit default probabilities, while human underwriters retain absolute sanctioning authority.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <Cpu className="w-5 h-5 text-orange-400 mb-1.5" />
                  <span className="font-bold text-white block">TreeSHAP Explainers</span>
                  <span className="text-zinc-400 text-[11px]">Feature-level contributions for every risk prediction.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <Scale className="w-5 h-5 text-amber-400 mb-1.5" />
                  <span className="font-bold text-white block">Human Underwriter</span>
                  <span className="text-zinc-400 text-[11px]">Model only recommends; bank officer makes final decisions.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Part B: Ready to Join Bankai / Cred.ai Banner (Bottom of Reference 2) */}
          <div className="rounded-3xl bg-gradient-to-r from-[#140a02] via-[#1c0e04] to-[#0a0501] border border-orange-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Smartphone Mockups (Reference 2 bottom) */}
              <div className="flex items-center justify-center gap-4 py-4">
                {/* Phone 1: Digital Wallet */}
                <div className="w-44 sm:w-52 h-72 sm:h-84 rounded-3xl p-3 bg-zinc-950 border-4 border-zinc-800 shadow-2xl flex flex-col justify-between text-[10px]">
                  <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-800">
                    <span className="font-bold text-white">Bankai Wallet</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-black shadow">
                    <div className="flex justify-between items-center text-[8px] font-bold">
                      <span>Atlas Card</span>
                      <span className="font-black">VISA</span>
                    </div>
                    <div className="font-mono text-[9px] font-bold mt-2">1234 •••• •••• 3478</div>
                    <div className="text-[8px] font-semibold text-zinc-900 mt-1">₹4,25,000 Available Limit</div>
                  </div>
                  <div className="space-y-1.5 text-zinc-300 text-[9px]">
                    <div className="flex justify-between py-1 border-b border-zinc-800">
                      <span>Salary Deposit</span>
                      <span className="text-emerald-400">+₹1,00,000</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-800">
                      <span>Card Statement Paid</span>
                      <span className="text-rose-400">-₹12,450</span>
                    </div>
                  </div>
                  <div className="py-1 text-center font-bold text-orange-400 text-[10px]">
                    Account Status: Verified Prime
                  </div>
                </div>

                {/* Phone 2: Welcome Prompt Screen */}
                <div className="w-44 sm:w-52 h-72 sm:h-84 rounded-3xl p-4 bg-zinc-950/90 border-4 border-orange-500/40 shadow-2xl flex flex-col justify-between text-[11px] hidden sm:flex">
                  <div className="text-center pt-6">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500 flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-5 h-5 text-orange-400" />
                    </div>
                    <h4 className="font-bold text-white text-sm">Welcome!</h4>
                    <p className="text-[10px] text-zinc-300 mt-1">
                      Enter your bank account number to verify and configure your credit card.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full py-1.5 px-2 bg-zinc-900 rounded border border-orange-500/30 text-[9px] font-mono text-orange-300">
                      A/C: 100234567890
                    </div>
                    <button 
                      onClick={() => navigate('/customer/verify')}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-[10px] cursor-pointer"
                    >
                      Verify Identity →
                    </button>
                  </div>
                </div>
              </div>

              {/* Call to Action Copy & Buttons */}
              <div className="space-y-5 text-left">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Ready to join Bankai & Cred.ai?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Experience a seamless 3-step digital credit card application as an existing bank customer, or inspect incoming pipeline applications on the underwriter terminal.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/customer/verify"
                    className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-black shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Apply for Credit Card</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/banker/login"
                    className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#140b05] hover:bg-[#1f1008] text-orange-300 border border-orange-500/40 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Underwriter Portal →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Part C: Comprehensive Modern Footer */}
          <footer className="pt-12 border-t border-zinc-800 text-xs text-zinc-400">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              
              {/* Brand Col */}
              <div className="col-span-2 md:col-span-1 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-black">
                    <span className="w-2 h-2 rounded-full bg-black" />
                  </div>
                  <span className="text-base font-extrabold text-white tracking-wider">
                    ATLAS <span className="text-orange-400 font-light">BANK</span>
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Next-generation credit card application and AI underwriting decisioning platform.
                </p>
              </div>

              {/* Get In Touch Col */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white block mb-3">
                  Get In Touch
                </span>
                <p className="flex items-center gap-2 text-[11px] text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>918 Abner Road, Bengaluru Hub</span>
                </p>
                <p className="flex items-center gap-2 text-[11px] text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>support@cred.ai</span>
                </p>
                <p className="flex items-center gap-2 text-[11px] text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>+91 1800 234 5678</span>
                </p>
                <p className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>07:00 AM - 11:00 PM</span>
                </p>
              </div>

              {/* Quicklinks Col */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white block mb-3">
                  Quicklinks
                </span>
                <ul className="space-y-1.5 text-[11px]">
                  <li>
                    <Link to="/customer/verify" className="hover:text-orange-400 transition-colors">
                      Identity Verification
                    </Link>
                  </li>
                  <li>
                    <Link to="/customer/apply" className="hover:text-orange-400 transition-colors">
                      Credit Limit & Card Tiers
                    </Link>
                  </li>
                  <li>
                    <Link to="/customer/status" className="hover:text-orange-400 transition-colors">
                      Track Application Status
                    </Link>
                  </li>
                  <li>
                    <Link to="/banker/login" className="hover:text-orange-400 transition-colors">
                      Underwriter Terminal
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Underwriting Engine Col */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white block mb-3">
                  Underwriting Engine
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Trained XGBoost model with 21 credit risk features, TreeSHAP explainer, and fixed 0.15 threshold.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-orange-950/60 border border-orange-800 text-orange-300 text-[10px] font-mono">
                    TreeSHAP v0.42
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono">
                    FastAPI Ready
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Copyright & Legal Links */}
            <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
              <p>Copyright © 2026 Cred.ai Project • All Rights Reserved</p>
              <div className="flex gap-4">
                <span className="hover:underline cursor-pointer">Privacy Policy</span>
                <span className="hover:underline cursor-pointer">Terms & Services</span>
              </div>
            </div>
          </footer>

        </div>
      </section>

    </div>
  );
}
