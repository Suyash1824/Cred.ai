import numpy as np
import pytest
from sklearn.metrics import roc_auc_score

from app.services.features import FEATURE_ORDER
from app.services.model import RiskModel


def test_model_reproduces_colab_auc_on_test_set(risk_model, bundle):
    """Proves the model file, feature order and wrapper are wired correctly (Colab: 0.7481)."""
    p = risk_model.predict_proba(bundle["X_test"])
    assert roc_auc_score(bundle["y_test"], p) == pytest.approx(0.7481, abs=5e-4)


def test_score_matches_direct_prediction(risk_model, bundle):
    row = bundle["X_test"].iloc[0]
    direct = float(risk_model.predict_proba(bundle["X_test"].iloc[[0]])[0])
    assert risk_model.score(row.to_dict()).risk_score == pytest.approx(direct)


def test_label_follows_threshold(risk_model, bundle):
    X = bundle["X_test"].iloc[:200]
    for _, row in X.iterrows():
        res = risk_model.score(row.to_dict())
        assert res.risk_label == ("Risky" if res.risk_score >= risk_model.threshold else "Normal")


def test_top_factors_shape_and_order(risk_model, bundle):
    res = risk_model.score(bundle["X_test"].iloc[3].to_dict())
    assert len(res.top_factors) == risk_model.top_n
    impacts = [abs(f["impact"]) for f in res.top_factors]
    assert impacts == sorted(impacts, reverse=True)
    for f in res.top_factors:
        assert set(f) == {"feature", "label", "value", "impact", "direction"}
        assert f["feature"] in FEATURE_ORDER
        assert f["direction"] == ("increases_risk" if f["impact"] > 0 else "decreases_risk")


def test_shap_values_add_up_to_model_output(risk_model, bundle):
    frame = bundle["X_test"].iloc[:20].astype("float64")
    margin = risk_model.model.predict(frame, output_margin=True)
    contributions = risk_model._explainer.shap_values(frame)   # call first: it sets expected_value
    total = risk_model._explainer.expected_value + contributions.sum(axis=1)
    assert np.allclose(margin, total, atol=1e-4)


def test_categories_are_decoded_for_display(risk_model, bundle):
    row = bundle["X_test"].iloc[0].to_dict()
    assert isinstance(risk_model._display_value("occupation", row["occupation"]), str)
    assert risk_model._display_value("owns_property", 1) == "Yes"
    assert risk_model._display_value("occupation", -1) == "Unknown"


def test_startup_refuses_wrong_feature_order(risk_model):
    class FakeBooster:
        feature_names = list(reversed(FEATURE_ORDER))

    class FakeModel:
        def get_booster(self):
            return FakeBooster()

    with pytest.raises(RuntimeError, match="feature order"):
        RiskModel(FakeModel(), risk_model.encoder, risk_model.medians, 0.5, 5)


def test_native_model_file_matches_original_pickle(risk_model, bundle):
    """xgb_model.json must give exactly the same predictions as the original xgb_model.joblib."""
    import joblib
    from app.config import get_settings
    pickle_path = get_settings().models_dir / "xgb_model.joblib"
    try:
        original = joblib.load(pickle_path)
    except Exception as exc:  # the pickle is what fails on some Windows setups
        pytest.skip(f"original pickle cannot be loaded here: {type(exc).__name__}")
    X = bundle["X_test"].iloc[:2000]
    assert np.allclose(original.predict_proba(X)[:, 1], risk_model.predict_proba(X))


def test_native_model_survives_windows_line_endings(tmp_path):
    """The .json model must still load if git or an editor turns LF into CRLF."""
    from app.config import get_settings
    src = (get_settings().models_dir / "xgb_model.json").read_bytes()
    crlf = tmp_path / "xgb_model.json"
    crlf.write_bytes(src.replace(b"\n", b"\r\n"))
    assert RiskModel._load_xgb(crlf).n_features_in_ == 21
