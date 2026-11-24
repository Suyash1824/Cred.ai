import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBankerApplications } from '../../api/banker';
import { StatusBadge, RiskBadge } from '../../components/Badges';
import { LoadingState, EmptyState, ErrorAlert } from '../../components/FeedbackStates';
import { 
  Search, 
  ShieldAlert, 
  ChevronRight,
  CreditCard
} from 'lucide-react';

export function BankerQueuePage() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('submitted_at:desc');

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBankerApplications({
        status: statusFilter,
        risk_label: riskFilter,
        search: searchQuery,
        sort: sortOrder,
      });
      setApplications(response.items || []);
      setMetrics(response.metrics || null);
    } catch (err) {
      setError(err.message || 'Failed to load credit card application queue');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, riskFilter, searchQuery, sortOrder]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchApplications();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Stat Cards */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Credit Card Application Pipeline
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Incoming retail card applications scored with XGBoost default probabilities & TreeSHAP
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#0c0c10] border border-orange-500/20">
            <span className="text-[11px] font-semibold text-zinc-400 block uppercase">Total Cards</span>
            <span className="text-2xl font-bold text-white mt-1 block">{metrics.total}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0c0c10] border border-blue-900/30">
            <span className="text-[11px] font-semibold text-blue-400 block uppercase">New Submitted</span>
            <span className="text-2xl font-bold text-blue-400 mt-1 block">{metrics.submitted}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0c0c10] border border-orange-900/30">
            <span className="text-[11px] font-semibold text-orange-400 block uppercase">Under Review</span>
            <span className="text-2xl font-bold text-orange-400 mt-1 block">{metrics.under_review}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0c0c10] border border-rose-900/40 bg-rose-950/20">
            <span className="text-[11px] font-semibold text-rose-400 block uppercase flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              <span>Risky Flagged</span>
            </span>
            <span className="text-2xl font-bold text-rose-400 mt-1 block">{metrics.risky}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0c0c10] border border-emerald-900/30">
            <span className="text-[11px] font-semibold text-emerald-400 block uppercase">Approved</span>
            <span className="text-2xl font-bold text-emerald-400 mt-1 block">{metrics.approved}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0c0c10] border border-amber-900/30">
            <span className="text-[11px] font-semibold text-amber-400 block uppercase">Need Info</span>
            <span className="text-2xl font-bold text-amber-400 mt-1 block">{metrics.more_info}</span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0c0c10] border border-orange-500/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by Applicant Name, Card Ref No, or Spending Category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black rounded-lg text-xs font-black cursor-pointer transition-colors shadow-md shadow-orange-500/25"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="more_info">More Info Needed</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="all">All Risk Tiers</option>
            <option value="Normal">Normal (&lt;15%)</option>
            <option value="Risky">Risky (≥15%)</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-orange-500 cursor-pointer"
          >
            <option value="submitted_at:desc">Newest First</option>
            <option value="submitted_at:asc">Oldest First</option>
            <option value="risk_score:desc">Highest Risk First</option>
            <option value="risk_score:asc">Lowest Risk First</option>
            <option value="loan_amount:desc">Highest Credit Limit</option>
          </select>
        </div>
      </div>

      {/* Main Applications Table */}
      {loading && <LoadingState message="Loading card applications..." minHeight="min-h-[300px]" />}

      {error && <ErrorAlert title="Queue Error" message={error} retry={fetchApplications} />}

      {!loading && !error && applications.length === 0 && (
        <EmptyState
          title="No applications match filters"
          description="Try clearing search keywords or switching filters to view other pipeline items."
          actionText="Clear Filters"
          onAction={() => {
            setStatusFilter('all');
            setRiskFilter('all');
            setSearchQuery('');
          }}
        />
      )}

      {!loading && !error && applications.length > 0 && (
        <div className="bg-[#0c0c10] rounded-2xl border border-orange-500/20 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#07070a] text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4">Card Ref No</th>
                  <th className="py-3.5 px-4">Applicant</th>
                  <th className="py-3.5 px-4">Credit Limit</th>
                  <th className="py-3.5 px-4">Card Category</th>
                  <th className="py-3.5 px-4">ML Risk Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Submitted</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/banker/applications/${app.id}`)}
                    className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-orange-400">
                      {app.application_no}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {app.customer_name}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white font-mono">
                      ₹{Number(app.loan_amount).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">
                      {app.purpose || 'Personal'}
                    </td>
                    <td className="py-3.5 px-4">
                      <RiskBadge
                        riskLabel={app.risk_label}
                        score={app.risk_score}
                        showScore={true}
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">
                      {new Date(app.submitted_at).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 font-semibold text-orange-400 group-hover:text-orange-300">
                        <span>Review</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-[#07070a] border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Showing {applications.length} credit card applications in underwriter queue</span>
            <span>Threshold for Risky classification: 0.15 (15%)</span>
          </div>
        </div>
      )}
    </div>
  );
}
