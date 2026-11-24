import { USE_MOCKS, mockDelay } from './config';
import { apiFetch } from './client';
import { getStoredCustomerToken } from './auth';
import { mockStore } from '../mocks/mockStore';

/**
 * Step 3: Get customer's on-file profile (read-only)
 * GET /customer/profile
 * STRICT RULE: Customers NEVER receive risk_score, risk_label or top_factors.
 * @returns {Promise<Object>} Identity, personal, employment, financial data
 */
export async function getCustomerProfile() {
  if (USE_MOCKS) {
    await mockDelay(300);
    return mockStore.getCustomerProfile();
  }

  const token = getStoredCustomerToken();
  return apiFetch('/customer/profile', {
    method: 'GET',
    token,
  });
}

/**
 * Step 4: Submit new loan application
 * POST /applications
 * @param {Object} payload { loan_amount, tenure_months, purpose, declared_income, consent }
 * @returns {Promise<{ application_no: string, id: string, status: string, submitted_at: string, monthly_installment: number }>}
 */
export async function submitLoanApplication({ loan_amount, tenure_months, purpose, declared_income, consent }) {
  if (USE_MOCKS) {
    await mockDelay(600); // Simulate model prediction run
    return mockStore.createApplication({ loan_amount, tenure_months, purpose, declared_income, consent });
  }

  const token = getStoredCustomerToken();
  return apiFetch('/applications', {
    method: 'POST',
    token,
    body: JSON.stringify({
      loan_amount: Number(loan_amount),
      tenure_months: Number(tenure_months),
      purpose,
      declared_income: declared_income ? Number(declared_income) : null,
      consent: Boolean(consent),
    }),
  });
}

/**
 * Step 5: Check application status
 * GET /applications/{application_no}
 * STRICT: Returns status, loan details, and monthly installment only. Never leaks risk fields.
 * @param {string} applicationNo
 * @returns {Promise<{ application_no: string, status: string, loan_amount: number, tenure_months: number, purpose: string, submitted_at: string, monthly_installment: number }>}
 */
export async function getApplicationStatus(applicationNo) {
  if (USE_MOCKS) {
    await mockDelay(300);
    return mockStore.getApplicationStatus(applicationNo);
  }

  const token = getStoredCustomerToken();
  return apiFetch(`/applications/${encodeURIComponent(applicationNo)}`, {
    method: 'GET',
    token,
  });
}

