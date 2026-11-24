# Cred.ai

Cred.ai is a loan application and risk-review web app built on top of an existing credit card verification pipeline, pairing a FastAPI + XGBoost/SHAP backend and Supabase (Postgres + Auth) with a React frontend. Existing bank customers verify their identity, confirm on-file details, and submit new loan requests without seeing model scores, while bank staff sign in with a `banker` role to inspect applications, view risk scores and top SHAP factors, and record final decisions.

## Project Structure

```text
Cred.ai/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── db.py
│   │   ├── schemas.py
│   │   ├── routers/
│   │   └── services/
│   ├── models/          # tree.joblib + trained XGBoost model
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── src/
    ├── package.json
    └── .env.example
```

## Backend Setup (FastAPI)

1. Navigate to `backend/` and create a virtual environment:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
python -m pip install --upgrade pip wheel setuptools
```

2. Install dependencies (`scikit-learn==1.6.1` is pinned to match `tree.joblib`):

```bash
pip install -r requirements.txt
```

3. Create your environment file and fill in your Supabase credentials and model settings:

```bash
cp .env.example .env
```

4. Place `tree.joblib` and your trained XGBoost model file inside `backend/models/`, then start the API server:

```bash
uvicorn app.main:app --reload
```

The backend runs at `http://localhost:8000` (health check at `GET /health`).

## Frontend Setup (React + Vite)

1. Open a new terminal, navigate to `frontend/`, and install packages:

```bash
cd frontend
npm install
```

2. Create `frontend/.env.local` pointing to the FastAPI server:

```bash
cp .env.example .env.local
```

Make sure `frontend/.env.local` contains:

```env
VITE_API_BASE_URL=http://localhost:8000
```

3. Start the React dev server:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`.