// 中文依詞換行：在詞與詞之間插入零寬空格，搭配 CSS word-break: keep-all，
// 讓瀏覽器只在詞的邊界換行，不會把「自動化」切成「自／動化」。
const ZW = '​'
const CJK = /[㐀-鿿]/
const SEG = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('zh-Hant', { granularity: 'word' }) : null

function mark(text) {
  const raw = text.replaceAll(ZW, '')
  let out = ''
  let prevWord = false
  for (const s of SEG.segment(raw)) {
    const word = s.isWordLike && CJK.test(s.segment)
    if (word && prevWord) out += ZW
    out += s.segment
    prevWord = word
  }
  return out
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
