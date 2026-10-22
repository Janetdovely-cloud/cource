// 從聯成電腦學員作品網站抓取作品，依 scripts/works-map.json 分配到各課程頁，
// 產生 src/data/works.js 與 public/works/*.webp。GitHub Actions 每週自動執行。
import fs from 'node:fs/promises'
import sharp from 'sharp'

const BASE = 'https://www.lccnet.com.tw'
const CATS = ['design', 'video', 'painter', 'interior', 'game', 'program']
const map = JSON.parse(await fs.readFile(new URL('./works-map.json', import.meta.url)))
const ua = { headers: { 'User-Agent': 'Mozilla/5.0' } }
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&quot;/g, '"')

const works = new Map()
for (const cat of CATS) {
  for (let page = 1; page <= 20; page++) {
    const html = await (await fetch(`${BASE}/lccnet/student-works/${cat}?page=${page}`, ua)).text()
    const re = /<li class='course_list_li'>\s*<a href='(\/lccnet\/student-works\/(\w+)\/(\d+))'[^>]*>\s*<img src="([^"]+)"[^>]*title="([^"]*)"/g
    let m, found = 0
    while ((m = re.exec(html))) {
      if (!works.has(m[3])) found++
      works.set(m[3], { cat: m[2], id: m[3], href: BASE + m[1], img: m[4], t: decode(m[5]) })
    }
    if (!found) break
  }
}
if (works.size < 50) throw new Error(`只抓到 ${works.size} 件作品，可能網站改版，停止更新`)

await fs.mkdir('public/works', { recursive: true })
const out = {}
for (const w of [...works.values()].sort((a, b) => b.id - a.id)) {
  const file = `public/works/${w.id}.webp`
  try { await fs.access(file) } catch {
    const res = await fetch(BASE + encodeURI(w.img), ua)
    if (!res.ok) continue
    await sharp(Buffer.from(await res.arrayBuffer())).resize(640, 640, { fit: 'inside' }).webp({ quality: 78 }).toFile(file)
  }
  for (const slug of map.overrides[w.id] ?? map.categories[w.cat] ?? []) {
    (out[slug] ??= []).push({ t: w.t, img: `works/${w.id}.webp`, href: w.href })
  }
}
await fs.writeFile('src/data/works.js', '// 學員作品（來源：聯成電腦學員作品網站），依課程分類；由 scripts/fetch-works.mjs 自動產生\nexport const works = ' + JSON.stringify(out, null, 1) + '\n')
console.log(`共 ${works.size} 件作品`, Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length])))
