import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyCustomerOtp } from '../../api/auth';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { Button } from '../../components/FormControls';
import { ErrorAlert } from '../../components/FeedbackStates';
import { KeyRound, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { onSessionCreated } = useCustomerAuth();

  const challengeId = location.state?.challenge_id || 'chal_demo_default';
  const maskedMobile = location.state?.masked_mobile || 'XXXXXX3210';

  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      if (digits.length) {
        const next = [...otp];
        digits.forEach((d, i) => {
          if (index + i < 6) next[index + i] = d;
        });
        setOtp(next);
        const nextIdx = Math.min(5, index + digits.length);
        document.getElementById(`otp-input-${nextIdx}`)?.focus();
        return;
      }
    }

    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setResent(true);
    setError(null);
    setTimeout(() => setResent(false), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the full 6-digit OTP code');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await verifyCustomerOtp({
        challenge_id: challengeId,
        otp: otpCode,
      });

      onSessionCreated(response);
      navigate('/customer/profile');
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <button
        type="button"
        onClick={() => navigate('/customer/verify')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-orange-400 mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Identity Verification</span>
      </button>

      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-orange-950/60 border border-orange-500/40 text-orange-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
          <KeyRound className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Enter Security Code
        </h1>
        <p className="text-xs text-zinc-400 mt-2">
          A 6-digit OTP has been sent to your registered mobile number ending in{' '}
          <span className="font-semibold text-white">{maskedMobile}</span>.
        </p>
        <div className="mt-2 inline-block px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/30 text-orange-300 text-[11px] font-mono font-medium">
          Demo Code: Any 6 digits (e.g. 123456)
        </div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorAlert title="Verification Failed" message={error} />
        </div>
      )}

      {resent && (
        <div className="mb-6 p-3 rounded-xl bg-orange-950/60 border border-orange-700/50 text-xs text-orange-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
          <span>A fresh mock OTP has been dispatched to your mobile.</span>
        </div>
      )}

      <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP 6-box input */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono rounded-xl border border-zinc-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-white bg-zinc-900 transition-all outline-hidden"
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-black font-black tracking-wider uppercase shadow-[0_0_20px_rgba(249,115,22,0.35)]"
          >
            Confirm & Access Profile →
          </Button>

          {/* Resend timer */}
          <div className="text-center text-xs text-zinc-400">
            {timer > 0 ? (
              <p>Resend code in <span className="font-mono font-semibold text-orange-400">{timer}s</span></p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-orange-400 font-semibold hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resend OTP Code</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
