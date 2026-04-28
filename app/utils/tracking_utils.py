from collections import Counter, defaultdict

import numpy as np

from app.utils.constants import (
    DEFAULT_LABEL,
    MIN_TRACK_FRAMES,
    TRACK_RULES,
)


def max_consecutive_label(seq, target):
    best = 0
    current = 0

    for label in seq:
        if label == target:
            current += 1
            best = max(best, current)
        else:
            current = 0

    return best


def get_track_final_label(votes, default_label=DEFAULT_LABEL):
    if not votes:
        return default_label, 0.0

    total_frames = len(votes)

    if total_frames < MIN_TRACK_FRAMES:
        return default_label, 0.0

    labels_only = [label for label, _ in votes]

    count_map = Counter()
    conf_map = defaultdict(list)

    for label, conf in votes:
        count_map[label] += 1
        conf_map[label].append(conf)

    candidates = []

    for label, rules in TRACK_RULES.items():
        count = count_map.get(label, 0)
        ratio = count / total_frames
        mean_conf = float(np.mean(conf_map[label])) if count > 0 else 0.0

        if label == "snow":
            if max_consecutive_label(labels_only, "snow") < 4:
                continue

        if (
            count >= rules["min_count"]
            and ratio >= rules["min_ratio"]
            and mean_conf >= rules["min_mean_conf"]
        ):
            score = 0.65 * ratio + 0.35 * mean_conf
            candidates.append((label, score, mean_conf))

    if not candidates:
        return default_label, 0.0

    candidates.sort(key=lambda x: x[1], reverse=True)

    final_label = candidates[0][0]
    final_conf = candidates[0][2]

    return final_label, float(final_conf)


def compute_switches(seq):
    if len(seq) <= 1:
        return 0

    return sum(seq[i] != seq[i - 1] for i in range(1, len(seq)))


def summarize_panel_labels(labels):
    return dict(Counter(labels))