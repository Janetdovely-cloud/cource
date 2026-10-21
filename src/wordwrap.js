// 中文依詞換行：在詞與詞之間插入零寬空格，搭配 CSS word-break: keep-all，
// 讓瀏覽器只在詞的邊界換行，不會把「自動化」切成「自／動化」。
const ZW = '​'
const CJK = /[㐀-鿿]/
const SEG = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('zh-Hant', { granularity: 'word' }) : null

function mark(text) {
  const raw = text.replaceAll(ZW, '')
  const segs = [...SEG.segment(raw)].map((s) => ({ t: s.segment, w: s.isWordLike && CJK.test(s.segment) }))
  // glue[i] 為 true 代表第 i 段和第 i+1 段之間不能換行
  const glue = segs.map(() => false)
  for (let i = 0; i < segs.length - 1; i++) {
    const a = segs[i], b = segs[i + 1]
    if (!a.w || !b.w) continue
    // 兩字＋兩字視為一個複合詞（場景建模、遊戲程式）
    if (a.t.length === 2 && b.t.length === 2 && !(i > 0 && glue[i - 1] && segs[i - 1].t.length === 2)) glue[i] = true
    // 單字詞黏著後面的詞（可＋遊玩、並＋輔導、跨＋平台）
    if (a.t.length === 1) glue[i] = true
    // 句尾的單字詞黏著前面的詞（能力＋者）
    if (b.t.length === 1 && !(segs[i + 2] && segs[i + 2].w)) glue[i] = true
  }
  let out = ''
  segs.forEach((s, i) => {
    out += s.t
    const n = segs[i + 1]
    if (n && s.w && n.w && !glue[i]) out += ZW
  })
  // 短英文／數字與後面的中文詞不分開（AI 教練、8 項、Unity 跨平台）
  return out.replace(/(^|[^A-Za-z0-9+#])([A-Za-z0-9+#.]{1,6}) (?=[㐀-鿿])/g, '$1$2 ')
}

function fix(node) {
  const v = node.nodeValue
  if (!v || !CJK.test(v)) return
  const p = node.parentElement
  if (!p || p.closest('h1, h2, h3, h4, script, style, input, textarea')) return
  const m = mark(v)
  if (m !== v) node.nodeValue = m
}

function walk(root) {
  if (root.nodeType === 3) return fix(root)
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let n
  while ((n = w.nextNode())) fix(n)
}

export function startWordWrap(root) {
  if (!SEG) return
  walk(root)
  new MutationObserver((list) => {
    for (const r of list) {
      if (r.type === 'characterData') fix(r.target)
      else r.addedNodes.forEach(walk)
    }
  }).observe(root, { childList: true, subtree: true, characterData: true })
}
