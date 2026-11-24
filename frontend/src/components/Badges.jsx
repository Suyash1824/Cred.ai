import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  HelpCircle,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export function StatusBadge({ status, size = 'md' }) {
  const configs = {
    submitted: {
      label: 'Submitted',
      bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
      icon: Clock,
      dot: 'bg-blue-500',
    },
    under_review: {
      label: 'Under Review',
      bg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
      icon: Clock,
      dot: 'bg-purple-500',
    },
    approved: {
      label: 'Approved',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
      icon: CheckCircle2,
      dot: 'bg-emerald-500',
    },
    rejected: {
      label: 'Rejected',
      bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
      icon: XCircle,
      dot: 'bg-rose-500',
    },
    more_info: {
      label: 'More Info Needed',
      bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      icon: AlertCircle,
      dot: 'bg-amber-500',
    },
  };

  const config = configs[status] || {
    label: status || 'Pending',
    bg: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    icon: HelpCircle,
    dot: 'bg-slate-400',
  };

  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`} />
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}

export function RiskBadge({ riskLabel, score, showScore = true }) {
  const isRisky = riskLabel === 'Risky';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border px-2.5 py-1 text-xs ${
      isRisky
        ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
    }`}>
      {isRisky ? (
        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
      ) : (
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
      )}
      <span>{isRisky ? 'Risky (Verification Flagged)' : 'Normal (Low Risk)'}</span>
      {showScore && typeof score === 'number' && (
        <span className="font-mono ml-0.5 opacity-80">({(score * 100).toFixed(1)}%)</span>
      )}
    </span>
  );
}

