from app.utils.constants import (
    DEFAULT_LABEL,
    DEFECT_CLASSES,
    CLASS_THRESHOLDS,
)


def normalize_label(label: str) -> str:
    return str(label).lower().strip()


def get_raw_predictions(result):
    if result.boxes is None or len(result.boxes) == 0:
        return []

    confs = result.boxes.conf.cpu().numpy()
    clses = result.boxes.cls.cpu().numpy().astype(int)

    preds = []

    for cls_id, conf in zip(clses, confs):
        label = normalize_label(result.names[cls_id])
        preds.append((label, float(conf)))

    return preds


def final_panel_status(result, default_label=DEFAULT_LABEL):
    preds = get_raw_predictions(result)

    if not preds:
        return default_label, 0.0

    defect_candidates = []

    for label, conf in preds:
        if label not in DEFECT_CLASSES:
            continue

        threshold = CLASS_THRESHOLDS.get(label, 0.30)

        if conf >= threshold:
            defect_candidates.append((label, conf))

    if not defect_candidates:
        return default_label, 0.0

    defect_candidates.sort(key=lambda x: x[1], reverse=True)

    return defect_candidates[0]