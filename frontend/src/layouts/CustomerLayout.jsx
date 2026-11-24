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
    <div className="min-h-screen flex flex-col bg-[#090314] text-white font-sans selection:bg-fuchsia-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-[#140526] border-b border-fuchsia-950/60 text-fuchsia-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Lock className="w-3.5 h-3.5 text-fuchsia-400" />
        <span>Atlas Bank • Secure 256-Bit Encrypted Credit Card Application System</span>
      </div>

      {/* Main Navbar */}
      <header className="bg-[#0e051d]/90 backdrop-blur-md border-b border-fuchsia-900/30 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-indigo-500 p-0.5 shadow-[0_0_15px_rgba(217,70,239,0.5)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#0c0618] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-widest text-white uppercase">
                ATLAS <span className="text-fuchsia-400 font-light">BANK</span>
              </span>
              <span className="block text-[9px] font-semibold tracking-widest uppercase text-slate-400 -mt-1">
                Credit Card Application
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              to="/customer/status"
              className={`text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                location.pathname.startsWith('/customer/status')
                  ? 'bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileSearch className="w-4 h-4 text-fuchsia-400" />
              <span>Track Card Status</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                <div className="hidden sm:flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-300">
                  <UserCheck className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span className="font-semibold text-white">{customer?.customer_name || 'Verified Applicant'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/customer/verify"
                className="text-xs font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 px-4 py-2 rounded-full transition-all shadow-md shadow-fuchsia-600/30"
              >
                Start Verification
              </Link>
            )}

            <Link
              to="/banker/login"
              className="text-xs text-slate-400 hover:text-fuchsia-300 px-3 py-1.5 border border-white/10 rounded-full hidden md:block hover:bg-white/5 transition-colors"
            >
              Underwriter Desk →
            </Link>
          </nav>
        </div>

        {/* Stepper Progress Bar */}
        {currentStepIndex >= 0 && (
          <div className="bg-[#090314]/80 border-t border-fuchsia-950/60 px-4 py-2.5 hidden sm:block">
            <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
              {steps.map((s, idx) => {
                const isActive = location.pathname.startsWith(s.path);
                const isPast = currentStepIndex > idx;

                return (
                  <div key={s.path} className="flex items-center gap-1.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-fuchsia-600 text-white shadow-[0_0_10px_rgba(217,70,239,0.7)]'
                          : isPast
                          ? 'bg-purple-900/60 text-fuchsia-300 border border-fuchsia-500/40'
                          : 'bg-white/5 text-slate-500 border border-white/5'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`font-medium ${
                        isActive
                          ? 'text-fuchsia-300 font-bold'
                          : isPast
                          ? 'text-slate-300'
                          : 'text-slate-500'
                      }`}
                    >
                      {s.label.replace(/^\d+\.\s*/, '')}
                    </span>
                    {idx < steps.length - 1 && (
                      <span className="w-8 h-0.5 bg-white/10 ml-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#080212] border-t border-fuchsia-950/60 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-fuchsia-400" />
            <span>Atlas Bank Credit Card Division • Official Demo Portal</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Strict Applicant Privacy • Model risk predictions and SHAP factors are never displayed to applicants
          </p>
        </div>
      </footer>
    </div>
  );
}
