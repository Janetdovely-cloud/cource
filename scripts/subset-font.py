"""把辰宇落雁體做成子集 woff2（只收網站用到的字），輸出到 public/fonts/。

用法：python3 scripts/subset-font.py   （需要 pip install fonttools brotli）
新增課程文案後重跑一次，新字才會套用手寫體。
"""
import pathlib
from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "fonts-src" / "ChenYuluoyan-2.0-Thin.ttf"
OUT = ROOT / "public" / "fonts" / "chenyuluoyan-subset.woff2"

chars = {chr(cp) for cp in range(0x20, 0x7F)}
chars |= {chr(cp) for cp in list(range(0x3000, 0x3040)) + list(range(0xFF00, 0xFFF0)) + list(range(0x2000, 0x2070))}
for p in list((ROOT / "src").rglob("*")) + [ROOT / "index.html"]:
    if p.suffix in {".js", ".jsx", ".css", ".html", ".json"}:
        chars |= {c for c in p.read_text(encoding="utf-8") if ord(c) > 127}

opts = subset.Options()
opts.flavor = "woff2"
opts.hinting = False
opts.layout_features = ["*"]
opts.notdef_outline = True
font = TTFont(SRC)
sub = subset.Subsetter(opts)
sub.populate(text="".join(chars))
sub.subset(font)
OUT.parent.mkdir(parents=True, exist_ok=True)
font.flavor = "woff2"
font.save(OUT)
print(f"{len(chars)} 字 → {OUT.relative_to(ROOT)}（{OUT.stat().st_size // 1024} KB）")
