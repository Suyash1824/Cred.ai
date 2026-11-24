# Cred.ai Frontend: Loan Application System

A complete React frontend for the **Cred.ai** Loan Application & Credit Decisioning platform, built for the college mini project demo.

---

## 🌟 Architecture & Features

- **Two Independent Portals**:
  - **Customer Portal (`/customer/*`)**: Clean, trust-inspiring banking interface with step-by-step identity verification, OTP challenge, read-only on-file record confirmation, interactive loan configuration with live EMI calculation, and application tracking.
  - **Banker Portal (`/banker/*`)**: Analytical underwriting terminal with dark-mode aesthetic, live pipeline metrics, multi-criteria filtering, calibrated risk gauge (0.15 threshold), TreeSHAP feature explanations, 21-feature input inspector, and final human decision recording.
- **Strict Customer Privacy**:
  - Model risk scores, threshold labels, and SHAP factors are **never** rendered on the customer side.
- **Single API Layer (`src/api/`)**:
  - Components **never** call `fetch` or use mock data directly.
  - Toggle between persistent in-memory mock store and real FastAPI backend via `VITE_USE_MOCKS=false`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Demo Access Credentials

| Role | Route | Identifier / Email | Credential / Code |
| :--- | :--- | :--- | :--- |
| **Customer** | `/customer/verify` | A/C: `100234567890`<br>Mobile: `9876543210`<br>DOB: `1990-05-15` | Any 6-digit OTP (e.g. `123456`) |
| **Alternative Customer** | `/customer/verify` | A/C: `200987654321`<br>Mobile: `9123456789`<br>DOB: `1985-11-20` | Any 6-digit OTP (e.g. `123456`) |
| **Banker (Lead Underwriter)** | `/banker/login` | `banker@cred.ai` | `password123` |
| **Banker (Risk Officer)** | `/banker/login` | `anita@cred.ai` | `password123` |

*(One-click demo prefill buttons are provided on both login screens).*

---

## 🔌 API Layer Reference (`src/api/`)

To connect to your real FastAPI backend, create a `.env` file from `.env.example`:
```env
VITE_USE_MOCKS=false
VITE_API_BASE_URL=http://localhost:8000
```

Every data operation passes through functions in `src/api/`. Below is the complete catalog of API functions and their corresponding FastAPI backend endpoints:

### Authentication & Sessions (`src/api/auth.js`)

| Exported Function | Endpoint | Method | Request Payload | Expected Response |
| :--- | :--- | :--- | :--- | :--- |
| `verifyCustomerIdentity({ account_number, mobile, dob })` | `/auth/verify` | `POST` | `{ account_number, mobile, dob }` | `{ challenge_id, expires_in, message }` |
| `verifyCustomerOtp({ challenge_id, otp })` | `/auth/otp` | `POST` | `{ challenge_id, otp }` | `{ access_token, token_type, expires_in, customer_name }` |
| `customerLogout()` | Local | - | Clears token & active session | `void` |
| `bankerLogin({ email, password })` | `/banker/login` | `POST` | `{ email, password }` | `{ access_token, token_type, expires_in, banker: { id, email, name, role } }` |
| `bankerLogout()` | Local | - | Clears banker session | `void` |

---

### Customer Endpoints (`src/api/customer.js`)

> **Note**: Customer calls automatically attach `Authorization: Bearer <customer_token>` in the header.

| Exported Function | Endpoint | Method | Request Payload | Expected Response |
| :--- | :--- | :--- | :--- | :--- |
| `getCustomerProfile()` | `/customer/profile` | `GET` | *None* | `{ identity: {...}, personal: {...}, employment: {...}, financial: {...} }` |
| `submitLoanApplication({ loan_amount, tenure_months, purpose, declared_income, consent })` | `/applications` | `POST` | `{ loan_amount, tenure_months, purpose, declared_income, consent }` | `{ application_no, id, status, submitted_at, monthly_installment }` |
| `getApplicationStatus(applicationNo)` | `/applications/{application_no}` | `GET` | *URL Param* | `{ application_no, status, loan_amount, tenure_months, purpose, submitted_at, monthly_installment }` |

---

### Banker Endpoints (`src/api/banker.js`)

> **Note**: Banker calls automatically attach `Authorization: Bearer <banker_token>` in the header.

| Exported Function | Endpoint | Method | Query / Payload | Expected Response |
| :--- | :--- | :--- | :--- | :--- |
| `getBankerApplications(params)` | `/banker/applications` | `GET` | Query: `status, risk_label, page, page_size, sort, search` | `{ items: [{ id, application_no, customer_name, loan_amount, tenure_months, purpose, status, risk_score, risk_label, submitted_at }], total, page, page_size, metrics: {...} }` |
| `getBankerApplicationDetail(id)` | `/banker/applications/{id}` | `GET` | *URL Param* | `{ application: {...}, customer: {...}, risk: { risk_score, risk_label, threshold_used, recommendation, top_factors: [...] }, features: {...}, display_only: {...}, decision: {...} }` |
| `submitBankerDecision(id, { decision, remarks })` | `/banker/applications/{id}/decision` | `POST` | `{ decision: 'approved'\|'rejected'\|'more_info', remarks }` | `{ status, decision, remarks, decided_by, decided_at }` |
| `resetDemoStore()` | Local | - | Resets mock queue in demo mode | `boolean` |

---

## 📁 Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── api/                     # Modular API layer (single access point)
│   │   ├── auth.js              # Identity, OTP, & Banker Auth
│   │   ├── banker.js            # Queue, Detail, Decision calls
│   │   ├── client.js            # Fetch wrapper with Bearer tokens
│   │   ├── config.js            # USE_MOCKS switch and BASE_URL
│   │   ├── customer.js          # Profile, Apply, Status calls
│   │   └── index.js             # Unified API export
│   ├── components/              # Reusable UI components
│   │   ├── Badges.jsx           # StatusBadge and RiskBadge
│   │   ├── FeedbackStates.jsx   # LoadingState, EmptyState, ErrorAlert, Card
│   │   ├── FormControls.jsx     # Button, Input, Select
│   │   ├── Modal.jsx            # Decision confirmation dialog
│   │   ├── ProtectedRoute.jsx   # Route guards for customer and banker
│   │   ├── RiskGauge.jsx        # Risk score speedometer & threshold meter
│   │   └── ShapFactorList.jsx   # Visual TreeSHAP factor impact bars
│   ├── context/                 # State & session providers
│   │   ├── BankerAuthContext.jsx
│   │   └── CustomerAuthContext.jsx
│   ├── layouts/                 # Group layouts
│   │   ├── BankerLayout.jsx     # Dark analytical terminal layout
│   │   └── CustomerLayout.jsx   # Trustworthy banking flow layout
│   ├── mocks/                   # Persistent demo database & initial seed
│   │   ├── mockData.js          # Seed applications with SHAP explanations
│   │   └── mockStore.js         # LocalStorage backed state engine
│   ├── pages/
│   │   ├── banker/
│   │   │   ├── BankerDetailPage.jsx
│   │   │   ├── BankerLoginPage.jsx
│   │   │   └── BankerQueuePage.jsx
│   │   ├── customer/
│   │   │   ├── ApplyPage.jsx
│   │   │   ├── OtpPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── StatusPage.jsx
│   │   │   └── VerifyPage.jsx
│   │   └── LandingPage.jsx      # Dual-entry landing page
│   ├── App.jsx                  # React Router configuration
│   ├── index.css                # Tailwind CSS v4 directives
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

