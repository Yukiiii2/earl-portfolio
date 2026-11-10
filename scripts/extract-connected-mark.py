"""Extract Earl's approved Connected Forms Option 03 mark without redrawing it.

The source is a presentation board on a near-black background. This script crops
only the large central mark, removes pixels connected to that background, and
derives transparent PNG/ICO variants from one master image.
"""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "assets" / "branding" / "connected-forms-option-03.png"
MASTER_OUTPUT = ROOT / "docs" / "assets" / "branding" / "earl-connected-mark.png"
OUTPUT = ROOT / "public" / "brand"
MASTER_SIZE = 640

# Hand-inspected bounds around only the large central mark. The divider, lower
# icon examples, and label all begin below this rectangle.
CENTRAL_MARK_BOUNDS = (280, 80, 980, 730)


def retained_components(core: np.ndarray, minimum_area: int = 700) -> np.ndarray:
    """Keep the ribbon and diamond components; discard isolated board texture."""

    height, width = core.shape
    visited = np.zeros_like(core, dtype=bool)
    retained = np.zeros_like(core, dtype=bool)

    for y in range(height):
        for x in range(width):
            if not core[y, x] or visited[y, x]:
                continue

            queue = deque([(y, x)])
            visited[y, x] = True
            component: list[tuple[int, int]] = []

            while queue:
                current_y, current_x = queue.popleft()
                component.append((current_y, current_x))
                for offset_y in (-1, 0, 1):
                    for offset_x in (-1, 0, 1):
                        if offset_x == offset_y == 0:
                            continue
                        next_y = current_y + offset_y
                        next_x = current_x + offset_x
                        if not (0 <= next_y < height and 0 <= next_x < width):
                            continue
                        if core[next_y, next_x] and not visited[next_y, next_x]:
                            visited[next_y, next_x] = True
                            queue.append((next_y, next_x))

            if len(component) >= minimum_area:
                ys, xs = zip(*component)
                retained[np.asarray(ys), np.asarray(xs)] = True

    return retained


def extract_master() -> Image.Image:
    source = Image.open(SOURCE).convert("RGB")
    crop = source.crop(CENTRAL_MARK_BOUNDS)
    pixels = np.asarray(crop).astype(np.float32)

    border = np.concatenate(
        [pixels[0, :, :], pixels[-1, :, :], pixels[:, 0, :], pixels[:, -1, :]],
        axis=0,
    )
    background = np.median(border, axis=0)
    difference = np.max(np.abs(pixels - background), axis=2)

    # The board texture stays within roughly 10 RGB levels of the border. A
    # 24-level core threshold retains the darkest ribbon shading while cleanly
    # separating the central negative space.
    core = retained_components(difference >= 24)
    expanded = np.asarray(
        Image.fromarray((core * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))
    ) > 0

    alpha = np.clip((difference - 6) / 18, 0, 1)
    alpha = np.where(expanded, alpha, 0)
    alpha = np.asarray(
        Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.45))
    ).astype(np.float32) / 255

    # Undo the original near-black matte only at semi-transparent edge pixels.
    safe_alpha = np.maximum(alpha[..., None], 1 / 255)
    foreground = (pixels - (1 - safe_alpha) * background) / safe_alpha
    foreground = np.clip(foreground, 0, 255).astype(np.uint8)
    rgba = np.dstack((foreground, (alpha * 255).astype(np.uint8)))
    extracted = Image.fromarray(rgba, "RGBA")

    alpha_bbox = extracted.getchannel("A").getbbox()
    if alpha_bbox is None:
        raise RuntimeError("No foreground was extracted from the approved source.")
    extracted = extracted.crop(alpha_bbox)

    maximum_content = MASTER_SIZE - 56
    scale = min(maximum_content / extracted.width, maximum_content / extracted.height, 1)
    if scale < 1:
        extracted = extracted.resize(
            (round(extracted.width * scale), round(extracted.height * scale)),
            Image.Resampling.LANCZOS,
        )

    master = Image.new("RGBA", (MASTER_SIZE, MASTER_SIZE), (0, 0, 0, 0))
    master.alpha_composite(
        extracted,
        ((MASTER_SIZE - extracted.width) // 2, (MASTER_SIZE - extracted.height) // 2),
    )
    return master


def save_variants(master: Image.Image) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    MASTER_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    master.save(MASTER_OUTPUT, optimize=True)

    for size in (16, 32, 48, 180, 192, 512):
        resized = master.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(OUTPUT / f"earl-mark-{size}.png", optimize=True)

    master.save(
        ROOT / "public" / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )


if __name__ == "__main__":
    if not SOURCE.exists():
        raise FileNotFoundError(f"Approved source image is missing: {SOURCE}")
    save_variants(extract_master())
