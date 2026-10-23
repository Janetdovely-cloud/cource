# 由學管「各課程課表(新)」匯出的 scripts/classes-lcc.json（中壢、桃園實體課＋雲端教室線上課），依關鍵字對應到各課程分頁（不含講師）
# 更新：在 Janet 電腦跑 fetch_course_view.py → course_view_to_json.py，把 classes.json 複製成 scripts/classes-lcc.json 後 push
import json, re, sys, html
out = 'src/data/classes.js'
RULES = [
  ('ipas', r'IPAS'),
  ('interior-b', r'乙級'),
  ('infosec', r'資安|CISSP|CCNA'),
  ('cloud', r'Do188|RHCE|RHCSA|RH358|RH342|OpenShift|Linux|AWS'),
  ('ai-agent', r'AI Agent|程式解決方案|OpenClaw|n8n|AI自媒體|Fine-Tuning|AI解決方案'),
  ('ai-engineer', r'Python|Django|深度學習'),
  ('java', r'Java|Frontend|前端|SQL|資料庫工程師'),
  ('ai-game', r'Unity|C#遊戲|2D美術|遊戲設計|遊戲開發|MAYA|UE5'),
  ('anime', r'Live2D|Comic|漫畫|角色|電繪|2D美術|ACP國際認證輔考班-Illustrator'),
  ('av-design', r'Cinema 4D|(?<!短)影音|MAYA|影片剪輯|pr輔考'),
  ('ptc', r'PTC|Creo|模具|工業產品|工業製圖|AutoCAD設計製圖'),
  ('interior', r'室內|SketchUp|3ds ?Max3D|3ds max認證|空間軟裝|Revit|AutoCAD認證|AutoCAD室內'),
  ('biz-design', r'品牌設計|ACP國際認證輔考班-Illustrator|視覺行銷|UI/UX|商業網站|印刷|Photoshop|潮流風格'),
  ('ai-pro', r'AI廣告|AI形象|AI短影音|生成式AI|AI高效行銷|AI神隊友|AI人工智慧核心能力|LINE官方|LINE Ads|Google Ads|ITS輔考|AI職場'),
]
SKIP = r'亮點|^Short_|一人動畫公司|專題製作|說明會|徵才|教育訓練|履歷健診|廠商|教練直播間|前導'
d = json.load(open(sys.argv[1] if len(sys.argv) > 1 else 'scripts/classes-lcc.json', encoding='utf-8'))
if len(d) < 20: sys.exit(f'only {len(d)} classes, abort')
# 輔考／模擬測驗只看括號備註以前的課名，避免「AI廣告設計 (11/18輔考班)」這類正式課被排除
d = [x for x in d if x['類別'] not in ('說明會', '產學') and not re.search(SKIP, x['課程'])
     and not re.search(r'輔考|模擬測驗', re.split(r'[（(【]', x['課程'], maxsplit=1)[0])]
res = {}
for x in d:
    raw = html.unescape(x['課程'])
    if not raw.strip(): continue
    name = re.sub(r'^【[^】]*】', '', raw)
    name = re.sub(r'^亮點\([^)_]*\)?_', '', name)
    name = re.sub(r'\s*[（(【※].*$', '', name)
    name = re.sub(r'^區\s*', '', name)
    name = re.sub(r'^就業認證直播-+\s*', '', name).strip()
    hit = [s for s, p in RULES if re.search(p, raw, re.I)]
    if 'interior-b' in hit and 'interior' in hit: hit.remove('interior')
    for s in dict.fromkeys(hit):
        res.setdefault(s, []).append({
            'name': name, 'start': x['開課日期'], 'end': x['結束日期'],
            'slot': x['時段'], 'time': x['時間'], 'hours': x['時數'],
            'branch': '線上直播' if x['上課地點'] == '雲端教室' else f"{x['上課地點']}分校實體課",
        })
for v in res.values(): v.sort(key=lambda c: c['start'])
open(out, 'w').write('// 由 scripts/build-classes.py 產生（來源：學管「各課程課表(新)」）\nexport const classes = ' + json.dumps(res, ensure_ascii=False, indent=1) + '\n')
print({k: len(v) for k, v in res.items()})
print('unmatched:', [x['課程'][:30] for x in d if not any(re.search(p, x['課程'], re.I) for _, p in RULES)])
