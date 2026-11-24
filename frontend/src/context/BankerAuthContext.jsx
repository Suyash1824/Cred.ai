import React, { createContext, useContext, useState } from 'react';
import { getStoredBankerToken, bankerLogout as apiBankerLogout } from '../api/auth';
import { mockStore } from '../mocks/mockStore';

const BankerAuthContext = createContext(null);

export function BankerAuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredBankerToken());
  const [banker, setBanker] = useState(() => {
    const storedToken = getStoredBankerToken();
    return storedToken ? mockStore.getBankerSession()?.banker : null;
  });
  const [loading] = useState(false);

  const onBankerLoginSuccess = (loginResponse) => {
    setToken(loginResponse.access_token);
    setBanker(loginResponse.banker);
  };

  const logout = () => {
    apiBankerLogout();
    setToken(null);
    setBanker(null);
  };

  const value = {
    token,
    banker,
    isAuthenticated: Boolean(token),
    loading,
    onBankerLoginSuccess,
    logout,
  };

  return (
    <BankerAuthContext.Provider value={value}>
      {children}
    </BankerAuthContext.Provider>
  );
}

export function useBankerAuth() {
  const context = useContext(BankerAuthContext);
  if (!context) {
    throw new Error('useBankerAuth must be used within BankerAuthProvider');
  }
  return context;
}
