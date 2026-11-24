import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useBankerAuth } from '../context/BankerAuthContext';
import { 
  Building2, 
  Layers, 
  RotateCcw, 
  LogOut, 
  ShieldCheck, 
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { resetDemoStore } from '../api/banker';

export function BankerLayout() {
  const { banker, logout } = useBankerAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [resetting, setResetting] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/banker/login');
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all demo credit card applications and decisions back to initial state?')) {
      setResetting(true);
      await resetDemoStore();
      setResetting(false);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080212] text-white font-sans selection:bg-fuchsia-600 selection:text-white">
      {/* Top Header */}
      <header className="bg-[#0e051d]/90 backdrop-blur-md border-b border-fuchsia-900/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/banker/applications" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                <div className="w-full h-full rounded-full bg-[#0c0618] flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-black tracking-widest text-white uppercase">
                  ATLAS <span className="text-fuchsia-400 font-light">BANK</span>
                </span>
                <span className="block text-[9px] font-semibold tracking-widest uppercase text-slate-400 -mt-1">
                  Credit Card Underwriting Desk
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1 border-l border-white/10 pl-6">
              <Link
                to="/banker/applications"
                className={`text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                  location.pathname === '/banker/applications'
                    ? 'bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-[0_0_10px_rgba(217,70,239,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-4 h-4 text-fuchsia-400" />
                <span>Card Application Queue</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Reset Demo Data */}
            <button
              onClick={handleResetData}
              disabled={resetting}
              title="Reset sample applications to initial state"
              className="text-xs text-slate-400 hover:text-white bg-[#150a2b] hover:bg-[#1f0e3f] border border-fuchsia-900/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Reset Demo Queue</span>
            </button>

            {/* Officer Profile Badge */}
            <div className="flex items-center gap-2.5 bg-[#140b27] border border-fuchsia-900/40 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-fuchsia-950/80 border border-fuchsia-700/60 flex items-center justify-center text-fuchsia-300 font-bold text-xs">
                {banker?.name?.charAt(0) || 'O'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-white leading-tight">
                  {banker?.name || 'Credit Officer'}
                </p>
                <p className="text-[10px] text-fuchsia-400 leading-tight">Underwriting Authority</p>
              </div>
            </div>

            {/* Switch to Customer Portal */}
            <Link
              to="/customer/verify"
              className="text-xs text-slate-400 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 hidden lg:flex items-center gap-1 transition-colors"
            >
              <span>Customer Portal</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Sign out of banker portal"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* Banker Footer */}
      <footer className="bg-[#080212] border-t border-fuchsia-950/60 py-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
            <span>Atlas Bank Credit Risk Engine • XGBoost Classifier & TreeSHAP Explainer</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Model recommendation only. Human underwriter holds ultimate credit sanction authority.
          </p>
        </div>
      </footer>
    </div>
  );
}
