import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerProfile } from '../../api/customer';
import { Button } from '../../components/FormControls';
import { LoadingState, ErrorAlert } from '../../components/FeedbackStates';
import { ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';

export function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmed, setConfirmed] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCustomerProfile();
      setProfile(data);
    } catch (err) {
      setError(err.message || 'Failed to load cardholder profile from bank records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingState message="Retrieving verified cardholder profile..." />;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <ErrorAlert title="Profile Retrieval Error" message={error} retry={fetchProfile} />
      </div>
    );
  }

  const identity = profile?.identity || {};
  const personal = profile?.personal || {};
  const employment = profile?.employment || {};
  const financial = profile?.financial || {};

  return (
    <div className="max-w-3xl mx-auto py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-fuchsia-950/50 text-fuchsia-300 text-xs font-semibold mb-3 border border-fuchsia-700/50">
          <CreditCard className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Step 2 of 4 • Cardholder Record Confirmation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Review Your Verified Details
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-lg mx-auto">
          Please confirm your personal and financial details on file with Atlas Bank before configuring your credit limit.
        </p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Identity & Account */}
        <div className="bg-[#120724] rounded-2xl border border-fuchsia-900/40 p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 mb-4 pb-2 border-b border-white/5">
            Cardholder Identity & Account
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Full Legal Name</span>
              <span className="font-semibold text-white text-sm mt-0.5 block">{identity.full_name || 'N/A'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Date of Birth</span>
              <span className="font-semibold text-white text-sm mt-0.5 block">{identity.dob || 'N/A'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Registered Mobile</span>
              <span className="font-mono font-semibold text-white text-sm mt-0.5 block">{identity.mobile || 'N/A'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Primary Bank Account</span>
              <span className="font-mono font-semibold text-white text-sm mt-0.5 block">{identity.account_number || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Personal & Residence */}
        <div className="bg-[#120724] rounded-2xl border border-fuchsia-900/40 p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 mb-4 pb-2 border-b border-white/5">
            Personal & Residence Profile
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Marital Status</span>
              <span className="font-semibold text-white mt-0.5 block">{personal.marital_status || 'N/A'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Education</span>
              <span className="font-semibold text-white mt-0.5 block">{personal.education || 'N/A'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Family Size</span>
              <span className="font-semibold text-white mt-0.5 block">{personal.family_size ?? 1}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 sm:col-span-2">
              <span className="text-slate-400 block text-[11px]">Residence Type</span>
              <span className="font-semibold text-white mt-0.5 block">{personal.residence_type || 'House / apartment'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Property Owner</span>
              <span className="font-semibold text-white mt-0.5 block">{personal.owns_property || 'No'}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Employment & Income */}
        <div className="bg-[#120724] rounded-2xl border border-fuchsia-900/40 p-6 shadow-xl backdrop-blur-md">
          <h3 className="text-xs font-bold uppercase tracking-wider text-fuchsia-400 mb-4 pb-2 border-b border-white/5">
            Employment & Income
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Occupation / Designation</span>
              <span className="font-semibold text-white mt-0.5 block">{employment.occupation || 'Salaried'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Employer</span>
              <span className="font-semibold text-white mt-0.5 block">{employment.employer_name || 'Registered Organization'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-slate-400 block text-[11px]">Income Source</span>
              <span className="font-semibold text-white mt-0.5 block">{employment.income_type || 'Commercial associate'}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/30">
              <span className="text-fuchsia-300 block text-[11px] font-medium">Bank-Verified Annual Income</span>
              <span className="text-base font-extrabold text-white mt-0.5 block">
                ₹{Number(financial.annual_income || 1000000).toLocaleString('en-IN')}
                <span className="text-xs font-normal text-fuchsia-300 ml-1">/ year</span>
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation check */}
        <div className="bg-[#120724] p-5 rounded-2xl border border-fuchsia-900/40 shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-fuchsia-600 rounded border-slate-700 bg-slate-900 focus:ring-fuchsia-500"
            />
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">
                I confirm that the above personal and employment records are accurate for credit card underwriting.
              </span>
              <p className="mt-0.5 text-slate-400 text-[11px]">
                These records are verified against bank KYC. You can configure your requested credit limit and card tier in the next step.
              </p>
            </div>
          </label>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/customer/verify')}
            className="text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
          >
            ← Re-verify Identity
          </button>

          <Button
            variant="primary"
            size="lg"
            disabled={!confirmed}
            onClick={() => navigate('/customer/apply')}
            className="w-full sm:w-auto bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(217,70,239,0.4)]"
          >
            <span>Configure Credit Card & Limit</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
