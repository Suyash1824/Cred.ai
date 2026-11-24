import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { Lock, UserCheck, LogOut, FileSearch, Sparkles, CreditCard } from 'lucide-react';

export function CustomerLayout() {
  const { customer, isAuthenticated, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const steps = [
    { path: '/customer/verify', label: '1. Identity Check' },
    { path: '/customer/otp', label: '2. Verify OTP' },
    { path: '/customer/profile', label: '3. Cardholder Profile' },
    { path: '/customer/apply', label: '4. Credit Limit & Card' },
    { path: '/customer/status', label: '5. Card Status' },
  ];

  const currentStepIndex = steps.findIndex(s => location.pathname.startsWith(s.path));

  return (
    <div className="min-h-screen flex flex-col bg-[#050507] text-white font-sans selection:bg-orange-500 selection:text-black">
      {/* Top Banner */}
      <div className="bg-[#0f0904] border-b border-orange-950/60 text-orange-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Lock className="w-3.5 h-3.5 text-orange-400" />
        <span>Atlas Bank • Secure 256-Bit Encrypted Credit Card Application System</span>
      </div>

      {/* Main Navbar */}
      <header className="bg-[#09090d]/95 backdrop-blur-md border-b border-orange-500/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 p-0.5 shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#0a0a0d] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-widest text-white uppercase">
                ATLAS <span className="text-orange-400 font-light">BANK</span>
              </span>
              <span className="block text-[9px] font-semibold tracking-widest uppercase text-zinc-400 -mt-1">
                Credit Card Application
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              to="/customer/status"
              className={`text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                location.pathname.startsWith('/customer/status')
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileSearch className="w-4 h-4 text-orange-400" />
              <span>Track Card Status</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-800">
                <div className="hidden sm:flex items-center gap-2 text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-zinc-300">
                  <UserCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-semibold text-white">{customer?.customer_name || 'Verified Applicant'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/customer/verify"
                className="text-xs font-bold text-black bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 px-4 py-2 rounded-full transition-all shadow-md shadow-orange-500/30 active:scale-95"
              >
                Start Verification
              </Link>
            )}

            <Link
              to="/banker/login"
              className="text-xs text-zinc-400 hover:text-orange-400 px-3 py-1.5 border border-zinc-800 hover:border-orange-500/40 rounded-full hidden md:block hover:bg-zinc-900 transition-colors"
            >
              Underwriter Desk →
            </Link>
          </nav>
        </div>

        {/* Stepper Progress Bar */}
        {currentStepIndex >= 0 && (
          <div className="bg-[#050507]/90 border-t border-orange-950/40 px-4 py-2.5 hidden sm:block">
            <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
              {steps.map((s, idx) => {
                const isActive = location.pathname.startsWith(s.path);
                const isPast = currentStepIndex > idx;

                return (
                  <div key={s.path} className="flex items-center gap-1.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.7)] font-black'
                          : isPast
                          ? 'bg-orange-950/60 text-orange-300 border border-orange-500/40'
                          : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`font-medium ${
                        isActive
                          ? 'text-orange-400 font-bold'
                          : isPast
                          ? 'text-zinc-300'
                          : 'text-zinc-500'
                      }`}
                    >
                      {s.label.replace(/^\d+\.\s*/, '')}
                    </span>
                    {idx < steps.length - 1 && (
                      <span className="w-8 h-0.5 bg-zinc-800 ml-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      {/* Luxury Footer */}
      <footer className="bg-[#050507] border-t border-orange-950/50 py-6 text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="font-semibold text-zinc-400">Atlas Bank Credit Risk Division</span>
            <span className="text-zinc-600">•</span>
            <span>256-Bit SSL Protected</span>
          </div>
          <p className="text-[11px] text-zinc-600">
            Automated TreeSHAP Underwriting Model Engine • Regulated Financial Institution
          </p>
        </div>
      </footer>
    </div>
  );
}
