import { USE_MOCKS, mockDelay } from './config';
import { apiFetch } from './client';
import { getStoredBankerToken } from './auth';
import { mockStore } from '../mocks/mockStore';

/**
 * Banker Queue: List applications with optional filter/sort/search
 * GET /banker/applications
 * @param {Object} params { status, risk_label, search, page, page_size, sort }
 * @returns {Promise<{ items: Array, page: number, page_size: number, total: number, metrics: Object }>}
 */
export async function getBankerApplications(params = {}) {
  if (USE_MOCKS) {
    await mockDelay(350);
    return mockStore.getBankerApplications(params);
  }

  const token = getStoredBankerToken();
  const query = new URLSearchParams();
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.risk_label && params.risk_label !== 'all') query.set('risk_label', params.risk_label);
  if (params.page) query.set('page', params.page);
  if (params.page_size) query.set('page_size', params.page_size);
  if (params.sort) query.set('sort', params.sort);

  return apiFetch(`/banker/applications?${query.toString()}`, {
    method: 'GET',
    token,
  });
}

/**
 * Banker Detail: Get complete application detail including ML risk output, SHAP factors, and banking history
 * GET /banker/applications/{id}
 * Note: opening an application moves its status from 'submitted' to 'under_review'
 * @param {string} id
 * @returns {Promise<{ application: Object, customer: Object, risk: Object, features: Object, display_only: Object, decision: Object }>}
 */
export async function getBankerApplicationDetail(id) {
  if (USE_MOCKS) {
    await mockDelay(350);
    return mockStore.getBankerApplicationDetail(id);
  }

  const token = getStoredBankerToken();
  return apiFetch(`/banker/applications/${encodeURIComponent(id)}`, {
    method: 'GET',
    token,
  });
}

/**
 * Banker Decision: Record final human decision (Approve / Reject / Request more info)
 * POST /banker/applications/{id}/decision
 * @param {string} id
 * @param {Object} payload { decision: 'approved'|'rejected'|'more_info', remarks: string }
 * @returns {Promise<{ status: string, decision: string, remarks: string, decided_by: string, decided_at: string }>}
 */
export async function submitBankerDecision(id, { decision, remarks }) {
  if (USE_MOCKS) {
    await mockDelay(400);
    return mockStore.submitBankerDecision(id, { decision, remarks });
  }

  const token = getStoredBankerToken();
  return apiFetch(`/banker/applications/${encodeURIComponent(id)}/decision`, {
    method: 'POST',
    token,
    body: JSON.stringify({ decision, remarks }),
  });
}

/**
 * Demo reset helper for banker panel
 */
export async function resetDemoStore() {
  if (USE_MOCKS) {
    await mockDelay(200);
    return mockStore.resetDemoData();
  }
  return true;
}

