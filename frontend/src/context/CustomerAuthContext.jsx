import React, { createContext, useContext, useState } from 'react';
import { getStoredCustomerToken, customerLogout } from '../api/auth';
import { mockStore } from '../mocks/mockStore';

const CustomerAuthContext = createContext(null);

export function CustomerAuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredCustomerToken());
  const [customer, setCustomer] = useState(() => {
    const storedToken = getStoredCustomerToken();
    return storedToken ? mockStore.getCustomerSession() : null;
  });
  const [loading] = useState(false);

  const onSessionCreated = (sessionData) => {
    setToken(sessionData.access_token);
    const session = mockStore.getCustomerSession();
    setCustomer(session);
  };

  const logout = () => {
    customerLogout();
    setToken(null);
    setCustomer(null);
  };

  const value = {
    token,
    customer,
    isAuthenticated: Boolean(token),
    loading,
    onSessionCreated,
    logout,
  };

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within CustomerAuthProvider');
  }
  return context;
}
