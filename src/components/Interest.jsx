import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ph } from './Motion'
import { courseIndex } from '../data/courses'

// 何倫碼（Holland RIASEC）職涯興趣測驗：每型 4 題、1–5 分
const HOLLAND = [
  { k: 'R', name: '實踐者', c: '#E8743B', cats: ['mech', 'space', 'cloud'], desc: '重視實際與動手做，喜歡操作工具、機械與設備，偏好具體明確的工作。', job: '機械電子、農林漁牧、運動或建築工程等領域' },
  { k: 'I', name: '思考者', c: '#3FA796', cats: ['code', 'ai', 'sec'], desc: '好奇心強、重視分析，喜歡觀察、思考與研究，透過邏輯解決複雜問題。', job: '理工、生醫或人文科學等領域' },
  { k: 'A', name: '創造者', c: '#D99A00', cats: ['design', 'video', 'game'], desc: '富想像力與創造力，喜歡自由表達與創新，重視美感與個人風格。', job: '藝術、設計、影音創作等領域' },
  { k: 'S', name: '助人者', c: '#4A6FA5', cats: ['biz'], desc: '友善且樂於助人，喜歡與人互動、教導與協助他人，重視人際關係。', job: '教育、社工心理、醫護、客服等領域' },
  { k: 'E', name: '影響者', c: '#4E9F4E', cats: ['biz', 'video', 'ai'], desc: '自信有企圖心，喜歡領導、說服與競爭，追求影響力與成就。', job: '企管領導、行銷企劃、法律政治等領域' },
  { k: 'C', name: '組織者', c: '#B03A6A', cats: ['sec', 'cloud', 'ai'], desc: '重視秩序與規則，做事細心有條理，偏好結構清楚、流程明確的工作。', job: '財務金融、特助秘書、會計、行政等領域' },
]
const QUIZ = {
  R: ['我喜歡動手組裝、修理或改造東西', '我喜歡操作機器、工具或各種設備', '比起討論想法，我更喜歡實際把東西做出來', '我對建築、空間或機構怎麼運作很有興趣'],
  I: ['遇到問題時，我喜歡把它拆開、找出背後的原因', '接觸新科技時，我會想弄懂它的運作原理', '我喜歡分析數據、從資料中找出規律', '我享受解謎、邏輯推理或寫程式的過程'],
  A: ['我喜歡畫畫、拍照、剪片或做設計', '我常有新點子，喜歡用自己的方式表達', '我很在意畫面、配色與整體美感', '我喜歡創作故事、角色或屬於自己的作品'],
  S: ['我喜歡教別人、幫別人解決問題', '朋友常找我聊心事或請我幫忙', '我喜歡和不同的人交流、認識新朋友', '和別人溝通、讓對方聽懂我的意思讓我很有成就感'],
  E: ['我喜歡帶領團隊、主導事情的方向', '我擅長說服別人接受我的想法', '我對經營品牌、做生意或創業很有興趣', '我喜歡上台報告、在眾人面前表現'],
  C: ['我做事喜歡按照計畫和步驟進行', '我很細心，常能發現資料或文件中的錯誤', '我喜歡把檔案、資料整理得井然有序', '我習慣遵守規則與流程，不喜歡臨時變動'],
}
const QLIST = [0, 1, 2, 3].flatMap((i) => HOLLAND.map((h) => ({ k: h.k, q: QUIZ[h.k][i] })))
const OPTS = ['非常不像我', '不太像我', '普通', '有點像我', '非常像我']
// 興趣類別 → 本網站課程
const CAT = {
  ai: { name: 'AI 應用', slugs: ['ai-pro', 'ai-agent'] },
  code: { name: '程式開發', slugs: ['ai-engineer', 'java'] },
  cloud: { name: '雲端系統', slugs: ['cloud'] },
  sec: { name: '資訊安全', slugs: ['infosec'] },
  video: { name: '影音創作', slugs: ['av-design'] },
  design: { name: '視覺設計', slugs: ['biz-design'] },
  game: { name: '遊戲與動漫', slugs: ['ai-game', 'anime'] },
  mech: { name: '工程製圖', slugs: ['ptc'] },
  space: { name: '室內設計', slugs: ['interior', 'interior-b'] },
  biz: { name: '商業管理', slugs: ['ipas'] },
}

function Radar({ s }) {
  const cx = 130, cy = 125, R = 82, n = 6
  const pt = (i, r) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] }
  return (
    <svg viewBox="0 0 260 255" className="w-full max-w-[340px]" role="img" aria-label="興趣雷達圖">
      {[5, 4, 3, 2, 1].map((l) => <polygon key={l} points={[...Array(n)].map((_, i) => pt(i, (R * l) / 5).join(',')).join(' ')} fill={l % 2 ? '#F4EEDF' : '#FFFDF8'} stroke="#E2D8C5" />)}
      <polygon points={HOLLAND.map((h, i) => pt(i, (R * s[h.k]) / 10).join(',')).join(' ')} fill="rgba(29,173,151,.22)" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinejoin="round" />
      {HOLLAND.map((h, i) => {
        const [x, y] = pt(i, R + 20)
        return <text key={h.k} x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="900" fill={h.c}>{h.k} {h.name} {s[h.k]}</text>
      })}
    </svg>
  )
}

export default function Interest() {
  const [ans, setAns] = useState([])
  const [i, setI] = useState(0)
  const done = ans.length === QLIST.length && ans.every(Boolean)

  const pick = (v) => {
    const a = [...ans]; a[i] = v; setAns(a)
    setTimeout(() => setI((x) => Math.min(x + 1, QLIST.length - 1)), 160)
  }
  const reset = () => { setAns([]); setI(0) }

  if (done && i === QLIST.length - 1 && ans[i]) {
    const s = {}
    HOLLAND.forEach((h) => { const v = QLIST.reduce((t, q, j) => t + (q.k === h.k ? ans[j] : 0), 0); s[h.k] = Math.round((Math.max(0, v - 4) / 16) * 10) })
    const top = HOLLAND.map((h) => ({ ...h, v: s[h.k] })).filter((h) => h.v > 0).sort((a, b) => b.v - a.v).slice(0, 3)
    const w = {}; top.forEach((h, n) => h.cats.forEach((c) => { w[c] = (w[c] || 0) + (3 - n) }))
    const cats = Object.entries(w).sort((a, b) => b[1] - a[1]).map((x) => x[0]).slice(0, 3)
    const recs = [...new Set(cats.flatMap((c) => CAT[c].slugs))].map((sl) => courseIndex.find((c) => c.slug === sl)).filter((c) => c?.ready)
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8">
        <div className="card grid gap-6 md:grid-cols-[340px_1fr] items-center" style={{ '--c': 'var(--color-brand)' }}>
          <Radar s={s} />
          <div>
            <p className="hand-label m-0">你的興趣代碼</p>
            <p className="m-0 mt-2 font-mono font-bold text-[48px] leading-none">{top.map((h) => <span key={h.k} style={{ color: h.c }}>{h.k}</span>)}</p>
            <div className="grid gap-3 mt-4">
              {top.map((h, n) => (
                <div key={h.k} className="pl-3" style={{ borderLeft: `4px solid ${h.c}` }}>
                  <p className="m-0 font-bold">{['①', '②', '③'][n]} {h.name}（{h.v} 分）</p>
                  <p className="m-0 text-muted text-[15px]">{h.desc}</p>
                  <p className="m-0 text-muted text-[14px]">典型職業：{h.job}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="hand text-[26px] m-0">{ph('推薦你優先了解的課程')}</p>
          <p className="m-0 mt-1 mb-4 text-muted">推薦方向：{cats.map((c) => CAT[c].name).join('、')}</p>
          <ul className="m-0 p-0 list-none grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
            {recs.map((c) => (
              <li key={c.slug}>
                <Link to={`/course/${c.slug}`} className="card card-hover block h-full no-underline text-ink" style={{ '--c': 'var(--color-gold)' }}>
                  <p className="m-0 text-[13px] text-link">{c.en}</p>
                  <p className="hand m-0 mt-1 text-[22px]">{ph(c.name)}</p>
                  <p className="m-0 mt-2 text-muted text-[14px]">{c.line}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div><button type="button" className="btn ghost" onClick={reset}>重新測驗</button></div>
      </motion.div>
    )
  }

  const q = QLIST[i]
  return (
    <div className="card max-w-[760px] mx-auto" style={{ '--c': 'var(--color-brand)' }}>
      <p className="m-0 font-mono text-[14px] text-muted">第 {i + 1} / {QLIST.length} 題</p>
      <div className="mt-2 h-3 rounded-full border-2 border-ink overflow-hidden bg-paper">
        <motion.div className="h-full bg-brand" animate={{ width: `${(ans.filter(Boolean).length / QLIST.length) * 100}%` }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.p key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="m-0 mt-6 text-[clamp(20px,2.6vw,26px)] font-bold leading-snug min-h-[2.6em]">{q.q}</motion.p>
      </AnimatePresence>
      <div className="grid gap-2 mt-5 sm:grid-cols-5">
        {OPTS.map((o, j) => (
          <button key={o} type="button" onClick={() => pick(j + 1)}
            className="rounded-lg border-2 px-3 py-3 text-[15px] font-bold bg-transparent cursor-pointer transition-colors"
            style={{ borderColor: ans[i] === j + 1 ? 'var(--color-brand)' : 'var(--color-rule)', background: ans[i] === j + 1 ? 'color-mix(in srgb, var(--color-brand) 14%, transparent)' : 'transparent' }}>
            <span className="font-mono text-link mr-1">{j + 1}</span>{o}
          </button>
        ))}
      </div>
      <div className="mt-5 flex justify-between items-center text-[14px] text-muted">
        <button type="button" className="btn ghost !py-1.5" onClick={() => setI(Math.max(0, i - 1))} style={{ visibility: i ? 'visible' : 'hidden' }}>← 上一題</button>
        <span>點選後自動進入下一題</span>
      </div>
    </div>
  )
}
