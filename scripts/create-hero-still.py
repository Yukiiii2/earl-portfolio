"""Create a transparent mobile still from a real browser capture of the existing hero scene."""

from pathlib import Path
import argparse

from PIL import Image


def build_still(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    crop = image.crop((753, 228, 1321, 796))

    pixels = []
    for index, (red, green, blue, _alpha) in enumerate(crop.getdata()):
        red_signal = red - max(green, blue) - 18
        alpha = max(0, min(255, red_signal * 5))
        if index // crop.width >= 500:
            alpha = 0
        pixels.append((red, green, blue, alpha))

    crop.putdata(pixels)
    crop = crop.resize((568, 568), Image.Resampling.LANCZOS)
    destination.parent.mkdir(parents=True, exist_ok=True)
    crop.save(destination, "WEBP", quality=92, method=6, exact=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    build_still(args.source, args.destination)
