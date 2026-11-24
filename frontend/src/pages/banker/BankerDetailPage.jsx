import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBankerApplicationDetail, submitBankerDecision } from '../../api/banker';
import { StatusBadge, RiskBadge } from '../../components/Badges';
import { RiskGauge } from '../../components/RiskGauge';
import { ShapFactorList } from '../../components/ShapFactorList';
import { Button } from '../../components/FormControls';
import { LoadingState, ErrorAlert } from '../../components/FeedbackStates';
import { Modal } from '../../components/Modal';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  User, 
  CreditCard, 
  IndianRupee, 
  Cpu, 
  Scale, 
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function BankerDetailPage() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Features collapse
  const [showFeatures, setShowFeatures] = useState(false);

  // Decision state
  const [decisionType, setDecisionType] = useState(null); // 'approved' | 'rejected' | 'more_info'
  const [remarks, setRemarks] = useState('');
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [submittingDecision, setSubmittingDecision] = useState(false);
  const [decisionError, setDecisionError] = useState(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBankerApplicationDetail(id);
      setData(response);
    } catch (err) {
      setError(err.message || 'Failed to retrieve card application detail');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleOpenDecisionModal = (type) => {
    setDecisionType(type);
    setRemarks('');
    setDecisionError(null);
    setDecisionModalOpen(true);
  };

  const handleConfirmDecision = async (e) => {
    e.preventDefault();
    if ((decisionType === 'rejected' || decisionType === 'more_info') && !remarks.trim()) {
      setDecisionError('Remarks are required for rejected or more_info decisions.');
      return;
    }

    setSubmittingDecision(true);
    setDecisionError(null);
    try {
      const res = await submitBankerDecision(id, {
        decision: decisionType,
        remarks: remarks.trim(),
      });

      setData((prev) => ({
        ...prev,
        application: { ...prev.application, status: res.status },
        decision: res,
      }));

      setDecisionModalOpen(false);
    } catch (err) {
      setDecisionError(err.message || 'Failed to record decision');
    } finally {
      setSubmittingDecision(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading underwriter appraisal workspace..." />;
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <ErrorAlert title="Application Not Found" message={error} retry={fetchDetail} />
        <div className="mt-4 text-center">
          <Link to="/banker/applications" className="text-xs text-orange-400 hover:underline">
            ← Back to Card Queue
          </Link>
        </div>
      </div>
    );
  }

  const { application, customer, risk, features, display_only, decision } = data;
  const isDecided = Boolean(decision?.decision);

  return (
    <div className="space-y-6">
      {/* Back Button & Status Badges */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/banker/applications"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Card Application Queue</span>
        </Link>

        <div className="flex items-center gap-2">
          <StatusBadge status={application.status} size="md" />
          <RiskBadge riskLabel={risk.risk_label} score={risk.risk_score} />
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="bg-[#0c0c10] border border-orange-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-orange-400 font-bold bg-orange-950/80 border border-orange-700/50 px-2.5 py-0.5 rounded">
              {application.application_no}
            </span>
            <span className="text-xs text-zinc-400">
              Submitted: {new Date(application.submitted_at).toLocaleString('en-IN')}
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">
            {customer.name}
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Requested Credit Limit: <span className="font-bold text-white font-mono">₹{Number(application.loan_amount).toLocaleString('en-IN')}</span> • Primary Usage: <span className="text-zinc-300 font-medium">{application.purpose}</span>
          </p>
        </div>

        {/* Quick Decision Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            variant="success"
            size="sm"
            onClick={() => handleOpenDecisionModal('approved')}
            icon={CheckCircle2}
          >
            Approve Card
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={() => handleOpenDecisionModal('more_info')}
            icon={AlertCircle}
          >
            Request Info
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleOpenDecisionModal('rejected')}
            icon={XCircle}
          >
            Reject
          </Button>
        </div>
      </div>

      {/* Decision Recorded Banner if already finalized */}
      {isDecided && (
        <div className="p-4 rounded-xl border border-orange-800/60 bg-orange-950/40 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-orange-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Scale className="w-4 h-4" />
              <span>Final Underwriting Decision Recorded: {decision.decision.toUpperCase()}</span>
            </span>
            <span className="text-zinc-400 font-mono">
              Decided by: {decision.decided_by} • {new Date(decision.decided_at).toLocaleDateString()}
            </span>
          </div>
          {decision.remarks && (
            <p className="mt-2 text-zinc-300 bg-[#07070a] p-2.5 rounded-lg border border-zinc-800">
              Remarks: "{decision.remarks}"
            </p>
          )}
        </div>
      )}

      {/* 2 Column Layout */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Risk Engine Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <RiskGauge
            score={risk.risk_score || 0}
            threshold={risk.threshold_used || 0.15}
          />

          <div className={`p-4 rounded-xl border text-xs flex items-start gap-3 ${
            risk.risk_label === 'Risky'
              ? 'bg-rose-950/40 border-rose-900/60 text-rose-200'
              : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-200'
          }`}>
            <Cpu className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[11px]">
                XGBoost Model Recommendation: {risk.risk_label}
              </h4>
              <p className="mt-1 leading-relaxed opacity-90">
                {risk.recommendation}
              </p>
            </div>
          </div>

          <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 p-5 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Top TreeSHAP Explanation Factors
                </h3>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Applicant features contributing toward default probability
                </p>
              </div>
              <span className="text-[10px] font-mono bg-orange-950 text-orange-400 px-2 py-0.5 rounded border border-orange-800">
                TreeSHAP v0.42
              </span>
            </div>

            <ShapFactorList factors={risk.top_factors} />
          </div>

          <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 overflow-hidden shadow-xl">
            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-orange-400" />
                <span>Inspect 21 Model Features Sent to XGBoost</span>
              </div>
              {showFeatures ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFeatures && (
              <div className="p-4 border-t border-zinc-800 bg-[#07070a]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
                  {Object.entries(features).map(([key, val]) => (
                    <div key={key} className="p-2 rounded bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 font-mono block text-[10px] truncate" title={key}>
                        {key}
                      </span>
                      <span className="font-bold font-mono text-orange-400">
                        {typeof val === 'number' ? (Number.isInteger(val) ? val : val.toFixed(4)) : String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Applicant Details & Core Banking Records (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-orange-400" />
              <span>Requested Credit Card Terms</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Requested Limit:</span>
                <span className="font-bold text-white font-mono">₹{Number(application.loan_amount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Estimated Min Due:</span>
                <span className="font-mono font-bold text-orange-400">₹{Math.round(Number(application.loan_amount || 0) * 0.05).toLocaleString('en-IN')} / mo</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Primary Card Usage:</span>
                <span className="font-semibold text-white">{application.purpose}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span className="text-zinc-400">Declared Extra Income:</span>
                <span className="font-semibold text-zinc-300">
                  {application.declared_income ? `₹${Number(application.declared_income).toLocaleString('en-IN')}` : 'Not declared'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-zinc-400">On-File Annual Income:</span>
                <span className="font-bold text-emerald-400 font-mono">₹{Number(customer.annual_income || 0).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-orange-400" />
              <span>Applicant Demographics</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Age:</span>
                <span className="text-white">{customer.age_years || 'N/A'} yrs ({customer.dob})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Mobile:</span>
                <span className="font-mono text-white">{customer.mobile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Occupation:</span>
                <span className="text-white">{customer.occupation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Employment Vintage:</span>
                <span className="text-white">{customer.employed_years} years</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Education:</span>
                <span className="text-white">{customer.education}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-800">
                <span className="text-zinc-400">Marital Status / Family:</span>
                <span className="text-white">{customer.marital_status} ({customer.family_size} members)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Owns Property:</span>
                <span className="text-white">{customer.owns_property}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-orange-400" />
              <span>Display-Only Banking Records</span>
            </h3>

            {display_only.accounts && display_only.accounts.length > 0 && (
              <div className="mb-3 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Bank Accounts</span>
                {display_only.accounts.map((acc, i) => (
                  <div key={i} className="p-2 rounded bg-zinc-900 border border-zinc-800 text-xs flex justify-between">
                    <div>
                      <p className="font-semibold text-zinc-200">{acc.type}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{acc.account_no}</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-400">
                      ₹{acc.balance.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {display_only.credit_cards && display_only.credit_cards.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Existing Cards</span>
                {display_only.credit_cards.map((card, i) => (
                  <div key={i} className="p-2 rounded bg-zinc-900 border border-zinc-800 text-xs flex justify-between">
                    <div>
                      <p className="font-semibold text-zinc-200">{card.card_type}</p>
                      <p className="text-[10px] text-zinc-500">{card.payment_status}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-zinc-300">₹{card.utilized_amount.toLocaleString('en-IN')} used</p>
                      <p className="text-[10px] text-zinc-500 font-mono">Limit: ₹{card.credit_limit.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decision Confirmation Modal */}
      <Modal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        title={`Confirm Underwriter Decision: ${decisionType ? decisionType.toUpperCase() : ''}`}
      >
        <form onSubmit={handleConfirmDecision} className="space-y-4">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
            <p>
              Applicant: <span className="font-bold text-white">{customer.name}</span> ({application.application_no})
            </p>
            <p className="mt-1">
              Requested Credit Limit: <span className="font-bold text-orange-400">₹{Number(application.loan_amount).toLocaleString('en-IN')}</span>
            </p>
            <p className="mt-1">
              ML Risk: <span className="font-bold font-mono">{(risk.risk_score * 100).toFixed(1)}% ({risk.risk_label})</span>
            </p>
          </div>

          {decisionError && (
            <ErrorAlert title="Decision Error" message={decisionError} />
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
              Underwriting Remarks / Notes {decisionType !== 'approved' && <span className="text-rose-500">*</span>}
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={
                decisionType === 'approved'
                  ? 'e.g. Low risk score, verified KYC, approved for ₹3,00,000 credit limit.'
                  : decisionType === 'more_info'
                  ? 'e.g. Request recent 3 months credit card statements and proof of income.'
                  : 'e.g. Credit score below required threshold; delinquency detected on bureau records.'
              }
              className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-900 text-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {decisionType !== 'approved' && (
              <p className="text-[11px] text-zinc-400 mt-1">
                Remarks are mandatory for Rejected and More Info decisions.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDecisionModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={
                decisionType === 'approved'
                  ? 'success'
                  : decisionType === 'more_info'
                  ? 'warning'
                  : 'danger'
              }
              size="sm"
              loading={submittingDecision}
            >
              Confirm {decisionType?.toUpperCase()}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
