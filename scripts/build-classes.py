# 由中壢分校資訊平台「近期課程」的開班資料，依關鍵字對應到各課程分頁（不含講師）
import json, re, sys, html, urllib.request
out = 'src/data/classes.js'
PAGE = 'https://sites.google.com/view/lccnet11/%E8%BF%91%E6%9C%9F%E8%AA%B2%E7%A8%8B'
RULES = [
  ('ipas', r'IPAS'),
  ('interior-b', r'乙級'),
  ('infosec', r'資安|CISSP|CCNA'),
  ('cloud', r'RHCE|RHCSA|RH358|RH342|OpenShift|Linux|AWS'),
  ('ai-agent', r'AI Agent|n8n|AI自媒體|Fine-Tuning|AI解決方案'),
  ('ai-engineer', r'Python|Django|Fine-Tuning|深度學習'),
  ('java', r'Java|Frontend|前端'),
  ('ai-game', r'Unity|C#遊戲|遊戲設計|遊戲開發|MAYA|UE5'),
  ('anime', r'Live2D|Comic|漫畫|角色'),
  ('av-design', r'Cinema 4D|影音|MAYA'),
  ('ptc', r'PTC|Creo|工業產品|工業製圖|AutoCAD設計製圖'),
  ('interior', r'室內|SketchUp|3ds ?Max3D|3ds max認證|空間軟裝|Revit|AutoCAD認證|AutoCAD室內'),
  ('biz-design', r'品牌設計|視覺行銷|AI廣告|UI/UX|商業網站|印刷|Photoshop|AI形象|潮流風格'),
  ('ai-pro', r'生成式AI|AI人工智慧核心能力|LINE官方|LINE Ads|Google Ads|ITS輔考|AI職場'),
]
if len(sys.argv) > 1:
    d = json.load(open(sys.argv[1]))
else:
    page = urllib.request.urlopen(PAGE, timeout=60).read().decode('utf-8')
    code = next(html.unescape(c) for c in re.findall(r'data-code="([^"]*)"', page) if 'const DATA' in html.unescape(c))
    i = code.index('const DATA = [') + 13
    d = json.loads(code[i:code.index('];', i) + 1])
if len(d) < 20: sys.exit(f'only {len(d)} classes, abort')
res = {}
for x in d:
    raw = x['課程']
    if not raw.strip() or '徵才會' in raw: continue
    name = re.sub(r'^亮點\([^)]*\)_', '', raw)
    name = re.sub(r'\s*[（(【※].*$', '', name)
    name = re.sub(r'^區\s*', '', name)
    name = re.sub(r'^就業認證直播-+\s*', '', name).strip()
    hit = [s for s, p in RULES if re.search(p, raw, re.I)]
    if 'interior-b' in hit and 'interior' in hit: hit.remove('interior')
    for s in dict.fromkeys(hit):
        res.setdefault(s, []).append({
            'name': name, 'start': x['開課日期'], 'end': x['結束日期'],
            'slot': x['時段'], 'time': x['時間'], 'hours': x['時數'],
            'branch': '' if x['開課地點'] == '產品發展' else x['開課地點'],
        })
for v in res.values(): v.sort(key=lambda c: c['start'])
open(out, 'w').write('// 由 scripts/build-classes.py 產生（來源：中壢分校資訊平台「近期課程」）\nexport const classes = ' + json.dumps(res, ensure_ascii=False, indent=1) + '\n')
print({k: len(v) for k, v in res.items()})
print('unmatched:', [x['課程'][:30] for x in d if x['課程'].strip() and '徵才會' not in x['課程'] and not any(re.search(p, x['課程'], re.I) for _, p in RULES)])
