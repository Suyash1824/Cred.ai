import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { getApplicationStatus } from '../../api/customer';
import { StatusBadge } from '../../components/Badges';
import { Button, Input } from '../../components/FormControls';
import { LoadingState, ErrorAlert } from '../../components/FeedbackStates';
import { 
  CheckCircle2, 
  Search, 
  Clock, 
  Calendar, 
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { InteractiveCard } from '../../components/InteractiveCard';

export function StatusPage() {
  const { applicationNo } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isNewSubmission = location.state?.isNewSubmission;
  const initialApp = location.state?.application;

  const [searchNo, setSearchNo] = useState(applicationNo || 'LN-2026-000041');
  const [application, setApplication] = useState(initialApp || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatus = useCallback(async (appNo) => {
    if (!appNo || !appNo.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getApplicationStatus(appNo.trim());
      setApplication(data);
    } catch (err) {
      setError(err.message || `Credit card application "${appNo}" not found.`);
      setApplication(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (applicationNo) {
      fetchStatus(applicationNo);
    } else if (!initialApp) {
      fetchStatus('LN-2026-000041');
    }
  }, [applicationNo, initialApp, fetchStatus]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchNo.trim()) {
      navigate(`/customer/status/${encodeURIComponent(searchNo.trim())}`);
      fetchStatus(searchNo.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Search Bar for tracking any application */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Enter Card Application No (e.g. LN-2026-000041)"
            value={searchNo}
            onChange={(e) => setSearchNo(e.target.value)}
            icon={Search}
            className="flex-1"
          />
          <Button 
            type="submit" 
            variant="primary" 
            size="md" 
            className="shrink-0 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold"
          >
            Track Status
          </Button>
        </form>
      </div>

      {/* New Submission Success Banner */}
      {isNewSubmission && (
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-fuchsia-950 via-purple-900 to-indigo-950 border border-fuchsia-500/50 text-white shadow-[0_0_30px_rgba(217,70,239,0.3)]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-fuchsia-500/20 border border-fuchsia-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-fuchsia-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Credit Card Application Successfully Submitted!</h2>
              <p className="text-xs text-fuchsia-200 mt-0.5">
                Your application has been registered in the bank underwriting queue for automated ML assessment and human officer review.
              </p>
            </div>
          </div>
        </div>
      )}

      {loading && <LoadingState message="Fetching credit card application details..." />}

      {error && (
        <div className="mb-6">
          <ErrorAlert title="Tracking Error" message={error} />
        </div>
      )}

      {application && !loading && (
        <div className="space-y-6">
          <div className="bg-[#120724] rounded-2xl border border-fuchsia-900/40 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            
            {/* Top Bar with ID and Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">
                  Application Reference Number
                </span>
                <span className="text-xl font-black font-mono text-fuchsia-300">
                  {application.application_no}
                </span>
              </div>
              <StatusBadge status={application.status} size="lg" />
            </div>

            {/* Status Message based on lifecycle */}
            <div className="my-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              {application.status === 'submitted' && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <p className="font-bold text-white">Application Queued for Review</p>
                    <p className="mt-0.5 text-slate-400">
                      Your credit card request has been received. Our credit underwriting team is analyzing the application against bank risk policies.
                    </p>
                  </div>
                </div>
              )}

              {application.status === 'under_review' && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <p className="font-bold text-white">Under Active Underwriting Assessment</p>
                    <p className="mt-0.5 text-slate-400">
                      A senior credit officer is currently evaluating your application details and KYC documentation.
                    </p>
                  </div>
                </div>
              )}

              {application.status === 'approved' && (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-300">
                    <p className="font-bold text-emerald-200">Credit Card Approved!</p>
                    <p className="mt-0.5 text-emerald-400">
                      Congratulations! Your AtlasCard has been sanctioned. Your digital card will be active in the Atlas Wallet shortly. Physical card dispatch within 3-5 business days.
                    </p>
                  </div>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-rose-300">
                    <p className="font-bold text-rose-200">Application Not Approved</p>
                    <p className="mt-0.5 text-rose-400">
                      We are unable to approve this credit card application at this time based on current risk criteria.
                    </p>
                  </div>
                </div>
              )}

              {application.status === 'more_info' && (
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-300">
                    <p className="font-bold text-amber-200">Additional Information Required</p>
                    <p className="mt-0.5 text-amber-400">
                      The underwriting team needs additional supporting documents (e.g. recent income tax returns or salary statements). Please visit your branch or check your email.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Application Parameters */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Requested Credit Limit</span>
                <span className="text-base font-extrabold text-white mt-0.5 block font-mono">
                  ₹{Number(application.loan_amount || 0).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Primary Spending Purpose</span>
                <span className="font-semibold text-white mt-0.5 block">
                  {application.purpose || 'Everyday Purchases'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-fuchsia-950/30 border border-fuchsia-500/30">
                <span className="text-fuchsia-300 block text-[11px] font-medium">Estimated Min. Monthly Due</span>
                <span className="text-base font-black text-fuchsia-200 mt-0.5 block font-mono">
                  ₹{Math.round(Number(application.loan_amount || 0) * 0.05).toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-fuchsia-300 ml-1">/ mo</span>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[11px]">Submission Date</span>
                <span className="font-semibold text-white mt-0.5 block">
                  {application.submitted_at ? new Date(application.submitted_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>AtlasCard Credit Line</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>256-Bit KYC Guard</span>
              </div>
            </div>
          </div>

          {/* Quick link */}
          <div className="flex items-center justify-between pt-2">
            <Link
              to="/customer/apply"
              className="text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 hover:underline"
            >
              + Submit Another Credit Card Request
            </Link>

            <Link
              to="/banker/login"
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>View as Banker in Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
