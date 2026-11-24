import { USE_MOCKS, mockDelay } from './config';
import { apiFetch } from './client';
import { mockStore } from '../mocks/mockStore';

const CUSTOMER_TOKEN_KEY = 'credai_customer_token';
const BANKER_TOKEN_KEY = 'credai_banker_token';

export function getStoredCustomerToken() {
  return localStorage.getItem(CUSTOMER_TOKEN_KEY);
}

export function setStoredCustomerToken(token) {
  if (token) {
    localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
  }
}

export function getStoredBankerToken() {
  return localStorage.getItem(BANKER_TOKEN_KEY);
}

export function setStoredBankerToken(token) {
  if (token) {
    localStorage.setItem(BANKER_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(BANKER_TOKEN_KEY);
  }
}

/**
 * Step 1: Customer Identity Verification
 * POST /auth/verify
 * @param {Object} payload { account_number, mobile, dob }
 * @returns {Promise<{ challenge_id: string, expires_in: number, message: string }>}
 */
export async function verifyCustomerIdentity({ account_number, mobile, dob }) {
  if (USE_MOCKS) {
    await mockDelay(350);
    return mockStore.verifyCustomer(account_number, mobile, dob);
  }

  return apiFetch('/auth/verify', {
    method: 'POST',
    body: JSON.stringify({ account_number, mobile, dob }),
  });
}

/**
 * Step 2: Customer OTP Validation
 * POST /auth/otp
 * @param {Object} payload { challenge_id, otp }
 * @returns {Promise<{ access_token: string, token_type: string, expires_in: number, customer_name: string }>}
 */
export async function verifyCustomerOtp({ challenge_id, otp }) {
  if (USE_MOCKS) {
    await mockDelay(400);
    const result = mockStore.verifyOtp(challenge_id, otp);
    setStoredCustomerToken(result.access_token);
    return result;
  }

  const result = await apiFetch('/auth/otp', {
    method: 'POST',
    body: JSON.stringify({ challenge_id, otp }),
  });
  setStoredCustomerToken(result.access_token);
  return result;
}

/**
 * Customer Logout
 */
export function customerLogout() {
  setStoredCustomerToken(null);
  mockStore.clearCustomerSession();
}

/**
 * Banker Login
 * POST /banker/login
 * @param {Object} payload { email, password }
 * @returns {Promise<{ access_token: string, token_type: string, expires_in: number, banker: object }>}
 */
export async function bankerLogin({ email, password }) {
  if (USE_MOCKS) {
    await mockDelay(400);
    const result = mockStore.bankerLogin(email, password);
    setStoredBankerToken(result.access_token);
    return result;
  }

  const result = await apiFetch('/banker/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setStoredBankerToken(result.access_token);
  return result;
}

/**
 * Banker Logout
 */
export function bankerLogout() {
  setStoredBankerToken(null);
  mockStore.bankerLogout();
}

