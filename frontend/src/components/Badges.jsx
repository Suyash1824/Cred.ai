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
      bg: 'bg-blue-950/40 text-blue-300 border-blue-800',
      icon: Clock,
      dot: 'bg-blue-500',
    },
    under_review: {
      label: 'Under Review',
      bg: 'bg-orange-950/40 text-orange-300 border-orange-800/80',
      icon: Clock,
      dot: 'bg-orange-500',
    },
    approved: {
      label: 'Approved',
      bg: 'bg-emerald-950/40 text-emerald-300 border-emerald-800',
      icon: CheckCircle2,
      dot: 'bg-emerald-500',
    },
    rejected: {
      label: 'Rejected',
      bg: 'bg-rose-950/40 text-rose-300 border-rose-800',
      icon: XCircle,
      dot: 'bg-rose-500',
    },
    more_info: {
      label: 'More Info Needed',
      bg: 'bg-amber-950/40 text-amber-300 border-amber-800',
      icon: AlertCircle,
      dot: 'bg-amber-500',
    },
  };

  const config = configs[status] || {
    label: status || 'Pending',
    bg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    icon: HelpCircle,
    dot: 'bg-zinc-400',
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
        ? 'bg-rose-950/50 text-rose-300 border-rose-800'
        : 'bg-emerald-950/50 text-emerald-300 border-emerald-800'
    }`}>
      {isRisky ? (
        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
      ) : (
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
      )}
      <span>{isRisky ? 'Risky (Verification Flagged)' : 'Normal (Low Risk)'}</span>
      {showScore && typeof score === 'number' && (
        <span className="font-mono ml-0.5 opacity-80">({(score * 100).toFixed(1)}%)</span>
      )}
    </span>
  );
}
