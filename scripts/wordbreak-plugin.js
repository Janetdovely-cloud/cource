// 建置時為中文內文加上斷詞標記：用 jieba 斷詞，在可換行的詞界插入零寬空格（U+200B），
// 搭配 CSS word-break: keep-all，所有瀏覽器（含 iOS Safari）都只會在詞界換行。
import * as OpenCC from 'opencc-js'
import jieba from 'jieba-wasm'

const ZW = '​'
const toCN = OpenCC.Converter({ from: 'tw', to: 'cn' })

function mark(run) {
  const cn = toCN(run)
  if (cn.length !== run.length) return run
  let pos = 0
  const segs = jieba.cut(cn, true).map((w) => { const t = run.slice(pos, pos + w.length); pos += w.length; return t })
  const glue = segs.map(() => false)
  for (let i = 0; i < segs.length - 1; i++) {
    const a = segs[i], b = segs[i + 1]
    // 兩字＋兩字視為一個複合詞（場景建模、遊戲程式）
    if (a.length === 2 && b.length === 2 && !(i > 0 && glue[i - 1] && segs[i - 1].length === 2)) glue[i] = true
    // 單字詞黏著後面的詞（可＋遊玩、並＋輔導）
    if (a.length === 1) glue[i] = true
    // 結尾的單字詞黏著前面的詞（能力＋者）
    if (b.length === 1 && i + 1 === segs.length - 1) glue[i] = true
  }
  return segs.map((s, i) => s + (i < segs.length - 1 && !glue[i] ? ZW : '')).join('')
}

export default function wordbreak() {
  return {
    name: 'zh-wordbreak',
    enforce: 'pre',
    transform(code, id) {
      if (!/\/src\/.*\.(jsx?|tsx?)$/.test(id)) return null
      const out = code
        .replace(/[㐀-鿿]{3,}/g, mark)
        // 短英文／數字與後面的中文不分開（AI 教練、8 項、Unity 跨平台）
        .replace(/(^|[^A-Za-z0-9+#])([A-Za-z0-9+#.]{1,6}) (?=[㐀-鿿])/g, '$1$2 ')
      return out === code ? null : { code: out, map: null }
    },
  }
}
