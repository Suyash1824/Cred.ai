import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitLoanApplication } from '../../api/customer';
import { Button, Input, Select } from '../../components/FormControls';
import { ErrorAlert } from '../../components/FeedbackStates';
import { 
  CreditCard, 
  IndianRupee, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { calculateEMI } from '../../mocks/mockStore';
import { InteractiveCard } from '../../components/InteractiveCard';

export function ApplyPage() {
  const navigate = useNavigate();

  // Credit Card configuration state
  const [creditLimit, setCreditLimit] = useState(300000);
  const [selectedTier, setSelectedTier] = useState('premium'); // 'standard' | 'premium' | 'black'
  const [purpose, setPurpose] = useState('Everyday Cashback & Shopping');
  const [declaredIncome, setDeclaredIncome] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Minimum monthly payment estimate (approx 5% of credit limit or calculated installment)
  const minMonthlyDue = Math.round(Number(creditLimit) * 0.05);

  const cardTiers = [
    {
      id: 'standard',
      name: 'Atlas Standard Card',
      limitRange: '₹25,000 - ₹1,50,000',
      bgGradient: 'from-indigo-900 via-blue-900 to-slate-900',
      textColor: 'text-blue-300',
      benefits: '1.5% cashback on all spends • Zero annual fee',
      defaultLimit: 100000
    },
    {
      id: 'premium',
      name: 'Atlas Premium Card',
      limitRange: '₹1,50,000 - ₹5,00,000',
      bgGradient: 'from-[#831843] via-[#9333ea] to-[#4c1d95]',
      textColor: 'text-fuchsia-300',
      benefits: '3X rewards on dining & flights • Airport lounge access',
      defaultLimit: 300000
    },
    {
      id: 'black',
      name: 'Prestige Black Metal Card',
      limitRange: '₹5,00,000 - ₹10,00,000',
      bgGradient: 'from-[#171717] via-[#0a0a0a] to-black',
      textColor: 'text-amber-400',
      benefits: 'Brushed metal luxury finish • 24/7 concierge & premier insurance',
      defaultLimit: 750000
    }
  ];

  const usageOptions = [
    { value: 'Everyday Cashback & Shopping', label: 'Everyday Cashback & Shopping' },
    { value: 'Travel & Dining Rewards', label: 'Travel, Flights & Dining Rewards' },
    { value: 'Home Renovation & Purchases', label: 'Home Renovation & Consumer Electronics' },
    { value: 'Business & Commercial Spends', label: 'Small Business & Commercial Expenses' },
    { value: 'Emergency Credit Reserve', label: 'Emergency Credit Reserve' },
  ];

  const handleSelectTier = (tier) => {
    setSelectedTier(tier.id);
    setCreditLimit(tier.defaultLimit);
  };

  const validate = () => {
    const newErrors = {};
    const amount = Number(creditLimit);

    if (!amount || isNaN(amount)) {
      newErrors.credit_limit = 'Please select a valid credit limit';
    } else if (amount < 25000) {
      newErrors.credit_limit = 'Minimum credit limit is ₹25,000';
    } else if (amount > 10000000) {
      newErrors.credit_limit = 'Maximum credit limit is ₹1,00,00,000';
    }

    if (!purpose) {
      newErrors.purpose = 'Please select primary card usage';
    }

    if (declaredIncome && (isNaN(Number(declaredIncome)) || Number(declaredIncome) < 0)) {
      newErrors.declared_income = 'Declared income must be a valid positive number';
    }

    if (!consent) {
      newErrors.consent = 'You must authorize the credit assessment to proceed';
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
      // Maps to backend schema: loan_amount = creditLimit, tenure_months = 36 default
      const response = await submitLoanApplication({
        loan_amount: creditLimit,
        tenure_months: 36,
        purpose,
        declared_income: declaredIncome ? Number(declaredIncome) : null,
        consent,
      });

      navigate(`/customer/status/${response.application_no}`, {
        state: { isNewSubmission: true, application: response },
      });
    } catch (err) {
      setApiError(err.message || 'Failed to submit credit card application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const activeTierObj = cardTiers.find(t => t.id === selectedTier) || cardTiers[1];

  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-fuchsia-950/50 text-fuchsia-300 text-xs font-semibold mb-3 border border-fuchsia-700/50 shadow-[0_0_12px_rgba(217,70,239,0.25)]">
          <CreditCard className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Step 3 of 4 • Card Tier & Limit Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Select Your AtlasCard Tier & Limit
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
          Customize your requested credit limit and preview your personalized card with instant underwriter routing.
        </p>
      </div>

      {apiError && (
        <div className="mb-6">
          <ErrorAlert title="Application Error" message={apiError} />
        </div>
      )}

      {/* Card Tier Selection Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {cardTiers.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => handleSelectTier(tier)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              selectedTier === tier.id
                ? 'bg-[#180b33] border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.3)] scale-[1.02]'
                : 'bg-[#120724]/70 border-white/10 hover:border-white/20'
            }`}
          >
            {selectedTier === tier.id && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#d946ef]" />
            )}
            <span className={`text-xs font-bold uppercase tracking-wider block ${tier.textColor}`}>
              {tier.name}
            </span>
            <span className="text-sm font-extrabold text-white mt-1 block">
              {tier.limitRange}
            </span>
            <p className="text-[11px] text-slate-400 mt-2">
              {tier.benefits}
            </p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#120724] rounded-2xl border border-fuchsia-900/40 p-6 shadow-xl backdrop-blur-md space-y-6">
            
            {/* Requested Credit Limit */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Requested Credit Limit (INR) <span className="text-rose-500">*</span>
                </label>
                <span className="text-lg font-black font-mono text-fuchsia-300">
                  ₹{Number(creditLimit).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <span className="font-bold text-sm">₹</span>
                </div>
                <input
                  type="number"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  min={25000}
                  max={2000000}
                  step={25000}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-fuchsia-900/60 bg-[#190a31] text-white text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500"
                />
              </div>

              {errors.credit_limit && (
                <p className="text-xs text-rose-500 mt-1">{errors.credit_limit}</p>
              )}

              {/* Limit Slider */}
              <input
                type="range"
                min={25000}
                max={1500000}
                step={25000}
                value={creditLimit}
                onChange={(e) => setCreditLimit(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-fuchsia-500 mt-3"
              />

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[100000, 250000, 500000, 750000, 1000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCreditLimit(val)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                      Number(creditLimit) === val
                        ? 'bg-fuchsia-600/30 border-fuchsia-500 text-fuchsia-200 font-bold'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    ₹{(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Usage */}
            <Select
              label="Primary Card Usage / Spending Category"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              options={usageOptions}
              required
              error={errors.purpose}
              helperText="Helps the underwriting team customize rewards & credit terms"
            />

            {/* Declared Income */}
            <Input
              label="Declared Supplemental Annual Income (Optional)"
              type="number"
              placeholder="e.g. 1500000 (if you have side business or investments)"
              value={declaredIncome}
              onChange={(e) => setDeclaredIncome(e.target.value)}
              error={errors.declared_income}
              icon={IndianRupee}
              helperText="Optional declared income visible to reviewing credit officer"
            />

            {/* Consent Checkbox */}
            <div className="pt-2 border-t border-white/10">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4.5 h-4.5 mt-0.5 text-fuchsia-600 rounded border-slate-700 bg-slate-900 focus:ring-fuchsia-500"
                />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white">
                    I authorize Atlas Bank to assess my credit profile for credit card issuance <span className="text-rose-500">*</span>
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    I declare that all details provided are accurate. I acknowledge that the bank credit underwriting team will make the final approval decision.
                  </p>
                </div>
              </label>
              {errors.consent && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.consent}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Card Preview & Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#120724] rounded-2xl border border-fuchsia-900/40 p-6 shadow-2xl backdrop-blur-md">
            
            <span className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-400 block mb-3">
              Live Card Preview
            </span>

            {/* Live Card Tilt Component */}
            <InteractiveCard intensity={12} isFloating={false}>
              <div className={`w-full h-48 sm:h-52 rounded-2xl p-5 bg-gradient-to-tr ${activeTierObj.bgGradient} text-white shadow-xl border border-white/20 flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-xs font-bold tracking-wider italic flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    {activeTierObj.name}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-white/80">CRED.AI</span>
                </div>

                {/* Chip */}
                <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-200 to-amber-500 border border-amber-300 shadow-inner relative z-10" />

                <div className="relative z-10">
                  <p className="font-mono text-sm sm:text-base font-bold tracking-[0.2em] text-white">
                    4532 •••• •••• 8891
                  </p>
                  <div className="flex justify-between items-end mt-1 text-[10px] text-white/80 font-mono">
                    <div>
                      <span className="block text-[8px] uppercase opacity-70">CARDHOLDER</span>
                      <span className="font-bold text-white uppercase">ADITYA SHARMA</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase opacity-70">CREDIT LIMIT</span>
                      <span className="font-bold text-fuchsia-300">₹{Number(creditLimit).toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-sm font-black italic">VISA</span>
                  </div>
                </div>
              </div>
            </InteractiveCard>

            {/* Financial Terms Preview */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Requested Limit:</span>
                <span className="font-bold text-white">₹{Number(creditLimit).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Est. Min Monthly Due (5%):</span>
                <span className="font-bold text-fuchsia-400">~₹{minMonthlyDue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Annual Percentage Rate (Fixed):</span>
                <span className="font-semibold text-white">10.5% p.a.</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Joining / Annual Fee:</span>
                <span className="font-bold text-emerald-400">₹0 (Complimentary)</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(217,70,239,0.5)]"
              >
                Submit Application Now →
              </Button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>Instant Digital Pipeline Submission</span>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}
