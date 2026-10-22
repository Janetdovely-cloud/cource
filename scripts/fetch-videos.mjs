// 抓聯成「學員就業影片」(Google Apps Script) 並依類別對應到課程分頁
import fs from 'node:fs'
import sharp from 'sharp'
const API = 'https://script.google.com/macros/s/AKfycbzmF8odPCPXblOBqAGfW_zwaTo-TZTWOAe3wf5A0BsrdK0hVck-f_3dzp_QAKH6yk4RHQ/exec'
const SHEET = 'https://docs.google.com/spreadsheets/d/1pV8Y9_0_FS5xJaOLUBSE5wr05mYsSQ2POYdb8mEfoTM/edit#gid=0'
const TAGS = ['APP程式網管', '電商文書視覺', '室內設計工業設計', '遊戲動漫影視']
const CAT = {
  程式設計: ['ai-engineer', 'java', 'ai-agent'], 程式系統: ['ai-engineer', 'java', 'ai-agent'],
  網站架設: ['cloud', 'infosec'], 工業設計: ['ptc'], 室內設計: ['interior', 'interior-b'],
  '平面/3D設計': ['biz-design'], 遊戲設計: ['ai-game'], 遊戲程式: ['ai-game'], 遊戲美術: ['ai-game', 'anime'],
  動漫設計: ['anime'], 影音動畫: ['av-design'],
}
// 內容與類別不符者個別指定
const OVERRIDE = { liVzrFGU0RU: ['ai-engineer'], jYD1c9Jl1DQ: ['av-design'] }
const out = {}, seen = new Set()
for (const tag of TAGS) {
  const q = new URLSearchParams({ sheetUrl: SHEET, sheetTag: tag, row: 3, col: 3, endRow: 30, endCol: 8 })
  const r = await fetch(`${API}?${q}`)
  if (!r.ok) throw new Error(`${tag} ${r.status}`)
  const a = (await r.text()).split(',')
  for (let i = 0; i + 5 < a.length; i += 6) {
    const [cat, co, , t, id] = a.slice(i, i + 6).map((s) => s.trim())
    if (!id || !t || seen.has(id)) continue
    seen.add(id)
    for (const s of OVERRIDE[id] || CAT[cat] || []) (out[s] ||= []).push({ id, t, co: co.replace(/\(.*?\)/g, '').trim() })
  }
}

// YouTube 播放清單（標題含學員姓名，只取類別與公司）
const fromList = new Set()
const LISTS = ['PLBcEsHGo2BZmz_jN8HuoAR8u3xjtkrqO5', 'PLBcEsHGo2BZns5T1NMNvqXu-zOzIq9vRc', 'PLBcEsHGo2BZmr35n32Od76ZGm2cJkJp0T', 'PLBcEsHGo2BZkvYI4TROeeaU5-znSn_2ek']
const LCAT = {
  程式設計: CAT.程式設計, 資安程式: ['infosec'], 資訊安全: ['infosec'], 雲端網管: ['cloud'], 雲端設計: ['cloud'],
  室內設計: CAT.室內設計, 工業設計: ['ptc'], 商業設計: ['biz-design'], 平面設計: ['biz-design'], 文書設計: ['biz-design'],
  影音設計: ['av-design'], 平面影音: ['biz-design', 'av-design'], 遊戲設計: ['ai-game'],
}
for (const list of LISTS) {
  const r = await fetch(`https://www.youtube.com/playlist?list=${list}`, { headers: { 'Accept-Language': 'zh-TW' } })
  if (!r.ok) { console.warn(list, r.status); continue }
  const m = (await r.text()).match(/var ytInitialData = (\{.*?\});<\/script>/)
  if (!m) continue
  const items = []
  ;(function walk(o) {
    if (!o || typeof o !== 'object') return
    if (o.lockupViewModel) items.push([o.lockupViewModel.contentId, o.lockupViewModel.metadata?.lockupMetadataViewModel?.title?.content || ''])
    else if (o.playlistVideoRenderer) items.push([o.playlistVideoRenderer.videoId, o.playlistVideoRenderer.title.runs.map((x) => x.text).join('')])
    else for (const k in o) walk(o[k])
  })(JSON.parse(m[1]))
  for (const [id, raw] of items) {
    if (!id || seen.has(id)) continue
    let cat, co = '', t
    const a = raw.split(/\s+/)
    const area = a.findIndex((x) => /區$/.test(x))
    if (LCAT[a[0]] && area > 1) { cat = a[0]; co = a.slice(1, area).join(' ') }
    else if (/中壢分校/.test(raw) && raw.includes('-')) cat = raw.split('-').find((x) => LCAT[x.trim()])?.trim()
    if (cat) t = `${cat}學員的轉職就業分享`
    else if (/[OＯo]/.test(raw) && raw.includes('-')) continue
    else { t = raw; cat = '程式設計' }
    if (!LCAT[cat]) continue
    seen.add(id)
    fromList.add(id)
    for (const s of LCAT[cat]) (out[s] ||= []).push({ id, t, co })
  }
}
// 取播放清單影片的上傳日期
const date = {}
for (const id of fromList) {
  const r = await fetch('https://www.youtube.com/youtubei/v1/next', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId: id, context: { client: { clientName: 'WEB', clientVersion: '2.20241001.00.00', hl: 'zh-TW' } } }),
  }).catch(() => null)
  const m = r?.ok && (await r.text()).match(/"dateText":\s*\{\s*"simpleText":\s*"[^"\d]*(\d+)年(\d+)月(\d+)日/)
  date[id] = m ? +m[1] * 1e4 + +m[2] * 100 + +m[3] : 0
}
// 播放清單影片排在最前面，越新越上面
const rank = (v) => (fromList.has(v.id) ? 1e9 + date[v.id] : 0)
for (const k in out) out[k].sort((a, b) => rank(b) - rank(a))
fs.mkdirSync('public/videos', { recursive: true })
for (const id of seen) {
  const f = `public/videos/${id}.webp`
  if (fs.existsSync(f)) continue
  const r = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
  if (r.ok) await sharp(Buffer.from(await r.arrayBuffer())).resize(480, 270, { fit: 'cover' }).webp({ quality: 72 }).toFile(f)
}
const n = seen.size
if (n < 30) throw new Error(`only ${n} videos, abort`)
fs.writeFileSync('src/data/videos.js', `// 由 scripts/fetch-videos.mjs 自動產生\nexport const videos = ${JSON.stringify(out, null, 1)}\n`)
console.log(n, Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])))
