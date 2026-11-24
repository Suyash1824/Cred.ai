import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bankerLogin } from '../../api/auth';
import { useBankerAuth } from '../../context/BankerAuthContext';
import { Button } from '../../components/FormControls';
import { ErrorAlert } from '../../components/FeedbackStates';
import { Building2, Lock, Mail, ShieldCheck, Sparkles, ArrowRight, CreditCard } from 'lucide-react';

export function BankerLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { onBankerLoginSuccess } = useBankerAuth();

  const [email, setEmail] = useState('banker@cred.ai');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/banker/applications';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await bankerLogin({ email, password });
      onBankerLoginSuccess(response);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrefill = (prefillEmail, prefillPass) => {
    setEmail(prefillEmail);
    setPassword(prefillPass);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#060608] text-white font-sans selection:bg-orange-500 selection:text-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-orange-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center text-black shadow-[0_0_25px_rgba(249,115,22,0.4)] mx-auto mb-4">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Atlas Bank Underwriter Terminal
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Credit Card Risk Assessment & TreeSHAP Decision System
          </p>
        </div>

        {/* Demo Fast Login Bar */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#0c0c10] border border-orange-500/30 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-300 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Click to Pre-fill Officer Credentials:</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handlePrefill('banker@cred.ai', 'password123')}
              className="flex-1 py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-orange-500/30 hover:border-orange-400 rounded-xl text-zinc-200 text-[11px] font-medium transition-colors cursor-pointer text-left"
            >
              <span className="font-bold text-white block">Rajesh Iyer</span>
              <span className="text-[10px] text-orange-400">Senior Underwriter</span>
            </button>
            <button
              type="button"
              onClick={() => handlePrefill('anita@cred.ai', 'password123')}
              className="flex-1 py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-orange-500/30 hover:border-orange-400 rounded-xl text-zinc-200 text-[11px] font-medium transition-colors cursor-pointer text-left"
            >
              <span className="font-bold text-white block">Anita Sen</span>
              <span className="text-[10px] text-orange-400">Risk Officer</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorAlert title="Login Failed" message={error} />
          </div>
        )}

        <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="banker@cred.ai"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-black font-black tracking-wider uppercase shadow-[0_0_20px_rgba(249,115,22,0.35)]"
              >
                <span>Authenticate & Access Queue</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back to Portal Home
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-zinc-500 text-[11px] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
          <span>Restricted to Authorized Underwriters (Role = 'banker')</span>
        </div>
      </div>
    </div>
  );
}
