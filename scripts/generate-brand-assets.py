#!/usr/bin/env python3
"""Generate favicon.ico and the Open Graph social card from the hub logo.

Reproducible brand-asset generator. Source of truth is static/img/guategeeks-logo.png;
outputs are committed to static/img/. Requires Pillow (pip install Pillow).

Usage: python3 scripts/generate-brand-assets.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "static" / "img"
LOGO = IMG / "guategeeks-logo.png"

# Brand tokens (GuateGeeks Liquid Glass)
DARK_TOP = (42, 45, 58)      # #2a2d3a — hub hero top
DARK_BOTTOM = (32, 36, 48)   # #202430 — hub hero bottom
CORAL = (239, 133, 86)       # #ef8556 — primary accent


def load_logo() -> Image.Image:
    return Image.open(LOGO).convert("RGBA")


def make_favicon(logo: Image.Image) -> None:
    """Multi-size .ico from the logo, padded to a transparent square."""
    side = max(logo.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(logo, ((side - logo.width) // 2, (side - logo.height) // 2), logo)
    base = square.resize((256, 256), Image.LANCZOS)
    out = IMG / "favicon.ico"
    base.save(out, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f"wrote {out.relative_to(ROOT)} (16/32/48/64)")


def make_social_card(logo: Image.Image) -> None:
    """1200x630 OG card: dark brand gradient + centered logo + coral base bar."""
    W, H = 1200, 630
    card = Image.new("RGBA", (W, H))
    for y in range(H):
        t = y / (H - 1)
        r = round(DARK_TOP[0] + (DARK_BOTTOM[0] - DARK_TOP[0]) * t)
        g = round(DARK_TOP[1] + (DARK_BOTTOM[1] - DARK_TOP[1]) * t)
        b = round(DARK_TOP[2] + (DARK_BOTTOM[2] - DARK_TOP[2]) * t)
        for x in range(W):
            card.putpixel((x, y), (r, g, b, 255))

    # Fit the logo into a centred box, preserving aspect ratio.
    box_w, box_h = int(W * 0.62), int(H * 0.52)
    scale = min(box_w / logo.width, box_h / logo.height)
    lw, lh = round(logo.width * scale), round(logo.height * scale)
    resized = logo.resize((lw, lh), Image.LANCZOS)
    card.alpha_composite(resized, ((W - lw) // 2, (H - lh) // 2 - 12))

    # Coral base bar for brand pop.
    bar = Image.new("RGBA", (W, 10), CORAL + (255,))
    card.alpha_composite(bar, (0, H - 10))

    out = IMG / "social-card.png"
    card.convert("RGB").save(out, format="PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({W}x{H})")


def main() -> None:
    logo = load_logo()
    make_favicon(logo)
    make_social_card(logo)


if __name__ == "__main__":
    main()
