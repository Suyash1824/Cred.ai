import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyCustomerIdentity } from '../../api/auth';
import { Button, Input } from '../../components/FormControls';
import { Card, ErrorAlert } from '../../components/FeedbackStates';
import { CreditCard, Phone, Calendar, Hash, Sparkles, ShieldCheck } from 'lucide-react';

export function VerifyPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    account_number: '100234567890',
    mobile: '9876543210',
    dob: '1990-05-15',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const validate = () => {
    const newErrors = {};
    const acc = formData.account_number.trim();
    const mob = formData.mobile.trim().replace(/\D/g, '');
    const dob = formData.dob.trim();

    if (!acc) {
      newErrors.account_number = 'Bank account number is required';
    } else if (acc.length < 6) {
      newErrors.account_number = 'Please enter a valid bank account number';
    }

    if (!mob) {
      newErrors.mobile = 'Registered mobile number is required';
    } else if (mob.length !== 10) {
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (!dob) {
      newErrors.dob = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await verifyCustomerIdentity(formData);
      navigate('/customer/otp', {
        state: {
          challenge_id: response.challenge_id,
          masked_mobile: `XXXXXX${formData.mobile.slice(-4)}`,
          account_number: formData.account_number,
        },
      });
    } catch (err) {
      setApiError(err.message || 'We could not verify these details against bank records.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrefillDemo = (acc, mob, dob) => {
    setFormData({ account_number: acc, mobile: mob, dob });
    setErrors({});
    setApiError(null);
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-950/50 text-orange-400 text-xs font-semibold mb-3 border border-orange-500/40 shadow-[0_0_12px_rgba(249,115,22,0.25)]">
          <CreditCard className="w-3.5 h-3.5 text-orange-400" />
          <span>Step 1 of 4 • Identity Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Verify for AtlasCard Credit Card
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto">
          Enter your registered bank details to link your existing KYC profile and configure your credit card.
        </p>
      </div>

      {/* Demo Credentials Helper Pill */}
      <div className="mb-6 p-3.5 rounded-2xl bg-[#0e0702] border border-orange-500/30 text-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Click to Pre-fill Demo Profile:</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handlePrefillDemo('100234567890', '9876543210', '1990-05-15')}
            className="px-3 py-1.5 bg-[#180c04] hover:bg-[#251206] border border-orange-500/30 hover:border-orange-400 rounded-lg text-zinc-200 text-[11px] font-medium transition-colors cursor-pointer"
          >
            Aditya Sharma (₹12 LPA, Prime Tier)
          </button>
          <button
            type="button"
            onClick={() => handlePrefillDemo('200987654321', '9123456789', '1985-11-20')}
            className="px-3 py-1.5 bg-[#180c04] hover:bg-[#251206] border border-orange-500/30 hover:border-orange-400 rounded-lg text-zinc-200 text-[11px] font-medium transition-colors cursor-pointer"
          >
            Priya Patel (₹6.5 LPA, Standard Tier)
          </button>
        </div>
      </div>

      {apiError && (
        <div className="mb-6">
          <ErrorAlert title="Verification Failed" message={apiError} />
        </div>
      )}

      <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Bank Account Number"
            name="account_number"
            value={formData.account_number}
            onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
            placeholder="e.g. 100234567890"
            error={errors.account_number}
            icon={Hash}
            required
            helperText="Your 11 or 12-digit existing bank account number"
          />

          <Input
            label="Registered Mobile Number"
            name="mobile"
            type="tel"
            maxLength={10}
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            placeholder="10-digit mobile number"
            error={errors.mobile}
            icon={Phone}
            required
            helperText="The mobile number linked to your bank account"
          />

          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            error={errors.dob}
            icon={Calendar}
            required
            helperText="As recorded in your bank KYC document"
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-black font-black tracking-wider uppercase shadow-[0_0_20px_rgba(249,115,22,0.35)]"
            >
              Verify & Send OTP →
            </Button>
          </div>

          <p className="text-[11px] text-center text-zinc-500">
            By proceeding, you authorize Atlas Bank to assess your on-file records for credit card issuance.
          </p>
        </form>
      </div>
    </div>
  );
}
