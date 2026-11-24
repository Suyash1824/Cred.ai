from functools import lru_cache
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent  # backend/


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: str = "development"
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    supabase_url: str
    supabase_anon_key: str
    supabase_service_role_key: str

    annual_interest_rate: float = 0.105  # e.g. 0.105 = 10.5% p.a.
    risk_threshold: float = 0.50         # update from validation curve
    otp_expiry_seconds: int = 300

    models_dir: Path = BASE_DIR / "models"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()