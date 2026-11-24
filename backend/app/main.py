from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.db import get_supabase_client

app = FastAPI(
    title="Loan Application API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "env": settings.app_env,
        "risk_threshold": settings.risk_threshold,
    }


@app.get("/health/db")
def db_health_check():
    supabase = get_supabase_client()
    # Lightweight read check against seeded table
    res = supabase.table("customers").select("id", count="exact").limit(1).execute()
    return {
        "status": "connected",
        "customers_count": res.count,
    }


# Routers to wire in as you build Steps 3-5:
# from app.routers import auth, customer, applications, banker
# app.include_router(auth.router)
# app.include_router(customer.router)
# app.include_router(applications.router)
# app.include_router(banker.router)