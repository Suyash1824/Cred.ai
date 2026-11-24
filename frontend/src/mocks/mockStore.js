import { INITIAL_APPLICATIONS, INITIAL_CUSTOMERS } from './mockData';

const APPS_STORAGE_KEY = 'credai_mock_applications';
const CUSTOMERS_STORAGE_KEY = 'credai_mock_customers';
const ACTIVE_SESSION_CUSTOMER_KEY = 'credai_customer_session';
const ACTIVE_SESSION_BANKER_KEY = 'credai_banker_session';

// Helper to calculate standard EMI (annual rate default 10.5%)
export function calculateEMI(principal, tenureMonths, annualRate = 10.5) {
  const r = annualRate / 12 / 100;
  const n = tenureMonths;
  if (r === 0) return Math.round(principal / n);
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

class MockStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(APPS_STORAGE_KEY)) {
      localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
    }
    if (!localStorage.getItem(CUSTOMERS_STORAGE_KEY)) {
      localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(INITIAL_CUSTOMERS));
    }
  }

  getCustomers() {
    try {
      const data = localStorage.getItem(CUSTOMERS_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  }

  getApplications() {
    try {
      const data = localStorage.getItem(APPS_STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  saveApplications(apps) {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(apps));
  }

  // --- Customer Operations ---
  verifyCustomer(accountNumber, mobile, dob) {
    const customers = this.getCustomers();
    const cleanAccount = (accountNumber || '').trim();
    const cleanMobile = (mobile || '').replace(/\D/g, '').slice(-10);
    const cleanDob = (dob || '').trim();

    let matched = customers.find(c => 
      c.account_number === cleanAccount &&
      c.mobile.slice(-10) === cleanMobile &&
      c.dob === cleanDob
    );

    if (!matched) {
      matched = {
        account_number: cleanAccount || '100234567890',
        mobile: cleanMobile || '9876543210',
        dob: cleanDob || '1992-06-15',
        profile: {
          identity: {
            full_name: 'Rohit Deshmukh',
            dob: cleanDob || '1992-06-15',
            mobile: `XXXXXX${cleanMobile.slice(-4) || '3210'}`,
            account_number: `XXXXXXXX${cleanAccount.slice(-4) || '7890'}`,
          },
          personal: {
            marital_status: 'Married',
            education: 'Higher education',
            family_size: 3,
            residence_type: 'House / apartment',
            owns_property: 'Yes',
          },
          employment: {
            occupation: 'Software Engineer',
            income_type: 'Commercial associate',
            employer_name: 'Infosys Limited',
            employment_start_date: '2018-03-01',
            employed_years: 8.0,
          },
          financial: {
            annual_income: 1100000,
          },
          display_only: {
            accounts: [
              { type: 'Savings Account', account_no: `XXXXXXXX${cleanAccount.slice(-4) || '7890'}`, balance: 350000, branch: 'Bengaluru Main Branch' }
            ],
            existing_loans: [],
            credit_cards: [
              { card_type: 'Titanium Visa', card_no: 'XXXX-XXXX-XXXX-5521', credit_limit: 250000, utilized_amount: 28000, payment_status: 'Regular' }
            ],
            credit_profiles: {
              bureau_score: 775,
              bureau_provider: 'CIBIL',
              enquiries_last_year: 1,
              total_credit_lines: 3,
              delinquencies_24m: 0
            }
          }
        }
      };

      customers.push(matched);
      localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
    }

    const challengeId = `chal_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    sessionStorage.setItem('credai_temp_challenge', JSON.stringify({
      challengeId,
      customer: matched,
      expiresAt: Date.now() + 300 * 1000
    }));

    return {
      challenge_id: challengeId,
      expires_in: 300,
      message: 'OTP sent to the registered mobile number (Demo code: 123456)'
    };
  }

  verifyOtp(challengeId, _otp) {
    const stored = sessionStorage.getItem('credai_temp_challenge');
    let customer = null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.challengeId === challengeId) {
          customer = parsed.customer;
        }
      } catch {
        // fallback
      }
    }

    if (!customer) {
      const customers = this.getCustomers();
      customer = customers[0];
    }

    const token = `cust_tok_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const session = {
      token,
      account_number: customer.account_number,
      customer_name: customer.profile.identity.full_name,
      profile: customer.profile,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(ACTIVE_SESSION_CUSTOMER_KEY, JSON.stringify(session));
    sessionStorage.removeItem('credai_temp_challenge');

    return {
      access_token: token,
      token_type: 'bearer',
      expires_in: 1800,
      customer_name: customer.profile.identity.full_name
    };
  }

  getCustomerSession() {
    try {
      const data = localStorage.getItem(ACTIVE_SESSION_CUSTOMER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  clearCustomerSession() {
    localStorage.removeItem(ACTIVE_SESSION_CUSTOMER_KEY);
  }

  getCustomerProfile() {
    const session = this.getCustomerSession();
    if (!session) {
      const customers = this.getCustomers();
      return customers[0].profile;
    }
    return session.profile;
  }

  createApplication({ loan_amount, tenure_months, purpose, declared_income, consent: _consent }) {
    const session = this.getCustomerSession() || {
      account_number: '100234567890',
      customer_name: 'Aditya Sharma',
      profile: this.getCustomers()[0].profile
    };

    const apps = this.getApplications();
    const annualIncome = session.profile?.financial?.annual_income || 1000000;
    const emi = calculateEMI(Number(loan_amount), Number(tenure_months), 10.5);

    const creditToIncome = Number(loan_amount) / annualIncome;
    const installmentToIncome = (emi * 12) / annualIncome;
    
    let riskScore = 0.07 + (creditToIncome > 1.5 ? 0.22 : 0.03) + (creditToIncome > 2.5 ? 0.25 : 0.0);
    if (annualIncome < 600000) riskScore += 0.12;
    riskScore = Math.min(0.92, Math.max(0.04, parseFloat(riskScore.toFixed(3))));

    const isRisky = riskScore >= 0.15;
    const nextSeq = apps.length + 42;
    const applicationNo = `LN-2026-${String(nextSeq).padStart(6, '0')}`;
    const newId = `app-${Date.now()}`;

    const newApp = {
      id: newId,
      application_no: applicationNo,
      customer_id: `cust-${session.account_number}`,
      customer_name: session.profile?.identity?.full_name || session.customer_name || 'Customer',
      loan_amount: Number(loan_amount),
      tenure_months: Number(tenure_months),
      purpose: purpose || 'Personal',
      declared_income: declared_income ? Number(declared_income) : null,
      monthly_installment: emi,
      interest_rate_used: 10.5,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      customer_details: {
        dob: session.profile?.identity?.dob || '1990-05-15',
        age_years: 36,
        mobile: session.profile?.identity?.mobile || '+91 9876543210',
        account_number: session.account_number,
        marital_status: session.profile?.personal?.marital_status || 'Married',
        education: session.profile?.personal?.education || 'Higher education',
        family_size: session.profile?.personal?.family_size || 3,
        residence_type: session.profile?.personal?.residence_type || 'House / apartment',
        occupation: session.profile?.employment?.occupation || 'Salaried Professional',
        income_type: session.profile?.employment?.income_type || 'Commercial associate',
        annual_income: annualIncome,
        employed_years: session.profile?.employment?.employed_years || 5,
        owns_property: session.profile?.personal?.owns_property || 'Yes'
      },
      risk: {
        risk_score: riskScore,
        risk_label: isRisky ? 'Risky' : 'Normal',
        threshold_used: 0.15,
        recommendation: isRisky 
          ? 'Requires Verification - Elevated credit-to-income leverage requires manual verification by credit officer.'
          : 'Likely to Approve - Favorable debt-to-income and verified on-file history.',
        top_factors: [
          {
            feature: 'credit_to_income',
            label: 'Credit to Annual Income',
            value: `${creditToIncome.toFixed(2)}x`,
            shap_value: creditToIncome > 1.2 ? 0.22 : -0.15,
            direction: creditToIncome > 1.2 ? 'increases_risk' : 'decreases_risk'
          },
          {
            feature: 'annual_income',
            label: 'Annual Income',
            value: `₹${(annualIncome).toLocaleString('en-IN')}`,
            shap_value: annualIncome >= 1000000 ? -0.18 : 0.12,
            direction: annualIncome >= 1000000 ? 'decreases_risk' : 'increases_risk'
          },
          {
            feature: 'installment_to_income',
            label: 'Installment to Income Ratio',
            value: `${(installmentToIncome * 100).toFixed(1)}%`,
            shap_value: installmentToIncome > 0.4 ? 0.19 : -0.10,
            direction: installmentToIncome > 0.4 ? 'increases_risk' : 'decreases_risk'
          },
          {
            feature: 'owns_property',
            label: 'Property Ownership',
            value: session.profile?.personal?.owns_property || 'Yes',
            shap_value: -0.09,
            direction: 'decreases_risk'
          }
        ]
      },
      features: {
        owns_property: session.profile?.personal?.owns_property === 'Yes' ? 1 : 0,
        annual_income: annualIncome,
        credit_amount: Number(loan_amount),
        monthly_installment: emi,
        income_type: session.profile?.employment?.income_type || 'Commercial associate',
        education: session.profile?.personal?.education || 'Higher education',
        marital_status: session.profile?.personal?.marital_status || 'Married',
        residence_type: session.profile?.personal?.residence_type || 'House / apartment',
        occupation: session.profile?.employment?.occupation || 'Salaried',
        family_size: session.profile?.personal?.family_size || 3,
        ext_score_1: 0.620,
        ext_score_2: 0.640,
        ext_score_3: 0.610,
        enquiries_last_year: 1,
        age_years: 36,
        employed_years: session.profile?.employment?.employed_years || 5,
        credit_to_income: creditToIncome,
        installment_to_income: installmentToIncome,
        ext_score_1_missing: 0,
        ext_score_2_missing: 0,
        ext_score_3_missing: 0
      },
      display_only: session.profile?.display_only || {
        accounts: [{ type: 'Savings Account', account_no: `XXXXXXXX${session.account_number.slice(-4)}`, balance: 320000, branch: 'Bengaluru' }],
        existing_loans: [],
        credit_cards: []
      },
      decision: {
        decision: null,
        remarks: null,
        decided_by: null,
        decided_at: null
      }
    };

    apps.unshift(newApp);
    this.saveApplications(apps);

    return {
      application_no: applicationNo,
      id: newId,
      status: 'submitted',
      submitted_at: newApp.submitted_at,
      loan_amount: newApp.loan_amount,
      tenure_months: newApp.tenure_months,
      purpose: newApp.purpose,
      monthly_installment: emi
    };
  }

  getApplicationStatus(applicationNo) {
    const apps = this.getApplications();
    const app = apps.find(a => a.application_no.toLowerCase() === applicationNo.trim().toLowerCase());
    if (!app) {
      throw new Error(`Application ${applicationNo} not found`);
    }

    return {
      application_no: app.application_no,
      status: app.status,
      loan_amount: app.loan_amount,
      tenure_months: app.tenure_months,
      purpose: app.purpose,
      submitted_at: app.submitted_at,
      monthly_installment: app.monthly_installment
    };
  }

  // --- Banker Operations ---
  bankerLogin(email, password) {
    if (!email || !password) {
      throw new Error('Please enter both email and password');
    }
    const token = `banker_tok_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    const banker = {
      id: 'bnk_01',
      email: email.trim(),
      name: email.includes('anita') ? 'Anita Sen' : 'Rajesh Iyer',
      role: 'banker',
      designation: 'Senior Credit Underwriter'
    };

    localStorage.setItem(ACTIVE_SESSION_BANKER_KEY, JSON.stringify({
      token,
      banker,
      loggedInAt: new Date().toISOString()
    }));

    return {
      access_token: token,
      token_type: 'bearer',
      expires_in: 3600,
      banker
    };
  }

  getBankerSession() {
    try {
      const data = localStorage.getItem(ACTIVE_SESSION_BANKER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  bankerLogout() {
    localStorage.removeItem(ACTIVE_SESSION_BANKER_KEY);
  }

  getBankerApplications({ status = 'all', risk_label = 'all', search = '', page = 1, page_size = 20, sort = 'submitted_at:desc' } = {}) {
    let apps = this.getApplications();

    if (status && status !== 'all') {
      apps = apps.filter(a => a.status === status);
    }

    if (risk_label && risk_label !== 'all') {
      apps = apps.filter(a => a.risk?.risk_label === risk_label);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      apps = apps.filter(a => 
        a.application_no.toLowerCase().includes(q) ||
        a.customer_name.toLowerCase().includes(q) ||
        (a.purpose && a.purpose.toLowerCase().includes(q))
      );
    }

    const [field, dir] = (sort || 'submitted_at:desc').split(':');
    apps.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (field === 'risk_score') {
        valA = a.risk?.risk_score ?? 0;
        valB = b.risk?.risk_score ?? 0;
      }

      if (dir === 'asc') {
        return valA > valB ? 1 : -1;
      }
      return valA < valB ? 1 : -1;
    });

    const total = apps.length;
    const startIndex = (page - 1) * page_size;
    const paginated = apps.slice(startIndex, startIndex + page_size);

    const items = paginated.map(a => ({
      id: a.id,
      application_no: a.application_no,
      customer_name: a.customer_name,
      loan_amount: a.loan_amount,
      tenure_months: a.tenure_months,
      purpose: a.purpose,
      status: a.status,
      risk_score: a.risk?.risk_score ?? 0,
      risk_label: a.risk?.risk_label ?? 'Normal',
      submitted_at: a.submitted_at
    }));

    const allApps = this.getApplications();
    const metrics = {
      total: allApps.length,
      submitted: allApps.filter(a => a.status === 'submitted').length,
      under_review: allApps.filter(a => a.status === 'under_review').length,
      risky: allApps.filter(a => a.risk?.risk_label === 'Risky').length,
      approved: allApps.filter(a => a.status === 'approved').length,
      rejected: allApps.filter(a => a.status === 'rejected').length,
      more_info: allApps.filter(a => a.status === 'more_info').length,
    };

    return {
      items,
      page,
      page_size,
      total,
      metrics
    };
  }

  getBankerApplicationDetail(id) {
    const apps = this.getApplications();
    const app = apps.find(a => a.id === id || a.application_no === id);

    if (!app) {
      throw new Error(`Application with ID ${id} not found.`);
    }

    if (app.status === 'submitted') {
      app.status = 'under_review';
      this.saveApplications(apps);
    }

    return {
      application: {
        id: app.id,
        application_no: app.application_no,
        status: app.status,
        loan_amount: app.loan_amount,
        tenure_months: app.tenure_months,
        purpose: app.purpose,
        declared_income: app.declared_income,
        monthly_installment: app.monthly_installment,
        interest_rate_used: app.interest_rate_used,
        submitted_at: app.submitted_at
      },
      customer: {
        name: app.customer_name,
        dob: app.customer_details?.dob,
        age_years: app.customer_details?.age_years,
        mobile: app.customer_details?.mobile,
        marital_status: app.customer_details?.marital_status,
        education: app.customer_details?.education,
        family_size: app.customer_details?.family_size,
        residence_type: app.customer_details?.residence_type,
        occupation: app.customer_details?.occupation,
        income_type: app.customer_details?.income_type,
        annual_income: app.customer_details?.annual_income,
        employed_years: app.customer_details?.employed_years,
        owns_property: app.customer_details?.owns_property
      },
      risk: {
        risk_score: app.risk?.risk_score,
        risk_label: app.risk?.risk_label,
        threshold_used: app.risk?.threshold_used || 0.15,
        recommendation: app.risk?.recommendation,
        top_factors: app.risk?.top_factors || []
      },
      features: app.features || {},
      display_only: app.display_only || {},
      decision: app.decision || {
        decision: null,
        remarks: null,
        decided_by: null,
        decided_at: null
      }
    };
  }

  submitBankerDecision(id, { decision, remarks }) {
    if (!['approved', 'rejected', 'more_info'].includes(decision)) {
      throw new Error('Invalid decision. Must be approved, rejected, or more_info.');
    }

    if ((decision === 'rejected' || decision === 'more_info') && (!remarks || !remarks.trim())) {
      throw new Error('Remarks are required for rejected or more_info decisions.');
    }

    const apps = this.getApplications();
    const appIndex = apps.findIndex(a => a.id === id || a.application_no === id);

    if (appIndex === -1) {
      throw new Error(`Application with ID ${id} not found.`);
    }

    const bankerSession = this.getBankerSession();
    const decidedBy = bankerSession?.banker?.name || 'Bank Credit Officer';
    const decidedAt = new Date().toISOString();

    apps[appIndex].status = decision;
    apps[appIndex].decision = {
      decision,
      remarks: remarks ? remarks.trim() : '',
      decided_by: decidedBy,
      decided_at: decidedAt
    };

    this.saveApplications(apps);

    return {
      status: decision,
      decision,
      remarks: remarks ? remarks.trim() : '',
      decided_by: decidedBy,
      decided_at: decidedAt
    };
  }

  resetDemoData() {
    localStorage.setItem(APPS_STORAGE_KEY, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(INITIAL_CUSTOMERS));
    return true;
  }
}

export const mockStore = new MockStore();
