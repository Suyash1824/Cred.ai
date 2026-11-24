# TASK: Build the FastAPI backend for a Loan Application System

You are helping me build the backend of a college project. Read all attached files before writing any code. Where documents conflict, data_model.md is the source of truth for the data layer and the model input; it overrides any older schema in the PRD.

## Attached files
- PRD: product requirements
- API doc: endpoint contract
- data_model.md: 8-table schema, the 21-feature model input spec (exact order), allowed category values, customer_features view, seed rules
- tree.joblib: a dict with X_train, X_test, y_train, y_test, encoder (sklearn OrdinalEncoder), medians. It is NOT the model.
- <xgb_model file name>: the trained XGBoost model

## What the system does
Loan application software for existing bank customers, with two sides:
- Customer side: verify identity, confirm on-file details (read-only), enter only the new loan details.
- Banker side: view the application queue, see the ML risk result with top factors, and make the final decision. The model only recommends; a human decides.

## Stack
- Backend: FastAPI (Python)
- Database: Supabase (Postgres) and Supabase Auth
- Frontend: React (not part of this task)
- Model: XGBoost, with SHAP for the top factors

## Scope of this task
- Build the backend only.
- Do NOT create Supabase tables; I will create them separately from data_model.md. Use the table and column names exactly as written there.
- Do not redesign the data layer. There are 8 tables and no separate risk_assessments, decisions or bankers tables. Bankers are Supabase Auth users with role = 'banker' in user metadata.

## Model input rules (verified against training data)
- 21 features in the exact order listed in data_model.md section 2.
- credit_to_income = credit_amount / annual_income
- installment_to_income = monthly_installment / annual_income (ANNUAL income, not monthly)
- monthly_installment = standard EMI formula from credit_amount, tenure_months and the fixed interest rate
- Categorical columns are ordinal-encoded with the encoder from tree.joblib, in this column order: income_type, education, marital_status, residence_type, occupation. Unknown value -> -1.
- ext_score_N null -> fill with median (0.505994, 0.566198, 0.535276) and set ext_score_N_missing = 1.
- age_years = (today - dob) in years; employed_years = (today - employment start_date) in years, 0 if start_date is null.
- Gender is NOT a model input.
- Load the model, encoder and medians once at startup.
- Store the exact 21-feature row used in loan_applications.features (jsonb).

## Config values (put in config.py / .env, do not hardcode)
- INTEREST_RATE (annual %): <e.g. 10.5>
- RISK_THRESHOLD: <value, or "placeholder 0.15, tune on the test set">. Only about 8% of training rows are risky, so 0.5 is probably too high.
- SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY: read from .env. The service key must stay backend-only.
- OTP: mock for the demo (fixed or printed code), no real SMS.

## Library versions (pin in requirements.txt)
<paste: pip freeze | grep -E "xgboost|scikit-learn|pandas|numpy">
Note: the encoder was pickled with scikit-learn 1.6.1; pin that version or loading may break or give different results.

## Customer flow
1. POST /auth/verify: account number + registered mobile + DOB, then send OTP. On mismatch return a generic error that does not reveal which field was wrong.
2. POST /auth/otp: validate OTP, return a session token.
3. GET /customer/profile: on-file details (read-only), including the display-only data (accounts, existing_loans, credit_cards).
4. POST /applications: input is credit_amount, tenure_months, purpose, optional declared_income, consent (must be true). The backend computes the EMI and ratios, builds the 21-feature row (customer-side values from the customer_features view or equivalent joins), runs the model, computes SHAP top factors, and stores everything in loan_applications. It returns the application_no (format LN-YYYY-NNNNNN) and status "submitted".
5. GET /applications/{application_no}: status only.
- Customers must never receive risk_score, risk_label or top_factors.

## Banker flow
- POST /banker/login
- GET /banker/applications: queue, filterable by status or risk_label
- GET /banker/applications/{id}: full detail with features, score, top factors and the customer's display-only data
- POST /banker/applications/{id}/decision: approve / reject / more_info, with remarks; sets decided_by and decided_at
- Banker routes require role = 'banker'.
- Status values: submitted, under_review, approved, rejected, more_info.

## Suggested structure
backend/
  app/
    main.py            # app, CORS, routers
    config.py          # settings from env
    db.py              # Supabase client
    schemas.py         # Pydantic models
    routers/           # auth.py, customer.py, applications.py, banker.py
    services/
      features.py      # builds the 21-feature row, EMI and ratio maths
      model.py         # loads model once, predict + SHAP
      otp.py           # mock OTP
  models/              # model file, encoder, medians
  .env.example
  requirements.txt

## Build order (stop after each step so I can test)
1. Project setup, config, Supabase connection
2. features.py and model.py, with a test script that scores a sample row from tree.joblib and checks the output
3. POST /applications end to end
4. Customer verification and OTP
5. Banker endpoints and the decision flow
6. A seed script that builds 30 to 50 demo customers from tree.joblib per data_model.md section 5

## Rules
- The feature row must match training exactly (order, units, formulas). A mismatch gives silently wrong predictions, so add a unit test that checks the order and the two ratio formulas.
- Never expose the service key to the frontend and never log it.
- Ask me before changing anything in data_model.md.
- Keep code simple and commented where the logic is not obvious; this is a demo.

Start by confirming you have read all the files, list any conflicts you found between the PRD, API doc and data_model.md, then begin step 1.