import os
from functools import lru_cache
from typing import Any

from ultralytics import YOLO

from app.utils.constants import (
    PANEL_CONF,
    PANEL_IOU,
    PANEL_IMGSZ,
    DEFECT_CONF,
    DEFECT_IOU,
    DEFECT_IMGSZ,
    TRACKER_CFG,
)


BASE_DIR = os.path.dirname(os.path.dirname(__file__))

PANEL_MODEL_PATH = os.path.join(BASE_DIR, "ml_models", "panel_model_current.pt")
DEFECT_MODEL_PATH = os.path.join(BASE_DIR, "ml_models", "defect_model_current.pt")


@lru_cache(maxsize=1)
def get_panel_model() -> YOLO:
    if not os.path.exists(PANEL_MODEL_PATH):
        raise FileNotFoundError(f"Panel model not found: {PANEL_MODEL_PATH}")

    return YOLO(PANEL_MODEL_PATH)


@lru_cache(maxsize=1)
def get_defect_model() -> YOLO:
    if not os.path.exists(DEFECT_MODEL_PATH):
        raise FileNotFoundError(f"Defect model not found: {DEFECT_MODEL_PATH}")

    return YOLO(DEFECT_MODEL_PATH)


def predict_panels(image: Any):
    model = get_panel_model()

    return model.predict(
        source=image,
        conf=PANEL_CONF,
        iou=PANEL_IOU,
        imgsz=PANEL_IMGSZ,
        verbose=False,
    )[0]


def track_panels(image: Any):
    model = get_panel_model()

    return model.track(
        source=image,
        conf=PANEL_CONF,
        iou=PANEL_IOU,
        imgsz=PANEL_IMGSZ,
        tracker=TRACKER_CFG,
        persist=True,
        verbose=False,
    )[0]


def predict_defects(crop: Any):
    model = get_defect_model()

    return model.predict(
        source=crop,
        conf=DEFECT_CONF,
        iou=DEFECT_IOU,
        imgsz=DEFECT_IMGSZ,
        verbose=False,
    )[0]