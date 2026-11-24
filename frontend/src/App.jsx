import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { BankerAuthProvider } from './context/BankerAuthContext';
import { CustomerProtectedRoute, BankerProtectedRoute } from './components/ProtectedRoute';

// Layouts
import { CustomerLayout } from './layouts/CustomerLayout';
import { BankerLayout } from './layouts/BankerLayout';

// Landing Page
import { LandingPage } from './pages/LandingPage';

// Customer Pages
import { VerifyPage } from './pages/customer/VerifyPage';
import { OtpPage } from './pages/customer/OtpPage';
import { ProfilePage } from './pages/customer/ProfilePage';
import { ApplyPage } from './pages/customer/ApplyPage';
import { StatusPage } from './pages/customer/StatusPage';

// Banker Pages
import { BankerLoginPage } from './pages/banker/BankerLoginPage';
import { BankerQueuePage } from './pages/banker/BankerQueuePage';
import { BankerDetailPage } from './pages/banker/BankerDetailPage';

function App() {
  return (
    <BrowserRouter>
      <BankerAuthProvider>
        <CustomerAuthProvider>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Customer Routes */}
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<Navigate to="/customer/verify" replace />} />
              <Route path="verify" element={<VerifyPage />} />
              <Route path="otp" element={<OtpPage />} />
              <Route
                path="profile"
                element={
                  <CustomerProtectedRoute>
                    <ProfilePage />
                  </CustomerProtectedRoute>
                }
              />
              <Route
                path="apply"
                element={
                  <CustomerProtectedRoute>
                    <ApplyPage />
                  </CustomerProtectedRoute>
                }
              />
              <Route path="status" element={<StatusPage />} />
              <Route path="status/:applicationNo" element={<StatusPage />} />
            </Route>

            {/* Banker Login (Unauthenticated) */}
            <Route path="/banker/login" element={<BankerLoginPage />} />

            {/* Banker Protected Workspace */}
            <Route
              path="/banker"
              element={
                <BankerProtectedRoute>
                  <BankerLayout />
                </BankerProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/banker/applications" replace />} />
              <Route path="applications" element={<BankerQueuePage />} />
              <Route path="applications/:id" element={<BankerDetailPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CustomerAuthProvider>
      </BankerAuthProvider>
    </BrowserRouter>
  );
}

export default App;
