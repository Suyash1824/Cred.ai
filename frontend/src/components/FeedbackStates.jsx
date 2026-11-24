import React from 'react';
import { Loader2, AlertCircle, Inbox, RefreshCw } from 'lucide-react';
import { Button } from './FormControls';

export function LoadingState({ message = 'Loading data...', minHeight = 'min-h-[250px]' }) {
  return (
    <div className={`w-full flex flex-col items-center justify-center p-8 gap-3 text-zinc-400 ${minHeight}`}>
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      <p className="text-sm font-medium text-zinc-300">{message}</p>
    </div>
  );
}

export function EmptyState({
  title = 'No records found',
  description = 'There are no items matching your criteria at this moment.',
  actionText,
  onAction,
  icon: Icon = Inbox,
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40">
      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="text-xs text-zinc-400 max-w-sm mt-1 mb-4">{description}</p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

export function ErrorAlert({ message, retry, title = 'An error occurred' }) {
  return (
    <div className="w-full p-4 rounded-xl border border-rose-900/60 bg-rose-950/30 text-rose-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          <h4 className="font-semibold text-rose-100">{title}</h4>
          <p className="text-rose-300 text-xs mt-0.5">{message}</p>
          {retry && (
            <div className="mt-2.5">
              <Button variant="danger" size="sm" onClick={retry} icon={RefreshCw}>
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Card({ title, subtitle, action, children, className = '', headerClassName = '' }) {
  return (
    <div className={`bg-zinc-900/90 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden ${className}`}>
      {(title || subtitle || action) && (
        <div className={`px-5 py-4 border-b border-zinc-800/80 flex items-center justify-between gap-4 ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
