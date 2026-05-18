DEFAULT_LABEL = "clean"

DEFECT_CLASSES = {"bird_drop", "cracks", "dust", "snow"}

CLASS_THRESHOLDS = {
    "bird_drop": 0.25,
    "cracks": 0.30,
    "dust": 0.25,
    "snow": 0.30,
}

PANEL_CONF = 0.40
PANEL_IOU = 0.45
PANEL_IMGSZ = 832

DEFECT_CONF = 0.15
DEFECT_IOU = 0.45
DEFECT_IMGSZ = 832

PANEL_PAD = 0.15

MIN_PANEL_W = 80
MIN_PANEL_H = 80
MIN_PANEL_AREA = 5000
MIN_BOX_AREA_RATIO = 0.002

FRAME_STRIDE = 1

TRACKER_CFG = "bytetrack.yaml"

MIN_TRACK_FRAMES = 2
MIN_TRACK_HITS_TO_DRAW = 3
MAX_MISSING_FRAMES = 4
BOX_SMOOTH_ALPHA = 0.70

TRACK_RULES = {
    "bird_drop": {"min_count": 4, "min_ratio": 0.12, "min_mean_conf": 0.30},
    "cracks": {"min_count": 4, "min_ratio": 0.12, "min_mean_conf": 0.30},
    "dust": {"min_count": 5, "min_ratio": 0.15, "min_mean_conf": 0.25},
    "snow": {"min_count": 10, "min_ratio": 0.35, "min_mean_conf": 0.40},
}