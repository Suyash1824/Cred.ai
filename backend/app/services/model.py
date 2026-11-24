"""Loads the XGBoost model, encoder, medians and SHAP explainer once, and scores a feature row."""
from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Mapping

import joblib
import pandas as pd
import shap
from xgboost import XGBClassifier

from app.config import get_settings
from app.services.features import CATEGORICAL_COLUMNS, FEATURE_ORDER

# Human-readable names for the banker screen.
FEATURE_LABELS: dict[str, str] = {
    "owns_property": "Owns property",
    "annual_income": "Annual income",
    "credit_amount": "Loan amount",
    "monthly_installment": "Monthly installment (EMI)",
    "income_type": "Income type",
    "education": "Education",
    "marital_status": "Marital status",
    "residence_type": "Residence type",
    "occupation": "Occupation",
    "family_size": "Family size",
    "ext_score_1": "External score 1",
    "ext_score_2": "External score 2",
    "ext_score_3": "External score 3",
    "enquiries_last_year": "Credit enquiries (last year)",
    "age_years": "Age (years)",
    "employed_years": "Years employed",
    "credit_to_income": "Loan amount / annual income",
    "installment_to_income": "EMI / annual income",
    "ext_score_1_missing": "External score 1 missing",
    "ext_score_2_missing": "External score 2 missing",
    "ext_score_3_missing": "External score 3 missing",
}


@dataclass
class RiskResult:
    risk_score: float          # model probability of Risky, 0 to 1
    risk_label: str            # "Normal" or "Risky"
    threshold_used: float
    top_factors: list[dict]    # [{feature, label, value, impact, direction}]


class RiskModel:
    def __init__(self, model, encoder, medians: Mapping[str, float], threshold: float, top_n: int):
        booster_names = list(model.get_booster().feature_names or [])
        if booster_names != FEATURE_ORDER:
            # The most dangerous failure here is silent, so refuse to start instead.
            raise RuntimeError(
                "Model feature order does not match FEATURE_ORDER.\n"
                f"model:  {booster_names}\nexpect: {FEATURE_ORDER}"
            )
        if list(encoder.feature_names_in_) != CATEGORICAL_COLUMNS:
            raise RuntimeError(f"Encoder columns {list(encoder.feature_names_in_)} != {CATEGORICAL_COLUMNS}")

        self.model = model
        self.encoder = encoder
        self.medians = medians
        self.threshold = threshold
        self.top_n = top_n
        self._explainer = shap.TreeExplainer(model)
        # SHAP only fills in its baseline (expected_value) after its first call, so make that
        # call now. It also means the first real request is not slower than the rest.
        self._explainer.shap_values(pd.DataFrame([[0.0] * len(FEATURE_ORDER)], columns=FEATURE_ORDER))

    @classmethod
    def load(cls, tree_path: Path, model_path: Path, threshold: float, top_n: int) -> "RiskModel":
        for p in (tree_path, model_path):
            if not Path(p).exists():
                raise FileNotFoundError(f"Missing model file: {p}")
        bundle = joblib.load(tree_path)
        # tree.joblib also holds the whole train/test set (~64 MB). Keep only what serving needs.
        encoder, medians = bundle["encoder"], bundle["medians"]
        del bundle
        return cls(cls._load_xgb(Path(model_path)), encoder, medians, threshold, top_n)

    @staticmethod
    def _load_xgb(path: Path) -> XGBClassifier:
        """Prefer XGBoost's own format (.json / .ubj): it is portable across operating systems
        and versions. A pickled .joblib model failed to load on Windows ("input stream corrupted")."""
        if path.suffix in (".json", ".ubj"):
            model = XGBClassifier()
            model.load_model(path)
            return model
        return joblib.load(path)

    # ----- scoring -----
    @staticmethod
    def _frame(features: Mapping[str, float]) -> pd.DataFrame:
        return pd.DataFrame([features], columns=FEATURE_ORDER).astype("float64")

    def predict_proba(self, frame: pd.DataFrame):
        return self.model.predict_proba(frame[FEATURE_ORDER].astype("float64"))[:, 1]

    def score(self, features: Mapping[str, float]) -> RiskResult:
        frame = self._frame(features)
        score = float(self.model.predict_proba(frame)[0, 1])
        return RiskResult(
            risk_score=score,
            risk_label="Risky" if score >= self.threshold else "Normal",
            threshold_used=self.threshold,
            top_factors=self._top_factors(frame, features),
        )

    def _top_factors(self, frame: pd.DataFrame, features: Mapping[str, float]) -> list[dict]:
        # SHAP values are in the model's log-odds space: positive pushes the score toward Risky.
        shap_values = self._explainer.shap_values(frame)[0]
        ranked = sorted(zip(FEATURE_ORDER, shap_values), key=lambda x: abs(x[1]), reverse=True)
        return [
            {
                "feature": name,
                "label": FEATURE_LABELS[name],
                "value": self._display_value(name, features[name]),
                "impact": round(float(sv), 4),
                "direction": "increases_risk" if sv > 0 else "decreases_risk",
            }
            for name, sv in ranked[: self.top_n]
        ]

    def _display_value(self, name: str, value: float):
        """Decode encoded categories back to text so the banker sees words, not codes."""
        if name in CATEGORICAL_COLUMNS:
            categories = self.encoder.categories_[CATEGORICAL_COLUMNS.index(name)]
            return str(categories[int(value)]) if int(value) >= 0 else "Unknown"
        if name == "owns_property" or name.endswith("_missing"):
            return "Yes" if int(value) == 1 else "No"
        return round(float(value), 4) if isinstance(value, float) else value


@lru_cache
def get_risk_model() -> RiskModel:
    s = get_settings()
    return RiskModel.load(s.tree_path, s.model_path, s.risk_threshold, s.top_factors_count)
