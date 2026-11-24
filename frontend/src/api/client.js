import { API_BASE_URL } from './config';

/**
 * Standard fetch wrapper for real backend communication
 */
export async function apiFetch(endpoint, options = {}) {
  const { token, headers = {}, ...rest } = options;

  const requestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: requestHeaders,
    ...rest,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error?.message || data?.detail || `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.code = data?.error?.code || 'API_ERROR';
    err.details = data?.error?.details || null;
    throw err;
  }

  return data;
}

