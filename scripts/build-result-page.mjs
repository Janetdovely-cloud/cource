// 產生「測驗結果專用頁」（Google Apps Script）：只顯示測驗結果圖片，不含招生網站其他內容
// 資料直接從網站元件抽出，課程或推薦規則改了以後重跑：node scripts/build-result-page.mjs
import fs from 'node:fs'

const src = (f) => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8')
function grab(text, name) {
  const i = text.indexOf(`const ${name} = `)
  if (i < 0) throw new Error('找不到 ' + name)
  let j = text.indexOf('=', i) + 1, depth = 0, k = j
  for (; k < text.length; k++) {
    const ch = text[k]
    if ('[{('.includes(ch)) depth++
    else if (']})'.includes(ch)) { depth--; if (depth === 0) { k++; break } }
  }
  return text.slice(j, k)
}
const COLORS = { 'var(--color-red)': '#EF5D60', 'var(--color-gold)': '#F2B134', 'var(--color-brand)': '#1DAD97', 'var(--color-violet)': '#8B7CF6' }
const val = (code) => Function(`return (${code})`)()
const disc = src('src/components/Disc.jsx'), interest = src('src/components/Interest.jsx'), courses = src('src/data/courses.js')
const types = val(grab(disc, 'types').replace(/'var\(--color-[a-z]+\)'/g, (m) => `'${COLORS[m.slice(1, -1)]}'`))
const REC = val(grab(disc, 'REC'))
const HOLLAND = val(grab(interest, 'HOLLAND'))
const CAT = val(grab(interest, 'CAT'))
const idx = val(grab(courses.replace('export const courseIndex', 'const courseIndex'), 'courseIndex').replace(/img: \w+,?/g, ''))
const COURSES = Object.fromEntries(idx.filter((c) => c.ready).map((c) => [c.slug, { name: c.name, en: c.en, line: c.line }]))
const data = JSON.stringify({ types, REC, HOLLAND, CAT, COURSES })
// 截圖程式直接內嵌，不依賴外部 CDN
const lib = src('node_modules/html-to-image/dist/html-to-image.js')
const tpl = src('apps-script/result/index.template.html').replace('/*DATA*/', () => data).replace('/*LIB*/', () => lib)
fs.writeFileSync(new URL('../apps-script/result/index.html', import.meta.url), tpl)
console.log('apps-script/result/index.html', tpl.length, 'bytes')
