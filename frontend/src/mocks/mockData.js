// Initial static mock data representing customer profiles and applications
export const INITIAL_CUSTOMERS = [
  {
    account_number: '100234567890',
    mobile: '9876543210',
    dob: '1990-05-15',
    profile: {
      identity: {
        full_name: 'Aditya Sharma',
        dob: '1990-05-15',
        mobile: 'XXXXXX3210',
        account_number: 'XXXXXXXX7890',
      },
      personal: {
        marital_status: 'Married',
        education: 'Higher education',
        family_size: 3,
        residence_type: 'House / apartment',
        owns_property: 'Yes',
      },
      employment: {
        occupation: 'Software Engineering Lead',
        income_type: 'Commercial associate',
        employer_name: 'Tata Consultancy Services',
        employment_start_date: '2016-08-01',
        employed_years: 9.5,
      },
      financial: {
        annual_income: 1200000, // 12 LPA
      },
      display_only: {
        accounts: [
          { type: 'Savings Account', account_no: 'XXXXXXXX7890', balance: 425000, branch: 'Indiranagar, Bangalore' },
          { type: 'Corporate Salary Account', account_no: 'XXXXXXXX1122', balance: 180000, branch: 'Indiranagar, Bangalore' }
        ],
        existing_loans: [
          { type: 'Auto Loan', loan_no: 'AL-2022-8812', principal: 600000, outstanding: 120000, monthly_emi: 16500, remaining_tenure: 12, status: 'Active (Regular)' }
        ],
        credit_cards: [
          { card_type: 'Platinum Rewards Visa', card_no: 'XXXX-XXXX-XXXX-4512', credit_limit: 300000, utilized_amount: 42000, payment_status: 'No Overdue' }
        ],
        credit_profiles: {
          bureau_score: 792,
          bureau_provider: 'CIBIL',
          enquiries_last_year: 1,
          total_credit_lines: 4,
          delinquencies_24m: 0
        }
      }
    }
  },
  {
    account_number: '200987654321',
    mobile: '9123456789',
    dob: '1985-11-20',
    profile: {
      identity: {
        full_name: 'Priya Patel',
        dob: '1985-11-20',
        mobile: 'XXXXXX6789',
        account_number: 'XXXXXXXX4321',
      },
      personal: {
        marital_status: 'Single',
        education: 'Secondary / secondary special',
        family_size: 1,
        residence_type: 'Rented apartment',
        owns_property: 'No',
      },
      employment: {
        occupation: 'Sales Executive',
        income_type: 'Working',
        employer_name: 'Nexus Retail Pvt Ltd',
        employment_start_date: '2023-04-15',
        employed_years: 1.5,
      },
      financial: {
        annual_income: 650000,
      },
      display_only: {
        accounts: [
          { type: 'Savings Account', account_no: 'XXXXXXXX4321', balance: 85000, branch: 'Koramangala, Bangalore' }
        ],
        existing_loans: [
          { type: 'Personal Loan', loan_no: 'PL-2024-3401', principal: 300000, outstanding: 220000, monthly_emi: 14200, remaining_tenure: 18, status: 'Active' }
        ],
        credit_cards: [
          { card_type: 'Classic MasterCard', card_no: 'XXXX-XXXX-XXXX-9901', credit_limit: 100000, utilized_amount: 88000, payment_status: 'Frequent high utilization' }
        ],
        credit_profiles: {
          bureau_score: 645,
          bureau_provider: 'CIBIL',
          enquiries_last_year: 6,
          total_credit_lines: 3,
          delinquencies_24m: 1
        }
      }
    }
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'app-001',
    application_no: 'LN-2026-000041',
    customer_id: 'cust-100234567890',
    customer_name: 'Aditya Sharma',
    loan_amount: 500000,
    tenure_months: 36,
    purpose: 'Home Renovation',
    declared_income: 1200000,
    monthly_installment: 16250,
    interest_rate_used: 10.5,
    status: 'submitted', // submitted | under_review | approved | rejected | more_info
    submitted_at: '2026-11-24T09:15:00Z',
    customer_details: {
      dob: '1990-05-15',
      age_years: 36,
      mobile: '+91 9876543210',
      account_number: '100234567890',
      marital_status: 'Married',
      education: 'Higher education',
      family_size: 3,
      residence_type: 'House / apartment',
      occupation: 'Software Engineering Lead',
      income_type: 'Commercial associate',
      annual_income: 1200000,
      employed_years: 9.5,
      owns_property: 'Yes'
    },
    risk: {
      risk_score: 0.082,
      risk_label: 'Normal',
      threshold_used: 0.15,
      recommendation: 'Likely to Approve - Strong repayment history, stable employment duration, and solid debt-to-income ratio.',
      top_factors: [
        {
          feature: 'ext_score_2',
          label: 'Credit Bureau External Score 2',
          value: '0.684 (High Tier)',
          shap_value: -0.24,
          direction: 'decreases_risk'
        },
        {
          feature: 'annual_income',
          label: 'Annual Income',
          value: '₹12,00,000 / year',
          shap_value: -0.19,
          direction: 'decreases_risk'
        },
        {
          feature: 'employed_years',
          label: 'Employment Stability',
          value: '9.5 years with TCS',
          shap_value: -0.15,
          direction: 'decreases_risk'
        },
        {
          feature: 'credit_to_income',
          label: 'Credit to Annual Income',
          value: '0.42 (Conservative)',
          shap_value: 0.06,
          direction: 'increases_risk'
        },
        {
          feature: 'enquiries_last_year',
          label: 'Inquiries in Past 12 Months',
          value: '1 recent inquiry',
          shap_value: -0.04,
          direction: 'decreases_risk'
        }
      ]
    },
    features: {
      owns_property: 1,
      annual_income: 1200000,
      credit_amount: 500000,
      monthly_installment: 16250,
      income_type: 'Commercial associate',
      education: 'Higher education',
      marital_status: 'Married',
      residence_type: 'House / apartment',
      occupation: 'IT / Software',
      family_size: 3,
      ext_score_1: 0.651,
      ext_score_2: 0.684,
      ext_score_3: 0.710,
      enquiries_last_year: 1,
      age_years: 36,
      employed_years: 9.5,
      credit_to_income: 0.4167,
      installment_to_income: 0.0135,
      ext_score_1_missing: 0,
      ext_score_2_missing: 0,
      ext_score_3_missing: 0
    },
    display_only: {
      accounts: [
        { type: 'Savings Account', account_no: 'XXXXXXXX7890', balance: 425000, branch: 'Indiranagar, Bangalore' },
        { type: 'Corporate Salary Account', account_no: 'XXXXXXXX1122', balance: 180000, branch: 'Indiranagar, Bangalore' }
      ],
      existing_loans: [
        { type: 'Auto Loan', loan_no: 'AL-2022-8812', principal: 600000, outstanding: 120000, monthly_emi: 16500, remaining_tenure: 12, status: 'Active (Regular)' }
      ],
      credit_cards: [
        { card_type: 'Platinum Rewards Visa', card_no: 'XXXX-XXXX-XXXX-4512', credit_limit: 300000, utilized_amount: 42000, payment_status: 'No Overdue' }
      ]
    },
    decision: {
      decision: null,
      remarks: null,
      decided_by: null,
      decided_at: null
    }
  },
  {
    id: 'app-002',
    application_no: 'LN-2026-000039',
    customer_id: 'cust-200987654321',
    customer_name: 'Priya Patel',
    loan_amount: 1500000,
    tenure_months: 48,
    purpose: 'Personal & Medical',
    declared_income: 650000,
    monthly_installment: 38400,
    interest_rate_used: 10.5,
    status: 'under_review',
    submitted_at: '2026-11-24T06:30:00Z',
    customer_details: {
      dob: '1985-11-20',
      age_years: 41,
      mobile: '+91 9123456789',
      account_number: '200987654321',
      marital_status: 'Single',
      education: 'Secondary / secondary special',
      family_size: 1,
      residence_type: 'Rented apartment',
      occupation: 'Sales Executive',
      income_type: 'Working',
      annual_income: 650000,
      employed_years: 1.5,
      owns_property: 'No'
    },
    risk: {
      risk_score: 0.285,
      risk_label: 'Risky',
      threshold_used: 0.15,
      recommendation: 'Requires Manual Verification - Loan amount is 2.3x annual income and 6 credit inquiries were made in the past year.',
      top_factors: [
        {
          feature: 'credit_to_income',
          label: 'Credit to Annual Income Ratio',
          value: '2.31 (High Leverage)',
          shap_value: 0.31,
          direction: 'increases_risk'
        },
        {
          feature: 'enquiries_last_year',
          label: 'Inquiries in Past 12 Months',
          value: '6 recent inquiries',
          shap_value: 0.22,
          direction: 'increases_risk'
        },
        {
          feature: 'ext_score_3',
          label: 'Credit Bureau External Score 3',
          value: '0.382 (Low Tier)',
          shap_value: 0.18,
          direction: 'increases_risk'
        },
        {
          feature: 'employed_years',
          label: 'Employment Duration',
          value: '1.5 years',
          shap_value: 0.11,
          direction: 'increases_risk'
        },
        {
          feature: 'annual_income',
          label: 'Annual Income',
          value: '₹6,50,000 / year',
          shap_value: -0.08,
          direction: 'decreases_risk'
        }
      ]
    },
    features: {
      owns_property: 0,
      annual_income: 650000,
      credit_amount: 1500000,
      monthly_installment: 38400,
      income_type: 'Working',
      education: 'Secondary / secondary special',
      marital_status: 'Single',
      residence_type: 'Rented apartment',
      occupation: 'Sales',
      family_size: 1,
      ext_score_1: 0.506,
      ext_score_2: 0.442,
      ext_score_3: 0.382,
      enquiries_last_year: 6,
      age_years: 41,
      employed_years: 1.5,
      credit_to_income: 2.3077,
      installment_to_income: 0.0591,
      ext_score_1_missing: 1,
      ext_score_2_missing: 0,
      ext_score_3_missing: 0
    },
    display_only: {
      accounts: [
        { type: 'Savings Account', account_no: 'XXXXXXXX4321', balance: 85000, branch: 'Koramangala, Bangalore' }
      ],
      existing_loans: [
        { type: 'Personal Loan', loan_no: 'PL-2024-3401', principal: 300000, outstanding: 220000, monthly_emi: 14200, remaining_tenure: 18, status: 'Active' }
      ],
      credit_cards: [
        { card_type: 'Classic MasterCard', card_no: 'XXXX-XXXX-XXXX-9901', credit_limit: 100000, utilized_amount: 88000, payment_status: 'High utilization (88%)' }
      ]
    },
    decision: {
      decision: null,
      remarks: null,
      decided_by: null,
      decided_at: null
    }
  },
  {
    id: 'app-003',
    application_no: 'LN-2026-000035',
    customer_id: 'cust-300112233445',
    customer_name: 'Rahul Verma',
    loan_amount: 350000,
    tenure_months: 24,
    purpose: 'Vehicle Purchase',
    declared_income: 950000,
    monthly_installment: 16220,
    interest_rate_used: 10.5,
    status: 'approved',
    submitted_at: '2026-11-23T14:20:00Z',
    customer_details: {
      dob: '1992-03-12',
      age_years: 34,
      mobile: '+91 9811223344',
      account_number: '300112233445',
      marital_status: 'Married',
      education: 'Higher education',
      family_size: 2,
      residence_type: 'House / apartment',
      occupation: 'Accountant',
      income_type: 'Commercial associate',
      annual_income: 950000,
      employed_years: 6.0,
      owns_property: 'Yes'
    },
    risk: {
      risk_score: 0.054,
      risk_label: 'Normal',
      threshold_used: 0.15,
      recommendation: 'Likely to Approve - Very low leverage ratio, no past defaults.',
      top_factors: [
        {
          feature: 'credit_to_income',
          label: 'Credit to Annual Income',
          value: '0.36 (Very Low)',
          shap_value: -0.28,
          direction: 'decreases_risk'
        },
        {
          feature: 'ext_score_2',
          label: 'Credit Bureau External Score 2',
          value: '0.725 (Prime Tier)',
          shap_value: -0.22,
          direction: 'decreases_risk'
        },
        {
          feature: 'enquiries_last_year',
          label: 'Inquiries in Past 12 Months',
          value: '0 inquiries',
          shap_value: -0.12,
          direction: 'decreases_risk'
        }
      ]
    },
    features: {
      owns_property: 1,
      annual_income: 950000,
      credit_amount: 350000,
      monthly_installment: 16220,
      income_type: 'Commercial associate',
      education: 'Higher education',
      marital_status: 'Married',
      residence_type: 'House / apartment',
      occupation: 'Accountant',
      family_size: 2,
      ext_score_1: 0.690,
      ext_score_2: 0.725,
      ext_score_3: 0.680,
      enquiries_last_year: 0,
      age_years: 34,
      employed_years: 6.0,
      credit_to_income: 0.3684,
      installment_to_income: 0.0171,
      ext_score_1_missing: 0,
      ext_score_2_missing: 0,
      ext_score_3_missing: 0
    },
    display_only: {
      accounts: [{ type: 'Salary Account', account_no: 'XXXXXXXX3445', balance: 290000, branch: 'HSR Layout, Bangalore' }],
      existing_loans: [],
      credit_cards: [{ card_type: 'Gold Visa', card_no: 'XXXX-XXXX-XXXX-1122', credit_limit: 150000, utilized_amount: 12000, payment_status: 'Regular' }]
    },
    decision: {
      decision: 'approved',
      remarks: 'Low risk profile, low credit utilization, approved without extra collateral.',
      decided_by: 'Officer Rajesh Iyer',
      decided_at: '2026-11-23T16:00:00Z'
    }
  },
  {
    id: 'app-004',
    application_no: 'LN-2026-000032',
    customer_id: 'cust-400556677889',
    customer_name: 'Vikram Singh',
    loan_amount: 3200000,
    tenure_months: 60,
    purpose: 'Business Expansion',
    declared_income: 1400000,
    monthly_installment: 68800,
    interest_rate_used: 10.5,
    status: 'more_info',
    submitted_at: '2026-11-22T11:45:00Z',
    customer_details: {
      dob: '1979-08-14',
      age_years: 47,
      mobile: '+91 9988776655',
      account_number: '400556677889',
      marital_status: 'Married',
      education: 'Secondary / secondary special',
      family_size: 4,
      residence_type: 'House / apartment',
      occupation: 'Business Owner',
      income_type: 'Commercial associate',
      annual_income: 1400000,
      employed_years: 12.0,
      owns_property: 'Yes'
    },
    risk: {
      risk_score: 0.380,
      risk_label: 'Risky',
      threshold_used: 0.15,
      recommendation: 'Requires Manual Verification - High ticket size loan requires additional business collateral verification and recent GST filings.',
      top_factors: [
        {
          feature: 'credit_amount',
          label: 'High Ticket Loan Amount',
          value: '₹32,00,000',
          shap_value: 0.28,
          direction: 'increases_risk'
        },
        {
          feature: 'installment_to_income',
          label: 'Installment to Income Ratio',
          value: '0.049 (Elevated debt burden)',
          shap_value: 0.21,
          direction: 'increases_risk'
        },
        {
          feature: 'ext_score_1',
          label: 'Credit Bureau External Score 1',
          value: '0.410 (Moderate)',
          shap_value: 0.14,
          direction: 'increases_risk'
        },
        {
          feature: 'employed_years',
          label: 'Business Vintage',
          value: '12 years established',
          shap_value: -0.18,
          direction: 'decreases_risk'
        }
      ]
    },
    features: {
      owns_property: 1,
      annual_income: 1400000,
      credit_amount: 3200000,
      monthly_installment: 68800,
      income_type: 'Commercial associate',
      education: 'Secondary / secondary special',
      marital_status: 'Married',
      residence_type: 'House / apartment',
      occupation: 'Business Owner',
      family_size: 4,
      ext_score_1: 0.410,
      ext_score_2: 0.520,
      ext_score_3: 0.490,
      enquiries_last_year: 3,
      age_years: 47,
      employed_years: 12.0,
      credit_to_income: 2.2857,
      installment_to_income: 0.0491,
      ext_score_1_missing: 0,
      ext_score_2_missing: 0,
      ext_score_3_missing: 0
    },
    display_only: {
      accounts: [{ type: 'Current Account', account_no: 'XXXXXXXX7889', balance: 540000, branch: 'Whitefield, Bangalore' }],
      existing_loans: [{ type: 'Machinery Loan', loan_no: 'ML-2023-1102', principal: 1200000, outstanding: 450000, monthly_emi: 28000, remaining_tenure: 16, status: 'Active' }],
      credit_cards: [{ card_type: 'Business Master Card', card_no: 'XXXX-XXXX-XXXX-6677', credit_limit: 500000, utilized_amount: 140000, payment_status: 'Regular' }]
    },
    decision: {
      decision: 'more_info',
      remarks: 'High leverage requested. Need 2 years audited ITR and GST-3B returns before sanctioning ₹32L.',
      decided_by: 'Officer Anita Sen',
      decided_at: '2026-11-23T11:00:00Z'
    }
  },
  {
    id: 'app-005',
    application_no: 'LN-2026-000028',
    customer_id: 'cust-500998877665',
    customer_name: 'Meera Nair',
    loan_amount: 900000,
    tenure_months: 36,
    purpose: 'Higher Education',
    declared_income: 800000,
    monthly_installment: 29250,
    interest_rate_used: 10.5,
    status: 'submitted',
    submitted_at: '2026-11-21T16:00:00Z',
    customer_details: {
      dob: '1995-12-04',
      age_years: 31,
      mobile: '+91 9765432109',
      account_number: '500998877665',
      marital_status: 'Single',
      education: 'Higher education',
      family_size: 1,
      residence_type: 'House / apartment',
      occupation: 'Research Associate',
      income_type: 'State servant',
      annual_income: 800000,
      employed_years: 4.5,
      owns_property: 'No'
    },
    risk: {
      risk_score: 0.120,
      risk_label: 'Normal',
      threshold_used: 0.15,
      recommendation: 'Likely to Approve - State servant income type, stable credit profile.',
      top_factors: [
        {
          feature: 'income_type',
          label: 'Employment Source',
          value: 'State servant (Secure)',
          shap_value: -0.16,
          direction: 'decreases_risk'
        },
        {
          feature: 'ext_score_2',
          label: 'Credit Bureau Score 2',
          value: '0.610',
          shap_value: -0.11,
          direction: 'decreases_risk'
        },
        {
          feature: 'credit_to_income',
          label: 'Credit to Annual Income',
          value: '1.12',
          shap_value: 0.08,
          direction: 'increases_risk'
        }
      ]
    },
    features: {
      owns_property: 0,
      annual_income: 800000,
      credit_amount: 900000,
      monthly_installment: 29250,
      income_type: 'State servant',
      education: 'Higher education',
      marital_status: 'Single',
      residence_type: 'House / apartment',
      occupation: 'Research',
      family_size: 1,
      ext_score_1: 0.580,
      ext_score_2: 0.610,
      ext_score_3: 0.590,
      enquiries_last_year: 1,
      age_years: 31,
      employed_years: 4.5,
      credit_to_income: 1.125,
      installment_to_income: 0.0366,
      ext_score_1_missing: 0,
      ext_score_2_missing: 0,
      ext_score_3_missing: 0
    },
    display_only: {
      accounts: [{ type: 'Savings Account', account_no: 'XXXXXXXX7665', balance: 145000, branch: 'Jayanagar, Bangalore' }],
      existing_loans: [],
      credit_cards: [{ card_type: 'Silver Card', card_no: 'XXXX-XXXX-XXXX-3344', credit_limit: 80000, utilized_amount: 15000, payment_status: 'Regular' }]
    },
    decision: {
      decision: null,
      remarks: null,
      decided_by: null,
      decided_at: null
    }
  },
  {
    id: 'app-006',
    application_no: 'LN-2026-000021',
    customer_id: 'cust-600778899001',
    customer_name: 'Sanjay Gupta',
    loan_amount: 2500000,
    tenure_months: 24,
    purpose: 'Debt Consolidation',
    declared_income: 500000,
    monthly_installment: 115900,
    interest_rate_used: 10.5,
    status: 'rejected',
    submitted_at: '2026-11-20T10:10:00Z',
    customer_details: {
      dob: '1982-06-25',
      age_years: 44,
      mobile: '+91 9654321987',
      account_number: '600778899001',
      marital_status: 'Married',
      education: 'Secondary / secondary special',
      family_size: 5,
      residence_type: 'Rented apartment',
      occupation: 'Contractor',
      income_type: 'Working',
      annual_income: 500000,
      employed_years: 2.0,
      owns_property: 'No'
    },
    risk: {
      risk_score: 0.612,
      risk_label: 'Risky',
      threshold_used: 0.15,
      recommendation: 'High Default Risk - Monthly EMI equals 23% of entire annual income. High external bureau risk score.',
      top_factors: [
        {
          feature: 'credit_to_income',
          label: 'Credit to Annual Income',
          value: '5.0 (Extreme Debt)',
          shap_value: 0.45,
          direction: 'increases_risk'
        },
        {
          feature: 'installment_to_income',
          label: 'Installment to Income',
          value: '0.231 (Unsustainable)',
          shap_value: 0.38,
          direction: 'increases_risk'
        },
        {
          feature: 'ext_score_2',
          label: 'Credit Bureau Score 2',
          value: '0.291 (Default Risk)',
          shap_value: 0.29,
          direction: 'increases_risk'
        },
        {
          feature: 'enquiries_last_year',
          label: 'Inquiries in Past 12 Months',
          value: '8 inquiries',
          shap_value: 0.19,
          direction: 'increases_risk'
        }
      ]
    },
    features: {
      owns_property: 0,
      annual_income: 500000,
      credit_amount: 2500000,
      monthly_installment: 115900,
      income_type: 'Working',
      education: 'Secondary / secondary special',
      marital_status: 'Married',
      residence_type: 'Rented apartment',
      occupation: 'Contractor',
      family_size: 5,
      ext_score_1: 0.310,
      ext_score_2: 0.291,
      ext_score_3: 0.280,
      enquiries_last_year: 8,
      age_years: 44,
      employed_years: 2.0,
      credit_to_income: 5.0,
      installment_to_income: 0.2318,
      ext_score_1_missing: 0,
      ext_score_2_missing: 0,
      ext_score_3_missing: 0
    },
    display_only: {
      accounts: [{ type: 'Savings Account', account_no: 'XXXXXXXX9001', balance: 22000, branch: 'MG Road, Bangalore' }],
      existing_loans: [{ type: 'Personal Loan', loan_no: 'PL-2023-7744', principal: 500000, outstanding: 410000, monthly_emi: 21000, remaining_tenure: 22, status: 'Overdue 30d' }],
      credit_cards: [{ card_type: 'Credit Card', card_no: 'XXXX-XXXX-XXXX-9900', credit_limit: 50000, utilized_amount: 49500, payment_status: 'Overdue' }]
    },
    decision: {
      decision: 'rejected',
      remarks: 'Debt-to-income ratio exceeds acceptable lending limits. High recent credit inquiries and existing loan delinquency.',
      decided_by: 'Officer Rajesh Iyer',
      decided_at: '2026-11-20T14:30:00Z'
    }
  }
];

