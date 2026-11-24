import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * SHAP Factor explanation list showing features pushing risk up or down
 */
export function ShapFactorList({ factors = [] }) {
  if (!factors || factors.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-slate-400">
        No specific SHAP explanation factors available for this application.
      </div>
    );
  }

  // Find max absolute SHAP value for scaling bars
  const maxAbs = Math.max(...factors.map(f => Math.abs(f.shap_value || 0.1)), 0.1);

  return (
    <div className="space-y-3">
      {factors.map((item, idx) => {
        const isIncrease = item.direction === 'increases_risk' || (item.shap_value && item.shap_value > 0);
        const barWidth = Math.min(100, Math.round((Math.abs(item.shap_value || 0) / maxAbs) * 100));

        return (
          <div
            key={idx}
            className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.label || item.feature}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    {item.feature}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Observed Value: <span className="font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
                  isIncrease
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                }`}>
                  {isIncrease ? (
                    <>
                      <TrendingUp className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      <span>Increases Risk</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Lowers Risk</span>
                    </>
                  )}
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  SHAP: {item.shap_value > 0 ? `+${item.shap_value.toFixed(3)}` : item.shap_value?.toFixed(3)}
                </div>
              </div>
            </div>

            {/* Visual impact bar */}
            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <span className="text-[11px] text-slate-400 w-16 shrink-0">Impact Level</span>
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isIncrease ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.max(6, barWidth)}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
