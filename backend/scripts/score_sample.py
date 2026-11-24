"""Step 2 check: score sample rows from tree.joblib through the same code the API uses.

Run from backend/:   python scripts/score_sample.py
Exits with code 1 if any check fails.
"""
import sys
import warnings
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
warnings.filterwarnings("ignore")

import joblib
import numpy as np
from sklearn.metrics import roc_auc_score

from app.config import settings
from app.services.model import get_risk_model

ok = True


def check(name: str, passed: bool, detail: str = ""):
    global ok
    ok &= bool(passed)
    print(f"[{'PASS' if passed else 'FAIL'}] {name} {detail}")


model = get_risk_model()
bundle = joblib.load(settings.tree_path)
X, y = bundle["X_test"], bundle["y_test"].values
print(f"threshold in use: {model.threshold}  (config RISK_THRESHOLD)\n")

# 1) A few real rows: 3 risky + 3 normal
rng = np.random.default_rng(42)
idx = list(rng.choice(np.where(y == 1)[0], 3, replace=False)) + list(rng.choice(np.where(y == 0)[0], 3, replace=False))
print("true label | score  | predicted | top 3 factors (impact in log-odds, + = toward Risky)")
for i in idx:
    res = model.score(X.iloc[i].to_dict())
    top = "; ".join(f"{f['label']}={f['value']} ({f['impact']:+.2f})" for f in res.top_factors[:3])
    print(f"  {'Risky ' if y[i] else 'Normal'}   | {res.risk_score:.3f} | {res.risk_label:<8}  | {top}")
print()

# 2) Wrapper reproduces the Colab result on the full test set
p = model.predict_proba(X)
auc = roc_auc_score(y, p)
check("ROC-AUC on full test set matches Colab (0.7481)", abs(auc - 0.7481) < 5e-4, f"-> {auc:.4f}")

# 3) Single-row score == batch score
res = model.score(X.iloc[0].to_dict())
check("single-row score equals batch score", abs(res.risk_score - p[0]) < 1e-6)

# 4) SHAP factors add up to the model output
frame = X.iloc[:20].astype("float64")
margin = model.model.predict(frame, output_margin=True)
contributions = model._explainer.shap_values(frame)
total = model._explainer.expected_value + contributions.sum(axis=1)
check("SHAP values add up to the model output", np.allclose(margin, total, atol=1e-4))

# 5) What the threshold means for the review queue
flagged = (p >= model.threshold)
tp = (flagged & (y == 1)).sum()
print(f"\nAt threshold {model.threshold}: {flagged.mean()*100:.1f}% of test applicants flagged Risky, "
      f"recall {tp / (y == 1).sum():.2f}, precision {tp / max(flagged.sum(), 1):.2f}")
check("threshold is not flagging almost everyone", flagged.mean() < 0.60,
      "(a threshold of 0.15 would flag ~91%)")

sys.exit(0 if ok else 1)
