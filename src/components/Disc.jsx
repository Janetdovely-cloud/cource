import { useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ResultQR from './ResultQR'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { ph } from './Motion'
import { courseIndex } from '../data/courses'

// 奇數題：行動步調（慢／快）；偶數題：關注焦點（任務／人際）
const qs = [
  ['提意見時，身體較可能後傾', '提意見時，較可能挺直身軀或身體向前傾'],
  ['說話時較少用手勢', '說話時較常用手勢'],
  ['表現出較無精打采的樣子', '表現出神采奕奕的樣子'],
  ['肢體動作較拘謹', '肢體動作較流暢'],
  ['動作較不強而有力', '動作較強而有力'],
  ['臉部表情較少', '臉部表情較多'],
  ['語調輕柔', '嗓門大'],
  ['看起來較嚴肅', '看起來較輕鬆'],
  ['較可能提問題', '較可能下斷語'],
  ['聲音較無抑揚頓挫', '聲音較有抑揚頓挫'],
  ['較不會逼使他人行動', '較容易逼使他人行動'],
  ['較不會表達內心想法', '較容易表達內心想法'],
  ['表達意見時，較吞吞吐吐', '表達意見時，較堅定'],
  ['談話內容較偏任務導向', '談話內容較偏人際導向'],
  ['較慢解決問題', '較快解決問題'],
  ['較偏重事實邏輯', '較偏重感覺想法'],
  ['走路速度較慢', '走路速度較快'],
  ['較不會閒聊或說些趣事', '較容易閒聊或說些趣事'],
]
const types = {
  D: { name: '支配型', animal: '老虎', desc: '具備主動且任務導向的特質。', c: 'var(--color-red)' },
  I: { name: '影響型', animal: '孔雀', desc: '具備主動且人際導向的特質。', c: 'var(--color-gold)' },
  S: { name: '穩健型', animal: '無尾熊', desc: '具備內斂且人際導向的特質。', c: 'var(--color-brand)' },
  C: { name: '分析型', animal: '貓頭鷹', desc: '具備內斂且任務導向的特質。', c: 'var(--color-violet)' },
}

// 各風格推薦課程
const REC = {
  D: { why: '果斷、重目標，適合規劃系統與帶領專案的方向', slugs: ['ai-agent', 'cloud', 'ipas'] },
  I: { why: '表達力強、富創意，適合需要溝通與創作的方向', slugs: ['av-design', 'biz-design', 'anime', 'ai-game'] },
  S: { why: '穩定細心、重協作，適合按部就班累積專業的方向', slugs: ['interior', 'interior-b', 'ptc', 'ai-pro'] },
  C: { why: '邏輯嚴謹、重精確，適合程式分析與資安的方向', slugs: ['infosec', 'java', 'ai-engineer'] },
}

export default function Disc() {
  const [ans, setAns] = useState({})
  const [params] = useSearchParams()
  const navigate = useNavigate()
  // 結果可由網址 ?r=D-I-S-C 分數直接開啟（給 QR Code 用）
  const [res, setRes] = useState(() => {
    const v = (params.get('r') || '').split('-').map(Number)
    if (v.length !== 4 || !v.every((n) => n >= 0 && n <= 18)) return null
    const s = { D: v[0], I: v[1], S: v[2], C: v[3] }, max = Math.max(...v)
    return { s, top: Object.keys(s).filter((k) => s[k] === max), shared: true }
  })
  const resRef = useRef(null)
  const done = Object.keys(ans).length

  const submit = (e) => {
    e.preventDefault()
    const v = Object.values(ans)
    const fast = v.filter((x) => x === 'Fast').length, slow = v.filter((x) => x === 'Slow').length
    const task = v.filter((x) => x === 'Task').length, people = v.filter((x) => x === 'People').length
    const s = { D: fast + task, I: fast + people, S: slow + people, C: slow + task }
    const max = Math.max(...Object.values(s))
    setRes({ s, top: Object.keys(s).filter((k) => s[k] === max) })
    setTimeout(() => resRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }
  const reset = () => { setAns({}); setRes(null); if (params.get('r')) navigate('/disc', { replace: true }) }

  return (
    <div className={res?.shared ? 'grid max-w-[480px] mx-auto' : 'grid gap-8 lg:grid-cols-[1fr_380px] items-start'}>
      <form onSubmit={submit} className={res?.shared ? 'hidden' : 'grid gap-3'}>
        {qs.map(([a, b], i) => {
          const name = `q${i + 1}`
          const vals = i % 2 === 0 ? ['Slow', 'Fast'] : ['Task', 'People']
          return (
            <fieldset key={name} className="soft !shadow-none m-0 px-4 py-3 grid grid-cols-[36px_1fr] gap-x-2 items-start">
              <legend className="sr-only">第 {i + 1} 題</legend>
              <span className="font-mono font-bold text-link text-[18px] pt-2">{String(i + 1).padStart(2, '0')}</span>
              <div className="grid gap-2 sm:grid-cols-2">
                {[a, b].map((t, j) => {
                  const on = ans[name] === vals[j]
                  return (
                    <label key={t} className="flex gap-2 items-start cursor-pointer rounded-lg border-2 px-3 py-2 text-[15px] leading-snug transition-colors"
                      style={{ borderColor: on ? 'var(--color-brand)' : 'transparent', background: on ? 'color-mix(in srgb, var(--color-brand) 12%, transparent)' : 'transparent' }}>
                      <input type="radio" name={name} value={vals[j]} required checked={on}
                        onChange={() => setAns({ ...ans, [name]: vals[j] })} className="mt-1 accent-[var(--color-brand)]" />
                      <span>{t}</span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )
        })}
      </form>

      <aside className="lg:sticky lg:top-24 grid gap-4">
        <div className={res?.shared ? 'hidden' : 'card'} style={{ '--c': 'var(--color-brand)' }}>
          <p className="m-0 font-bold">請依平常最自然的行為表現，每題選一個最符合你的描述。</p>
          <div className="mt-4 h-3 rounded-full border-2 border-ink overflow-hidden bg-paper">
            <motion.div className="h-full bg-brand" animate={{ width: `${(done / qs.length) * 100}%` }} />
          </div>
          <p className="m-0 mt-2 text-[14px] text-muted font-mono">{done} / {qs.length}</p>
          <button type="button" className="btn primary w-full mt-4 justify-center" disabled={done < qs.length}
            onClick={(e) => submit(e)} style={done < qs.length ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}>
            {done < qs.length ? `還有 ${qs.length - done} 題` : '看我的 DISC 結果'}
          </button>
        </div>

        <AnimatePresence>
          {res && (
            <motion.div ref={resRef} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="card" style={{ '--c': types[res.top[0]].c }}>
              <p className="hand-label m-0">你的主要風格</p>
              <h3 className="m-0 mt-1 text-[30px]">{ph(res.top.map((k) => `${k} ${types[k].name}`).join('／'))}</h3>
              <p className="m-0 mt-2">
                {res.top.length === 1
                  ? `你偏向「${types[res.top[0]].name}（${types[res.top[0]].animal}）」，${types[res.top[0]].desc}`
                  : '你屬於跨界混合型，同時具備多重優勢特質。'}
              </p>
              <div className="grid gap-2 mt-4">
                {Object.entries(res.s).map(([k, n]) => (
                  <div key={k} className="grid grid-cols-[88px_1fr_28px] items-center gap-2 text-[14px]">
                    <span className="font-bold">{k} {types[k].name}</span>
                    <div className="h-3 rounded-full border-2 border-ink overflow-hidden bg-paper">
                      <motion.div className="h-full" style={{ background: types[k].c }} initial={{ width: 0 }} animate={{ width: `${(n / qs.length) * 100}%` }} transition={{ duration: 0.8 }} />
                    </div>
                    <span className="font-mono text-right">{n}</span>
                  </div>
                ))}
              </div>
              <p className="hand m-0 mt-5 text-[22px]">{ph('推薦你優先了解的課程')}</p>
              <p className="m-0 mt-1 text-muted text-[14px]">{res.top.map((k) => REC[k].why).join('；')}</p>
              <ul className="m-0 mt-3 p-0 list-none grid gap-2">
                {[...new Set(res.top.flatMap((k) => REC[k].slugs))].map((sl) => courseIndex.find((c) => c.slug === sl)).filter((c) => c?.ready).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/course/${c.slug}`} className="soft card-hover block no-underline text-ink px-3 py-2">
                      <span className="text-[12px] text-link block">{c.en}</span>
                      <span className="hand text-[18px]">{ph(c.name)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {!res.shared && <ResultQR text={[
                '【聯成電腦｜DISC 職涯適性測驗結果】',
                `主要風格：${res.top.map((k) => `${k} ${types[k].name}（${types[k].animal}）`).join('／')}`,
                `分數：${Object.entries(res.s).map(([k, n]) => `${k} ${n}`).join('｜')}`,
                `推薦課程：${[...new Set(res.top.flatMap((k) => REC[k].slugs))].map((sl) => courseIndex.find((c) => c.slug === sl)).filter((c) => c?.ready).map((c) => c.name).join('、')}`,
              ].join('\n')} />}
              <button type="button" className="btn ghost w-full mt-4 justify-center" onClick={reset}>重新測驗</button>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </div>
  )
}
