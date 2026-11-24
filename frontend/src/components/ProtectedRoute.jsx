import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBankerAuth } from '../context/BankerAuthContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';

/**
 * Banker Route Guard: redirects to /banker/login if unauthenticated
 */
export function BankerProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useBankerAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400">Verifying banker credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/banker/login" state={{ from: location }} replace />;
  }

  return children;
}

/**
 * Customer Route Guard: redirects to /customer/verify if unverified
 */
export function CustomerProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useCustomerAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500">Checking customer session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/customer/verify" state={{ from: location }} replace />;
  }

  return children;
}

