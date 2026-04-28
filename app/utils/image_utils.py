import os
import cv2

from app.utils.constants import (
    MIN_PANEL_W,
    MIN_PANEL_H,
    MIN_PANEL_AREA,
    MIN_BOX_AREA_RATIO,
    PANEL_PAD,
)


def ensure_dir(path: str):
    os.makedirs(path, exist_ok=True)


def clip_box(x1, y1, x2, y2, frame_w, frame_h):
    x1 = max(0, min(int(x1), frame_w - 1))
    y1 = max(0, min(int(y1), frame_h - 1))
    x2 = max(0, min(int(x2), frame_w - 1))
    y2 = max(0, min(int(y2), frame_h - 1))

    return x1, y1, x2, y2


def expand_box(x1, y1, x2, y2, frame_w, frame_h, pad_ratio=PANEL_PAD):
    dx = int((x2 - x1) * pad_ratio)
    dy = int((y2 - y1) * pad_ratio)

    x1 -= dx
    y1 -= dy
    x2 += dx
    y2 += dy

    return clip_box(x1, y1, x2, y2, frame_w, frame_h)


def is_valid_panel_box(x1, y1, x2, y2, frame_w, frame_h):
    w = x2 - x1
    h = y2 - y1
    area = w * h
    frame_area = frame_w * frame_h
    aspect_ratio = w / max(h, 1)

    if w < MIN_PANEL_W or h < MIN_PANEL_H:
        return False

    if area < MIN_PANEL_AREA:
        return False

    if area / max(frame_area, 1) < MIN_BOX_AREA_RATIO:
        return False

    if aspect_ratio > 4 or aspect_ratio < 0.25:
        return False

    return True


def crop_panel(frame, box):
    frame_h, frame_w = frame.shape[:2]

    x1, y1, x2, y2 = map(int, box)

    x1, y1, x2, y2 = expand_box(x1, y1, x2, y2, frame_w, frame_h)

    if not is_valid_panel_box(x1, y1, x2, y2, frame_w, frame_h):
        return None, None

    crop = frame[y1:y2, x1:x2]

    if crop.size == 0:
        return None, None

    return crop, [x1, y1, x2, y2]


def draw_text_box(img, text, org, color=(0, 255, 0), scale=0.55, thickness=2):
    x, y = org

    (tw, th), _ = cv2.getTextSize(
        text,
        cv2.FONT_HERSHEY_SIMPLEX,
        scale,
        thickness
    )

    cv2.rectangle(
        img,
        (x, y - th - 8),
        (x + tw + 8, y),
        color,
        -1
    )

    cv2.putText(
        img,
        text,
        (x + 4, y - 4),
        cv2.FONT_HERSHEY_SIMPLEX,
        scale,
        (0, 0, 0),
        thickness,
        cv2.LINE_AA
    )


def draw_detection(frame, box, label, panel_id=None, color=(0, 255, 0)):
    x1, y1, x2, y2 = map(int, box)

    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

    if panel_id is not None:
        text = f"ID {panel_id} | {label}"
    else:
        text = str(label)

    draw_text_box(frame, text, (x1, y1), color=color)

    return frame