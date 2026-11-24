import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

/**
 * Visual risk gauge with color gradients, needle/indicator, and threshold markings
 */
export function RiskGauge({ score = 0, threshold = 0.15 }) {
  const percentage = Math.min(100, Math.max(0, Math.round(score * 100)));
  const thresholdPercentage = Math.round(threshold * 100);
  const isRisky = score >= threshold;

  let barGradient = 'from-emerald-500 to-teal-500';
  let badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300';

  if (score >= 0.35) {
    barGradient = 'from-orange-500 via-rose-500 to-red-600';
    badgeClass = 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300';
  } else if (score >= threshold) {
    barGradient = 'from-amber-400 to-orange-500';
    badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            ML Default Risk Probability
          </h4>
          <p className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
            {(score * 100).toFixed(1)}%
            <span className="text-xs font-normal font-sans text-slate-500 dark:text-slate-400 ml-2">
              (Raw score: {score.toFixed(4)})
            </span>
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${badgeClass}`}>
          {isRisky ? (
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          )}
          {isRisky ? 'FLAGGED (RISKY)' : 'LOW RISK (NORMAL)'}
        </div>
      </div>

      {/* Progress Bar with Threshold Marker */}
      <div className="relative pt-2 pb-6">
        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-700 ease-out`}
            style={{ width: `${Math.max(4, percentage)}%` }}
          />
        </div>

        {/* Threshold indicator marker */}
        <div
          className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
          style={{ left: `${thresholdPercentage}%` }}
        >
          <div className="w-0.5 h-6 bg-slate-700 dark:bg-slate-200 shadow" />
          <div className="text-[10px] font-semibold font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded shadow-xs mt-0.5 border border-slate-300 dark:border-slate-700 whitespace-nowrap">
            Threshold: {(threshold * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Safe Zone (0 - 15%)
        </span>
        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate (15 - 35%)
        </span>
        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical Risk (35%+)
        </span>
      </div>
    </div>
  );
}
